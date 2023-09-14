import AllJobsSection from '../AllJobsSection'

import Header from '../Header'

import './index.css'

const Jobs = props => {
  const {employmentTypesList, salaryRangesList} = props
  return (
    <>
      <Header />
      <div className="product-sections">
        <AllJobsSection
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
        />
      </div>
    </>
  )
}

export default Jobs
