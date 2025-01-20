import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import OpenModalButton from '../OpenModalButton'
import DeleteFormModal from "../DeleteFormModals"
import * as spotActions from '../../store/spot'

function ManageSpots(){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(spotActions.loadCurrentSpots())
    }, [dispatch])

    const userSpots = useSelector(state => state.spot.currData)

    if(!userSpots){
        return (
            <h1>Page Loading...</h1>
        )
    }

    userSpots.forEach(spot=>{
        if(spot.avgRating === undefined || spot.avgRating === null){
            spot.avgRating = 0
            spot.displayRating = 'new'
        } else if(spot.avgRating === 0 || spot.avgRating === '0'){
            spot.avgRating = 0
            spot.displayRating = 'new'
        } else {
            const string = `${spot.avgRating}`
            let newValue

            if(string.length > 3 && string.includes('.')){
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
                // console.log('FLAG', string)
                newValue = `${string}.0`
                // console.log(newValue)
                spot.displayRating = newValue
            }
            else spot.displayRating = Number(string)
        }
    })

    return (
        <div id="ManagePage">
            <div>
                <div>Manage Your Spots</div>
                <button>
                    <NavLink to={'/spots/new'}>Create a New Spot</NavLink>
                </button>
            </div>
            <div id="manageContainer">
                {userSpots.map((spot)=> (
                    <div className="spots">
                        <NavLink to={`/spots/${spot.id}`} key={spot.id} className='spotHolder'>
                            <div className="imgContainer">
                                <img src={spot.previewImage} alt="No Image" className="img" />
                            </div>
                            <div className="spotInfo">
                                <div className="info1">
                                    <div className="location">{spot.city}, {spot.state}</div>
                                    <div className="rating">{spot.displayRating}</div>
                                </div>
                                <div className="info2">
                                    <div>${spot.price} a night</div>
                                </div>
                            </div>
                        </NavLink>
                        <div className="spotActions">
                            <button><NavLink to={`/spots/${spot.id}/edit`}>Update</NavLink></button>
                            <OpenModalButton
                                buttonText="Delete"
                                modalComponent={<DeleteFormModal id={spot.id} type={'Spot'} />}
                            />
                        </div>
                    </div>
                
                ))}
            </div>
        </div>
    )
}

export default ManageSpots