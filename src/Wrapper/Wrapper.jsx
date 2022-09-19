import React from 'react'
import { bool } from 'prop-types'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapStateToProps } from './wrapper.conf'

import BrowseApp from './BrowseApp.jsx'
import Authentication from './Authentication.jsx'

const Wrapper = ({ isLoggedIn }) => (
  <BrowserRouter>
    <Route
      render={(props) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        isLoggedIn ? <BrowseApp {...props} /> : <Authentication {...props} />
      )}
    />
  </BrowserRouter>
)

Wrapper.propTypes = {
  isLoggedIn: bool,
}

Wrapper.defaultProps = {
  isLoggedIn: false,
}

const WrapperWithConnect = connect(mapStateToProps, null)(Wrapper)

export {
  WrapperWithConnect as default,
  Wrapper,
}
