import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import ProfileAndSortOptions from '../ProfileAndSortOptions'

import './index.css'

class Jobs extends Component {
  state = {
    searchInput: '',
    searchValue: '',
    employmentType: [],
    salaryRange: 0,
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    const {searchValue, employmentType, salaryRange} = this.state

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchValue}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
  }

  salaryRange = id => {
    this.setState({salaryRange: id})
  }

  selectEmploymentType = id => {
    const {employmentType} = this.state

    const isNotInList = employmentType.filter(each => each === id)
    if (isNotInList.length === 0) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, id],
        }),
        this.getJobs,
      )
    } else {
      this.setState(
        {
          employmentType: employmentType.filter(each => each !== id),
        },
        this.getJobs,
      )
    }
  }

  onClickSearch = event => {
    const {searchInput} = this.state

    if (event.key === 'enter') {
      this.setState({searchValue: searchInput}, this.getJobs)
    } else {
      this.setState({searchValue: searchInput}, this.getJobs)
    }
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  renderJobs = () => (
    <ul className="job-container">
      <h1>jobs</h1>
    </ul>
  )

  render() {
    const {searchInput} = this.state

    return (
      <>
        <Header />
        <div className="jobs">
          <div className="jobs-search-container search-sm">
            <input
              type="search"
              className="search-input"
              placeholder="Search"
              onChange={this.onChangeSearch}
              value={searchInput}
            />

            <button
              type="button"
              data-testid="searchButton"
              className="search-button"
              onClick={this.onClickSearch}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="jobs-container">
            <ProfileAndSortOptions
              selectEmploymentType={this.selectEmploymentType}
              selectPackage={this.selectPackage}
            />
            <>
              <div className="jobs-search-container search-lg">
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  onChange={this.onChangeSearch}
                  value={searchInput}
                />
                <button
                  type="button"
                  data-testid="searchButton"
                  className="search-button"
                  onClick={this.onClickSearch}
                  onKeyDown={this.onClickSearch}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {this.renderJobs()}
            </>
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
