import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import OpenModalButton from "../OpenModalButton"
import ReviewFormModal from "../ReviewFormModal"
import DeleteFormModal from "../DeleteFormModals"
import * as reviewActions from '../../store/review'

function ManageReviews(){
    const dispatch = useDispatch()
    const reviews = useSelector(state=> state.review.reviews.Reviews)
    console.log('REVIEWS', reviews)

    useEffect(()=>{
        dispatch(reviewActions.loadReviews())
    }, [dispatch])

    if(!reviews){
        return(
            <h1>Page Loading...</h1>
        )
    }
    
    return (
        <div id="reviewPage">
            <div>Manage Reviews</div>

            <div className="reviewContainer">
                {reviews.map(review=>(
                    <div className="reviews" key={review.id}>
                        <div>{review.Spot.name}</div>
                        <div>{review.createdAt.split('-')[1]} {review.createdAt.split('-')[0]}</div>
                        <div>{review.review}</div>
                        <div className="reviewActions">
                            <button className="updateButton">Update</button>
                            <OpenModalButton
                                buttonText="Update"
                                modalComponent={<ReviewFormModal id={review.id} spot={review.Spot.name} />}
                            />
                            <OpenModalButton
                                buttonText="Delete"
                                modalComponent={<DeleteFormModal id={review.id} type={'Review'} />}
                            />
                        </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default ManageReviews