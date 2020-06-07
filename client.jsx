import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NostalgiaItems from './components/NostalgiaItems'

render(
  <BrowserRouter>
    <Switch>
      <Route path="/" component={NostalgiaItems} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
)
