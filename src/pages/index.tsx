import type { NextPage } from 'next';
import { trpc } from '../utils/trcp';

const Home: NextPage = () => {

  // const { data, isLoading } = trpc.useQuery(["media.get-all"]);

  // if (isLoading || !data) {
  //   return <div>Loading...</div>
  // }

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl text-center">
        Which movie/tv-show is better?
      </h1>
      <div className="mt-5 flex justify-between max-w-2xl">
        
        <div className="p-8">vs</div>
        <div className="w-16 h-16 bg-red-200"></div>
      </div>
    </div>
  )
}

export default Home;
