import React, { Component } from 'react';
import { 
  inject,
  observer
} from 'mobx-react';
import PropTypes from 'prop-types';
import axios from 'axios';

@inject('appStore')
@observer
export default class TopicList extends Component {

  click = () => {
    alert('clicked!')
  }

  componentDidMount() {
    axios.get('https://cnodejs.org/api/v1/topics').then(res => {
      console.log(res)
    })
  }

  login = () => {
    axios.post('https://cnodejs.org/api/v1/accesstoken', {
      accesstoken: ''
    }).then(res => {
      console.log(res)
    })
  }

  mark = () => {
    axios.post('https://cnodejs.org/api/v1/message/mark_all', {
      accesstoken: ''
    }).then(res => {
      console.log(res)
    })
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <p onClick={this.click}>this is topic list</p>
        <button onClick={this.login}>login</button>
        <button onClick={this.mark}>mark all</button>
      </div> 
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.object
}