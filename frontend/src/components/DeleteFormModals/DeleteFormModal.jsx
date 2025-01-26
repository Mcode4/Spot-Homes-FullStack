import { useModal } from "../../context/Modal"
import { useDispatch} from "react-redux"
import * as spotActions from '../../store/spot'
import * as reviewActions from '../../store/review'

function DeleteFormModal({type, id, page}){
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    let deleteMessage = 'Are you sure you want to remove this spot from the listings'
    let deleteButtonText= ['Yes (Delete Spot)', 'No (Keep Spot)']
    let deleteFunc
    
    if(type === 'Spot'){
        deleteFunc = async ()=>{
            dispatch(spotActions.deleteSpot(id)).then(dispatch(spotActions.loadSpotData(id))).then(closeModal)
        }
        deleteMessage = 'Are you sure you want to remove this spot from the listings'
        deleteButtonText= ['Yes (Delete Spot)', 'No (Keep Spot)']
    } else if(type === 'Review'){
        console.log('PAGE:', page)
        console.log('PI 1:', page[0])
        console.log('PI 2:', page[1])
        if(page[0] === 'Spot'){
            deleteFunc = async ()=>{
                dispatch(reviewActions.deleteReview(id)).then(dispatch(spotActions.loadSpotData(page[1]))).then(closeModal)
            }
        }
        deleteFunc = async ()=>{
            dispatch(reviewActions.deleteReview(id)).then(dispatch(reviewActions.loadReviews())).then(closeModal)
        }
        deleteMessage = 'Are you sure you want to remove this review for spot'
        deleteButtonText= ['Yes (Delete Review)', 'No (Keep Review)']
    }
    return(
        <div className="modal">
            <div>Confirm Delete</div>
            <div>{deleteMessage}</div>
            <div className="deleteActions">
                <button className="delete" onClick={deleteFunc}>{deleteButtonText[0]}</button>
                <button className="keep" onClick={closeModal}>{deleteButtonText[1]}</button>
            </div>
        </div>
    )
}

export default DeleteFormModal