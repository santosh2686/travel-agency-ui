import React from 'react'
import {
  arrayOf, func, shape, string,
} from 'prop-types'
import { connect } from 'react-redux'

import { Row, Col } from '@base'
import { PageHeader } from '@local'

import SettingModule from './SettingModule/SettingModule.jsx'
import { actions, mapStateToProps } from './businessSetting.conf'

const BusinessSetting = ({
  configuration,
  createAppConfig,
  updateAppConfig,
  deleteAppConfig,
}) => {
  const breadCrumbData = [{
    label: 'Home',
    route: '/dashboard',
  },
  {
    label: 'Business settings',
  }]

  const {
    customerCategory, expenseCategory, packageCategory, vehicleCategory,
    staffCategory, expenseType, paymentMethod, vehicleType,
  } = configuration

  return (
    <>
      <PageHeader
        title="Business settings"
        withBreadCrumb
        breadCrumbData={breadCrumbData}
      />
      <Row>
        <Col col={{ xs: 12, md: 6 }}>
          <SettingModule
            mapKey="customerCategory"
            data={customerCategory}
            title="Customer category"
            createAppConfig={createAppConfig}
            updateAppConfig={updateAppConfig}
            deleteAppConfig={deleteAppConfig}
          />
          <SettingModule
            mapKey="expenseCategory"
            data={expenseCategory}
            title="Expense category"
            createAppConfig={createAppConfig}
            updateAppConfig={updateAppConfig}
            deleteAppConfig={deleteAppConfig}
          />
          <SettingModule
            mapKey="packageCategory"
            data={packageCategory}
            title="Package category"
            createAppConfig={createAppConfig}
            updateAppConfig={updateAppConfig}
            deleteAppConfig={deleteAppConfig}
          />
          <SettingModule
            mapKey="staffCategory"
            data={staffCategory}
            title="Staff category"
            createAppConfig={createAppConfig}
            updateAppConfig={updateAppConfig}
            deleteAppConfig={deleteAppConfig}
          />
        </Col>
        <Col col={{ xs: 12, md: 6 }}>
          <SettingModule
            mapKey="vehicleCategory"
            data={vehicleCategory}
            title="Vehicle category"
            createAppConfig={createAppConfig}
            updateAppConfig={updateAppConfig}
            deleteAppConfig={deleteAppConfig}
          />
          <SettingModule
            mapKey="paymentMethod"
            data={paymentMethod}
            title="Payment method"
            createAppConfig={createAppConfig}
            updateAppConfig={updateAppConfig}
            deleteAppConfig={deleteAppConfig}
          />
          <SettingModule
            mapKey="expenseType"
            data={expenseType}
            title="Expense type"
            createAppConfig={createAppConfig}
            updateAppConfig={updateAppConfig}
            deleteAppConfig={deleteAppConfig}
          />
          <SettingModule
            mapKey="vehicleType"
            data={vehicleType}
            title="Vehicle type"
            createAppConfig={createAppConfig}
            updateAppConfig={updateAppConfig}
            deleteAppConfig={deleteAppConfig}
          />
        </Col>
      </Row>
    </>
  )
}

BusinessSetting.propTypes = {
  configuration: shape({
    customerCategory: arrayOf(shape({ name: string })),
  }),
  createAppConfig: func.isRequired,
  updateAppConfig: func.isRequired,
  deleteAppConfig: func.isRequired,
}

BusinessSetting.defaultProps = {
  configuration: {},
}

const BusinessSettingWithConnect = connect(mapStateToProps, actions)(BusinessSetting)

export {
  BusinessSettingWithConnect as default,
  BusinessSetting,
}
