import React, { Component } from 'react';
import { index, destroy } from './api'
import { Link } from 'react-router-dom'
import { Card, CardDeck, Container, Form, Badge } from 'react-bootstrap'
import './VideoIndex.css'

class VideoIndex extends Component {
    state = {
        videos: [],
        categories: []

    }
    fetchVideos = () => {
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

    componentDidMount() {
        this.fetchVideos()
    }

    // for delete video
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

    // to filter videos
    handleOnChange = event => {
        const categorySelected = event.target.value

        if (categorySelected === "all") {
            this.fetchVideos()
        } else {
            console.log(categorySelected)

            index()
                .then(res => {
                    const allVideos = res.data.videos

                    this.setState({
                        videos: allVideos
                    })

                })
                .then(() => {
                    const filterdVideo = this.state.videos.filter(video => video.category === categorySelected)
                    console.log(filterdVideo)
                    this.setState({
                        videos: filterdVideo
                    })
                })
                .catch(error => console.log(error))
        }


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
                <Form className='form'>
                    <Form.Group >
                        {/* <Form.Control size="sm" as="select">
                            <option>- Filter by category -</option>
                            <option onClick={this.fetchVideos}>- All </option>
                            {this.state.categories.map((cat, index) =>
                                <option key={index} onClick={this.handleOnClick} value={cat}>- {cat}
                                </option>)}
                        </Form.Control> */}
                        <Form.Control onChange={this.handleOnChange} size="sm" as="select">
                            <option value='all'>- Filter by category -</option>
                            <option value='all'>- All </option>
                            {this.state.categories.map((cat, index) =>
                                <option key={index} value={cat}>- {cat}
                                </option>)}
                        </Form.Control>
                    </Form.Group>
                </Form>
                <br />
                <Container>
                    <CardDeck className='card-deck'>
                        {this.state.videos.map((video, index) => (
                            <div key={index} >
                                <Card className="cards">
                                    <Card.Body>
                                        <Card.Title>{video.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted"> <Badge variant="info">{video.category}</Badge></Card.Subtitle>
                                        <Card.Text>{video.source}</Card.Text>
                                        <Link to={`/videos/${video._id}`}>Go to the video </Link> {isAdmin ? <React.Fragment>
                                            <Link to={`/videos/${video._id}/update`}> Update</Link>
                                            <Link to="/videos/" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.destroy(video._id) }}> Delete</Link>
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