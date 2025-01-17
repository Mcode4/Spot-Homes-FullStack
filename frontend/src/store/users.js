import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'spot/loadReviews'
const EDIT_REVIEW = 'spot/editReview'
const CREATE_REVIEW = 'spot/newReview'
const REMOVE_REVIEW = 'spot/removeReview'

loadReviewsAction = (payload) =>{
    return {
        type: LOAD_REVIEWS,
        payload
    }
}
editReviewAction = (payload) =>{
    return {
        type: EDIT_REVIEW,
        payload
    }
}
createReviewAction = (payload) =>{
    return {
        type: CREATE_REVIEW,
        payload
    }
}
removeReviewAction = (payload) =>{
    return {
        type: REMOVE_REVIEW,
        payload
    }
}

const loadReviews = () => async(dispatch)=>{
    const res = csrfFetch('')
}

const initialState = {id: []}
const userReducer = (state= initialState, action) =>{
    switch(action.type){
        case LOAD_REVIEWS:
            return
        case EDIT_REVIEW:
            return
        case CREATE_REVIEW:
            return
        case REMOVE_REVIEW:
            return
        default:
            return state
    }
}