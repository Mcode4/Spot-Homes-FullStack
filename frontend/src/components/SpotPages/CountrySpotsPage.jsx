import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import * as spotActions from "../../store/spot";
import './SpotsPage.css'

function CountrySpotsPage(){
    const [countrySpots, setCountrySpots] = useState(false);
    const dispatch = useDispatch();
    const spotData = useSelector(state => state.spot.spots);
    const sessionUser = useSelector(state => state.session.user);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(()=>{
        dispatch(spotActions.loadSpots())
        console.log('dispatch ran')
        // console.log('SPOTDATA', spotData)

    }, [dispatch])

    useEffect(()=> {
        setCountrySpots(null);
        if(spotData) {
            let spots
            if(params['*'] === 'us') {
                spots = spotData.filter(spot => spot.country === 'US');
                setCountrySpots(spots);
            } else if(params['*'] === 'canada') {
                spots = spotData.filter(spot => spot.country === 'Canada');
                setCountrySpots(spots);
            } else if(params['*'] === 'eu') {
                spots = spotData.filter(spot => spot.country === 'EU');
                setCountrySpots(spots);
            } else if(params['*'] === 'asia') {
                spots = spotData.filter(spot => spot.country === 'Asia');
                setCountrySpots(spots);
            } else if(params['*'] === 'other') {
                spots = []
                spotData.forEach(spot => {
                    if(
                        spot.country !== 'US' &&
                        spot.country !== 'Canada' &&
                        spot.country !== 'EU' &&
                        spot.country !== 'Asia'
                    ){
                        spots.push(spot);
                    }
                })
            }

            if(spots.length) {
                spots.forEach(spot=>{
                    if(spot.avgRating === undefined || spot.avgRating === null){
                        spot.avgRating = 0
                        spot.displayRating = 'new'
                    } else if(spot.avgRating === 0 || spot.avgRating === '0'){
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
                        else spot.displayRating = spot.avgRating

                        console.log('RATINGS', spot.avgRating)
                        console.log('DISPLAY RATINGS', spot.displayRating)
                    }
                    
                })
                setCountrySpots(spots);
            }
        }
    }, [params])




    console.log('SPOTDATA', spotData)
    console.log('COUNTRYSPOTS', countrySpots)

    

    function countryNav(value) {
        return navigate(`/country/${value}`)
    }

    return(
        <>
        <div id="country">
            <button onClick={()=> countryNav('us')}>United States</button>
            <button onClick={()=> countryNav('canada')}>Canada</button>
            <button onClick={()=> countryNav('eu')}>Europe</button>
            <button onClick={()=> countryNav('asia')}>Asia</button>
            <button onClick={()=> countryNav('other')}>Other</button>
        </div>
        {sessionUser && (<li>
            <NavLink to={'/spots/new'}>
                <button className="create-spot-button">Create a New Spot</button>
            </NavLink>
        </li>)}
        <div id="holder" className="spots-page">
            
           {countrySpots && countrySpots.map((spot)=> (
                <NavLink to={`/spots/${spot.id}`} key={spot.id}>
                    <div className="container">
                            <div className="imageHolder">
                                <img className="img" src={spot.previewImage?.url} alt="No Image Shown" />
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
                    </div>
                </NavLink>
            ))}
        </div>
        </>
    )
}

export default CountrySpotsPage