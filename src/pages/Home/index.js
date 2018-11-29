import React, { Component } from 'react';


export default class Home extends Component {

  click = () => {
    alert('clicked!')
  }

  render() {
    return (
      <div>
        <p onClick={this.click}>原创标签d</p>
      </div>
    )
  }
}