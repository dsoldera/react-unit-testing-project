import Head from 'next/head';
import { GetStaticProps } from 'next';
import { getPrismicClient } from '../../services/prismic';
import Link from 'next/link';

import styles from './styles.module.scss';

type Post = { slug: string; title: string; excerpt: string; updatedAt: string };

interface PostProps {
  posts: Post[];
}

export default function Posts({ posts }: PostProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => {
            return (
              <Link href={post.slug} key={post.slug}>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </Link>
            )
          })}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await getPrismicClient();
  
  //console.log(JSON.stringify(response, null, 2));

  const posts:any = response.map(post => {
    return {
      slug: post.uid,
      title: post.data.title[0].text,
      content: post.data.content,
      excerpt:
        post.data.content.find(content => content.type === 'paragraph')?.text ??
        '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }
      )
    };
  });
  //console.log('posts', JSON.stringify(posts, null, 2));

  return {
    props: { 
      posts
    }
  };
};
