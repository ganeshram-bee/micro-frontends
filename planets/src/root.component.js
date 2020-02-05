import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
// import PlanetPage from './planets-page/planets-page.component.js'
import loadable from 'react-loadable';

const LoadingComponent = () => <h3>Loading...</h3>;
const planetPagePromise = () => {
  return import('./planets-page/planets-page.component.js');
}

const AsyncPlanetPage = loadable({
  loader: planetPagePromise,
  loading: LoadingComponent
});

export default class Root extends React.Component {

  state = {
    hasError: false
  }

  componentDidCatch (error, info) {
    this.setState({hasError: true})
  }

  render () {
    return (
      this.state.hasError ? (
        <div>
          Error
        </div>
      ) : (
        <BrowserRouter>
          <Route
            path='/planets'
            component={AsyncPlanetPage}
          />
        </BrowserRouter>
      )
    )
  }
}
