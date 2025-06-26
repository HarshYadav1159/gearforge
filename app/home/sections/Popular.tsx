import GameCard from "@/app/components/common/GameCard"

const popular:string[] = ['Game 1', 'Game 2', 'Game 3']

function Popular(){

    return (<div className="ml-12">
                    <p className="text-white text-3xl">
                        Popular Games
                    </p>

                    <div className="flex flex-col w-fit">
                        <div className="flex gap-4 mt-4">
                            {popular.map((value, index) => {
                                return (<div key={index}><GameCard/></div>)
                            })}
                        </div>
                        <div className="flex flex-row-reverse">
                            <p className="p-2 cursor-pointer hover:text-white">View All Popular Games</p>
                        </div>
                    </div>
                </div>)
}

export default Popular