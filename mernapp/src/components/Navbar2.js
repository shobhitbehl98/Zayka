import React from 'react'
import { Link } from 'react-scroll'


function Navbar2(props) {
  return (
    <div id='navbar-example2' >

 { props.category.map((element,index) => {
   return(
     <div id="navbar-example2" className="navbar navbar-dark bg-body-tertiary px-3">
  <ul className="nav nav-pills">
    <li className="nav-item fs-5">
      <Link className="nav-link" to={element.CategoryName} smooth={true} duration={0} offset={-160} >{element.CategoryName}</Link>
    </li>
  </ul>
</div>
    )
  })
}  
  </div>
  )
}

export default Navbar2
