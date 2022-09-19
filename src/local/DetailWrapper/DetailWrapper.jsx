import React, { PureComponent, cloneElement } from 'react'
import {
  func, node, shape, string,
} from 'prop-types'

import { Button, Layout, Spinner } from '@base'

import { AlertIcon } from '@local'

class DetailWrapper extends PureComponent {
  state = {
    isLoading: true,
    isError: false,
  }

  catchError = () => {
    this.setState({
      isError: true,
      isLoading: false,
    })
  }

  componentDidMount() {
    const { routeParams, getHandler } = this.props
    const { id } = routeParams

    getHandler(id, routeParams).then((response) => {
      this.setState({
        model: response,
        isLoading: false,
      })
    }).catch(this.catchError)
  }

  render() {
    const { children, listRoute } = this.props
    const { isLoading, isError, model } = this.state
    const childrenWithProps = cloneElement(children, {
      model,
    }, null)
    if (isLoading) {
      return (
        <Layout
          flex={{ align: 'center', justify: 'center' }}
          bgColor="white"
          pad="30"
        >
          <Spinner />
        </Layout>
      )
    }

    if (isError) {
      return (
        <Layout
          flex={{ direction: 'column', align: 'center', justify: 'center' }}
          bgColor="white"
          pad="30"
        >
          <AlertIcon type="error" />
          <Layout pad={{ tb: 20 }}>
            System not responding, please try after some time
          </Layout>
        </Layout>
      )
    }

    return (
      <>
        {childrenWithProps}
        <Layout flex={{ justify: 'end' }} pad={{ b: 15 }}>
          <Button
            asLink
            category="default"
            classes="mar-r-10"
            href={listRoute}
          >
            Cancel
          </Button>
        </Layout>
      </>
    )
  }
}

DetailWrapper.propTypes = {
  getHandler: func.isRequired,
  routeParams: shape({
    category: string,
  }),
  children: node.isRequired,
  listRoute: string,
}

DetailWrapper.defaultProps = {
  routeParams: {},
  listRoute: '/',
}

export default DetailWrapper
