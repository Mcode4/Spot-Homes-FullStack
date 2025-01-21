import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'spot/loadSpots'
const LOAD_SPOTDATA = 'spot/loadSpotData'
const LOAD_CURRDATA = 'spot/loadCurrData'
const EDIT_SPOT = 'spot/editSpot'
const CREATE_SPOT = 'spot/newSpot'
const REMOVE_SPOT = 'spot/removeSpot'

//Action Creators
const loadSpotsAction = (action)=>{
    return{
        type: LOAD_SPOTS,
        payload: action
    }
}
const loadSpotDataAction = (action)=>{
    return{
        type: LOAD_SPOTDATA,
        payload: action
    }
}
const loadCurrDataAction = (action)=>{
    return {
        type: LOAD_CURRDATA,
        payload: action
    }
}

const editSpotAction = (action)=>{
    return{
        type: EDIT_SPOT,
        payload: action
    }
}
const createSpotAction = (action)=>{
    return{
        type: CREATE_SPOT,
        payload: action
    }
}
const removeSpotAction = (action)=>{
    return{
        type: REMOVE_SPOT,
        payload: action
    }
}

//Thunk Creators
export const loadSpots = () => async (dispatch)=>{
    const res = await fetch(`/api/spots`)
    const data = await res.json()
    // console.log('DATA', data)
    dispatch(loadSpotsAction(data.Spots))
    return res
}

export const loadSpotData = (spotId) => async (dispatch) =>{
    const res = await fetch(`/api/spots/${spotId}`)
    const spotData = await res.json()

    const res2 = await fetch(`/api/spots/${spotId}/reviews`)
    const reviewData = await res2.json()

    const resObj = {
        spotData,
        reviewData
    }
    // console.log('SPOTDATTAAA', spotData)
    // console.log('REVIEWDATTAAA', reviewData)
    dispatch(loadSpotDataAction(resObj))
    return res && res2
}

export const loadCurrentSpots = () => async(dispatch)=>{
    const res = await fetch('/api/spots/current')
    const data = await res.json()
    // console.log('DATA', data)
    dispatch(loadCurrDataAction(data.Spots))
    return res
}

export const createSpot = (data) => async(dispatch)=>{
    const {address, city, state, country, lat, lng, name, description, price, previewImage,
        images} = data
    const body = {address, city, state, country, lat, lng, name, description, price}
    console.log('BODY', body)

    const res = await csrfFetch('/api/spots', {
        method: "POST",
        body: JSON.stringify(body)
    })
    const confirm = await res.json()
    const {id} = confirm

    const res2 = await csrfFetch(`/api/spots/${id}/images`, {
        method: 'POST',
        body: JSON.stringify({
            preview: true,
            url: previewImage
        })
    })
    // const confirm2 = await res2.json()

    images.forEach(async(image) => {
        await csrfFetch(`/api/spots/${id}/images`, {
            method: 'POST',
            body: JSON.stringify({
                preview: false,
                url: image
            })
        })
        // const confirm3 = await res3.json()
        // console.log('RES3', confirm3)
    });

    dispatch(createSpotAction(confirm))
    
    // console.log('RES', confirm)
    // console.log('ID', id)
    // console.log('RES2', confirm2)
    return res && res2
}
export const editSpot = (data)=> async (dispatch)=>{
    const {id}= data
    const res = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
    const resData = await res.json()
    console.log('DATTAA', resData)

    dispatch(editSpotAction(data))
    return res
}
export const deleteSpot = (id)=> async(dispatch)=>{
    const res = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE'
    })
    const data = res.json()

    dispatch(removeSpotAction(data))
    return res
}


//Reducer
const initialState = {spots: [], spotData: [], currData: [] }
// const initialState = {spots: null, details: {reviews: [], images:[]}}

const spotReducer = (state = initialState, action) =>{
    switch(action.type){
        case LOAD_SPOTS:
            return {...state, spots: action.payload}
        case LOAD_SPOTDATA:
            return {...state, spotData: action.payload}
        case LOAD_CURRDATA:
            return {...state, currData: action.payload}
        case EDIT_SPOT:
            return {...state, spots: state.spots.map((spot)=>
                    spot.id === action.payload.id ? {...spot, ...action.payload} : spot
                    )}
        case CREATE_SPOT:
            return {...state, spots: [...state.spots, action.payload]}
        case REMOVE_SPOT:
            return {...state, spots: state.spots.filter((spot)=> spot.id !== action.payload.id)}
        default:
            return state
    }
}

export default spotReducer