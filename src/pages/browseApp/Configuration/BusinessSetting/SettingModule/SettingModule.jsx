import React, { PureComponent } from 'react'
import {
  arrayOf, func, string, shape,
} from 'prop-types'

import {
  Button, Layout, Table, Icon, Modal,
} from '@base'

import AddEditSetting from '../AddEditSetting/AddEditSetting.jsx'
import DeleteSetting from '../DeleteSetting/DeleteSetting.jsx'

class SettingModule extends PureComponent {
  state = {
    showDeleteConfirmation: false,
    showAddEditModal: false,
    deleteLoading: false,
    addLoading: false,
    editLoading: false,
    idToBeDeleted: '',
    idToBeEdited: '',
    editedItem: {},
  }

  addHandler = () => {
    this.setState({ showAddEditModal: true })
  }

  addItem = (requestBody) => {
    const { createAppConfig, mapKey } = this.props
    this.setState({
      showAddEditModal: false, addLoading: true,
    })
    createAppConfig(mapKey, requestBody).then(() => {
      this.setState({ addLoading: false })
    })
  }

  editItem = (requestBody) => {
    const { idToBeEdited } = this.state
    const { updateAppConfig, mapKey } = this.props
    this.setState({
      showAddEditModal: false, editLoading: true,
    })
    const updatedRequestBody = {
      ...requestBody,
      key: mapKey,
    }
    updateAppConfig(mapKey, idToBeEdited, updatedRequestBody).then(() => {
      this.setState({ editLoading: false })
    })
  }

  onAddEditItem = (requestBody) => {
    const { idToBeEdited } = this.state
    if (idToBeEdited) {
      this.editItem(requestBody)
    } else {
      this.addItem(requestBody)
    }
  }

  editHandler = (item) => {
    const { _id } = item
    this.setState({
      showAddEditModal: true,
      idToBeEdited: _id,
      editedItem: item,
    })
  }

  deleteHandler = (idToBeDeleted) => {
    this.setState({
      showDeleteConfirmation: true,
      idToBeDeleted,
    })
  }

  onDeleteConfirmation = () => {
    this.setState({
      showDeleteConfirmation: false, deleteLoading: true,
    })
    const { idToBeDeleted } = this.state
    const { deleteAppConfig, mapKey } = this.props
    deleteAppConfig(mapKey, idToBeDeleted).then(() => {
      this.setState({
        idToBeDeleted: '', deleteLoading: false,
      })
    })
  }

  modalCloseHandler = () => {
    this.setState({
      showDeleteConfirmation: false,
      showAddEditModal: false,
      idToBeDeleted: '',
      idToBeEdited: '',
      editedItem: {},
    })
  }

  render() {
    const {
      showDeleteConfirmation, idToBeDeleted, deleteLoading, addLoading,
      showAddEditModal, editLoading, idToBeEdited, editedItem,
    } = this.state
    const { title, data } = this.props
    const columns = [{
      label: 'Name',
      map: 'name',
    },
    {
      label: 'comment',
      map: 'comment',
    },
    {
      label: 'action',
      classes: 'table-action text-right',
      custom: (item = {}) => {
        const { _id } = item
        return (
          <>
            <Button
              size="small"
              classes="mar-r-5"
              loading={idToBeEdited === _id && editLoading}
              clickHandler={() => this.editHandler(item)}
            >
              <Icon name="pencil" color="white" />
            </Button>
            <Button
              category="danger"
              size="small"
              loading={idToBeDeleted === _id && deleteLoading}
              clickHandler={() => this.deleteHandler(_id)}
            >
              <Icon name="trash" color="white" />
            </Button>
          </>
        )
      },
    }]

    return (
      <>
        <Layout classes="pad-15 mar-b-15 bg-white">
          <Layout
            flex={{ align: 'center', justify: 'space-between' }}
            classes="bor-b-gray-light pad-b-5 font-16"
          >
            {title}
            <Button
              loading={addLoading}
              clickHandler={this.addHandler}
            >
              + Add
            </Button>
          </Layout>
          <Layout>
            <Table
              data={data}
              columns={columns}
            />
          </Layout>
        </Layout>
        <Modal
          size="small"
          show={showDeleteConfirmation}
          closeHandler={this.modalCloseHandler}
        >
          <DeleteSetting deleteHandler={this.onDeleteConfirmation} />
        </Modal>
        <Modal
          size="small"
          show={showAddEditModal}
          closeHandler={this.modalCloseHandler}
        >
          <AddEditSetting
            title={title}
            editedItem={editedItem}
            idToBeEdited={idToBeEdited}
            addEditHandler={this.onAddEditItem}
          />
        </Modal>
      </>
    )
  }
}

SettingModule.propTypes = {
  deleteAppConfig: func,
  createAppConfig: func,
  updateAppConfig: func,
  title: string,
  mapKey: string.isRequired,
  data: arrayOf(shape({ name: string })),
}

SettingModule.defaultProps = {
  title: '',
  deleteAppConfig: () => {},
  createAppConfig: () => {},
  updateAppConfig: () => {},
  data: [],
}

export default SettingModule
