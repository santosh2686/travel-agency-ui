import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  arrayOf, bool, func, shape, string,
} from 'prop-types'

import { Panel, TextArea } from '@base'

import RequestDetail from './components/RequestDetails.jsx'
import CustomerDetails from './components/CustomerDetails.jsx'

import RegularVehicleStaffDetails from './components/RegularVehicleStaffDetails/RegularVehicleStaffDetails'

import ProvidedVehiclePackageDetails from '../../common/components/ProvidedVehiclePackageDetails/ProvidedVehiclePackageDetails.jsx'
import AdvancedPayment from '../../common/components/AdvancedPayment/AdvancedPayment.jsx'
import OtherCharges from '../../common/components/OtherCharges/OtherCharges.jsx'

import { mapStateToProps } from './createForm.conf.js'

class CreateForm extends PureComponent {
  componentDidMount() {
    const { isEdit, model, getVehicle } = this.props
    const { customer } = model
    if (isEdit) {
      const { _id: customerId } = customer
      getVehicle({ customer: customerId })
    }
  }

  commentChangeHandler = (valueObj) => {
    const { changeHandler } = this.props
    changeHandler({
      $merge: valueObj,
    })
  }

  customerChangeHandler = (valueObj) => {
    const { changeHandler, getVehicle } = this.props
    const { $merge: { customer } } = valueObj
    if (customer) {
      getVehicle({ customer })
    }
    changeHandler(valueObj)
  }

  render() {
    const {
      model, errorMap = {}, isEdit, requestTypes,
      changeHandler, selectedVehicleCategory,
    } = this.props
    const { comment, vehicleType } = model
    const isNotOwnVehicle = vehicleType === 'existing' && (selectedVehicleCategory && selectedVehicleCategory !== 'own')
    const isOtherVehicle = vehicleType === 'new' || !!isNotOwnVehicle
    return (
      <>
        <CustomerDetails
          model={model}
          errorMap={errorMap}
          isEdit={isEdit}
          changeHandler={this.customerChangeHandler}
        />
        <RequestDetail
          model={model}
          errorMap={errorMap}
          isEdit={isEdit}
          requestTypes={requestTypes}
          changeHandler={changeHandler}
        />
        <RegularVehicleStaffDetails
          model={model}
          errorMap={errorMap}
          isEdit={isEdit}
          changeHandler={changeHandler}
        />
        <ProvidedVehiclePackageDetails
          show={isOtherVehicle}
          model={model}
          errorMap={errorMap}
          isEdit={isEdit}
          isOtherVehicleSelected={isOtherVehicle}
          changeHandler={changeHandler}
        />
        <OtherCharges
          model={model}
          errorMap={errorMap}
          isEdit={isEdit}
          changeHandler={changeHandler}
        />
        <AdvancedPayment
          model={model}
          errorMap={errorMap}
          isEdit={isEdit}
          changeHandler={changeHandler}
          isOtherVehicle={isOtherVehicle}
        />
        <Panel title="Comments" classes="mar-b-15 pad-b-10">
          <TextArea
            name="comment"
            value={comment}
            changeHandler={this.commentChangeHandler}
          />
        </Panel>
      </>
    )
  }
}

CreateForm.propTypes = {
  changeHandler: func,
  getVehicle: func,
  model: shape({
    packageCode: string,
  }),
  errorMap: shape({
    packageCode: string,
  }),
  requestTypes: arrayOf(shape({
    name: string,
  })),
  isEdit: bool,
  selectedVehicleCategory: string,
}

CreateForm.defaultProps = {
  changeHandler: () => {},
  getVehicle: () => {},
  model: {},
  errorMap: {},
  requestTypes: [],
  isEdit: false,
  selectedVehicleCategory: '',
}

const CreateFormWithConnect = connect(mapStateToProps, null)(CreateForm)

export {
  CreateFormWithConnect as default,
  CreateForm,
}
