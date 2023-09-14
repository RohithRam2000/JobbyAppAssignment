import {BsSearch} from 'react-icons/bs'

import './index.css'

const JobsHeader = props => {
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
      <div className="search-input-container-header">
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

  return <div className="products-header">{renderSearchInput()}</div>
}

export default JobsHeader
