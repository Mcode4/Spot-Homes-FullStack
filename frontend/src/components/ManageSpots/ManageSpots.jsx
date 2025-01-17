import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import * as spotActions from '../../store/spot'

function ManageSpots(){
    const dispatch = useDispatch()

    const userSpots = useSelector(state => state.spot.currData.Spots)

    useEffect(()=>{
        dispatch(spotActions.loadCurrentSpots())
    }, [dispatch])

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
                    <div className="spots" key={spot.id}>
                        <div className="imgContainer">
                            <img src={spot.previewImage} alt="imghere" />
                        </div>
                        <div className="spotInfo">
                            <div className="info1">
                                <div>{spot.city}, {spot.state}</div>
                                <div>{spot.avgRating}</div>
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
                ))}
            </div>
        </div>
    )
}

export default ManageSpots