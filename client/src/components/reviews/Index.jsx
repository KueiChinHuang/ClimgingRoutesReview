import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Index = function ({user}) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        (async () => {
            await getReviews();
        })();
    }, []);

    const getReviews = async () => {
        const reviewsResp = await Axios.get('/api/reviews');
        if (reviewsResp.status === 200) setReviews(reviewsResp.data);
    };

    const deleteReview = async review => {
        try {
            const resp = await Axios.post('/api/reviews/delete', {
                id: review._id
            });
    
            if (resp.status === 200) toast("The review was deleted successfully", {type: toast.TYPE.SUCCESS});

            await getReviews();
        } catch (error) {
            toast("The review was an issue deleting the review", {type: toast.TYPE.ERROR});
        }
    };

    return (
        <Container className="my-5">
            <header className="text-white">
                <h1>Archive</h1>
            </header>

            <hr/>

            <div className="content">
                {reviews && reviews.map((review, i) => (
                    <div key={i} className="card my-3">
                        <div className="card-header clearfix">
                            <div className="float-left">
                                <h5 className="card-title">
                                    {review.title}
                                </h5>

                                {review.user ? (
                                    <small>~{review.user.fullname}</small>
                                ) : null}
                            </div>
                        
                            <div className="float-right">
                                <small>{review.updatedAt}</small>
                            </div>
                        </div>
                    
                        <div className="card-body">
                            <p className="card-text">
                                {review.synopsis}
                            </p>
                        </div>

                        {user ? (
                            <div className="card-footer">
                                <Link to={{
                                    pathname: "/reviews/edit",
                                    state: {
                                        id: review._id
                                    }
                                }}>
                                    <i className="fa fa-edit"></i>
                                </Link>

                                <button type="button" onClick={() => deleteReview(review)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default Index;