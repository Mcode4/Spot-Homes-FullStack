import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState} from "react"
import OpenModalButton from "../OpenModalButton"
import ReviewFormModal from "../ReviewFormModal"
import DeleteFormModal from "../DeleteFormModals"
import * as spotActions from '../../store/spot'
import './SpotPage.css'

function SpotPage(){
    const [showMenu, setShowMenu] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const { id } = useParams()
    const dispatch = useDispatch()
    const state = useSelector(state=> state)
    const spotData = state.spot.spotData.spotData
    const reviewData = state.spot.spotData.reviewData
    const user = state.session.user
    let mapScript = [0]

    console.log('ID', id)

    useEffect(()=>{
        dispatch(spotActions.loadSpotData(id))
    }, [dispatch, id])

    useEffect(()=> {
        if(spotData && mapScript.length === 1) {
            for(let i = 1; i < spotData.length; i++) {
                mapScript.push(i)
            }
            setCurrentIndex(0);
        }

    }, [mapScript, spotData])
    useEffect(()=> {
        if(spotData) {
            const left = document.getElementById('left-arrow')
            const right = document.getElementById('right-arrow')

            console.log('CURRENT INDEX:', currentIndex, 'SPOTDATA LENGTH', spotData.length)
            
            if(currentIndex === spotData.SpotImages.length - 1 && currentIndex === 0) {
                right.disabled = true;
                left.disabled = true;
            }
            else if(currentIndex === spotData.SpotImages.length - 1) {
                right.disabled = true;
            }
            else if(currentIndex === 0) {
                left.disabled = true;
            }
            else if(currentIndex > spotData.SpotImages.length - 1 || currentIndex < 0) {
                setCurrentIndex(0);
                console.error('Image not available Image was reset back to first image.')
            } else {
                right.disabled = false;
                left.disabled = false;
            }
        }
    }, [spotData, currentIndex])

    
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

    function scrollImage(action) {
        if(action === 'increase' && currentIndex < (spotData.SpotImages.length - 1)) {
            setCurrentIndex(i => i + 1);
        } else if(action === 'decrease' && currentIndex > 0) {
            setCurrentIndex(i => i - 1);
        }
    }

    console.log('IMAGES', spotData.SpotImages)

    return(
        <div>
            <div id="page">
                <header>
                    <div className="hText">{spotData.name}</div>
                    <div className="nText">{`${spotData.city}, ${spotData.state}, ${spotData.country}`}</div>
                </header>
                <section id="img-section">
                    <div id="img-display">
                        <button id="left-arrow" className="arrow" onClick={()=> scrollImage('decrease')}>{`<`}</button>
                        <img id="spot-img" src={spotData.SpotImages[currentIndex]?.url} alt="" />
                        <button id="right-arrow" className="arrow" onClick={()=> scrollImage('increase')}>{`>`}</button>
                    </div>
                    <div>
                        {mapScript.map((index, i) => (
                            <div key={i} style={{fontSize: '50px', color : index === currentIndex ? 'black' : 'lightgray'}} className={`current-image${index}`}>
                                •
                            </div>
                        ))}
                    </div>
                </section>

                <section id="s2">
                    <div>
                        <div className="hText">Listed by {`${spotData.Owner.firstName} ${spotData.Owner.lastName}`}</div>
                        <div className="nText">{spotData.description}</div>
                    </div>

                    <div className="popupDisplay">
                        <div className="popupInfo">
                            <div id="price" className="shText">${spotData.price} a day</div>
                            <div id="rating" style={{marginLeft: 'auto'}} className="shText">★{spotData.displayRating}</div>
                        </div>
                        <button id="reserve">Reserve</button>
                    </div>
                </section>
            
                <section id="s3">
                    <div id="s3-heading">
                        <div className="hText" id="rating2">{reviewStatement}</div>
                        {user && <div className={modalClassName} style={{marginLeft: 'auto'}}>
                            <OpenModalButton
                                buttonText="Post Your Review"
                                onButtonClick={closeMenu}
                                modalComponent={<ReviewFormModal id={id} />}
                            />
                        </div>}
                    </div>
                    <div>
                        {reviewData.Reviews && reviewData.Reviews.map((review)=> (
                            <div id="review" key={review.id}>
                                <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                                    <div id="rName" className="snText">{review.User.firstName}</div>
                                    <div id="rDate" className="sText">{review.createdAt.split('-')[1]} {review.createdAt.split('-')[0]}</div>
                                </div>
                                <div id="rComment" className="nText">rComment- {review.review}</div>
                                {verify(review.User) && (
                                    <div className="reviewActions" style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
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
        </div>
    )
}

export default SpotPage