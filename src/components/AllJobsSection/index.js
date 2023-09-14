import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import JobCard from '../JobCard'
import JobsHeader from '../JobsHeader'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobsSection extends Component {
  state = {
    productsList: [],
    apiStatus: apiStatusConstants.initial,
    activeTypeId: [],
    searchInput: '',
    activeRangeId: '',
    profileStatus: apiStatusConstants.initial,
    profileDetails: {},
  }

  componentDidMount() {
    this.getProducts()
    this.getProfile()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {activeTypeId, searchInput, activeRangeId} = this.state
    const stringActiveTypeId = activeTypeId.join()
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${stringActiveTypeId}&minimum_package=${activeRangeId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        productsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  getProfile = async () => {
    this.setState({
      profileStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/profile`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        profileStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        profileStatus: apiStatusConstants.failure,
      })
    }
  }

  retryProfile = () => {
    this.getProfile()
  }

  changeRange = activeRangeId => {
    this.setState({activeRangeId}, this.getProducts)
  }

  changeType = activeTypeId => {
    this.setState({activeTypeId}, this.getProducts)
  }

  enterSearchInput = () => {
    this.getProducts()
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  retryJobsDetails = () => {
    this.getProducts()
  }

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-jobs"
        onClick={this.retryJobsDetails}
      >
        Retry
      </button>
    </div>
  )

  renderProductsListView = () => {
    const {productsList, searchInput} = this.state
    const shouldShowProductsList = productsList.length > 0

    return shouldShowProductsList ? (
      <div className="all-products-container">
        <JobsHeader
          enterSearchInput={this.enterSearchInput}
          changeSearchInput={this.changeSearchInput}
          searchInput={searchInput}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <JobCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <JobsHeader
          enterSearchInput={this.enterSearchInput}
          changeSearchInput={this.changeSearchInput}
          searchInput={searchInput}
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-products-img"
          alt="no jobs"
        />
        <h1 className="no-products-heading">No Jobs Found</h1>
        <p className="no-products-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {
      profileDetails,
      profileStatus,
      searchInput,
      activeTypeId,
      activeRangeId,
    } = this.state

    return (
      <div className="all-products-section">
        <FiltersGroup
          enterSearchInput={this.enterSearchInput}
          changeSearchInput={this.changeSearchInput}
          searchInput={searchInput}
          changeType={this.changeType}
          changeRange={this.changeRange}
          retryProfile={this.retryProfile}
          profileDetails={profileDetails}
          profileStatus={profileStatus}
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
          activeTypeId={activeTypeId}
          activeRangeId={activeRangeId}
        />
        {this.renderAllProducts()}
      </div>
    )
  }
}

export default AllJobsSection
