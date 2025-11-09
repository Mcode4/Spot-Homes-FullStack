import { NavLink, useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import OpenModalButton from '../OpenModalButton'
import DeleteFormModal from "../DeleteFormModals"
import * as spotActions from '../../store/spot'
import './ManageSpots.css'

function ManageSpots(){
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const navigate = useNavigate()
    console.log('USERRR', user)

    if(!user){
        navigate('/')
      }

    useEffect(()=>{
        dispatch(spotActions.loadCurrentSpots(user))
    }, [dispatch, user])

    const userSpots = useSelector(state => state.spot.currData)

    if(userSpots && userSpots.length > 0){
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
    }

    return (
        <div id="ManagePage">
            <div>
                <div className="title" style={{marginBottom : '10px', marginLeft: '10px'}}>Manage Your Spots</div>
                <NavLink to={'/spots/new'}>
                    <button className="create-spot-button">Create a New Spot</button>
                </NavLink>
            </div>
            <div className="spots-page">
                {userSpots?.map((spot)=> (
                    <div className="container" key={spot.id}>
                        <div className="imageHolder">
                            <img className="img" src={spot.previewImage} alt="No Image Shown" />
                        </div>
                        <div className="info">
                            <div>{spot.name}</div>
                            {spot.avgRating !== 0 ? 
                                    (<div style={{ marginLeft: 'auto', color: 'yellow', WebkitTextStroke: '.05px black' }}>★</div>
                                    ) : (
                                        <div style={{marginLeft: 'auto'}}></div>
                                    )}
                            <div style={{color: 'yellow', WebkitTextStroke: '.5px black', fontWeight: 'bolder' }}>{spot.displayRating}</div>
                        </div>
                        <div>{`${spot.city}, ${spot.state}`}</div>
                        <div>${spot.price}/day</div>
                        {/* <NavLink to={`/spots/${spot.id}`} className='spotHolder'>
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
                        </NavLink> */}
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