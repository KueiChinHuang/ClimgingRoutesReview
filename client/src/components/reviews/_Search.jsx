import React, { useState, useEffect } from 'react';
import { Form, Col } from 'react-bootstrap';
import Axios from 'axios';

const ReviewForm = function () {

    const [inputs, setInputs] = useState({
        location: '',
        color: '',
        score: '',
        difficulty: ''
    });

    const handleInputChange = async event => {
        event.persist();

        const { name, value } = event.target;

        // console.log(inputs);
        setInputs(inputs => ({
            ...inputs,
            [name]: value
        }));
    };

    return (
        <Form>
            <Form.Row className="py-2">
                <OptionsForm handleInputChange={handleInputChange} inputs={inputs} setInputs={setInputs} />
                <Col>
                    <button type="submit" className="btn btn-primary">Search</button>
                </Col>
            </Form.Row>
        </Form>
    );
};

export default ReviewForm;