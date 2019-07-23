import React, { Component } from 'react';
import { update, show } from './api'
import { withRouter } from 'react-router-dom'
import { Form, Button, Container, Col } from 'react-bootstrap'

class VideoUpdate extends Component {
    state = {
        dataForm: {
            title: '',
            source: '',
            videoId: '',
            category: '',
            description: ''
        }
    }
    componentDidMount() {
        const videoId = this.props.match.params.id
        show(videoId)
            .then(res => {
                const video = res.data.video
                this.setState({
                    dataForm: video
                })
                console.log(res)
            })

            .catch((error) => console.log(error))
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
        const user = this.props.user
        const videoId = this.props.match.params.id // using withRouter
        const updateVideo = this.state.dataForm
        update(user, updateVideo, videoId)
            .then(() => this.props.history.push(`/videos/${videoId}`))
            .catch((error) => console.log(error))
    }
    render() {
        return (
            <Container>
                <br />
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group >
                            <Col>
                                <Form.Label>Title</Form.Label>
                                <Form.Control onChange={this.handleChange} type="text" name="title" value={this.state.dataForm.title} />
                            </Col>
                        </Form.Group>
                        <Form.Group >
                            <Col>
                                <Form.Label>Source</Form.Label>
                                <Form.Control onChange={this.handleChange} type="text" name="source" value={this.state.dataForm.source} />
                            </Col>
                        </Form.Group>
                        <Form.Group >
                            <Col>
                                <Form.Label>Video Id</Form.Label>
                                <Form.Control onChange={this.handleChange} type="text" name="videoId" value={this.state.dataForm.videoId} />
                            </Col>
                        </Form.Group>
                        <Form.Group >
                            <Col>
                                <Form.Label>Category</Form.Label>
                                <Form.Control onChange={this.handleChange} type="text" name="category" value={this.state.dataForm.category} />
                            </Col>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group >
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={this.handleChange} type="text" name="description" value={this.state.dataForm.description} as="textarea" rows="2" />
                    </Form.Group>
                    <Button type="submit">Update</Button>
                </Form>
                <br />
            </Container>
        );
    }
}

export default withRouter(VideoUpdate);
