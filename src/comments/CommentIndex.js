import React, { Component } from 'react';
import { show } from './api'
import CommentCreate from './CommentCreate'

class CommentIndex extends Component {
    state = {
        comments: []
    }
    fetchComments = () => {
        const user = this.props.user
        const videoId = this.props.videoId

        show(videoId)
            .then(res => {
                const comments = res.data.comments
                const videoComments = comments.filter((comments) => comments.videoId == videoId)
                console.log(res.data)
                this.setState({
                    comments: videoComments
                })
            })
            .catch(error => console.log(error))
    }
    componentDidMount() {
        this.fetchComments()
    }
    render() {
        return (
            <div>
                <br />
                {this.state.comments.map((comment, index) => (
                    <p key={index} >
                        • {comment.content}
                    </p>
                ))}
                <br />
                {this.props.user ? <CommentCreate fetchComments={this.fetchComments} user={this.props.user} videoId={this.props.videoId} /> : ""}
            </div>
        );
    }
}

export default CommentIndex;
