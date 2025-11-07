import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import OpenModalButton from "../OpenModalButton"
import ReviewFormModal from "../ReviewFormModal"
import DeleteFormModal from "../DeleteFormModals"
import * as reviewActions from '../../store/review'
import './ManageReviews.css'

function ManageReviews(){
    const dispatch = useDispatch()
    const reviews = useSelector(state=> state.review.reviews)
    // console.log('REVIEWS', reviews)
    const navigate = useNavigate()
    const sessionUser = useSelector(state => state.session.user);
    if(!sessionUser){
        navigate('/')
    }

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
            <div className="title" style={{marginBottom : '10px', marginLeft: '10px'}}>Manage Reviews</div>

            <div className="spots-page">
                {reviews.map(review=>(
                    <div className="container" key={review.id}>
                        <div className="imageHolder">
                            <img className="img" src={review.Spot.previewImage[0]?.url} alt="No Image Shown" />
                        </div>
                        <div className='info' style={{display: 'flex', gap: '5px'}}>
                            <div>{review.Spot.name}</div>
                            <div>{review.createdAt.split('-')[1]} {review.createdAt.split('-')[0]}</div>
                            <div style={{ marginLeft: 'auto', color: 'yellow', WebkitTextStroke: '.05px black' }}>★</div>
                            <div style={{color: 'yellow', WebkitTextStroke: '.5px black', fontWeight: 'bolder' }}>{review.stars}</div>
                        </div>
                        <div>" {review.review} "</div>
                        <div className="reviewActions">
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