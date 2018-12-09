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
    axios.get('/api/topics').then(res => {
      console.log(res)
    })
  }

  login = () => {
    axios.post('/api/user/login', {
      accessToken: ''
    }).then(res => {
      console.log(res)
    })
  }

  mark = () => {
    axios.post('/api/message/mark_all?needAccessToken=true').then(res => {
      console.log(res)
    })
  }

  mobx = () => {
    this.props.appStore.appState.add()
  }  

  render() {
    // console.log(this.props)
    return (
      <div>
        <p onClick={this.click}>this is topic list</p>
        <p>{this.props.appStore.appState.count}</p>
        <p>{this.props.appStore.appState.count}</p>
        <p>{this.props.appStore.appState.count}</p>
        <button onClick={this.mobx}>test mobx</button>
        <button onClick={this.login}>login</button>
        <button onClick={this.mark}>mark all</button>
      </div> 
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.object
}