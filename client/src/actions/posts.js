import * as api from '../api';

export const getPosts = () => async (dispactch) => {
    
    try {
        const { data } = await api.fetchPost()
        dispactch({type: 'FETCH_ALL', payload: data })
    } catch (error) {
        console.log(error.message)
    }
    
}

export const createPost = (post) => async(dispatch) =>{
    try {
        const{data } = await api.createPost(post)
        dispatch({type: 'CREATE', payload: data })
    } catch (error) {
        console.log(error)       
    }
}