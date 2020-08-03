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
                <InputGroup className="">
                    <InputGroup.Prepend >
                    <InputGroup.Text className=""><i class="fa fa-search"></i></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl className="mr-sm-2" placeholder="Search ..." onChange={handleInputChange} value={searchTerms}/>
                </InputGroup>
            </Form.Group>
            <Button className="" type="reset" onClick={handleClear}>
                Clear
            </Button>
        </Form>
    );
};

export default SearchForm;