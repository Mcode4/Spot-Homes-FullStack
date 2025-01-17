import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import * as spotActions from '../../store/spot'
import './SpotPage.css'

function SpotPage(){
    const { id }= useParams()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(spotActions.loadSpotData(id))
    }, [dispatch, id])

    const state = useSelector(state=> state.spot)

    const spot = state.spots.Spots[id-1]
    const spotData = state.spotData.spotData
    const reviewData = state.spotData.reviewData

    if(!spot.displayRating){
        const string = `${spot.avgRating}`
        let newValue

        if(string.length > 3){
            const split = string.split('.')
            let newString = split[1]
            let num1 = Number(newString[0])
            let num2 = Number(newString[1])
            
            if(num2 >= 5) num1 += 1

            newValue = `${split[0]}.${num1}` 
            newValue = Number(newValue)
            
            spot.displayRating = newValue
        } 
        else if(!string.includes('.')){
            console.log('FLAG', string)
            newValue = `${string}.0`
            console.log(newValue)
            spot.displayRating = newValue
        }
        else spot.displayRating = Number(string)
    }

    if(!spotData || !reviewData){
        return(
            <h1>Page Loading...</h1>
        )
    }

    // console.log('SPOTDATA', spotData)
    console.log('REVIEWDATA', reviewData.Reviews)

    let reviewStatement = '1 Review'
    if(reviewData.Reviews.length > 1){
        reviewStatement = `${reviewData.Reviews.length} Reviews`
    }

    return(
        <div id="page">
            <header>
                <div className="hText">{spot.name}</div>
                <div className="nText">{`${spot.city}, ${spot.state}, ${spot.country}`}</div>
            </header>
            <section id="s1">
                <div id="mPic">
                    <img src={spot.previewImage.url} alt="bigImg" className="bigImg" />
                </div>
                <div id="oPic">
                    <img src="" alt="smallImg" className="smallImg" />
                    <img src="" alt="smallImg" className="smallImg" />
                    <img src="" alt="smallImg" className="smallImg" />
                    <button>View All</button>
                </div>
            </section>

            <section id="s2">
                <div>
                    <div className="hText">Hosted by {`${spotData.Owner.firstName} ${spotData.Owner.lastName}`}</div>
                    <div className="nText">{spot.description}</div>
                </div>

                <div className="popupDisplay">
                    <div className="popupInfo">
                        <div id="price" className="hText">${spot.price} a night</div>
                        <div id="rating" className="shText">★{spot.displayRating}</div>
                    </div>
                    <button id="reserve">Reserve</button>
                </div>
            </section>
        
            <section id="s3">
                <div>
                    <div className="hText">★{spot.displayRating}</div>
                    <div className="hText">{reviewStatement}</div>
                </div>
                <div>
                    {reviewData.Reviews.map((review)=> (
                        <div id="review" key={review.id}>
                            <div id="rName" className="shText">rName- {review.User.firstName}</div>
                            <div id="rDate" className="nText">rData- {review.createdAt.split('-')[1]} {review.createdAt.split('-')[0]}</div>
                            <div id="rComment" className="nText">rComment- {review.review}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default SpotPage