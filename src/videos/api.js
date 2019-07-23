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

