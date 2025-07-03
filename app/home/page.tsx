
import Carousel from "./Carousel";
import HighestRated from "./sections/HighestRated";
import Popular from "./sections/Popular";

function HomePage() {

    return (<main className="flex min-h-screen w-full">
         {/*Content On the Right side of panel*/}  
            <div className="flex flex-col w-full min-h-screen">
                <Carousel />
                <HighestRated/> 
                <Popular/>
            </div>
        
    </main>)
}

export default HomePage