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

  componentDidMount() {
    axios.get('/api/topics').then(res => {
      console.log(res)
    })
  }

  bootstrap() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.props.appStore.global.count = 3
        resolve(true)
      })
    })
  }

  click = () => {
    alert('clicked!')
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
    console.log( this.props.appStore.global.count)
    return (
      <div>
        <p onClick={this.click}>this is topic list</p>
        <p>{this.props.appStore.global.count}</p>
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