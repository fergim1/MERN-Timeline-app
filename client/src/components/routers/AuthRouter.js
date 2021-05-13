import React from 'react'
import { Redirect, Route, Switch } from "react-router-dom";
import { LoginScreen } from '../auth/LoginScreen';
import { RegisterScreen } from '../auth/RegisterScreen';

export const AuthRouter = () => {

    // NO ESTA AUTENTICADO
    return (
            <div>
                
                <Switch>
                    <Route
                        path='/auth/login'
                        exact
                        component={ LoginScreen }
                    />

                    <Route
                        path='/auth/register'
                        exact
                        component={ RegisterScreen }
                    />
                    
                    <Redirect to='/auth/login' />

                </Switch>

                
            </div>
    )
}
