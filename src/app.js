import React from 'react';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// const history = createBrowserHistory({
//   basename: '/'
// });

export default () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  )
}