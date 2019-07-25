import apiUrl from '../apiConfig'
import Axios from 'axios';

export const show = (videoId) => {
    return Axios({
        method: 'GET',
        url: apiUrl + `/videos/${videoId}/comments`
    })
}

export const create = (user, newComment) => {
    return Axios({
        method: 'POST',
        url: apiUrl + `/comments`,
        headers: {
            'Authorization': `Bearer ${user.token}`
        },
        data: {
            comment: newComment
        }
    })
}

export const destroy = (user, commentId) => {
    return Axios({
        method: 'DELETE',
        url: apiUrl + `/comments/${commentId}`,
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
    })
}