import { graphql } from 'react-apollo'
import React, { Fragment, Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import { currentUser } from '~src/shared/graphql/queries'
import HeaderContainer from '~src/shared/Containers/HeaderContainer'
import routes from './routes'

if (process.browser) {
  require('styles/global.scss')
}

class AppRouter extends Component {
  filterPrivateRoutes = (userIsLogged, needAuthentication, route) =>
   (userIsLogged || (!userIsLogged && !needAuthentication) ||
   (typeof needAuthentication === 'undefined')) && route

  // Signup and login not accessible when logged. Not redirect on homepage
  filterPublicRoutes = ({ needAuthentication, userIsLogged, path, props, Component }) =>
    (!needAuthentication && userIsLogged) && (path !== '/')
      ? <Redirect to='/' />
      : <Component {...props} />

  renderRoutes = (userIsLogged) =>
    routes.map(({ Component, path, needAuthentication }, index) =>
      this.filterPrivateRoutes(userIsLogged, needAuthentication, <Route
        key={index}
        exact
        path={path}
        render={props => this.filterPublicRoutes({ needAuthentication, userIsLogged, path, props, Component })}
      />))

  redirectIfExist = () =>
    routes.find(({ path }) => this.props.location.pathname === path)

  shouldComponentUpdate(nextProps) {
    // Avoid re-render on graphql query the currentUser before push the to history
    return !(this.props.location.pathname === nextProps.location.pathname && (this.props.location.state || {}.from))
  }

  render() {
    const { data: { currentUser }, location } = this.props

    return (
      <Fragment>
        <div className='approuter'>
          <HeaderContainer currentUser={currentUser} />
          <Switch>
            {this.renderRoutes(!!currentUser)}
            {<Redirect to={{
              pathname: '/login',
              state: { from: this.redirectIfExist() && location.pathname }
            }}
            />
            }
          </Switch>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(graphql(currentUser)(AppRouter))
