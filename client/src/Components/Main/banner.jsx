import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Typography, Box } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import './banner.css';

const Banner = () => {
    return (
        <Box className="banner">
            <Container>
                <Row className="justify-content-center align-items-center text-center">
                    <Col>
                        <h1 className='flipped-text'>
                            YOUR!
                            </h1>
                            <h1 className='main-text'>
                            YOUF!
                            </h1>
                        <Typography variant="h5" className="tagline">
                            WearYourWay.
                        </Typography>
                    </Col>
                </Row>
            </Container>
        </Box>
    );
};

export default Banner;
