import React from "react"
import Title from "./Title"
import { FaAlignRight, FaAngleDoubleRight } from "react-icons/fa"
import { graphql, useStaticQuery } from "gatsby"
import { Link } from "gatsby"

const query = graphql`
  {
    allStrapiJobs(sort: {fields: strapiId, order: ASC}) {
      nodes {
        strapiId
        company
        date
        position
        desc {
          id
          name
        }
      }
    }
  }
`

const Jobs = () => {
  const data = useStaticQuery(query)
  //console.log(data)
  const { allStrapiJobs: {nodes: jobs }} = data;
  //console.log(jobs)
  const [ value, setValue ] = React.useState(0)
  const { company, position, date, desc } = jobs[value];
  //console.log(company,position,date,desc)

  return <section className="section jobs">
    <Title title="experience" />
    <div className="jobs-center">
        {/* btn container */}
        <div className="btn-container">
          {jobs.map((item, index) => {
            return (
            <button 
              key={item.strapiId} 
              onClick={() => setValue(index)}
              className={`job-btn ${index === value 
                && "active-btn"}`}
            >{item.company}
            </button>)
          })}
        </div>
        {/* job info */}
        <article className="job-info">
          <h3>{position}</h3>
          <h4>{company}</h4>
          <p className="job-date">{date}</p>
          {
            desc.map( item => {
              return (
              <div key={item.id} className="job-desc">
                <FaAngleDoubleRight className="job-icon">
                </FaAngleDoubleRight>
                <p>{item.name}</p>
              </div>
              )
            })
          }
        </article>
    </div>
    <Link to="/about" className="btn center-btn">More Info</Link>
  </section>
}

export default Jobs
