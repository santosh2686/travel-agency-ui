import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { arrayOf, shape, string } from 'prop-types'
import ClassNames from 'classnames'

import { Layout } from '@base'

import MenuItem from './MenuItem.jsx'
import SubMenuItem from './SubMenuItem.jsx'

class Navigation extends PureComponent {
  state = {
    expandedIndex: -1,
  };

  clickHandler = (index) => {
    this.setState((prevState) => {
      const { expandedIndex } = prevState
      return {
        expandedIndex: expandedIndex === index ? -1 : index,
      }
    })
  };

  render() {
    const { navigationMenu, location: { pathname }, classes } = this.props
    const { expandedIndex } = this.state
    const navClasses = ClassNames('overflow-auto side-bar', {
      [classes]: classes,
    })
    return (
      <Layout tag="aside" bgColor="theme" classes={navClasses}>
        <ul>
          {navigationMenu.map((route, index) => {
            if (route.items) {
              return (
                <SubMenuItem
                  clickHandler={this.clickHandler}
                  index={index}
                  expand={expandedIndex === index}
                  pathname={pathname}
                  key={route.label}
                  item={route}
                />
              )
            }
            return (
              <MenuItem pathname={pathname} key={route.label} item={route} />
            )
          })}
        </ul>
      </Layout>
    )
  }
}

Navigation.propTypes = {
  navigationMenu: arrayOf(shape({
    label: string,
  })),
  location: shape({
    pathname: string,
  }).isRequired,
  classes: string,
}

Navigation.defaultProps = {
  navigationMenu: [],
  classes: '',
}

const NavigationWithRouter = withRouter(Navigation)

export {
  NavigationWithRouter as default,
  Navigation,
}
