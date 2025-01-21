import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'review/loadReviews'
const EDIT_REVIEW = 'review/editReview'
const CREATE_REVIEW = 'review/newReview'
const REMOVE_REVIEW = 'review/removeReview'

const loadReviewsAction = (payload) =>{
    return {
        type: LOAD_REVIEWS,
        payload
    }
}
const editReviewAction = (payload) =>{
    return {
        type: EDIT_REVIEW,
        payload
    }
}
const createReviewAction = (payload) =>{
    return {
        type: CREATE_REVIEW,
        payload
    }
}
const removeReviewAction = (payload) =>{
    return {
        type: REMOVE_REVIEW,
        payload
    }
}

export const loadReviews = () => async(dispatch)=>{
    const res = await csrfFetch('/api/reviews/current')
    const data = await res.json()
    dispatch(loadReviewsAction(data))
    return res
}

export const postReview = (data) => async (dispatch)=>{
    const {id, review, stars} = data
    const res = await csrfFetch(`/api/spots/${id}/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            review,
            stars
        })
    })
    const reviewData = await res.json()

    dispatch(createReviewAction(reviewData))
    return res
}
export const editReview = (data) => async (dispatch)=>{
    const {id, review, stars} = data
    const res = await csrfFetch(`/api/reviews/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            review,
            stars
        })
    })
    const reviewData = await res.json()

    dispatch(editReviewAction(reviewData))
    return res
}

export const deleteReview = (id)=> async(dispatch)=>{
    const res = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE'
    })
    const data = res.json()

    dispatch(removeReviewAction(data))
    return res
}



const initialState = {reviews: []}
const reviewReducer = (state= initialState, action) =>{
    switch(action.type){
        case LOAD_REVIEWS:
            return {...state, reviews: action.payload}
        case EDIT_REVIEW:
            return {...state, reviews: state.reviews.map(review=>
                review.id === action.payload.id ? {...review, ...action.payload} : review
            )}
        case CREATE_REVIEW:
            return {...state, reviews: [...state.reviews, action.payload]}
        case REMOVE_REVIEW:
            return {...state, reviews: state.reviews.filter(review=>
                review.id !== action.payload.id
            )}
        default:
            return state
    }
}

export default reviewReducer