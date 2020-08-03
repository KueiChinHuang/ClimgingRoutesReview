import React from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';

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
                <InputGroup>
                    <InputGroup.Prepend >
                    <InputGroup.Text><i className="fa fa-search"></i></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl className="mr-sm-2" placeholder="Search ..." onChange={handleInputChange} value={searchTerms}/>
                </InputGroup>
            </Form.Group>
            <Button type="reset" onClick={handleClear}>
                Clear
            </Button>
        </Form>
    );
};

export default SearchForm;