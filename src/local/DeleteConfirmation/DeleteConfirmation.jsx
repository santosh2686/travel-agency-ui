import React, { PureComponent } from 'react'
import { func, string } from 'prop-types'

import { Button, Spinner, Layout } from '@base'

import AlertIcon from '../AlertIcon/AlertIcon.jsx'

class DeleteConfirmation extends PureComponent {
  state = {
    isLoading: false,
    done: false,
    type: 'warning',
    title: 'Are you sure?',
    message: 'This action cannot be undone and will delete the record.',
  };

  deleteRecord = () => {
    const {
      id, category, deleteAction, deleteSuccessMessage, deleteSuccessHandler,
    } = this.props
    this.setState({
      isLoading: true,
    })
    deleteAction(id, { category }).then(() => {
      this.setState({
        isLoading: false,
        done: true,
        type: 'success',
        title: 'Deleted!',
        message: deleteSuccessMessage,
      })
      deleteSuccessHandler()
    }).catch(() => {
      this.setState({
        isLoading: false,
        done: true,
        type: 'error',
        title: 'System Error!',
        message: 'System not responding, please try after some time.',
      })
    })
  };

  closeModalHandler = () => {
    const { closeModal } = this.props
    closeModal()
  };

  render() {
    const {
      title, message, type, isLoading, done,
    } = this.state
    return (
      <Layout pad="30" classes="text-center">
        {isLoading && <Spinner /> }
        {!isLoading && <AlertIcon type={type} /> }
        <Layout tag="p" pad={{ tb: 20 }} classes="font-24">{title}</Layout>
        <Layout tag="p" pad={{ b: 30 }} color="gray">{message}</Layout>
        <Button
          category={done ? 'primary' : 'default'}
          classes="mar-r-10"
          clickHandler={this.closeModalHandler}
        >
          {done ? 'Ok' : 'No, Cancel' }
        </Button>
        {!done && (
          <Button
            category="danger"
            clickHandler={this.deleteRecord}
          >
            Yes, Delete
          </Button>
        )}
      </Layout>
    )
  }
}

DeleteConfirmation.propTypes = {
  id: string,
  category: string,
  deleteSuccessMessage: string,
  deleteAction: func,
  deleteSuccessHandler: func,
  closeModal: func,
}

DeleteConfirmation.defaultProps = {
  id: '',
  category: '',
  deleteSuccessMessage: '',
  deleteAction: () => {},
  deleteSuccessHandler: () => {},
  closeModal: () => {},
}

export default DeleteConfirmation
