import Head from 'next/head';
import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  };
}

export default function Home({ product }: HomeProps) {
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
          </p>
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
  </>
  );
}
