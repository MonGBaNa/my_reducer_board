import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({isAuth, ...rest}) => {
    return (
        <>
            {isAuth ? (
                <Route
                    {...rest}
                />
            ) : (
                <Redirect to={process.env.PUBLIC_URL+"/auth/login"} />
            )}
        </>
    );
}

export default AuthRoute;