import { useEffect, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { useModal } from "../../context/Modal"
import * as reviewActions from '../../store/review';

function ReviewFormModal({ id, spot }){
    // const [errors, setErrors] = useState({})
    const {closeModal} = useModal()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(reviewActions.loadReviews())
    }, [dispatch])

    const handleSubmit = (e)=>{
        e.preventDefault()
        return dispatch(reviewActions.postReview({
            id,
            review,
            stars
        })).then(closeModal)
            // .catch(async (res)=>{
            //     const data = await res.json()
            //     if(data && data.errors){
            //         setErrors(data.errors)
            //     }
            // })
    }
    if(!spot){
        const [review, setReview] = useState('')
        const [stars, setStars] = useState(0)

        return (
            <div className="modal">
                <h1>How was your stay?</h1>
                <form id="reviewForm" onSubmit={handleSubmit}>
                    <textarea id="review" onChange={(e)=> setReview(e.target.value)} value={review}></textarea>
                    <div id="stars">
                        <div className="starButton" onClick={()=>setStars(1)}>★</div>
                        <div className="starButton" onClick={()=>setStars(2)}>★</div>
                        <div className="starButton" onClick={()=>setStars(3)}>★</div>
                        <div className="starButton" onClick={()=>setStars(4)}>★</div>
                        <div className="starButton" onClick={()=>setStars(5)}>★</div>
                        Stars
                    </div>
                    {/* {Object.keys(errors).length > 0 && (
                        <p>{errors.credential}</p>
                    )} */}
                    <button type="submit">Submit Your Review</button>
                </form>
            </div>
        )
    } else {
        const spotInfo = useSelector(state=> state.review.reviews.Reviews[id-1])
        console.log('SPOTINFO', spotInfo)

        if(!spotInfo){
            return (
                <h1>Review Loading...</h1>
            )
        }
        const [review, setReview] = useState(`${spotInfo.review}`)
        const [stars, setStars] = useState(spotInfo.stars)

        return (
            <div className="modal">
                <h1>How was your stay at {spot}?</h1>
                <form id="reviewForm" onSubmit={handleSubmit}>
                    <textarea id="review" onChange={(e)=> setReview(e.target.value)} value={review}></textarea>
                    <div id="stars">
                        <div className="starButton1" onClick={()=>setStars(1)}>★</div>
                        <div className="starButton2" onClick={()=>setStars(2)}>★</div>
                        <div className="starButton3" onClick={()=>setStars(3)}>★</div>
                        <div className="starButton4" onClick={()=>setStars(4)}>★</div>
                        <div className="starButton5" onClick={()=>setStars(5)}>★</div>
                        Stars
                    </div>
                    {/* {Object.keys(errors).length > 0 && (
                        <p>{errors.credential}</p>
                    )} */}
                    <button type="submit">Submit Your Review</button>
                </form>
            </div>
        )
    }
    
}

export default ReviewFormModal