import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReviewForm from './_ReviewForm';

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
                });
                setRedirect(true);
            };           
        } catch (error) {
            toast("There was an issue updating the review", {
                type: toast.TYPE.ERROR
            });
        };
    };

    if (redirect) return (<Redirect to="/reviews"/>);

    return (
        <Container className="my-5 text-white">
            <header>
                <h1>Edit Review</h1>
            </header>

            <hr/>

            <ReviewForm handleSubmit={handleSubmit} inputs={inputs} setInputs={setInputs}/>

        </Container>
    );

};

export default Edit;