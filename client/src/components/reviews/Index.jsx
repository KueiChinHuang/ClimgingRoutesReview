import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Index = function ({ user }) {
    const [inputs, setInputs] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        (async () => {
            await getReviews();
        })();
    }, []);

    const getReviews = async () => {
        const reviewsResp = await Axios.get('/api/reviews', {
            params: {
              term: 'Wall A'
            }
          });
          
        if (reviewsResp.status === 200) setReviews(reviewsResp.data);
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
            <header className="text-white">
                <h1>Climbing Route Reviews</h1>
            </header>



            <hr />

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