import ScrollContainer from "react-indiana-drag-scroll"

function DraggableScroll({children}:{children:React.ReactNode}){
    
    return (<>
            <ScrollContainer className="flex gap-4 mt-4" vertical={false}>
                {children}    
            </ScrollContainer>            
    </>)
}

export default DraggableScroll