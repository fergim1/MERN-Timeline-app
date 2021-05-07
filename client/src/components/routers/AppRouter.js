import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { TimelineScreen } from "../timeline/TimelineScreen";


export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    
                    <Route 
                        exact
                        path="/"
                    >
                        <TimelineScreen />
                    </Route>
                    
                    <Redirect to="/" />   

                </Switch>
            </div>
      </Router>
    )
}
