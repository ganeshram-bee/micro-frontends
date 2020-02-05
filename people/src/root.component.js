import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import loadable from 'react-loadable';
// import PeoplePage from './people-page/people-page.component.js'

const LoadingComponent = () => <h3>Loading...</h3>;
const peoplePagePromise = () => {
  return import('./people-page/people-page.component.js');
}

const AsyncPeoplePage = loadable({
  loader: peoplePagePromise,
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
            path='/people'
            component={AsyncPeoplePage}
          />
        </BrowserRouter>
      )
    )
  }
}
