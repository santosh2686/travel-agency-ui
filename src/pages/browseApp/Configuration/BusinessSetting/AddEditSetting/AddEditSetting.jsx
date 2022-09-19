import React, { PureComponent } from 'react'
import { func, shape, string } from 'prop-types'

import {
  Layout, Button, Text, TextInput, TextArea,
} from '@base'

import { validatePayload } from '@utils'

import validationSchema from './validation/schema.js'

class AddEditSetting extends PureComponent {
  state = {
    name: '',
    comment: '',
    errorMap: {},
  }

  componentDidMount() {
    const { editedItem } = this.props
    const { _id, name, comment } = editedItem
    if (_id) {
      this.setState({
        name,
        comment,
      })
    }
  }

  changeHandler = (valueObj) => {
    this.setState(valueObj)
  }

  submitHandler = () => {
    const { name, comment } = this.state
    const { addEditHandler } = this.props
    const requestBody = {
      name,
      comment,
    }
    const { isValid, errorMap } = validatePayload(validationSchema, requestBody)
    if (isValid) {
      addEditHandler(requestBody)
    } else {
      this.setState({ errorMap })
    }
  }

  render() {
    const { name, comment, errorMap } = this.state
    const {
      closeModal, idToBeEdited, title,
    } = this.props
    return (
      <Layout classes="pad-15">
        <Text size="18">{title}</Text>
        <Layout classes="pad-t-20 pad-b-10">
          <TextInput
            type="text"
            label="Name"
            name="name"
            value={name}
            invalid={!!errorMap.name}
            errorMessage={errorMap.name}
            required
            classes="mar-b-15"
            changeHandler={this.changeHandler}
          />
          <TextArea
            name="comment"
            label="Comment"
            value={comment}
            changeHandler={this.changeHandler}
          />
        </Layout>
        <Layout flex={{ align: 'center' }}>
          <Button category="default" block classes="mar-r-10" clickHandler={closeModal}>
            Cancel
          </Button>
          <Button block classes="mar-l-10" clickHandler={this.submitHandler}>
            {idToBeEdited ? 'Update' : 'Submit'}
          </Button>
        </Layout>
      </Layout>
    )
  }
}

AddEditSetting.propTypes = {
  closeModal: func,
  addEditHandler: func,
  idToBeEdited: string,
  title: string,
  editedItem: shape({
    name: string,
  }),
}

AddEditSetting.defaultProps = {
  closeModal: () => {},
  addEditHandler: () => {},
  idToBeEdited: '',
  title: '',
  editedItem: {},
}
export default AddEditSetting
