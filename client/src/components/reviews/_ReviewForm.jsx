import React, { Fragment } from 'react';
import { Form, Col } from 'react-bootstrap';
import OptionsForm from './_OptionsForm';

const ReviewForm = function ({ inputs, setInputs }) {

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
        <Fragment>
            <Form.Row className="py-2">
                <OptionsForm handleInputChange={handleInputChange} inputs={inputs} setInputs={setInputs} />
            </Form.Row>
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
        </Fragment>
    );
};

export default ReviewForm;