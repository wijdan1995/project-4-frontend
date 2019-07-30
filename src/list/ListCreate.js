import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import { update } from './api'


class ListCreate extends Component {
    // state = {
    // list: {
    //     videoId: '',
    //     videoTitle: ''
    // }
    // }

    addToList = () => {
        // const newList = this.props.video
        const user = this.props.user
        update(user, this.props.videoId)

            .then(() => alert('Added to your list'))
            .catch((error) => console.log(error))
    }
    render() {
        return (
            <Button variant="dark" onClick={this.addToList}>Add to list</Button>
        );
    }
}

export default ListCreate;
