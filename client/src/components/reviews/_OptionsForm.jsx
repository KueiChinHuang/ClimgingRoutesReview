import React, { useState, useEffect, Fragment } from 'react';
import { Form, Col } from 'react-bootstrap';
import Axios from 'axios';

const OptionsForm = function ({ handleInputChange, inputs, setInputs }) {

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
        if (scoreOptionsResp.status === 200) setScoreOptions(scoreOptionsResp.data);
    };

    return (
        <Fragment>
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
        </Fragment>
    );
};

export default OptionsForm;