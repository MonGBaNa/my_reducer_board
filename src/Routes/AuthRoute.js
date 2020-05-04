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
                <Redirect to="/auth/login" />
            )}
        </>
    );
}

export default AuthRoute;