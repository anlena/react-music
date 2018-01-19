import React from 'react'
import "./header.styl"

class MusicHeader extends React.Component{
  handleClick(){
    window.history.back();
  }

  render(){
    return(
      <div className="musci-header">
        <span className="header-back" onclick={this.handleClick}>
          <i className="icon-back"></i>
        </span>
        <div className="header-title">{this.props.title}</div>
      </div>
    )
  }
}

export default MusicHeader