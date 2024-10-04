import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addContent } from "../features/notificationSlice/notificationSlice"
import { consumeFood } from "../features/resourceSlices/foodSlice/foodSlice"
import { consumePreservedFood } from "../features/resourceSlices/preservedFoodSlice/preservedFoodSlice"
import { removeTools } from "../features/resourceSlices/toolsSlice/toolsSlice"
import { removeSettlers } from "../features/resourceSlices/settlersSlice/settlersSlice"
import { killCattle } from "../features/resourceSlices/cattleSlice/cattleSlice"
import { removeWagons } from "../features/resourceSlices/wagonsSlice/wagonsSlice"


const AbandonResources = () =>{
    const [abandonAmount, setAbandonAmount] = useState(0)
    const [abandonName, setAbandonName] = useState('Food')
    const dispatch = useDispatch()
    const food = useSelector(state=>state.food)
    const preservedFood = useSelector(state=>state.preservedFood)
    const wagons = useSelector(state=>state.wagons)
    const cattle = useSelector(state=>state.cattle)
    const tools = useSelector(state=>state.tools)
    const settlers = useSelector(state=>state.settlers)

    const handleAbandonResources = () => {
        let actualAbandon = abandonAmount

        switch (abandonName) {
            case 'Food' :
                if(actualAbandon > food) actualAbandon = food
                if(actualAbandon > 0) {
                    dispatch(consumeFood({amount : actualAbandon}))
                    dispatch(addContent({
                        content: `You abandoned ${actualAbandon} ${abandonName.toLowerCase()}.`,
                        classNames: 'text-danger'
                    }))
                }
                else dispatch(addContent({
                    content: `You do not have enough ${abandonName.toLowerCase()} to abandon.`,
                    classNames: 'text-secondary'
                }))
                break
            case 'Preserved Food' :
                if(actualAbandon > preservedFood) actualAbandon = preservedFood
                if(actualAbandon > 0) {
                    dispatch(consumePreservedFood({ amount : actualAbandon }))
                    dispatch(addContent({
                        content: `You abandoned ${actualAbandon} ${abandonName.toLowerCase()}.`,
                        classNames: 'text-danger'
                    }))
                }
                else dispatch(addContent({
                    content: `You do not have enough ${abandonName.toLowerCase()} to abandon.`,
                    classNames: 'text-secondary'
                }))
                break
            case 'Tools' :
                if(actualAbandon > tools) actualAbandon = tools
                if(actualAbandon > 0) {
                    dispatch(removeTools(actualAbandon))
                    dispatch(addContent({
                        content: `You abandoned ${actualAbandon} ${abandonName.toLowerCase()}.`,
                        classNames: 'text-danger'
                    }))
                }
                else dispatch(addContent({
                    content: `You do not have enough ${abandonName.toLowerCase()} to abandon.`,
                    classNames: 'text-secondary'
                }))
                break
            case 'Settlers' :
                if(actualAbandon > settlers) actualAbandon = settlers
                if(actualAbandon > 0) {
                    dispatch(removeSettlers(actualAbandon))
                    dispatch(addContent({
                        content: `You abandoned ${actualAbandon} ${abandonName.toLowerCase()}.`,
                        classNames: 'text-danger'
                    }))
                }
                else dispatch(addContent({
                    content: `You do not have enough ${abandonName.toLowerCase()} to abandon.`,
                    classNames: 'text-secondary'
                }))
                break
            case 'Cattle' :
                if(actualAbandon > cattle) actualAbandon = cattle
                if(actualAbandon > 0) {
                    dispatch(killCattle(actualAbandon))
                    dispatch(addContent({
                        content: `You abandoned ${actualAbandon} ${abandonName.toLowerCase()}.`,
                        classNames: 'text-danger'
                    }))
                }
                else dispatch(addContent({
                    content: `You do not have enough ${abandonName.toLowerCase()} to abandon.`,
                    classNames: 'text-secondary'
                }))
                break
            case 'Wagons' :
                if(actualAbandon > wagons) actualAbandon = wagons
                if(actualAbandon > 0) {
                    dispatch(removeWagons(actualAbandon))
                    dispatch(addContent({
                        content: `You abandoned ${actualAbandon} ${abandonName.toLowerCase()}.`,
                        classNames: 'text-danger'
                    }))
                }
                else dispatch(addContent({
                    content: `You do not have enough ${abandonName.toLowerCase()} to abandon.`,
                    classNames: 'text-secondary'
                }))
                break
            default:
                break
        }
    }

    return (
        <div className="m-3 border rounded p-3 d-flex justify-content-center">
            <div className="input-group w-auto">
                <input
                    className="form-control"
                    type='number'
                    id='abandon-amount'
                    value={abandonAmount}
                    onChange={e=>setAbandonAmount(Number(e.target.value))}
                    aria-label='Abandon amount'
                />
                <button 
                    type="button"
                    className="btn btn-outline-success"
                    aria-label="Abandon Resource"
                    onClick={()=>handleAbandonResources()}
                >Abandon {abandonName}</button>
                <button
                    type="button"
                    className="btn btn-outline-success dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                >
                    <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end"> 
                    <li><button 
                        onClick={()=>setAbandonAmount('Food')}
                        aria-label='Set Abandon Food'
                        type="button"
                        className='dropdown-item'
                    >
                        Abandon Food
                    </button></li>
                    <li><button 
                        onClick={()=>setAbandonName('Preserved Food')}
                        aria-label='Set Abandon Preserved Food'
                        type="button"
                        className='dropdown-item'
                    >
                        Abandon Preserved Food
                    </button></li>
                    <li><button 
                        onClick={()=>setAbandonName('Tools')}
                        aria-label='Set Abandon Tools'
                        type="button"
                        className='dropdown-item'
                    >
                        Abandon Tools
                    </button></li>
                    <li><button 
                        onClick={()=>setAbandonName('Settlers')}
                        aria-label='Set Abandon Settlers'
                        type="button"
                        className='dropdown-item'
                    >
                        Abandon Settlers
                    </button></li>
                    <li><button 
                        onClick={()=>setAbandonName('Cattle')}
                        aria-label='Set Abandon Cattle'
                        type="button"
                        className='dropdown-item'
                    >
                        Abandon Cattle
                    </button></li>
                    <li><button 
                        onClick={()=>setAbandonName('Wagons')}
                        aria-label='Set Abandon Wagons'
                        type="button"
                        className='dropdown-item'
                    >
                        Abandon Wagons
                    </button></li>
                </ul>
            </div>
        </div>
    )
}

export default AbandonResources