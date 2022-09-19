import React, { PureComponent } from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'

import {
  Button, SelectBox, Col, Currency, Layout, Table,
} from '@base'
import { PageHeader, Filter } from '@local'
import { getYearList, getMonthListMap } from '@utils'
import { getCurrentYear, getCurrentMonth } from '@utils/date'

import { actions } from './vehicle.conf'

class VehiclePayment extends PureComponent {
  state = {
    isLoading: false,
    year: getCurrentYear(),
    month: getCurrentMonth(),
    data: [],
  }

  getVehiclePayment = () => {
    const { year, month } = this.state
    const { getFixedVehiclePayment } = this.props
    const params = {
      year,
      month,
    }

    this.setState({ isLoading: true })

    getFixedVehiclePayment(params).then((response) => {
      const { data } = response
      this.setState({ data, isLoading: false })
    })
  }

  componentDidMount() {
    this.getVehiclePayment()
  }

  changeHandler = (valueObj) => {
    this.setState(valueObj)
  }

  render() {
    const {
      year, month, data, isLoading,
    } = this.state
    const breadCrumbData = [{
      label: 'Home',
      route: '/dashboard',
    },
    {
      label: 'Fixed vehicle payment',
    }]

    const amountCellClass = 'text-right'
    const numberCellClass = 'text-center'

    const columns = [
      {
        label: 'vehicle',
        custom: ({ vehicle = {} }) => {
          const { registrationNo, manufacturer, name } = vehicle
          return (
            <>
              {`${manufacturer} ${name}`}
              <p>{registrationNo}</p>
            </>
          )
        },
      },
      {
        label: 'Local requests',
        map: 'totalLocalRequests',
        classes: numberCellClass,
      },
      {
        label: 'Out station requests',
        map: 'totalOutStationRequests',
        classes: numberCellClass,
      },
      {
        label: 'Total KM',
        map: 'totalKm',
        classes: numberCellClass,
      },
      {
        label: 'Total extra KM',
        classes: numberCellClass,
        custom: ({
          requestPackage = {}, totalKm,
        }) => {
          const { minimumKm } = requestPackage
          const extraKm = minimumKm - totalKm
          return extraKm > 0 ? extraKm : 0
        },
      },
      {
        label: 'Total HR',
        map: 'totalHr',
        classes: numberCellClass,
      },
      {
        label: 'Total extra HR',
        map: 'totalExtraHr',
        classes: numberCellClass,
      },
      {
        label: 'Other charges',
        classes: amountCellClass,
        custom: ({
          totalToll, totalParking, totalNightHalt, totalDriverAllowance,
        }) => {
          const data = totalToll + totalParking + totalNightHalt + totalDriverAllowance
          return (
            <Currency data={data} />
          )
        },
      },
      {
        label: 'Total',
        classes: amountCellClass,
        custom: ({
          requestPackage = {}, totalKm, totalExtraHr, totalToll,
          totalParking, totalNightHalt, totalDriverAllowance,
        }) => {
          const {
            baseAmount, minimumKm, extraKmPerKmRate, extraHrPerHrRate,
          } = requestPackage
          const extraKm = minimumKm - totalKm
          const extraKmAmount = extraKm > 0 ? extraKm * extraKmPerKmRate : 0
          const extraHrAmount = totalExtraHr * extraHrPerHrRate
          const totalOtherCharges = totalToll + totalParking + totalNightHalt + totalDriverAllowance
          const totalAmount = baseAmount + extraKmAmount + extraHrAmount + totalOtherCharges
          return (
            <Currency data={totalAmount} />
          )
        },
      },
    ]

    return (
      <>
        <PageHeader
          title="Fixed vehicle payment"
          withBreadCrumb
          breadCrumbData={breadCrumbData}
        />
        <Filter>
          <Col
            col={{
              xs: 12, sm: 12, md: 2, lg: 2,
            }}
            classes="pad-b-10"
          >
            <SelectBox
              name="month"
              options={getMonthListMap()}
              value={month}
              changeHandler={this.changeHandler}
            />
          </Col>
          <Col
            col={{
              xs: 12, sm: 12, md: 2, lg: 2,
            }}
            classes="pad-b-10"
          >
            <SelectBox
              name="year"
              options={getYearList()}
              value={year}
              changeHandler={this.changeHandler}
            />
          </Col>
          <Col
            col={{
              xs: 12, sm: 12, md: 2, lg: 2,
            }}
            classes="pad-b-10"
          >
            <Button clickHandler={this.getVehiclePayment}>Search</Button>
          </Col>
        </Filter>
        <Layout bgColor="white" classes="flex-1 overflow-auto">
          <Table
            columns={columns}
            data={data}
            isLoading={isLoading}
            classes="table-hover"
          />
        </Layout>
      </>
    )
  }
}

VehiclePayment.propTypes = {
  getFixedVehiclePayment: func.isRequired,
}

VehiclePayment.defaultProps = {}

const VehiclePaymentWithConnect = connect(null, actions)(VehiclePayment)

export {
  VehiclePaymentWithConnect as default,
  VehiclePayment,
}
