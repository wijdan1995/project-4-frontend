import React, { Component } from 'react'
import { create } from './api'
import { withRouter } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'

class VideoCreate extends Component {
    state = {
        dataForm: {
            content: '',
            videoId: this.props.videoId
        }
    }
    handleChange = (event) => {
        //get the name of input
        const name = event.target.name;
        // get the value of input
        const value = event.target.value;
        const newForm = Object.assign(this.state.dataForm)
        newForm[name] = value;
        this.setState({
            dataForm: newForm
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const newComment = this.state.dataForm
        const user = this.props.user
        const videoId = this.props.videoId
        create(user, newComment, videoId)
            .then(() => alert('Comment Added'))
            .then(() => this.props.fetchComments())
            .then(this.setState({
                dataForm: {
                    content: '',
                    videoId: this.props.videoId
                }
            }))
            .catch((error) => console.log(error))

    }

    render() {
        return (
            <Container>
                <hr />
                <br />
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group >
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as="textarea" rows="2" onChange={this.handleChange} type="text" name="content" value={this.state.dataForm.content} />
                    </Form.Group>
                    <Button variant="dark" type="submit">Add Comment</Button>
                </Form>
                <br />
            </Container>
        )
    }
}



export default withRouter(VideoCreate)
