import { useSelector } from "react-redux"


const Notification = () =>{
    const {content} = useSelector(state=>state.notification)
    
    return (
        <div 
            className="border rounded m-3 p-3 overflow-auto"
            style={{maxHeight:'20rem'}}
        >
            {
                content.map((v, i)=><p key={i}>{v}</p>)
            }
        </div>
    )
}

export default Notification