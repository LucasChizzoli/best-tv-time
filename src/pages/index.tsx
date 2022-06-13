import type { NextPage } from 'next';
import { trpc } from '../utils/trcp';

const Home: NextPage = () => {

  const { data, isLoading } = trpc.useQuery(["getAllMedias"]);

  if (isLoading || !data) {
    return <div>Loading...</div>
  }

  console.log("data: ", data);

  return (
    <h1 className="text-3xl font-bold underline">
      Hello world { data[0]?.title }
    </h1>
  )
}

export default Home;
