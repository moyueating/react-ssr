import React from 'react';
import { StaticRouter } from 'react-router';
import Routes from '../client/routes';
import { Provider, useStaticRendering } from 'mobx-react';
import {createStore} from '../client/store';
import appConfig from '../app.config'

useStaticRendering(true)

export default (stores, url, routerContext) => {
  
  return (
    <Provider appStore={stores}>
      <StaticRouter
        basename={appConfig.basename}
        location={url}
        context={routerContext}
      >
        <Routes />
      </StaticRouter>  
    </Provider>
  )
}

export { createStore }