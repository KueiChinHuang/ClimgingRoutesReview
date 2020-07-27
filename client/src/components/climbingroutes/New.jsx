import React, {useState} from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

const New = function () {

    const [inputs, setInputs] = useState({
        color: 'BLUE',
        location: 'WALL_A',
        review: 5,
        difficulty: '',
        description: ''
    });

    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async event => {
        event.preventDefault();

        const resp = await Axios.post('/climbingroutes');

        if (resp.status === 200) {
            setRedirect(true);
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
        console.log(redirect)
    };

    if (redirect) return (<Redirect to="/climbingroutes"/>);

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
                            value={inputs.location}
                            defaultValue={inputs.location || 'WALL_A'}
                        >
                                <option value="WALL_A">Wall A</option>
                                <option value="WALL_B">Wall B</option>
                                <option value="WALL_C">Wall C</option>
                                <option value="WALL_D">Wall D</option>
                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Color: </Form.Label>
                        <Form.Control
                            as="select"
                            name="color"
                            onChange={handleInputChange}
                            value={inputs.color}
                            defaultValue={inputs.color || 'BLUE'}
                        >
                                <option value="BLUE">Blue</option>
                                <option value="GREEN">Green</option>
                                <option value="RED">Red</option>
                                <option value="BLACK">Black</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Review: </Form.Label>
                        <Form.Control
                            as="select"
                            name="review"
                            onChange={handleInputChange}
                            value={inputs.review}
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
                        <button type="submit" className="btn btn-primary">Create</button>
                    </Form.Group>
                </Form>
            </div>
        </Container>
    );

};

export default New;