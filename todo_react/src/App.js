import React, {Component} from 'react'
import Time from './time'
import Task from './task'

class App extends Component {
    render() {
        return (
            <div>
                <Time />
                <Task />
            </div>
        )
    }
}

export default App