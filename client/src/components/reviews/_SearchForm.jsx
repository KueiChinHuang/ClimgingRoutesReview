import React from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchForm = function ({searchTerms, setSearchTerms}) {

    const handleInputChange = async event => {
        event.persist();
        const { value } = event.target;
        setSearchTerms(value);
    };

    const handleClear = async event => {
        event.persist();
        setSearchTerms('');
    };

    return (
        <Form inline onSubmit={e => { e.preventDefault(); }}>
            <Form.Group>
                <Form.Control className="mb-2 mr-sm-2" placeholder="Search Title ..." onChange={handleInputChange} value={searchTerms}>
                </Form.Control>
            </Form.Group>
            <Button className="mb-2" type="reset" onClick={handleClear}>
                Clear
            </Button>
        </Form>
    );
};

export default SearchForm;