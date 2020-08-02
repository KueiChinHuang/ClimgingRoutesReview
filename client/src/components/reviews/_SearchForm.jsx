import React, { useState, useEffect } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import Axios from 'axios';

const SearchForm = function ({setSearchTerms}) {

    const handleInputChange = async event => {
        event.persist();
        const { value } = event.target;
        setSearchTerms(value);
    };

    return (
        <Form inline>
            <Form.Group>
                <Form.Control className="mb-2 mr-sm-2" placeholder="Search..." onChange={handleInputChange}>
                </Form.Control>
            </Form.Group>
        </Form>
    );
};

export default SearchForm;