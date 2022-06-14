import type { NextPage } from 'next';
import { trpc } from '../utils/trcp';

const Home: NextPage = () => {
  const {data, isLoading} = trpc.useQuery(["dogs.get-dog-pairs"]);

  if (isLoading || !data) {
    return <div>Loading...</div>
  }

  console.log(data);
  const [dogOne, dogTwo] = data;

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl text-center">
        Which dog is cuetter?
      </h1>
      <div className="mt-5 flex justify-between max-w-2xl">
        <div className="w-16 h-16 bg-red-200">{dogOne}</div>
        <div className="p-8">vs</div>
        <div className="w-16 h-16 bg-red-200">{dogTwo}</div>
      </div>
    </div>
  )
}

export default Home;
