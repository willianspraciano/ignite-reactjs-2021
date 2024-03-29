import Head from 'next/head';
import Link from 'next/link';
import { getPrismicClient } from '../../services/prismic';
import { RichText } from 'prismic-dom';
import styles from './styles.module.scss';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const prismic = getPrismicClient();

  const response = await prismic.getByType('post', {
    pageSize: 100,
  });

  // console.log(JSON.stringify(response, null, 2));

  const postsFormatted = response?.results?.map((post) => {
    return {
      slug: post.uid,
      title: post.data.title,
      excerpt:
        post.data.content
          .find((content) => content.type === 'paragraph')
          ?.text?.slice(0, 250) + '...' ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }
      ),
    };
  });

  return {
    props: { posts: postsFormatted },
  };
}
