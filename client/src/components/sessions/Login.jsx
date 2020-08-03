import React, { useState } from 'react';
import Axios from 'axios';
import { Form, Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({setUser}) => {

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const resp = await Axios.post('/api/authenticate', inputs);

            if (resp.status === 200) {
                setUser(resp.data.user);
                toast('You have looged in successfully.', {
                    type: toast.TYPE.SUCCESS
                });
                setRedirect(true);
            } else {
                toast("There was an issue logging you in, please check your credentials.", {
                    type: toast.TYPE.ERROR
                });
            }
        } catch (error) {
            toast("There was an issue logging you in, please check your credentials.", {
                type: toast.TYPE.ERROR
            });
        }
    };

    const handleInputChange = event => {
        event.persist();

        const { name, value } = event.target;

        setInputs(inputs => ({
            ...inputs,
            [name]: value
        }));
    };

    if (redirect) return <Redirect to="/reviews"/>

    return (
        <Container className="my-5 text-white">
            <header>
                <h1>Login</h1>
            </header>

            <hr />

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control name="email" type="email" required onChange={handleInputChange} value={inputs.email} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control name="password" type="password" required onChange={handleInputChange} value={inputs.password} />
                </Form.Group>

                <Form.Group>
                    <button className="btn btn-primary">Submit</button>
                </Form.Group>
            </Form>
        </Container>
    );
};

export default Login;