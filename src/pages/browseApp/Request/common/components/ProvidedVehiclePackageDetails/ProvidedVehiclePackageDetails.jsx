import React, { PureComponent } from 'react'
import {
  bool, func, shape, string,
} from 'prop-types'

import { Panel } from '@base'

import { PackageSelection } from '@local'

class ProvidedVehiclePackageDetails extends PureComponent {
  state = {
    package: '',
  }

  componentDidMount() {
    const {
      isEdit, model, changeHandler,
    } = this.props
    const { packageFromProvidedVehicle = {} } = model
    const { package: selectedPackage } = packageFromProvidedVehicle
    const { _id: packageId } = selectedPackage || {}
    if (isEdit) {
      this.setState({ package: packageId })
      changeHandler({
        $merge: {
          packageFromProvidedVehicle,
        },
      })
    }
  }

  componentDidUpdate() {
    const {
      isOtherVehicleSelected, changeHandler,
    } = this.props
    changeHandler({
      $merge: {
        isOtherVehicleSelected: !!isOtherVehicleSelected,
      },
    })
  }

  changeHandler = (valueObj) => {
    const { changeHandler } = this.props
    const { package: selectedPackage = '' } = valueObj
    this.setState({ package: selectedPackage })
    changeHandler({
      packageFromProvidedVehicle: {
        $merge: valueObj,
      },
    })
  }

  render() {
    const { show, model = {}, errorMap = {} } = this.props
    if (!show) {
      return null
    }
    const {
      packageFromProvidedVehicle = {},
    } = model
    const { packageCategory } = packageFromProvidedVehicle
    const { package: selectedPackage } = this.state
    return (
      <Panel title="Package from provided vehicle" classes="mar-b-15">
        <PackageSelection
          category={packageCategory}
          value={selectedPackage}
          categoryError={errorMap['packageFromProvidedVehicle.packageCategory']}
          valueError={errorMap['packageFromProvidedVehicle.package']}
          changeHandler={this.changeHandler}
        />
      </Panel>
    )
  }
}

ProvidedVehiclePackageDetails.propTypes = {
  model: shape({
    packageCategory: string,
  }),
  errorMap: shape({
    packageCategory: string,
  }),
  changeHandler: func,
  isEdit: bool,
  isOtherVehicleSelected: bool,
  show: bool,
}

ProvidedVehiclePackageDetails.defaultProps = {
  changeHandler: () => {},
  model: {},
  errorMap: {},
  isEdit: false,
  isOtherVehicleSelected: false,
  show: false,
}

export default ProvidedVehiclePackageDetails
