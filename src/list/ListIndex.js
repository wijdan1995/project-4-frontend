import React, { Component } from 'react';
import { index, destroy } from './api'
import { Link } from 'react-router-dom'
import { Card, CardDeck, Container } from 'react-bootstrap'

class ListIndex extends Component {
    state = {
        lists: []
    }

    componentDidMount() {
        const user = this.props.user
        index(user)
            .then(res => {
                const lists = res.data.lists
                console.log(res.data.lists[0].videos)
                this.setState({
                    lists: lists
                })
            })
            .catch(error => console.log(error))
    }
    destroy = (videoId) => {
        const user = this.props.user
        const newArray = this.state.lists[0].videos
        // to delete the video by find its id
        newArray.splice(newArray.findIndex((video) => {
            return video._id === videoId;
        }), 1);
        // send the new array to the req
        destroy(user, newArray)
            .then(() => alert('Deleted'))

            .catch(error => console.log(error))
    }

    render() {
        console.log('lists index', this.state.lists)
        return (
            <React.Fragment>
                <br />
                <h2>My List</h2>
                <br />
                <Container>
                    <CardDeck className='card-deck'>
                        {this.state.lists.map((list, index) => (
                            <React.Fragment key={index}>
                                {list.videos.map((video, index) =>
                                    <div key={index}>
                                        <Card className="cards">
                                            <Card.Body>
                                                <Card.Title>{video.title}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted"> {video.category}</Card.Subtitle>
                                                <Card.Text>{video._idsource}</Card.Text>
                                                <Link to={`/videos/${video._id}`}>Go to the video </Link>
                                                <Link to='/mylist/' onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.destroy(video._id) }}> Delete</Link>
                                            </Card.Body>
                                        </Card>
                                        <br />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </CardDeck>
                </Container>
            </React.Fragment>
            // <h1>{this.state.lists.map(list => <span>{list._id}</span>)}</h1>
        );
    }
}

export default ListIndex;
