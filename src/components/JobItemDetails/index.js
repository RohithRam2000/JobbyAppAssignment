// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {GiRoundStar} from 'react-icons/gi'
import {MdLocationOn} from 'react-icons/md'
import {IoBag} from 'react-icons/io5'
import {HiOutlineExternalLink} from 'react-icons/hi'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    JobData: {},
    similarJobsList: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        id: fetchedData.job_details.id,
        title: fetchedData.job_details.title,
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employmentType: fetchedData.job_details.employment_type,
        jobDescription: fetchedData.job_details.job_description,
        location: fetchedData.job_details.location,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
        lifeAtCompany: {
          description: fetchedData.job_details.life_at_company.description,
          imageUrl: fetchedData.job_details.life_at_company.image_url,
        },
        skills: fetchedData.job_details.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
      }
      const updatedSimilarList = fetchedData.similar_jobs.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        JobData: updatedData,
        similarJobsList: updatedSimilarList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  getJobsRoute = () => {
    this.getJobItemDetails()
  }

  renderSuccessView = () => {
    const {JobData, similarJobsList} = this.state
    const {
      title,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      lifeAtCompany,
      skills,
    } = JobData
    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="main-container-view">
        <div className="success-job-container">
          <div className="product-details">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="thumbnail"
            />
            <div className="title-rating-container">
              <h1 className="title">{title}</h1>
              <div className="rating-container">
                <GiRoundStar className="star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-salary-container">
            <div className="location-container">
              <MdLocationOn className="icon-loc-bag" />
              <p className="icon-loc-bag-desc">{location}</p>
              <IoBag className="icon-loc-bag" />
              <p className="icon-loc-bag-desc">{employmentType}</p>
            </div>
            <p className="salary-lpa">{packagePerAnnum}</p>
          </div>
          <div className="discreption-container">
            <div className="discreption-link-container">
              <h1 className="desc-title">Description</h1>
              <a
                className="link-visit"
                href={companyWebsiteUrl}
                target="_blank"
                rel="noreferrer"
              >
                Visit <HiOutlineExternalLink />
              </a>
            </div>
            <p className="desc-para">{jobDescription}</p>
          </div>
          <div className="skills-container">
            <h1 className="skills-title">Skills</h1>
            <ul className="skills-list-container">
              {skills.map(eachItem => (
                <li className="skill-item-container" key={eachItem.name}>
                  <img
                    className="skill-item-img"
                    src={eachItem.imageUrl}
                    alt={eachItem.name}
                  />
                  <p className="skill-item-name">{eachItem.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="life-office-container">
            <div className="life-office-description">
              <h1 className="skills-title">Life at Company</h1>
              <p className="desc-para">{description}</p>
            </div>
            <img
              className="life-office-img"
              src={imageUrl}
              alt="life at company"
            />
          </div>
        </div>
        <div className="similar-jobs-container">
          <h1 className="similar-jobs-title">Similar Jobs</h1>
          <ul className="similar-list-container">
            {similarJobsList.map(eachItem => (
              <SimilarJobItem similarJobDetails={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </div>
    )
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
      <button type="button" className="retry-jobs" onClick={this.getJobsRoute}>
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div data-testid="loader" className="product-item-loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderAll = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="main-product-background">{this.renderAll()}</div>
      </>
    )
  }
}

export default JobItemDetails
