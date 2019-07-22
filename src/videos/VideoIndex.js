import React, { Component } from 'react';
import { index, destroy } from './api'
import { Link } from 'react-router-dom'
import { Card, CardDeck } from 'react-bootstrap'

// const authenticatedOptions = (
//     <React.Fragment>
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
        videos: []
    }
    componentDidMount() {
        // const user = this.props.user
        // index(user)
        index()
            .then(res => {
                const allVideos = res.data.videos
                this.setState({
                    videos: allVideos
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
                <CardDeck>
                    {this.state.videos.map((video, index) => (
                        <div key={index} >
                            {/* <Link to={`/videos/${video._id}`}><h3>{video.title}</h3></Link>
                        <p>From: {video.source}, ({video.category})</p> */}

                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{video.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted"> {video.category}</Card.Subtitle>
                                    <Card.Link ><Link to={`/videos/${video._id}`}>Go to the video</Link></Card.Link>
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