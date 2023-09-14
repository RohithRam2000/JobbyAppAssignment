import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import './index.css'

const FiltersGroup = props => {
  const onRetryProfile = () => {
    const {retryProfile} = props
    retryProfile()
  }

  const renderProfile = () => {
    const {profileDetails, profileStatus} = props
    const {name, profileImageUrl, shortBio} = profileDetails

    switch (profileStatus) {
      case 'SUCCESS':
        return (
          <div className="profile-container">
            <div className="bg-profile-container">
              <img
                src={profileImageUrl}
                alt="profile"
                className="profile-img"
              />
              <h1 className="profile-name">{name}</h1>
              <p className="profile-bio">{shortBio}</p>
            </div>
          </div>
        )
      case 'FAILURE':
        return (
          <div className="profile-container">
            <button
              className="retry-btn"
              type="button"
              onClick={onRetryProfile}
            >
              Retry
            </button>
          </div>
        )
      case 'IN_PROGRESS':
        return (
          <div className="products-loader-container23" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      default:
        return null
    }
  }

  const renderSalaryRangeList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(range => {
      const {changeRange, activeRangeId} = props
      const onClickRatingItem = () => {
        changeRange(range.salaryRangeId)
      }
      const isActive = activeRangeId === range.salaryRangeId

      return (
        <li
          className="rating-item"
          key={range.salaryRangeId}
          onClick={onClickRatingItem}
        >
          <input
            type="radio"
            id={range.salaryRangeId}
            name="salary_range"
            value={range.salaryRangeId}
            onClick={onClickRatingItem}
            className="check-box-item"
            checked={isActive}
          />
          <label htmlFor={range.salaryRangeId} onClick={onClickRatingItem}>
            {range.label}
          </label>
          <br />
        </li>
      )
    })
  }

  const renderSalaryRange = () => (
    <div>
      <h1 className="rating-heading">Salary Range</h1>
      <ul className="ratings-list">{renderSalaryRangeList()}</ul>
    </div>
  )

  const renderEmployeeTypeList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(employment => {
      const {changeType, activeTypeId} = props
      const onClickTypeItem = event => {
        if (activeTypeId.includes(employment.employmentTypeId)) {
          if (event.target.checked === false) {
            const newTypelist = activeTypeId.filter(
              item => item !== employment.employmentTypeId,
            )
            changeType(newTypelist)
          } else {
            changeType(activeTypeId)
          }
        } else {
          const newTypelist = activeTypeId.push(employment.employmentTypeId)
          changeType(newTypelist)
        }
      }

      return (
        <li
          className="category-item"
          key={employment.employmentTypeId}
          onChange={onClickTypeItem}
        >
          <input
            type="checkbox"
            id={employment.employmentTypeId}
            value={employment.employmentTypeId}
            onChange={onClickTypeItem}
            className="check-box-item"
          />
          <label
            htmlFor={employment.employmentTypeId}
            onChange={onClickTypeItem}
          >
            {employment.label}
          </label>
          <br />
        </li>
      )
    })
  }

  const renderEmployeeType = () => (
    <>
      <h1 className="category-heading">Type of Employment</h1>
      <ul className="categories-list">{renderEmployeeTypeList()}</ul>
    </>
  )

  const onEnterSearchInput = event => {
    const {enterSearchInput} = props
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onEnterSearchInput2 = () => {
    const {enterSearchInput} = props
    enterSearchInput()
  }

  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  }

  const renderSearchInput = () => {
    const {searchInput} = props
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <button
          className="btn-search"
          type="button"
          onClick={onEnterSearchInput2}
          data-testid="searchButton"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  return (
    <div className="filters-group-container">
      {renderSearchInput()}
      {renderProfile()}
      {renderEmployeeType()}
      {renderSalaryRange()}
    </div>
  )
}

export default FiltersGroup
