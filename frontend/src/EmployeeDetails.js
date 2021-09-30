import React, { Component } from 'react'

class EmployeeDetails extends Component {
    render() {
        return (
            <div>
                <div>ID: {this.props.id}</div>
                <div>Name: {this.props.name}</div>
            </div>
        )
    }
}

export { EmployeeDetails }
