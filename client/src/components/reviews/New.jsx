import React, { useState } from 'react';
import { Container, Form, Col } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReviewForm from './_ReviewForm';

const New = function () {    

    const [inputs, setInputs] = useState({
        location: 'Wall A',
        color: 'Blue',
        score: 5,
        difficulty: '',
        description: ''
    });

    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async event => {
        event.preventDefault();

        try {            
            const resp = await Axios.post('/api/reviews', inputs);
            if (resp.status === 200) {
                toast("The new review was created successfully.", {
                    type: toast.TYPE.SUCCESS
                });
                setRedirect(true);
            };
        } catch (error) {
            toast("There was an issue creating the review", {
                type: toast.TYPE.ERROR
            });
        };
    };

    if (redirect) return (<Redirect to="/reviews"/>);

    return (
        <Container className="my-5 text-white">
            <header>
                <h1>New Review</h1>
            </header>

            <hr/>
            
            <Form onSubmit={handleSubmit}>
                
                <ReviewForm inputs={inputs} setInputs={setInputs}/>

                <Form.Row className="py-4">
                    <Col>
                        <button type="submit" className="btn btn-primary">Create</button>
                    </Col>
                </Form.Row>
            </Form>

        </Container>
    );

};

export default New;