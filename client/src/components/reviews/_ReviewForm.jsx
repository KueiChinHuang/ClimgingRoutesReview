import React, { useState, useEffect } from 'react';
import { Form, Col } from 'react-bootstrap';
import Axios from 'axios';
import OptionsForm from './_OptionsForm';

const ReviewForm = function ({ handleSubmit, inputs, setInputs }) {

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
        <Form onSubmit={handleSubmit}>
            <OptionsForm handleInputChange={handleInputChange} inputs={inputs} setInputs={setInputs} />
            <Form.Row className="py-2">
                <Col>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="3"
                        name="description"
                        onChange={handleInputChange}
                        value={inputs.description} />
                </Col>
            </Form.Row>

            <Form.Row className="py-4">
                <Col>
                    <button type="submit" className="btn btn-primary">Update</button>
                </Col>
            </Form.Row>
        </Form>
    );
};

export default ReviewForm;