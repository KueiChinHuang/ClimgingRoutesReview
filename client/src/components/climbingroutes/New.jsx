import React, { useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

const New = function () {

    const [inputs, setInputs] = useState({
        location: 'WALL_A',
        color: 'BLUE',
        review: 5,
        difficulity: '',
        description: ''
    });

    return (
        <Container>
            <h1>This is New page</h1>
            <h1>This is New page</h1>
            <h1>This is New page</h1>
            <h1>This is New page</h1>
        </Container>
    );
};

export default New;