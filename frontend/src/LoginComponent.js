import React, { Component } from 'react'

class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            message: '',
        }
    }

    initiateLogin() {
        fetch('/auth', {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': 'Basic ' + btoa(this.state.username + ":" + this.state.password)
            }
        })
            .then(res => res.json())
            .then(_ => {
                this.setState({
                    message: ''
                })
                this.props.onLogin(true)
            })
            .catch(_ => {
                this.setState({
                    message: 'Bad login'
                })
            })
    }

    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        })
    }

    render() {
        return (
            <div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input name="username" value={this.state.username} onChange={(event) => this.handleUsernameChange(event)} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" value={this.state.password} onChange={(event) => this.handlePasswordChange(event)} />
                </div>
                <button onClick={() => this.initiateLogin()}>Login</button>
                {this.state.message && <h1>{this.state.message}</h1>}
            </div>
        )
    }
}

export { LoginComponent }
