import React, { Component } from 'react';


export default class Home extends Component {

  click = () => {
    alert('clicked!')
  }

  render() {
    return (
      <div>
        <p onClick={this.click}>原创标签 好的 水电费</p>
      </div> 
    )
  }
}