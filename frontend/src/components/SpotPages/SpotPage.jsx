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
    const spotData = state.spotData.spotData
    const reviewData = state.spotData.reviewData

    if(!spotData || !reviewData){
        return(
            <h1>Page Loading...</h1>
        )
    }

    if(!spotData.displayRating){
        if(spotData.avgStarRating === undefined){
            spotData.avgStarRating = 0
            spotData.displayRating = 'new'
        } else {
            const string = `${spotData.avgStarRating}`
            let newValue

            if(string.length > 3){
                const split = string.split('.')
                let newString = split[1]
                let num1 = Number(newString[0])
                let num2 = Number(newString[1])
                
                if(num2 >= 5) num1 += 1

                newValue = `${split[0]}.${num1}` 
                newValue = Number(newValue)
                
                spotData.displayRating = newValue
            } 
            else if(!string.includes('.')){
                console.log('FLAG', string)
                newValue = `${string}.0`
                console.log(newValue)
                spotData.displayRating = newValue
            }
            else spotData.displayRating = Number(string)
        }
    }

    

    console.log('SPOTDATA', spotData)
    console.log('REVIEWDATA', reviewData.Reviews)

    let reviewStatement = '1 Review'
    if(reviewData.Reviews.length > 1){
        reviewStatement = `${reviewData.Reviews.length} Reviews`
    }

    let previewImage
    let spotImages = []
    spotData.SpotImages.forEach((image)=>{
        if(image.preview = true){
            previewImage = image
        } else {
            spotImages.push(image)
        }
    })

    console.log(`PrevImage: ${previewImage}`)
    console.log(`Images: ${spotImages}`)

    return(
        <div id="page">
            <header>
                <div className="hText">{spotData.name}</div>
                <div className="nText">{`${spotData.city}, ${spotData.state}, ${spotData.country}`}</div>
            </header>
            <section id="s1">
                <div id="mPic">
                    <img src={previewImage.url} alt="bigImg" className="bigImg" />
                </div>
                <div id="oPic">
                    {spotImages.map((image)=> (
                        <img src={image.url} alt="smallImg" className="smallImg" />
                    ))}
                </div>
            </section>

            <section id="s2">
                <div>
                    <div className="hText">Hosted by {`${spotData.Owner.firstName} ${spotData.Owner.lastName}`}</div>
                    <div className="nText">{spotData.description}</div>
                </div>

                <div className="popupDisplay">
                    <div className="popupInfo">
                        <div id="price" className="hText">${spotData.price} a night</div>
                        <div id="rating" className="shText">★{spotData.displayRating}</div>
                    </div>
                    <button id="reserve">Reserve</button>
                </div>
            </section>
        
            <section id="s3">
                <div>
                    <div className="hText">★{spotData.displayRating}</div>
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