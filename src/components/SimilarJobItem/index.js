// Write your code here
import {GiRoundStar} from 'react-icons/gi'
import {MdLocationOn} from 'react-icons/md'
import {IoBag} from 'react-icons/io5'

import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li className="similar-list-item">
      <div className="product-details-sj">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="thumbnail-sj"
        />
        <div className="title-rating-container-sj">
          <h1 className="title-sj">{title}</h1>
          <div className="rating-container-sj">
            <GiRoundStar className="star-sj" />
            <p className="rating-sj">{rating}</p>
          </div>
        </div>
      </div>
      <div className="discreption-container-sj">
        <h1 className="desc-title-sj">Description</h1>
        <p className="desc-para-sj">{jobDescription}</p>
      </div>
      <div className="location-salary-container-sj">
        <div className="location-container-sj">
          <MdLocationOn className="icon-loc-bag-sj" />
          <p className="icon-loc-bag-desc-sj">{location}</p>
          <IoBag className="icon-loc-bag-sj" />
          <p className="icon-loc-bag-desc-sj">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
