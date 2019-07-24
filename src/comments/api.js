import apiUrl from '../apiConfig'
import Axios from 'axios';

export const show = (videoId) => {
    return Axios({
        method: 'GET',
        url: apiUrl + `/videos/${videoId}/comments`
    })
}

export const create = (user, newComment, videoId) => {
    return Axios({
        method: 'POST',
        url: apiUrl + `/videos/${videoId}/comments`,
        headers: {
            'Authorization': `Bearer ${user.token}`
        },
        data: {
            comment: newComment
        }
    })
}