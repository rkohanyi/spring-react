import './App.css'
import { EmployeeDetails } from './EmployeeDetails.js'
import { LoginComponent } from './LoginComponent.js'
import React, { Component } from 'react'

const defaultOptions = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  }
}

class EmployeeDepartments extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  fetchDepartments() {
    fetch(`/employees/${this.props.id}`, defaultOptions)
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
      loggedIn: false,
      employees: [],
    }
  }

  componentDidMount() {
    // const loggedIn = localStorage.getItem('loggedIn')
    // if (loggedIn && loggedIn === 'true') {
    //   this.setState({
    //     loggedIn: true
    //   })
    // } else {
    //   this.setState({
    //     loggedIn: false
    //   })
    // }
    fetch('/auth', { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
      .then(res => res.json())
      .then(_ => {
        this.setState({
          loggedIn: true
        })
      })
      .catch((err) => {
        this.setState({
          loggedIn: false
        })
      })
  }

  componentDidUpdate() {
    if (this.state.loggedIn) {
      fetch('/departments', defaultOptions)
        .then(res => res.json())
        .then(json => {
          console.log('HELLO', json)
        })
        .catch((err) => {
          console.log('NOT HELLO', err)
        })
    }
    if (this.state.loggedIn && this.state.employees.length === 0) {
      fetch('/employees', defaultOptions)
        .then(res => res.json())
        .then(json => {
          this.setState({
            employees: json
          })
        })
        .catch((err) => {
          console.log('asdasd', err)
        })
    }
  }

  handleLogin(ok) {
    this.setState({
      loggedIn: ok
    })
    if (ok) {
      localStorage.setItem('loggedIn', 'true')
    } else {
      localStorage.clear()
    }
  }

  render() {
    let topComponent
    if (this.state.loggedIn) {
      topComponent = this.state.employees
        .map(employee => (
          <div key={employee.id}>
            <EmployeeDetails id={employee.id} name={employee.name}></EmployeeDetails>
            <EmployeeDepartments id={employee.id} name={employee.name}></EmployeeDepartments>
          </div>
        ))
    } else {
      topComponent = <LoginComponent onLogin={(ok) => this.handleLogin(ok)}></LoginComponent>
    }
    return (
      <div className="App">
        {topComponent}
      </div>
    )
  }
}

export default App
