import React, { useState, useEffect } from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const New = function () {

    // Set up color options
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
                })
                setRedirect(true);
            }
        } catch (error) {
            toast("There was an issue creating the review", {
                type: toast.TYPE.ERROR
            });
        }

    };

    const handleInputChange = async event => {
        event.persist();

        const { name, value } = event.target;

        console.log(inputs);
        setInputs(inputs => ({
            ...inputs,
            [name]: value
        }));
    };

    if (redirect) return (<Redirect to="/reviews"/>);

    return (
        <Container className="my-5 text-white">
            <header>
                <h1>Add New Review</h1>
            </header>

            <hr/>

            <div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Location: </Form.Label>
                        <Form.Control
                            as="select"
                            name="location"
                            onChange={handleInputChange}
                            defaultValue={inputs.location || 'Wall A'}
                        >
                            {locationOptions.map((opt, i) => (
                                <option key={i} value={opt}>{opt}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Color: </Form.Label>
                        <Form.Control
                            as="select"
                            name="color"
                            onChange={handleInputChange}
                            defaultValue={inputs.color || 'Blue'}
                        >
                            {colorOptions.map((opt, i) => (
                                <option key={i} value={opt}>{opt}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Review: </Form.Label>
                        <Form.Control
                            as="select"
                            name="score"
                            onChange={handleInputChange}
                            defaultValue={inputs.score || 5}
                        >
                            {scoreOptions.map((opt, i) => (
                                <option key={i} value={opt}>{opt}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Difficulty: </Form.Label>
                        <Form.Control
                            name="difficulty"
                            onChange={handleInputChange}
                            value={inputs.difficulty}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows="3"
                            name="description"
                            onChange={handleInputChange}
                            value={inputs.description} />
                    </Form.Group>

                    <Form.Group>
                        <button type="submit" className="btn btn-primary">Create</button>
                    </Form.Group>
                </Form>
            </div>
        </Container>
    );

};

export default New;