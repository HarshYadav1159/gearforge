import GameCard from "@/app/components/common/GameCard"

const highestRated:string[] = ['Game 1', 'Game 2', 'Game 3']

function HighestRated(){

    return (<div className="m-12">
                    <p className="text-white text-3xl">
                        Highest Rated
                    </p>

                    <div className="flex flex-col w-fit">
                        <div className="flex gap-4 mt-4">
                            {highestRated.map((value, index) => {
                                return (<div key={index}><GameCard/></div>)
                            })}
                        </div>
                        <div className="flex flex-row-reverse">
                            <p className="p-2 cursor-pointer hover:text-white">View All Highest Rated</p>
                        </div>
                    </div>
                </div>)
}

export default HighestRated