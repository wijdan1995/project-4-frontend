import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Home extends Component {
    render() {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "6%"
            }}>

                <Card style={{
                    width: "50vw",
                    height: "40vh",
                    padding: "3%"
                }}>
                    <h3>Welcome to Learn coding</h3>

                    <Card.Text>This web application will gather the most valuable free programming video tutorials to get you started in the programming world .</Card.Text>
                    <Link to="/videos" >
                        <Button variant="dark" style={{
                            marginTop: "4%"
                        }}>Go To Videos</Button>
                    </Link>
                </Card>
            </div>
        );
    }
}

export default Home;
