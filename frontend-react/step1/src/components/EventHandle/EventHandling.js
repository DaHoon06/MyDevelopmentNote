import React, { Component } from "react";

class EventHandling extends Component {
    state = {
        username: '',
        message: '',
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleClick = () => {
        alert(this.state.username + ' : ' + this.state.message);
        this.setState({
            username: '',
            message: ''
        });
    }

    render() {
        return (
            <div>
                <h2>이벤트 핸들링</h2>
                <input type='text' name='username' placeholder='사용자명' onChange={
                    this.handleChange
                } value={this.state.username}/>
                <input type='text' name='message' placeholder='아무거나' value={this.state.message} onChange={this.handleChange} />
                <button onClick={this.handleClick}>확인</button>
            </div>
        );
    }
}

export default EventHandling;