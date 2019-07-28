import React, { Component } from 'react';
import { index } from './api'
import { Link } from 'react-router-dom'
import { Card, CardDeck, Container } from 'react-bootstrap'

class ListIndex extends Component {
    state = {
        lists: [],
        videos: []
    }

    componentDidMount() {
        const user = this.props.user
        index(user)
            .then(res => {
                const lists = res.data.lists
                // console.log(res.data)
                this.setState({
                    lists: lists
                })
            })
            .catch(error => console.log(error))

    }

    render() {
        console.log('lists index', this.state.lists)
        return (
            <React.Fragment>
                <h2>My List</h2>
                <br />
                <Container>
                    <CardDeck style={{ justifyContent: 'space-between' }}>
                        {this.state.lists.map((list, index) => (
                            <React.Fragment key={index}>
                                {list.videos.map((video, index) =>
                                    <div key={index}>
                                        <Card style={{ width: '20rem' }}>
                                            <Card.Body>
                                                <Card.Title>{video.title}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted"> {video.category}</Card.Subtitle>
                                                <Card.Text>{video._idsource}</Card.Text>
                                                <Link to={`/videos/${video._id}`}>Go to the video </Link>
                                            </Card.Body>
                                        </Card>
                                        <br />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </CardDeck>
                </Container>
            </React.Fragment>
            // <h1>{this.state.lists.map(list => <span>{list._id}</span>)}</h1>
        );
    }
}

export default ListIndex;
