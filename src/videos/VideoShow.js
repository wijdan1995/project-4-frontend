import React, { Component } from 'react';
import { show } from './api'
import './VideoShow.css'
import { Badge, Container } from 'react-bootstrap'

class VideoShow extends Component {
    state = {
        video: {}
    }
    componentDidMount() {
        const videoId = this.props.videoId
        show(videoId)
            .then(res => {
                const showVideo = res.data.video
                this.setState({
                    video: showVideo
                })
            })
            .catch(error => console.log(error))
    }
    render() {
        return (
            <Container>
                <div
                    className="video">
                    <br />
                    <h2>{this.state.video.title}</h2>
                    <br />
                    <iframe
                        title="myFrame"
                        src={`https://www.youtube.com/embed/${this.state.video.videoId}`}
                        frameBorder="0" />
                    <br />
                </div>
                <div className="content"></div>
                <p>{this.state.video.source} <Badge variant="info">{this.state.video.category}</Badge></p>

            </Container>
        );
    };
}

export default VideoShow;