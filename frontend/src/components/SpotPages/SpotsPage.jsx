import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as spotActions from "../../store/spot";
import './SpotsPage.css'

function SpotsPage(){
    const dispatch = useDispatch()

    const spotData = useSelector(state => state.spot.spots.Spots)
    // console.log('SPOTDATA', spotData)

    spotData.forEach(spot=>{
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
        
        
    })



    useEffect(()=>{
        // console.log('dispatch ran')
        // console.log('SPOTDATA', spotData)
    }, [dispatch])

    return(
        <div id="holder">
           {spotData.map((spot)=> (
                <NavLink to={`spots/${spot.id}`}>
                    <button className="container" key={spot.id}>
                            <div className="imageHolder">
                                <img className="img" src={spot.previewImage.url} alt="No Image Shown" />
                            </div>
                            <div className="infoHolder">
                                <div className="location">{`${spot.city}, ${spot.state}`}</div>
                                <div className="rating"><img src="star" alt="" />{spot.displayRating}</div>
                            </div>
                            <div className="price">{`$${spot.price} night`}</div>
                    </button>
                </NavLink>
            ))}
        </div>
    )
}

export default SpotsPage