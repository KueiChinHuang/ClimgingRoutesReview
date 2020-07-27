import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Index = function ({user}) {
    const [climbingroutes, setClimbingroutes] = useState([]);

    useEffect(() => {
        (async () => {
            await getClimbingroutes();
        })();
    }, []);

    const getClimbingroutes = async () => {
        const climbingroutesResp = await Axios.get('/api/climbingroutes');
        if (climbingroutesResp.status === 200) setClimbingroutes(climbingroutesResp.data);
    };

    const deleteClimbingroute = async climbingroute => {
        try {
            const resp = await Axios.post('/api/climbingroutes/delete', {
                id: climbingroute._id
            });
    
            if (resp.status === 200) toast("The review was deleted successfully", {type: toast.TYPE.SUCCESS});

            await getClimbingroutes();
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
                {climbingroutes && climbingroutes.map((climbingroute, i) => (
                    <div key={i} className="card my-3">
                        <div className="card-header clearfix">
                            <div className="float-left">
                                <h5 className="card-title">
                                    {climbingroute.title}
                                </h5>

                                {climbingroute.user ? (
                                    <small>~{climbingroute.user.fullname}</small>
                                ) : null}
                            </div>
                        
                            <div className="float-right">
                                <small>{climbingroute.updatedAt}</small>
                            </div>
                        </div>
                    
                        <div className="card-body">
                            <p className="card-text">
                                {climbingroute.synopsis}
                            </p>
                        </div>

                        {typeof user !== 'undefined' ? (
                            <div className="card-footer">
                                <Link to={{
                                    pathname: "/climbingroutes/edit",
                                    state: {
                                        id: climbingroute._id
                                    }
                                }}>
                                    <i className="fa fa-edit"></i>
                                </Link>

                                <button type="button" onClick={() => deleteClimbingroute(climbingroute)}>
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