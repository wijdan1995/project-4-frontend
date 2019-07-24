import React, { Component } from 'react';
import { index, destroy } from './api'
import { Link } from 'react-router-dom'
import { Card, CardDeck, Container } from 'react-bootstrap'

class VideoIndex extends Component {
    state = {
        videos: [],
        categories: []

    }
    componentDidMount() {
        // const user = this.props.user
        // index(user)
        index()
            .then(res => {
                const allVideos = res.data.videos

                // for the Categories to use with filter later
                let categories = []
                res.data.videos.map((video) => categories.push(video.category))

                // to get unique only

                let uniqueCategories = Array.from(new Set(categories))

                this.setState({
                    videos: allVideos,
                    categories: uniqueCategories
                })
            })
            .catch(error => console.log(error))
    }

    destroy = (videoId) => {
        const user = this.props.user
        destroy(user, videoId)
            .then(() => alert('Deleted'))
            .then(() => {
                const newVideos = this.state.videos.filter((video) => video._id !== videoId)
                this.setState({
                    videos: newVideos
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        let isAdmin;
        if (this.props.user) {
            isAdmin = this.props.user.admin
        } else {


        }

        return (
            <div>
                <br />
                <Container>
                    <CardDeck style={{ justifyContent: 'space-between' }}>
                        {this.state.videos.map((video, index) => (
                            <div key={index} >
                                <Card style={{ width: '20rem' }}>
                                    <Card.Body>
                                        <Card.Title>{video.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted"> {video.category}</Card.Subtitle>
                                        <Card.Text>{video.source}</Card.Text>
                                        <Link to={`/videos/${video._id}`}>Go to the video </Link> {isAdmin ? <React.Fragment>
                                            <Link to={`/videos/${video._id}/update`}> Update</Link>
                                            <Link to="" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.destroy(video._id) }}> Delete</Link>
                                        </React.Fragment> : ''}
                                    </Card.Body>
                                </Card>
                                <br />
                            </div>
                        ))}
                    </CardDeck>
                </Container>
            </div>
        );
    }
}

export default VideoIndex;