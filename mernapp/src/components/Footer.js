import React from 'react'
import { Link } from 'react-router-dom'


export default function Footer() {
  return (
    <div><footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div className="col-md-4 d-flex align-items-center">
      <span style={{marginRight:'1rem',marginLeft:'1rem'}} className="text-muted">© { new Date().getFullYear() } {process.env.REACT_APP_TITLE}, Inc</span>
      <Link to="https://github.com/shobhitbehl98/Zayka" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">Github
      </Link>
    </div>

    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
    </ul>
  </footer></div>
  )
}
