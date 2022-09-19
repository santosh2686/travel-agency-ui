import React, { PureComponent, cloneElement } from 'react'
import {
  arrayOf, bool, func, node, shape, string,
} from 'prop-types'
import update from 'immutability-helper'

import { validatePayload } from '@utils'

import {
  Alert, Button, Layout, Spinner,
} from '@base'

import { Message } from '@local'

class AddEditWrapper extends PureComponent {
  state = {
    model: {},
    editModel: {},
    errorMap: {},
    isLoading: true,
    showMessage: false,
    isValidationError: false,
    alertType: 'success',
  }

  catchError = () => {
    this.setState({
      showMessage: true,
      isLoading: false,
      alertType: 'error',
    })
  }

  componentDidMount() {
    const {
      routeParams, model, getHandler, isEdit,
    } = this.props
    const { id } = routeParams
    if (isEdit) {
      getHandler(id, routeParams).then((response) => {
        this.setState({ model: response, isLoading: false })
      }).catch(this.catchError)
    } else {
      this.setState({ model, isLoading: false })
    }
  }

  changeHandler = (valueObj) => {
    const { isEdit } = this.props
    const newObj = {
      model: valueObj,
    }

    if (isEdit) {
      newObj.editModel = valueObj
    }
    this.setState((prevState) => update(prevState, newObj))
  }

  submitHandler = () => {
    this.setState({ isLoading: true })
    const { model, editModel } = this.state
    const {
      validationSchema, routeParams, validationParams, createHandler, updateHandler, isEdit,
    } = this.props
    const { isValid, errorMap } = validatePayload(validationSchema, model, validationParams, model)
    if (!isValid) {
      this.setState({
        isLoading: false,
        isValidationError: true,
        errorMap,
      })
      return
    }

    const { id } = routeParams
    const apiAction = isEdit ? updateHandler(id, editModel, routeParams)
      : createHandler(model, routeParams)
    apiAction.then(() => {
      this.setState({
        isLoading: false,
        model: {},
        showMessage: true,
        alertType: 'success',
      })
    }).catch(this.catchError)
  }

  closeHandler = () => {
    this.setState({
      showMessage: false,
      errorMap: {},
    })
  }

  errorMapChangeHandler = (errorMap, validationError) => {
    this.setState({
      errorMap,
      isValidationError: validationError,
    })
  }

  render() {
    const {
      model, errorMap, isValidationError,
      isLoading, showMessage, alertType,
    } = this.state
    const {
      children, successMessage, listRoute, isEdit,
    } = this.props

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

    if (showMessage) {
      return (
        <Message
          type={alertType}
          message={successMessage}
          buttonLabel="Go to list"
          listRoute={listRoute}
          closeHandler={this.closeHandler}
        />
      )
    }

    const childrenWithProps = cloneElement(children, {
      changeHandler: this.changeHandler,
      errorMapChangeHandler: this.errorMapChangeHandler,
      model,
      errorMap,
    }, null)

    return (
      <>
        {isValidationError && (
          <Alert
            type="error"
            message="There is an error with submission, please correct errors indicated below."
            classes="mar-b-15"
          />
        )}
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
          <Button clickHandler={this.submitHandler}>
            {isEdit ? 'Update' : 'Submit'}
          </Button>
        </Layout>
      </>
    )
  }
}

AddEditWrapper.propTypes = {
  getHandler: func.isRequired,
  createHandler: func.isRequired,
  updateHandler: func.isRequired,
  children: node.isRequired,
  isEdit: bool,
  validationSchema: arrayOf(shape({
    message: string,
    path: string,
  })),
  routeParams: shape({
    category: string,
  }),
  model: shape({
    comment: string,
  }),
  validationParams: shape({
    categoryName: string,
  }),
  successMessage: string,
  listRoute: string.isRequired,
}

AddEditWrapper.defaultProps = {
  isEdit: false,
  validationSchema: [],
  routeParams: {},
  model: {},
  validationParams: {},
  successMessage: 'successful',
}

export default AddEditWrapper
