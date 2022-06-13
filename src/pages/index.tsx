import type { NextPage } from 'next';
import Head from 'next/head';
import { prisma } from '../db/client';


export const getServerSideProps = async () => {
  const media = await prisma.media.findMany();

  return {
    props: {
      media: JSON.stringify(media),
    }
  };
}

const Home: NextPage = (props: any) => {

  return (
    <div>
      <Head>
        <title>Best Tv Time</title>
        <meta name="description" content="Rate the best movie and tv-show"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-3xl font-bold underline">
          Hello world
        </h1>

        <code>
          { props.media }
        </code>
      </main>
    </div>
  )
}

export default Home;
