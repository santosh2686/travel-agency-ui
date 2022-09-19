import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  arrayOf, bool, func, shape, string,
} from 'prop-types'

import { Panel, TextArea } from '@base'

import RequestDetail from './components/RequestDetails.jsx'
import CustomerDetails from './components/CustomerDetails.jsx'
import PackageDetails from './components/PackageDetails.jsx'
import PaymentDetails from './components/PaymentDetails.jsx'
import CalculateTotal from './components/calculateTotal.jsx'

import ProvidedVehiclePackageDetails from '../../common/components/ProvidedVehiclePackageDetails/ProvidedVehiclePackageDetails.jsx'
import AdvancedPayment from '../../common/components/AdvancedPayment/AdvancedPayment.jsx'
import VehicleDetails from '../../common/components/VehicleDetails/VehicleDetails.jsx'
import StaffDetails from '../../common/components/StaffDetails/StaffDetails.jsx'
import OtherCharges from '../../common/components/OtherCharges/OtherCharges.jsx'

import { mapStateToProps } from './createForm.conf.js'

class CreateForm extends PureComponent {
  commentChangeHandler = (valueObj) => {
    const { changeHandler } = this.props
    changeHandler({
      $merge: valueObj,
    })
  }

  render() {
    const {
      model, errorMap = {}, isEdit,
      paymentMethods, requestTypes,
      changeHandler, errorMapChangeHandler,
      selectedVehicleCategory,
    } = this.props
    const { comment, vehicleType } = model
    const isNotOwnVehicle = vehicleType === 'existing' && (selectedVehicleCategory && selectedVehicleCategory !== 'own')
    const isOtherVehicle = vehicleType === 'new' || !!isNotOwnVehicle
    return (
      <>
        <RequestDetail
          model={model}
          errorMap={errorMap}
          isEdit={isEdit}
          requestTypes={requestTypes}
          changeHandler={changeHandler}
        />
        <CustomerDetails
          model={model}
          errorMap={errorMap}
          isEdit={isEdit}
          changeHandler={changeHandler}
        />
        <VehicleDetails
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

        <PackageDetails
          model={model}
          errorMap={errorMap}
          isEdit={isEdit}
          changeHandler={changeHandler}
        />
        <StaffDetails
          model={model}
          errorMap={errorMap}
          isEdit={isEdit}
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
        <PaymentDetails
          model={model}
          errorMap={errorMap}
          isEdit={isEdit}
          paymentMethods={paymentMethods}
          changeHandler={changeHandler}
        />
        <Panel title="Comments" classes="mar-b-15 pad-b-10">
          <TextArea
            name="comment"
            value={comment}
            changeHandler={this.commentChangeHandler}
          />
        </Panel>
        <CalculateTotal
          model={model}
          isEdit={isEdit}
          changeHandler={changeHandler}
          errorMapChangeHandler={errorMapChangeHandler}
        />
      </>
    )
  }
}

CreateForm.propTypes = {
  changeHandler: func,
  errorMapChangeHandler: func,
  model: shape({
    packageCode: string,
  }),
  errorMap: shape({
    packageCode: string,
  }),
  paymentMethods: arrayOf(shape({
    name: string,
  })),
  requestTypes: arrayOf(shape({
    name: string,
  })),
  isEdit: bool,
  selectedVehicleCategory: string,
}

CreateForm.defaultProps = {
  changeHandler: () => {},
  errorMapChangeHandler: () => {},
  model: {},
  errorMap: {},
  paymentMethods: [],
  requestTypes: [],
  isEdit: false,
  selectedVehicleCategory: '',
}
const CreateFormWithConnect = connect(mapStateToProps, null)(CreateForm)

export {
  CreateFormWithConnect as default,
  CreateForm,
}
