/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { func, shape, string } from 'prop-types'

import {
  Button, Layout, Row, Col, Text,
} from '@base'
import { InfoBox } from '@local'
import { validatePayload } from '@utils'

import calculateTotalValidationSchema from '../../validation/calculateTotalValidationSchema'
import RequestInfo from '../../RequestInfo/RequestInfo.jsx'

import { mapStateToProps } from './calculateTotal.conf.js'

class CalculateTotal extends PureComponent {
  requestTotal = (packageDetail) => {
    const { model } = this.props
    const { totalKm, totalHr } = model
    const {
      baseAmount, minimumKm, extraKmPerKmRate, minimumHr, extraHrPerHrRate,
    } = packageDetail
    const extraKm = (totalKm - minimumKm) < 0 ? 0 : (totalKm - minimumKm)
    const extraHr = (totalHr - minimumHr) < 0 ? 0 : (totalHr - minimumHr)
    const extraKmBilling = extraKm * extraKmPerKmRate
    const extraHrBilling = extraHr * extraHrPerHrRate
    return baseAmount + extraKmBilling + extraHrBilling
  }

  calculateOtherChargesExpenses = () => {
    const { model } = this.props
    const { otherCharges } = model
    const {
      toll, parking, nightHalt, driverAllowance,
    } = otherCharges
    const tollAmount = toll.isChargeableToCustomer ? 0 : toll.amount
    const parkingAmount = parking.isChargeableToCustomer ? 0 : parking.amount
    const nightHaltAmount = nightHalt.isChargeableToCustomer ? 0 : nightHalt.amount
    const driverAllowanceAmount = driverAllowance.isChargeableToCustomer ? 0 : driverAllowance.amount
    return tollAmount + parkingAmount + nightHaltAmount + driverAllowanceAmount
  }

  calculateOtherChargesForCustomer = () => {
    const { model } = this.props
    const { otherCharges } = model
    const {
      toll, parking, nightHalt, driverAllowance,
    } = otherCharges
    const tollAmount = toll.isChargeableToCustomer ? toll.amount : 0
    const parkingAmount = parking.isChargeableToCustomer ? parking.amount : 0
    const nightHaltAmount = nightHalt.isChargeableToCustomer ? nightHalt.amount : 0
    const driverAllowanceAmount = driverAllowance.isChargeableToCustomer ? driverAllowance.amount : 0
    return tollAmount + parkingAmount + nightHaltAmount + driverAllowanceAmount
  }

  calculateTotal = () => {
    const {
      model, packageDetails, providedVehiclePackageDetails, vehicleProvided,
      changeHandler, errorMapChangeHandler,
    } = this.props
    const { isValid, errorMap } = validatePayload(calculateTotalValidationSchema, model)
    if (!isValid) {
      errorMapChangeHandler(errorMap, true)
      return
    }
    errorMapChangeHandler({}, false)

    const { vehicleType } = model
    const customerTotal = this.requestTotal(packageDetails)
    const providedVehicleTotal = (vehicleType === 'new' || vehicleProvided !== 'own')
      ? this.requestTotal(providedVehiclePackageDetails) : 0
    const otherChargesExpense = this.calculateOtherChargesExpenses()
    const otherChargesForCustomer = this.calculateOtherChargesForCustomer()
    const profit = (customerTotal - providedVehicleTotal) - otherChargesExpense

    changeHandler({
      $merge: {
        requestTotal: customerTotal,
        providedVehiclePayment: providedVehicleTotal,
        requestExpense: otherChargesExpense,
        requestProfit: profit,
        customerBill: customerTotal + otherChargesForCustomer,
      },
    })
  }

  render() {
    const { model } = this.props
    const {
      requestTotal, requestExpense, requestProfit, customerBill,
    } = model
    return (
      <>
        <Layout
          bgColor="white"
          pad="10"
          mar={{ b: 15 }}
          flex={{ align: 'center', justify: 'space-between' }}
        >
          <Text size="18">Request calculation</Text>
          <Button clickHandler={this.calculateTotal}>Calculate</Button>
        </Layout>
        <RequestInfo
          requestTotal={requestTotal}
          requestExpense={requestExpense}
          requestProfit={requestProfit}
          customerBill={customerBill}
        />
      </>
    )
  }
}

CalculateTotal.propTypes = {
  model: shape({
    comment: string,
  }),
  packageDetails: shape({
    packageCode: string,
  }),
  providedVehiclePackageDetails: shape({
    packageCode: string,
  }),
  vehicleProvided: string,
  changeHandler: func,
  errorMapChangeHandler: func,
}

CalculateTotal.defaultProps = {
  model: {},
  packageDetails: {},
  providedVehiclePackageDetails: {},
  vehicleProvided: 'own',
  changeHandler: () => {},
  errorMapChangeHandler: () => {},
}

const CalculateTotalWithConnect = connect(mapStateToProps)(CalculateTotal)

export {
  CalculateTotalWithConnect as default,
  CalculateTotal,
}
