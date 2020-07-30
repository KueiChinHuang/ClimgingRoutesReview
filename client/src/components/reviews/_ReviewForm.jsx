import React, { useState, useEffect } from 'react';
import { Form, Col } from 'react-bootstrap';
import Axios from 'axios';

const ReviewForm = function ({ handleSubmit, inputs, setInputs }) {

    // Set up options for color, location, and score
    const [colorOptions, setColorOptions] = useState([]);
    const [locationOptions, setLocationOptions] = useState([]);
    const [scoreOptions, setScoreOptions] = useState([]);

    useEffect(() => {
        (async () => {
            await getColorOptions();
            await getLocationOptions();
            await getScoreOptions();
        })();
    }, []);

    const getColorOptions = async () => {
        const colorOptionsResp = await Axios.get('/api/reviews/colorOptions');
        if (colorOptionsResp.status === 200) setColorOptions(colorOptionsResp.data);
    };

    const getLocationOptions = async () => {
        const locationOptionsResp = await Axios.get('/api/reviews/locationOptions');
        if (locationOptionsResp.status === 200) setLocationOptions(locationOptionsResp.data);
    };

    const getScoreOptions = async () => {
        const scoreOptionsResp = await Axios.get('/api/reviews/scoreOptions');
        console.log(scoreOptionsResp);
        if (scoreOptionsResp.status === 200) setScoreOptions(scoreOptionsResp.data);
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
        <Form>
            <Form.Row className="py-2">
                <Col>
                    <Form.Label>Location: </Form.Label>
                    <Form.Control
                        as="select"
                        name="location"
                        onChange={handleInputChange}
                        value={inputs.location}
                    >
                        {locationOptions.map((opt, i) => (
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
                        {colorOptions.map((opt, i) => (
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
                        {scoreOptions.map((opt, i) => (
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

            <Form.Row className="py-4">
                <Col>
                    <button type="submit" className="btn btn-primary">Update</button>
                </Col>
            </Form.Row>
        </Form>
    );
};

export default ReviewForm;