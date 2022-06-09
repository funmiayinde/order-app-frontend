import Head from 'next/head';
import Login from './auth/login';

const Home = () => {
  return (
    <>
      <Head>
        <title>Order Admin</title>
      </Head>
      <main>
        <Login />
      </main>
    </>
  );
};

Home.getLayout = (page: any) => page;

export default Home;
