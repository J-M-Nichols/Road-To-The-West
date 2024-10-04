import { useSelector } from "react-redux"

const Notification = () =>{
    const notification = useSelector(state=>state.notification)
    
    return (
        <div 
            className="border rounded m-3 p-3 overflow-auto custom-scrollbar-css"
            style={{
                maxHeight:'20rem',
                backgroundColor:'#DEAC80 !important'
            }}
        >
            {
                notification.map(({content, classNames}, i)=><p 
                    key={i}
                    className={`fw-bolder ${classNames}`}
                >{content}</p>)
            }
        </div>
    )
}

export default Notification