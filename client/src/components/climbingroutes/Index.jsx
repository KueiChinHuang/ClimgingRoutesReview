import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Axios from 'axios';

const Index = function () {
    const [climbingroutes, setClimbingroutes] = useState([]);

    useEffect(() => {
        (async () => {
            await getClimbingroutes();
        })();
    }, []);

    const getClimbingroutes = async () => {
        const climbingroutesResp = await Axios.get('/climbingroutes');
        console.log(climbingroutesResp);
        if (climbingroutesResp.status === 200) setClimbingroutes(climbingroutesResp.data);
    };

    return (
        <Container className="my-5">
            <header>
                <h1>Archive</h1>
            </header>

            <hr/>

            <div className="content">
                {climbingroutes && climbingroutes.map((climbingroute, i) => (
                    <div key={i} className="card my-3">
                        <div className="card-header clearfix">
                            <div className="float-left">
                                <h5 className="card title">
                                    {climbingroute.title}
                                </h5>

                                {climbingroute.user ? (
                                    <small>~{climbingroute.user.fullname}</small>
                                ) : null}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default Index;