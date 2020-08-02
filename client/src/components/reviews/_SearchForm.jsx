import React from 'react';
import { Form } from 'react-bootstrap';

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