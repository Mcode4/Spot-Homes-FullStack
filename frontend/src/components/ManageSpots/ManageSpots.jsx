import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import * as spotActions from '../../store/spot'

function ManageSpots(){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(spotActions.loadCurrentSpots())
    }, [dispatch])

    const userSpots = useSelector(state => state.spot.currData.Spots)

    if(!userSpots){
        return (
            <h1>Page Loading...</h1>
        )
    }

    userSpots.forEach(spot=>{
        if(spot.avgRating === undefined){
            spot.avgRating = 0
            spot.displayRating = 'new'
        } else {
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
                    <NavLink to={`/spots/${spot.id}`} key={spot.id} className='spotHolder'>
                        <div className="spots">
                            <div className="imgContainer">
                                <img src={spot.previewImage} alt="No Image" className="img" />
                            </div>
                            <div className="spotInfo">
                                <div className="info1">
                                    <div className="location">{spot.city}, {spot.state}</div>
                                    <div className="rating">{spot.avgRating}</div>
                                </div>
                                <div className="info2">
                                    <div>${spot.price} a night</div>
                                </div>
                            </div>
                            <div className="spotActions">
                                <button>Update</button>
                                <button>Delete</button>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default ManageSpots