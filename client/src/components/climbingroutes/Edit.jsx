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
        review: 5,
        difficulty: '',
        description: ''
    });

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (async () => {
            const crResp = await Axios.get(`/api/climbingroutes/${id}`);
            if (crResp.status === 200) setInputs(crResp.data);
        })();
    }, []);

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            
            const resp = await Axios.post('/api/climbingroutes/update', inputs);

            if (resp.status === 200) {
                toast("The new review was updated successfully.", {
                    type: toast.TYPE.SUCCESS
                })
                setRedirect(true);
            } else {
                throw "The response status is not 200."
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

    if (redirect) return (<Redirect to="/climbingroutes"/>);

    return (
        <Container className="my-5 text-white">
            <header>
                <h1>Edit Review</h1>
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
                        <Form.Label>Review: </Form.Label>
                        <Form.Control
                            as="select"
                            name="review"
                            onChange={handleInputChange}
                            defaultValue={inputs.review || 5}
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