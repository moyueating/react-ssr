import React, { Component } from 'react';
import { 
  inject,
  observer
} from 'mobx-react';
import PropTypes from 'prop-types';

@inject('appStore')
@observer
export default class TopicList extends Component {

  click = () => {
    alert('clicked!')
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <p onClick={this.click}>this is topic list</p>
        <p>{this.props.appStore.AppState.msg}</p>
      </div> 
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.object
}