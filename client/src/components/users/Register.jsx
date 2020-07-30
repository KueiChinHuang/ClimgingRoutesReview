import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { Form, Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = ({setUser}) => {
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    emailConfirmation: '',
    password: '',
    passwordConfirmation: ''
  });

  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const resp = await Axios.post('/api/register', inputs);

      if (resp.status === 200) {
        setUser(resp.data.user);
        sessionStorage.setItem('user', JSON.stringify(resp.data.user));
        toast('You have registered successfully and been logged in.', {
          type: toast.TYPE.SUCCESS
        });
        setRedirect(true);
      } else {
        toast("There was an issue registering you.", {
          type: toast.TYPE.ERROR
        });
      }
    } catch (error) {
      toast("There was an issue registering you.", {
        type: toast.TYPE.ERROR
      });
    }
  };

  const handleInputChange = event => {
    event.persist();

    const {name, value} = event.target;

    setInputs(inputs => ({
      ...inputs,
      [name]: value
    }));
  };

  if (redirect) {
    return (<Redirect to="/"/>);
  }

  return (
    <Container className="my-5 text-white">
      <header>
        <h1>Register</h1>
      </header>

      <hr/>
      
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <label htmlFor="firstName">First Name:</label>
          <Form.Control type="firstName" name="firstName" onChange={handleInputChange} value={inputs.firstName}/>
        </Form.Group>

        <Form.Group>
          <label htmlFor="lastName">Last Name:</label>
          <Form.Control type="lastName" name="lastName" onChange={handleInputChange} value={inputs.lastName}/>
        </Form.Group>

        <Form.Group>
          <label htmlFor="email">Email:</label>
          <Form.Control type="email" name="email" onChange={handleInputChange} value={inputs.email}/>
        </Form.Group>

        <Form.Group>
          <label htmlFor="emailConfirmation">Email Confirmation:</label>
          <Form.Control type="emailConfirmation" name="emailConfirmation" onChange={handleInputChange} value={inputs.emailConfirmation}/>
        </Form.Group>

        <Form.Group>
          <label htmlFor="password">Password:</label>
          <Form.Control type="password" name="password" onChange={handleInputChange} value={inputs.password}/>
        </Form.Group>

        <Form.Group>
          <label htmlFor="passwordConfirmation">Password Confirmation:</label>
          <Form.Control type="password" name="passwordConfirmation" onChange={handleInputChange} value={inputs.passwordConfirmation}/>
        </Form.Group>

        <Form.Group>
          <button className="btn btn-primary">Register</button>
        </Form.Group>
      </Form>
        
    </Container>
  );
};

export default Register;
