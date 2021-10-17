import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { PublicRoutes } from './PublicRoutes'
import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoutes";
import { useDispatch, useSelector } from "react-redux";
import { loginStorage, loginGuestStorage} from "../../actions/auth";
import { startGetMemories } from "../../actions/timeline";
import { TimelineScreen } from "../timeline/TimelineScreen";
import HomeScreen from "../home/HomeScreen";


export const AppRouter = () => {

    const dispatch = useDispatch()
    const { authenticated = false} = useSelector(state => state.auth)

    const [ checking, setChecking ] = useState(true)

    useEffect(() => {
        const uid = localStorage.getItem('uid')
        const name = localStorage.getItem('name')
        const type = localStorage.getItem('type')
        const guestId = localStorage.getItem('guestId')
        const guestName = localStorage.getItem('guestName')

        if (type ==='guest') {
            dispatch (loginGuestStorage (uid, name, guestId, guestName))
            dispatch( startGetMemories ( uid ))
        } 
        if(type==='user') {
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
                    <Route
                        path='/'
                        exact
                        component={ HomeScreen }
                    />
                    
                    {/* No esta autenticado */}
                    <PublicRoutes 
                        isAuthenticated={authenticated}
                        path='/auth'
                        component={ AuthRouter }
                    />
                       
                    {/* Si esta autenticado */}                                
                    <PrivateRoute 
                        exact
                        isAuthenticated={authenticated}
                        path="/timeline"
                        component= { TimelineScreen }
                    />
                    
                    <Redirect to='/auth' />  

                </Switch>
      </Router>
    </div>
    )
}
