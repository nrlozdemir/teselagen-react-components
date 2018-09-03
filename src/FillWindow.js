import React from "react";
import rerenderOnWindowResize from "./rerenderOnWindowResize";

// use like: 
// <FillWindow>
//         {({ width, height }) => {
//           return <div style={{width, height}}></div>
//         }
// <FillWindow/>


export default class FillWindow extends React.Component {
  constructor(props){
    super(props)
    rerenderOnWindowResize(this)
  }
  // this is left here for posterity. componentDidMount didn't work before commit ee1853a5ae2e6e27b720dd225650cc2154076db5 "fixing rerenderOnWindowResize to bind this keyword correctly"
  // componentDidMount(){ 
  //   this.setState({thomas: "realCool"})
  // }

  render () {
    let w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName("body")[0],
      width = w.innerWidth || e.clientWidth || g.clientWidth,
      height = w.innerHeight || e.clientHeight || g.clientHeight;
    const windowDimensions = {
      width,
      height
    };
    const {containerStyle={}} = this.props
    if (this.props.disabled) return this.props.children(windowDimensions)
    return (
      <div style={{width, height, position: "fixed", top: 0, left: 0, background: "white", ...containerStyle  }}>
        {this.props.children && this.props.children(windowDimensions)}
      </div>
      
    )
  }
}