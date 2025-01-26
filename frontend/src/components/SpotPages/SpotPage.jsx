import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState} from "react"
import OpenModalButton from "../OpenModalButton"
import ReviewFormModal from "../ReviewFormModal"
import DeleteFormModal from "../DeleteFormModals"
import * as spotActions from '../../store/spot'
import './SpotPage.css'

function SpotPage(){
    const [showMenu, setShowMenu] = useState(false)
    const { id }= useParams()
    const dispatch = useDispatch()
    const state = useSelector(state=> state)
    const spotData = state.spot.spotData.spotData
    const reviewData = state.spot.spotData.reviewData
    const user = state.session.user

    useEffect(()=>{
        dispatch(spotActions.loadSpotData(id))
    }, [dispatch, id])

    
    // console.log(user)

    if(!spotData){
        return(
            <h1>Page Loading...</h1>
        )
    }

    if(spotData.avgStarRating === undefined || spotData.avgStarRating === null || spotData.avgStarRating === 'null'){
        spotData.avgStarRating = 0
        spotData.displayRating = 'new'
    } else if(spotData.avgStarRating === 0 || spotData.avgStarRating === '0'){
        spotData.displayRating = 'new'
    }
    else {
        const string = `${spotData.avgStarRating}`
        let newValue

        if(string.length > 3 && string.includes('.')){
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
            // console.log('FLAG', string)
            newValue = `${string}.0`
            // console.log(newValue)
            spotData.displayRating = newValue
        }
        else spotData.displayRating = spotData.avgRating

        console.log('RATING', spotData.avgRating)
        console.log('DISPLAY RATING', spotData.displayRating)
    }

    let verify = (reviewUser)=>{
        reviewUser = false
        return reviewUser
    }
    if(user){
        verify = (reviewUser)=>{
            console.log('VERIFY', reviewUser.id,user.id)
            return reviewUser.id === user.id
        }
    }

    

    console.log('SPOTDATA', spotData)
    // console.log('REVIEWDATA', reviewData.Reviews)

    let reviewStatement = '1 Review'
    if(!reviewData.Reviews){
        reviewStatement = ''
    }else if(reviewData.Reviews.length > 1){
    reviewStatement =   `${reviewData.Reviews.length} Reviews`
    } 

    // console.log(`PrevImage: ${previewImage}`)


    const modalClassName = (showMenu ? 'visible' : 'hiddeny')
    // console.log('MODALCLASS', modalClassName)

    const closeMenu = ()=>{
        setShowMenu(false)
    }

    return(
        <div id="page">
            <header>
                <div className="hText">{spotData.name}</div>
                <div className="nText">{`${spotData.city}, ${spotData.state}, ${spotData.country}`}</div>
            </header>
            <section id="s1">
                <div id="mPic">
                    <img src={spotData.SpotImages[0].url} alt="bigImg" className="bigImg" />
                </div>
                <div id="oPic">
                {spotData.SpotImages.map((image, i) => {
                    if (i !== 0) {
                    return <img src={image.url} alt="smallImg" className="smallImg" key={image.id} />;
                    }
                    return null; // This ensures the first image is not rendered
                })}
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
                    <div className="hText" id="rating2">★{spotData.displayRating} {reviewStatement}</div>
                </div>
                <div>
                    {user && <div className={modalClassName}>
                        <OpenModalButton
                            buttonText="Post Your Review"
                            onButtonClick={closeMenu}
                            modalComponent={<ReviewFormModal id={id} />}
                        />
                    </div>}
                    {reviewData.Reviews && reviewData.Reviews.map((review)=> (
                        <div id="review" key={review.id}>
                            <div id="rName" className="shText">rName- {review.User.firstName}</div>
                            <div id="rDate" className="nText">rData- {review.createdAt.split('-')[1]} {review.createdAt.split('-')[0]}</div>
                            <div id="rComment" className="nText">rComment- {review.review}</div>
                            {verify(review.User) && (
                                <div className="reviewActions">
                                    <OpenModalButton
                                        buttonText="Update"
                                        modalComponent={<ReviewFormModal id={review.id} spot={spotData} />}
                                    />
                                    <OpenModalButton
                                        buttonText="Delete"
                                        modalComponent={<DeleteFormModal id={review.id} type={'Review'} page={['Spot', id]} />}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                    {!reviewData.Reviews && (
                        <div>Be the first to post a review!</div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default SpotPage