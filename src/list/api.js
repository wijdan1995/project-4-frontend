import apiUrl from '../apiConfig'
import Axios from 'axios';

export const index = (user) => {
    return Axios({
        method: 'GET',
        url: apiUrl + `/mylist`,
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
    })
}

export const create = (user) => {
    return Axios({
        method: 'POST',
        url: apiUrl + `/mylist`,
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
    })
}

export const update = (user, videoId) => {
    console.log(user)
    return Axios({
        method: 'PUT',
        url: apiUrl + `/mylist/${user.lists[0]._id}`,
        headers: {
            'Authorization': `Bearer ${user.token}`
        },
        data: {
            videoId: videoId
        }
    })
}


export const destroy = (user, newArray) => {
    console.log(user)
    return Axios({
        method: 'PATCH',
        url: apiUrl + `/mylist/${user.lists[0]._id}`,
        headers: {
            'Authorization': `Bearer ${user.token}`
        },
        data: {
            newArray: newArray
        }
    })
}



