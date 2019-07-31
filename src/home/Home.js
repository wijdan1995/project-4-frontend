import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Home.css'

class Home extends Component {
    render() {
        return (
            <div className="home-container" >

                <Card size="lg" className="home-card">
                    <h3>Welcome to Learn coding</h3>

                    <Card.Text>This web application will gather the most valuable free programming video tutorials to get you started in the programming world .</Card.Text>
                    <Link to="/videos" >
                        <Button block className="home-button" variant="dark" >Go To Videos</Button>
                    </Link>

                </Card>
            </div>
        );
    }
}

export default Home;
