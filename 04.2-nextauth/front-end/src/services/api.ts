import { signOut } from '@/contexts/AuthContext';
import axios, { AxiosError } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { parseCookies, setCookie } from 'nookies';
import { AuthTokenError } from './errors/AuthTokenError';

type FailedRequestQueue = {
  onSuccess: (token: string) => void;
  onFailure: (err: AxiosError) => void;
};

let isRefreshing = false;
let failedRequestsQueue: FailedRequestQueue[] = [];

export function setupAPIClient(ctx?: GetServerSidePropsContext) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      // console.log(error.response);
      if (error?.response?.status === 401) {
        // @ts-ignore
        if (error?.response?.data?.code === 'token.expired') {
          cookies = parseCookies(ctx);
          const { 'nextauth.refreshToken': refreshToken } = cookies;
          const originalConfig = error?.config;

          if (!isRefreshing) {
            isRefreshing = true;

            api
              .post('/refresh', { refreshToken })
              .then((response) => {
                const { token } = response.data;

                setCookie(ctx, 'nextauth.token', token, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: '/',
                });

                setCookie(
                  ctx,
                  'nextauth.refreshToken',
                  response.data.refreshToken,
                  {
                    maxAge: 60 * 60 * 24 * 30, // 30 days
                    path: '/',
                  }
                );

                api.defaults.headers['Authorization'] = `Bearer ${token}`;

                failedRequestsQueue.forEach((request) =>
                  request.onSuccess(token)
                );
                failedRequestsQueue = [];
              })
              .catch((err) => {
                failedRequestsQueue.forEach((request) =>
                  request.onFailure(err)
                );
                failedRequestsQueue = [];

                if (typeof window === 'object') {
                  signOut();
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                if (originalConfig) {
                  originalConfig.headers['Authorization'] = `Bearer ${token}`;
                  resolve(api(originalConfig));
                }
              },
              onFailure: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        } else {
          // deslogar o usuário
          if (typeof window === 'object') {
            signOut();
          } else {
            return Promise.reject(new AuthTokenError());
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}
