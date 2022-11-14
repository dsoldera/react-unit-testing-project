import { GetServerSideProps, GetStaticProps } from 'next';

import Head from 'next/head';

import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  };
}

export default function Home({ product}: HomeProps) {

  return (
  <>
    <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span> 👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get acess to all the publications <br />
            {/* <span>for {product.amount} month</span> */}
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
  </>
  );
}

// usando getStaticPros em vez de getServerSideProps o Next
// vai salvar a pagina/ o resultado do HTML para uma futura busca
// e posso definir o tempo para revalidar o conteudo buscando novamento o serviço
export const getStaticProps: GetStaticProps = async() => {
  console.log('showed only inside the next or backend log');

  // essa key é relativa ao preço do produto dentro do stripe
  const price = await stripe.prices.retrieve('price_1M3hFHFChlw97LJEcpZ2UILx');

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100)
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 horas
  }
}