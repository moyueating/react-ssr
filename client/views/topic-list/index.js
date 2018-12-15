import React, { Component } from 'react';
import { 
  inject,
  observer
} from 'mobx-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Helmet } from "react-helmet";

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
        this.props.appStore.global.count = 8
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
    this.props.appStore.global.add()
  }  

  render() {
    // console.log(this.props)
    // console.log('ssss', this.props.appStore.global.count)
    console.log('render')
    return (
      <div>
        <Helmet>
          <title>cnode topic list</title>
          <meta name="keywords" content="react ssr" />
        </Helmet>
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