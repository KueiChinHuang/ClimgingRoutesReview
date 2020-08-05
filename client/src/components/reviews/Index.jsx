import React, { useEffect, useState } from 'react';
import { Container, ButtonGroup, Button } from 'react-bootstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import SearchForm from './_SearchForm';

const Index = function ({ user }) {
    const [searchTerms, setSearchTerms] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        (async () => {
            await getReviews();
        })();
    }, [searchTerms, sortBy]);

    const getReviews = async () => {
        const reviewsResp = await Axios.get('/api/reviews', {
            params: {
              term: searchTerms,
              sortBy
            }
          });
          
        if (reviewsResp.status === 200) setReviews(reviewsResp.data);
    };

    const handleSortChange = async event => {
        event.persist();
        setSortBy(event.target.value);
        // console.log(sortBy);
    };

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
            <header className="text-white clearfix">
                <h1 className="float-left">Climbing Route Reviews</h1>
                <div className="float-right my-2" >
                    <SearchForm searchTerms={searchTerms} setSearchTerms={setSearchTerms}/>
                </div>
                
            </header>

            <hr />


            <span className="m-3 text-white">Sort By:</span>
            <ButtonGroup className="my-3">
                <Button value="time" variant="outline-light" onClick={handleSortChange}>Time</Button>
                <Button value="score" variant="outline-light" onClick={handleSortChange}>Score</Button>
                <Button value="difficulty" variant="outline-light" onClick={handleSortChange}>Difficulty</Button>
            </ButtonGroup>
            <div className="row">
                {reviews && reviews.map((review, i) => (
                    <div key={i} className="col-sm-4">
                        <div className="card mb-3">
                            <div className="card-header clearfix">
                                <div className="float-left">
                                    <h5 className="card-title my-0">
                                        {review.title}
                                    </h5>
                                </div>

                                <div className="float-right">
                                    <small>{review.updatedAt.slice(0,10)}</small>
                                </div>
                            </div>

                            <div className="card-body">
                                {createStar(review.score)}
                                <p className="card-text">
                                    {review.synopsis}
                                </p>
                                
                                {review.user ? (
                                        <small>By: {review.user.fullname}</small>
                                    ) : null}
                            </div>

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