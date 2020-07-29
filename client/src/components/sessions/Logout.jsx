import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import Axios from 'axios';

const Logout = ({setUser}) => {

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const resp = await Axios.get('/api/logout');

                if (resp.status === 200) {
                    setUser(false);
                    toast("You have successfully logged out", {
                        type: toast.TYPE.SUCCESS
                    });
                    setRedirect(true);
                } else {
                    toast("There was an error while attempting to log you out", {type: toast.TYPE.ERROR});
                }
            } catch (error) {
                toast("There was an error while attempting to log you out", {type: toast.TYPE.ERROR});
            }
        })();
    }, [setUser]);

    if (redirect) return (<Redirect to="/reviews"/>);

    return null;
};

export default Logout;