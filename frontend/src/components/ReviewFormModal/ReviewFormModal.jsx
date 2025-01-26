import { useEffect, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { useModal } from "../../context/Modal"
import * as reviewActions from '../../store/review';
import * as spotActions from '../../store/spot';
import './ReviewFormModal.css'

function ReviewFormModal({ id, spot }){
    console.log(`ID: ${id}, SPOT: ${spot}`)
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    let errors = {}
    const {closeModal} = useModal()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(reviewActions.loadReviews())
    }, [dispatch])
    const reviewData = useSelector(state=> state.review.reviews[id-1])
    // console.log('reviewData', reviewData)

    useEffect(()=>{
        if(reviewData && spot){
            setReview(`${reviewData.review}`)
            setStars(reviewData.stars)
        }
    }, [spot, reviewData])

    useEffect(()=>{
        let displayStars = stars
        if(stars !== 0){
            console.log('STARS', stars)
            console.log('DISPLAYSTARS', displayStars)
            for(let i=1; i<=displayStars; i++){
                const element = document.getElementById(`starButton${i}`)
                element.style.color = 'yellow'
            }
            if(stars !== 5){
                for(let i=displayStars+1; i<=5; i++){
                    const element = document.getElementById(`starButton${i}`)
                    element.style.color = 'black'
                }
            }
        }
    },[stars])

    if(spot && !reviewData){
        return (
            <h1>Review Loading...</h1>
        )
    }
    

    const handleSubmit = (e)=>{
        e.preventDefault()
        errors = {}
        if(stars <= 0){
            errors.stars = 'Must include a rating'
        }
        if(review === ''){
            errors.review = 'Must include a description'
        }
        // console.log('ERRORS', errors)
        // console.log('REVIEW', {review, stars})
        // Object.keys(errors).length > 0
        // console.log('ERRORKEYYSS:', Object.values(errors))
        if(Object.keys(errors).length > 0) return

        if(!spot){
            return dispatch(reviewActions.postReview({
                id,
                review,
                stars
            })).then(dispatch(spotActions.loadSpotData(id))).then(closeModal)
        } else{
            return dispatch(reviewActions.editReview({
                id,
                review,
                stars
            })).then(dispatch(spotActions.loadSpotData(spot.id))).then(closeModal)
        }
        
            
    }
    return (
        <div className="modal">
            {!spot && <h1>How was your stay?</h1>}
            {spot && <h1>How was your stay at {spot.name}?</h1>}
            <form id="reviewForm" onSubmit={handleSubmit}>
                <textarea id="review" onChange={(e)=> setReview(e.target.value)} value={review}></textarea>
                <div id="stars">
                    <div id="starButton1" onClick={()=>setStars(1)}>★</div>
                    <div id="starButton2" onClick={()=>setStars(2)}>★</div>
                    <div id="starButton3" onClick={()=>setStars(3)}>★</div>
                    <div id="starButton4" onClick={()=>setStars(4)}>★</div>
                    <div id="starButton5" onClick={()=>setStars(5)}>★</div>
                    Stars
                </div>
                {errors.review && (
                    <p>{errors.review}</p>
                )}
                {errors.stars && (
                    <p>{errors.stars}</p>
                )}
                <button type="submit">Submit Your Review</button>
            </form>
        </div>
    )
    
}

export default ReviewFormModal