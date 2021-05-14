import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { PublicRoutes } from './PublicRoutes'
import { TimelineScreen } from "../timeline/TimelineScreen";
import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoutes";
import { useDispatch, useSelector } from "react-redux";
import { loginStorage } from "../../actions/auth";
import { startGetMemories } from "../../actions/timeline";


export const AppRouter = () => {

    const dispatch = useDispatch()
    const { authenticated } = useSelector(state => state.auth)

    const [ checking, setChecking ] = useState(true)

    useEffect(() => {
        const uid = localStorage.getItem('uid')
        const name = localStorage.getItem('name')

        if( uid ) {
            dispatch( loginStorage ( uid, name ))
            dispatch( startGetMemories ( uid ))
        }
        setChecking(false)

    }, [dispatch, authenticated])

    if (checking) {
        return (
        <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-primary" role="status">
            </div>
        </div>
      )
    }
    return (
    <div>
        <Router>
                <Switch>
                    
                    {/* No esta autenticado */}
                    <PublicRoutes 
                        isAuthenticated={authenticated}
                        path='/auth'
                        component={ AuthRouter }
                    />
                       
                    {/* SIIIII esta autenticado */}                                
                    <PrivateRoute 
                        exact
                        isAuthenticated={authenticated}
                        path="/"
                        component= { TimelineScreen }
                    />
                    
                    <Redirect to='/auth' />  

                </Switch>
      </Router>
    </div>
    )
}
