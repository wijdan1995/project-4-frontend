import apiUrl from '../apiConfig'
import Axios from 'axios';

export const index = () => {
    return Axios({
        method: 'GET',
        url: apiUrl + '/videos'
    })
}

export const show = (videoId) => {
    return Axios({
        method: 'GET',
        url: apiUrl + `/videos/${videoId}`
    })
}

export const create = (user, newVideo) => {
    return Axios({
        method: 'POST',
        url: apiUrl + '/videos',
        headers: {
            'Authorization': `Bearer ${user.token}`
        },
        data: {
            video: newVideo
        }
    })
}

export const update = (user, updateVideo, videoId) => {
    return Axios({
        method: 'PUT',
        url: apiUrl + `/videos/${videoId}`,
        headers: {
            'Authorization': `Bearer ${user.token}`
        },
        data: {
            video: updateVideo
        }
    })
}

export const destroy = (user, videoId) => {
    return Axios({
        method: 'DELETE',
        url: apiUrl + `/videos/${videoId}`,
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
    })
}
