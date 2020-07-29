import React, { useState, useEffect } from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const Edit = function (props) {

    const id = props.location.state.id;

    const [inputs, setInputs] = useState({
        location: 'Wall A',
        color: 'Blue',
        score: 5,
        difficulty: '',
        description: ''
    });

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (async () => {
            const reviewResp = await Axios.get(`/api/reviews/${id}`);
            if (reviewResp.status === 200) setInputs(reviewResp.data);
        })();
    }, [id]);

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            
            const resp = await Axios.post('/api/reviews/update', inputs);

            if (resp.status === 200) {
                toast("The new review was updated successfully.", {
                    type: toast.TYPE.SUCCESS
                })
                setRedirect(true);
            } else {                
                toast("There was an issue updating the review", {
                    type: toast.TYPE.ERROR
                });
            }
        } catch (error) {
            toast("There was an issue updating the review", {
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
                <h1>Edit Score</h1>
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
                                <option value="Wall A">Wall A</option>
                                <option value="Wall B">Wall B</option>
                                <option value="Wall C">Wall C</option>
                                <option value="Wall D">Wall D</option>
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
                                <option value="Blue">Blue</option>
                                <option value="Green">Green</option>
                                <option value="Red">Red</option>
                                <option value="Black">Black</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Score: </Form.Label>
                        <Form.Control
                            as="select"
                            name="score"
                            onChange={handleInputChange}
                            defaultValue={inputs.score || 5}
                        >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
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
                        <button type="submit" className="btn btn-primary">Update</button>
                    </Form.Group>
                </Form>
            </div>
        </Container>
    );

};

export default Edit;