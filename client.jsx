import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ErrorPage from './pages/Error'
import ItemPage from './pages/Item'
import NostalgiaItems from './pages/NostalgiaItems'

render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={NostalgiaItems} />
      <Route path="/item" component={ItemPage} />
      <Route path="*" component={ErrorPage} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
)
