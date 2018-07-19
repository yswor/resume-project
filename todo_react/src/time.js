import React, {Component} from 'react'
import './time.css'

class Time extends Component {
    render() {
        var d = new Date()
        var date = d.toDateString()
        return (
            <h4 className="time-title">
                <span>TODAY </span>
                <span className="date">{date}</span>
            </h4>
        )
    }
}

export default Time