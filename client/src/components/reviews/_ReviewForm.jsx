import React, { useState, useEffect, Fragment } from 'react';
import { Form, Col } from 'react-bootstrap';
import Axios from 'axios';

const ReviewForm = function ({ inputs, setInputs }) {

    // Set up options for color, location, and score
    const [reviewOptions, setReviewOptions] = useState([]);

    useEffect(() => {
        (async () => {
            await getReviewOptions();
        })();
    }, []);

    const getReviewOptions = async () => {
        const reviewOptionsResp = await Axios.get('/api/reviews/reviewOptions');
        if (reviewOptionsResp.status === 200) setReviewOptions(reviewOptionsResp.data);
    };


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
                <Col>
                <Form.Label>Location: </Form.Label>
                <Form.Control
                    as="select"
                    name="location"
                    onChange={handleInputChange}
                    value={inputs.location}
                >
                    {reviewOptions.locationOptions && reviewOptions.locationOptions.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                    ))}
                </Form.Control>
            </Col>
            <Col>
                <Form.Label>Color: </Form.Label>
                <Form.Control
                    as="select"
                    name="color"
                    onChange={handleInputChange}
                    value={inputs.color}
                >
                    {reviewOptions.colorOptions && reviewOptions.colorOptions.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                    ))}
                </Form.Control>
            </Col>
            <Col>
                <Form.Label>Score: </Form.Label>
                <Form.Control
                    as="select"
                    name="score"
                    onChange={handleInputChange}
                    value={inputs.score}
                >
                    {reviewOptions.scoreOptions && reviewOptions.scoreOptions.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                    ))}
                </Form.Control>
            </Col>
            <Col>
                <Form.Label>Difficulty: </Form.Label>
                <Form.Control
                    name="difficulty"
                    onChange={handleInputChange}
                    value={inputs.difficulty}
                />
            </Col>
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