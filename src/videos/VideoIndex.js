import React, { Component } from 'react';
import { index, destroy } from './api'
import { Link } from 'react-router-dom'
import { Card, CardDeck } from 'react-bootstrap'

// const authenticatedOptions = (
//    c
//         <button onClick={() => this.destroy(video._id)}>Delete</button>
//         <Link to={`/videos/${video._id}/edit`}><button>Edit</button></Link>
//     </React.Fragment>
// )
// const alwaysOptions = (
//     <React.Fragment>
//         <Link to={`/videos/${video._id}`}><h1>{video.title}</h1></Link>
//     </React.Fragment>
// )

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

    // destroy = (videoId) => {
    //     const user = this.props.user
    //     destroy(user, videoId)
    //         .then(() => alert('Deleted'))
    //         .then(() => {
    //             const newVideos = this.state.videos.filter((video) => video._id !== videoId)
    //             this.setState({
    //                 videos: newVideos
    //             })
    //         })
    //         .catch(error => console.log(error))
    // }

    render() {
        return (
            <div>
                <br />
                <CardDeck>
                    {this.state.videos.map((video, index) => (
                        <div key={index} >
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{video.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted"> {video.category}</Card.Subtitle>
                                    <Card.Text>{video.source}</Card.Text>
                                    <Link to={`/videos/${video._id}`}>Go to the video</Link>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </CardDeck>
            </div>
        );
    }
}

export default VideoIndex;