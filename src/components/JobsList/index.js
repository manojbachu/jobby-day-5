import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'

import './index.css'

class JobsList extends Component {
  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    const {searchValue} = this.props

    console.log(searchValue)
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${''}&minimum_package=0&search=${searchValue}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
  }

  render() {
    return (
      <ul className="job-container">
        <h1>jobs</h1>
      </ul>
    )
  }
}

export default withRouter(JobsList)
