import logo from './logo.svg'
import './App.css'
import { EmployeeDetails } from './EmployeeDetails.js'
import React, { Component } from 'react'

class EmployeeDepartments extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  fetchDepartments() {
    fetch(`/employees/${this.props.id}`)
    .then(res => res.json())
    .then(json => {
      this.setState({
        departments: json.departments
      })
    })
  }

  render() {
    let departmentList
    if (this.state.departments && this.state.departments.length > 0) {
      const departmentListItems = this.state.departments.map(department => (
        <li key={department.id}>{department.id} - {department.name}</li>
      ))
      departmentList = (
        <ul>
          {departmentListItems}
        </ul>
      )
    } else if (this.state.departments && this.state.departments.length === 0) {
      departmentList = <div>No departments</div>
    } else {
      departmentList = <div>No data yet</div>
    }

    return (
      <div>
          <button onClick={() => this.fetchDepartments()}>Fetch {this.props.name}'s departments</button>
          {departmentList}
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      employees: [],
    }
  }

  componentDidMount() {
    fetch('/employees')
      .then(res => res.json())
      .then(json => {
        this.setState({
          employees: json
        })
      })
  }

  render() {
    const employeesComponent = this.state.employees
      .map(employee => (
        <div key={employee.id}>
          <EmployeeDetails id={employee.id} name={employee.name}></EmployeeDetails>
          <EmployeeDepartments id={employee.id} name={employee.name}></EmployeeDepartments>
        </div>
      ))

    return (
      <div className="App">
        {employeesComponent}
      </div>
    )
  }
}

export default App
