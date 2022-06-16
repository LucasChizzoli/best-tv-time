import type { NextPage } from 'next';
import Image from 'next/image';
import { trpc } from '../utils/trcp';

const Ranking: NextPage = () => {

  const { data: rankings, isLoading } = trpc.useQuery(["dogs.get-ranking"]);

  const getVotesPercent = (dog: { name: string, imageUrl: string, _count: { VoteFor: number, VoteAgainst: number} }) => {
    const { VoteFor, VoteAgainst } = dog._count;
    
    if(VoteFor + VoteAgainst === 0) {
      return 0;
    }

    return (VoteFor / (VoteFor + VoteAgainst)) * 100;
  }

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-800 text-white text-center text-2xl">
        Loading...
      </div>
    )
  }

  return (
    <div className="flex flex-col py-9 items-center bg-gray-800 text-white">
      <h1 className="text-4xl my-5">
        Cutest Top 10 dogs!
      </h1>
      <div>
        {rankings && rankings.map(ranking => (
          <div key={ranking.id} className="flex border-b border-gray-500 gap-4 my-3 py-3">
            <div>
              <Image src={ranking.imageUrl ? ranking.imageUrl : '/image-placeholder.png'} width={100} height={100} alt={ranking.name} />
            </div>
            <div>
              <h3 className="text-xl">{ranking.name}</h3>
              <p className="mt-3">Cutets: {getVotesPercent(ranking).toFixed(2)}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Ranking;