import {Link} from 'react-router-dom'
import {GiRoundStar} from 'react-icons/gi'
import {MdLocationOn} from 'react-icons/md'
import {IoBag} from 'react-icons/io5'

import './index.css'

const JobCard = props => {
  const {productData} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = productData

  return (
    //   Wrap with Link from react-router-dom
    <Link to={`/jobs/${id}`} className="product-item-link">
      <li className="product-item">
        <div className="product-details">
          <img src={companyLogoUrl} alt="company logo" className="thumbnail" />
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
          <h1 className="desc-title">Description</h1>
          <p className="desc-para">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobCard
