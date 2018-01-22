import React from "react"
import ReactDOM from "react-dom"
import "./progress.styl"

import ProTypes from 'prop-types'

class Progress extends React.Component{
  // 组件更新后重新获取进度条总宽度
  componentDidUpdate() {
    if(!this.progressBarWidth){
      this.progressBarWidth = ReactDOM.findDOMNode(this.refs.progressBar).offsetWidth;
    }
  }
  //拖拽到相应位置
  componentDidMount() {
    let progressBarDOM = ReactDOM.findDOMNode(this.refs.progressBar);
    let progressDom = ReactDOM.findDOMNode(this.refs.progress);
    let progressBtnDOM = ReactDOM.findDOMNode(this.refs.progressBtn);
    this.progressBarWidth = progressBarDOM.offsetWidth;

    // 拖拽
    let {disableButton,disableDrag,onDragStart,onDrag,onDragEnd} = this.props;
    if(disableButton !== true && disableDrag !== true){
      // 触摸开始位置
      let downX = 0;
      //按钮left值
      let buttonLeft = 0;

      progressBtnDOM.addEventListener("touchstart",(e) => {
        let touch = e.touches[0];
        downX = touch.clientX;
        buttonLeft = parseInt(touch.target.style.left,10);
        if(onDragStart){
          onDragStart();
        }
      });

      progressBtnDOM.addEventListener("touchmove",(e) => {
        e.preventDefault();
        
        let touch = e.touches[0];
        let diffX = touch.clientX - downX;

        let btnLeft = buttonLeft + diffX;
        if(btnLeft > progressBarDOM.offsetWidth){
          btnLeft = progressBarDOM.offsetWidth;
        }else if(btnLeft < 0){
          btnLeft = 0;
        }

        // 设置按钮left值
        touch.target.style.left = btnLeft + "px";
        // 设置进度width值
        progressBarDOM.style.width = btnLeft/this.progressBarWidth * 100 + "%";
        if(ondrag){
          ondrag(btnLeft / this.progressBarWidth);
        }
      });

      progressBarDOM.addEventListener("touchend",(e) => {
        if(ondragend){
          ondragend();
        }
      })
    }
  }
  render(){
    //进度值：范围0-1
    let {progress,disableButton} = this.props;
    if(!progress) progress = 0;

    //按钮left值
    let progressButtonOffsetLeft = 0;
    if(this.progressBarWidth){
      progressButtonOffsetLeft = progress * this.progressBarWidth;
    }

    return(
      <div className="progress-bar" ref="progressBar">
        <div className="progress-load"></div>
        <div className="progress" style={{width:`${progress * 100}`}} ref="progress"></div>
        {
          disableButton === true ? "" : 
          <div className="progress-button" style={{left:progressButtonOffsetLeft}} ref="progressBtn"></div>
        }
      </div>
    )
  }
}

Progress.ProTypes = {
  // 进度
  progress:ProTypes.number.isRequired,
  // 是否禁用按钮
  disableButton:ProTypes.bool,
  //是否禁用拖拽
  disableDrag:ProTypes.bool,
  onDragStart:ProTypes.func,
  onDrag:ProTypes.func,
  onDragEnd:ProTypes.func
}

export default Progress