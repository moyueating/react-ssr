import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './app';
import { AppContainer } from 'react-hot-loader';


const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )

}
render(App)

if(module.hot){
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default
    render(NextApp)
  })
}

