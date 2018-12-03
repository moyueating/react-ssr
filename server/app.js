import React from 'react';
import { StaticRouter } from 'react-router';
import Routes from '../client/routes';


export default () => {
  return (
    <StaticRouter
      location={req.url}
      context={{}}
    >
      <Routes />
    </StaticRouter>  
  )
}