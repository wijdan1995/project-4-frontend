import React, { Component } from 'react';
import { show, destroy } from './api'
import CommentCreate from './CommentCreate'
import { Card, Button } from 'react-bootstrap'

class CommentIndex extends Component {
    state = {
        comments: []
    }
    fetchComments = () => {
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

    destroy = (commentId) => {
        const user = this.props.user
        destroy(user, commentId)
            .then(() => alert('Deleted'))
            .then(() => {
                const newComments = this.state.comments.filter((comment) => comment._id !== commentId)
                this.setState({
                    comments: newComments
                })
            })
            .catch(error => console.log(error))
    }
    render() {
        let UserName;
        if (this.props.user) {
            UserName = this.props.user._id
        } else {


        }
        return (
            <div>

                {this.state.comments.map((comment, index) => (
                    <React.Fragment>
                        <p>{comment.userName}</p>
                        <Card>
                            <Card.Body key={index}>  {comment.content}</Card.Body>
                        </Card>
                        {comment.owner === UserName ? <React.Fragment> <br /> <Button variant="outline-secondary" size="sm" onClick={() => { if (window.confirm('Are you sure you wish to delete this comment?')) this.destroy(comment._id) }}>Delete</Button> <br /></React.Fragment> : ''}
                        <br />
                    </React.Fragment>
                ))}
                <br />
                {this.props.user ? <CommentCreate fetchComments={this.fetchComments} user={this.props.user} videoId={this.props.videoId} /> : ""}
            </div>
        );
    }
}

export default CommentIndex;
