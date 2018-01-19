import React from "react"
import "./progress.styl"

import ProTypes from 'prop-types'

class Progress extends React.Component{
  componentDidUpdate() {

  }
  componentDidMount() {

  }
  render(){
    return(
      <div className="progress-bar" ref="progressBar">
        <div className="progress" style={{width:"20%"}} ref="progress"></div>
        <div className="progress-button" style={{left:"70%"}} ref="progressBtn"></div>
      </div>
    )
  }
}

export default Progress