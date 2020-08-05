import React, { useEffect, useState } from 'react';
import { Container, ButtonGroup, ToggleButton } from 'react-bootstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import SearchForm from './_SearchForm';

const Index = function ({ user }) {
    // Set up useState
    const [searchTerms, setSearchTerms] = useState(''); // for search terms
    const [sortBy, setSortBy] = useState('');           // for sort method
    const [reviews, setReviews] = useState([]);         // for reviews

    // All the options for sort method
    const sortButton =[
        {name: 'Time', value: 'updatedAt'},
        {name: 'Score', value: 'score'},
        {name: 'Difficulty', value: 'difficulty'},
        {name: 'User', value: 'user'}
    ];

    // Render the page when search term or sort method change
    useEffect(() => {
        (async () => {
            await getReviews();
        })();
    }, [searchTerms, sortBy]);

    // To get all the reviews according to user's search term and sort method
    const getReviews = async () => {
        const reviewsResp = await Axios.get('/api/reviews', {
            params: {
              term: searchTerms,
              sortBy
            }
          });
          
        if (reviewsResp.status === 200) setReviews(reviewsResp.data);
    };

    // Handle sort method changes
    const handleSortChange = async event => {
        event.persist();
        setSortBy(event.target.value);
        // console.log(sortBy);
    };

    // To delete a review
    const deleteReview = async review => {
        try {
            const resp = await Axios.post('/api/reviews/delete', {
                id: review._id
            });

            if (resp.status === 200) toast("The review was deleted successfully", { type: toast.TYPE.SUCCESS });

            await getReviews();
        } catch (error) {
            toast("The review was an issue deleting the review", { type: toast.TYPE.ERROR });
        }
    };

    // Create star according to review's score
    const createStar = score => {
        let star = [];

        for (let i = 0; i < 5; i++) {
            if (i < score) {
                star.push(<span key={i} className="fa fa-star checked"></span>);
            } else {
                star.push(<span key={i} className="fa fa-star"></span>);
            }
        }

        return star;
    }

    return (
        <Container className="my-5">

            {/* Header: title and search bar */}
            <header className="text-white clearfix">
                <h1 className="float-left">Climbing Route Reviews</h1>
                <div className="float-right my-2" >
                    {/* Import component - SeearchForm */}
                    <SearchForm searchTerms={searchTerms} setSearchTerms={setSearchTerms}/>
                </div>
                
            </header>

            <hr />

            {/* Buttons for sorting reviews */}
            <span className="m-3 text-white">Sort By:</span>
            <ButtonGroup toggle className="my-3">
                {sortButton.map((sortBtn, idx) => (
                    <ToggleButton
                        key={idx}
                        type="radio"
                        variant="outline-light"
                        name="radio"
                        value={sortBtn.value}
                        checked={sortBy === sortBtn.value}
                        onChange={handleSortChange}
                    >
                        {sortBtn.name}
                    </ToggleButton>
                ))}

            </ButtonGroup>

            {/* Display all the reviews */}
            <div className="row">
                {/* Each card is a review */}
                {reviews && reviews.map((review, i) => (
                    <div key={i} className="col-sm-4">
                        <div className="card mb-3">

                            {/* Set up card header, including title and time */}
                            <div className="card-header clearfix">
                                <div className="float-left">
                                    <h5 className="card-title my-0">
                                        {review.title}
                                    </h5>
                                </div>

                                <div className="float-right">
                                    <small>{review.updatedAt.substring(0, review.updatedAt.length - 8).replace('T', ' ')}</small>
                                </div>
                            </div>

                            {/* Set up card body, including contents and author */}
                            <div className="card-body">
                                {createStar(review.score)}
                                <p className="card-text">
                                    {review.synopsis}
                                </p>
                                
                                {review.user ? (
                                        <small>By: {review.user.fullname}</small>
                                    ) : null}
                            </div>

                            {/* Set up card footer for user who has logged in. Only show footer for their own post */}
                            {user && user.email === review.user.email ? (
                                <div className="card-footer">
                                    <Link to={{
                                        pathname: "/reviews/edit",
                                        state: {
                                            id: review._id
                                        }
                                    }}>
                                        <i className="fa fa-edit"></i>
                                    </Link>

                                    <button type="button" className="delete" onClick={() => deleteReview(review)}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>                                
                            ) : null}
                        </div>
                    </div>
                ))}

            </div>
        </Container>
    );
};

export default Index;