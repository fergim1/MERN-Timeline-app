import React from 'react'
import { TimelineScreen } from './timeline/TimelineScreen'

export const HomeScreen = (isAuthenticated) => {
    return (
        <div>
            <TimelineScreen isAuthenticated = {isAuthenticated}/>
        </div>
    )
}
