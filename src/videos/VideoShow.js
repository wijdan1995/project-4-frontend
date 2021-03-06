import React, { Component } from 'react';
import { show } from './api'
import './VideoShow.css'
import { Badge, Container, Card } from 'react-bootstrap'
import CommentIndex from '../comments/CommentIndex'
import ListCreate from '../list/ListCreate';
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
                    <Card className='video'>
                        <iframe
                            title="myFrame"
                            src={`https://www.youtube.com/embed/${this.state.video.videoId}`}
                            frameBorder="0" />
                    </Card>
                    <br />
                </div>
                <div className="content"></div>
                <p>{this.state.video.source} <Badge variant="info">{this.state.video.category}</Badge></p>
                <div>
                    {this.props.user ? <ListCreate user={this.props.user} videoId={this.state.video._id} /> : ''}
                    <br />
                    <br />
                    <h3>Comments</h3>
                    <CommentIndex user={this.props.user} videoId={this.props.videoId} />

                </div>

            </Container>
        );
    };
}

export default VideoShow;