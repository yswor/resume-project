import React, {Component} from 'react'
import './task.css'

var count = function() {
    var n = -1
    return function() {
        n++
        return n
    }
}()

class Task extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            text: "",
            hidden: false,
        }
    }

    render() {
        var hidden = this.state.hidden ? "hidden" : ""
        var show = this.state.hidden ? "" : "hidden"
        return (
            <div className='taskCmpnt'>
                <Items state={this.state} callback={this.onChange.bind(this)}/>
                <button className={`${hidden} addTaskBtn`} onClick={this.handleClick}>添加任务</button>
                <div className={`${show} inputContent`}>
                    <input className={'inputBox'} onChange={this.handleChange} value={this.state.text}/>
                    <div>
                        <button className={'btn'} onClick={this.clickOK}>确定</button>
                        <button className={'btn'} onClick={this.handleClick}>取消</button>
                    </div>
                </div>
            </div>
        )
    }

    onChange = (state) => {
        this.setState(state)
        console.log(this.state)
    }

    handleClick = (e) => {
        var h = this.state.hidden
        this.setState({
            hidden: !h,
        })
    }

    handleChange = (e) => {
        var state = {
            text: e.target.value
        }
        this.setState(state)
    }

    clickOK = (e) => {
        this.handleClick(e)
        var i = {
            id: count(),
            text: this.state.text,
            cmplt: false,
            editable: false,
            checked: false,
        }
        this.setState((prevState) => {
            return {
                items: prevState.items.concat(i),
                text: ''
            }
        })
    }

    componentWillMount() {
        console.log('start')
        var data = localStorage.data
        if (data !== undefined) {
            this.setState(JSON.parse(data))
        }
    }

    componentDidUpdate() {
        console.log('updated', this.state)
        var d = JSON.stringify(this.state)
        localStorage.data = d
    }
}

class Items extends Component {
    render() {
        return (
            <div>
                {this.props.state.items.map(t => {
                    var cmplt = t.cmplt ? "complete" : ""
                    var hidden = t.editable ? "hidden" : ""
                    return (
                    <div className={cmplt} key={t.id}>
                        <Edit content={t} callback={this.onChange.bind(this)}/>
                        <div className={`${hidden} item-content`}>
                            <input type={'checkbox'} onClick={this.addClass.bind(this, t)} checked={t.checked}/>
                            {t.text}
                            <div className={'divingLine'}></div>
                            <div>
                                <button className={'btn'} onClick={this.editItem.bind(this, t)}>编辑</button>
                                <button className={'btn'} onClick={this.delItem.bind(this, t)}>删除</button>
                            </div>
                        </div>
                    </div>
                )})}
            </div>
        )
    }

    onChange(data) {
        var state = this.props.state
        var items = state.items
        for (var i = 0; i < items.length; i++) {
            var item = items[i]
            if (item.id === data.id) {
                item = data
                this.props.callback(state)
            }
        }
        this.props.callback(state)
    }

    addClass(t) {
        var state = this.props.state
        var items = state.items
        var id = t.id
        for (var i = 0; i < items.length; i++) {
            var item = items[i]
            if (item.id === id) {
                item.cmplt = !item.cmplt
                item.checked = !item.checked
                this.props.callback(state)
            }
        }
    }

    editItem(t) {
        var state = this.props.state
        var items = state.items
        var id = t.id
        for (var i = 0; i < items.length; i++) {
            var item = items[i]
            if (item.id === id) {
                item.editable = true
                this.props.callback(state)
            }
        }
    }

    delItem(t) {
        var state = this.props.state
        var items = state.items
        var id = t.id
        for (var i = 0; i < items.length; i++) {
            var item = items[i]
            if (item.id === id) {
                items.splice(i, 1)
                this.props.callback(state)
            }
        }
    }
}

class Edit extends Component {
    constructor(props) {
        super(props)
        var content = this.props.content.text
        this.state = {
            text: content,
        }
    }

    render() {
        var hidden = this.props.content.editable ? "" : "hidden"
        return (
            <div className={`${hidden} editItem`}>
                <input className={'inputBox'} value={this.state.text} onChange={this.handleChange}/>
                <div className={'divingLine'}></div>
                <div>
                    <button className={'btn'} onClick={this.clickOK}>确定</button>
                    <button className={'btn'} onClick={this.clickCancel}>取消</button>
                </div>
            </div>
        )
    }

    handleChange = (e) => {
        var text = e.target.value
        console.log('edited', text)
        this.setState ({
            text,
        })
    }

    clickOK = (e) => {
        var text = this.state.text
        var t = this.props.content
        t.text = text
        t.editable = false
        this.props.callback(t)
    }

    clickCancel = (e) => {
        var t = this.props.content
        t.editable = false
        this.props.callback(t)
    }
}

export default Task