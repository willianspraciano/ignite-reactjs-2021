import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de março de 2023</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>
              freestar freestar Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Vestibulum ultrices hendrerit quam, non fermentum
              nisi auctor non.
            </p>
          </a>
          <a href="#">
            <time>12 de março de 2023</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>
              freestar freestar Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Vestibulum ultrices hendrerit quam, non fermentum
              nisi auctor non.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const prismic = getPrismicClient();

  const posts = await prismic.getByType('post', {
    pageSize: 100,
  });

  console.log(JSON.stringify(posts, null, 2));

  return {
    props: { posts },
  };
}
