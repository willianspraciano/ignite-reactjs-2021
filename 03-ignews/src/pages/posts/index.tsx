import Head from 'next/head';
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
