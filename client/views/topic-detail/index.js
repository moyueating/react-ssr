import React, { Component } from 'react';


export default class TopicDetail extends Component {

  click = () => {
    alert('clicked!')
  }

  render() {
    return (
      <div>
        <p onClick={this.click}>this is topic detail</p>
      </div> 
    )
  }
}