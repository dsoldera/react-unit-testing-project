import * as prismic from '@prismicio/client';

export async function getPrismicClient() {
  const repoName = 'rocketseat-ignews-nextjs';
  const endpoint = prismic.getEndpoint(repoName);
  const client = prismic.createClient(endpoint, {
    accessToken:  process.env.PRISMIC_ACCESS_TOKEN
  });
  const posts = await client.getAllByType('posts', {
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc',
    },
  });

  //console.log(posts);
  return posts;
}
