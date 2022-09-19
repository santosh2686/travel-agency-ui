import React from 'react'
import { func } from 'prop-types'

import { Layout, Button, Text } from '@base'

const DeleteSetting = ({ closeModal, deleteHandler }) => (
  <Layout classes="pad-15">
    <Text tag="h4" size="22">Are you sure?</Text>
    <Text tag="p" color="gray" classes="pad-tb-15">
      This action cannot be undone and will delete the record.
    </Text>
    <Layout flex={{ align: 'center' }}>
      <Button category="default" block classes="mar-r-10" clickHandler={closeModal}>
        Cancel
      </Button>
      <Button block category="danger" classes="mar-l-10" clickHandler={deleteHandler}>
        Yes, delete
      </Button>
    </Layout>
  </Layout>
)

DeleteSetting.propTypes = {
  closeModal: func,
  deleteHandler: func,
}

DeleteSetting.defaultProps = {
  closeModal: () => {},
  deleteHandler: () => {},
}

export default DeleteSetting
