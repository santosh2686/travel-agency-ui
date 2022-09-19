import React, { PureComponent } from 'react'
import {
  bool, func, shape, string,
} from 'prop-types'

import { Panel } from '@base'

import { PackageSelection } from '@local'

class PackageDetails extends PureComponent {
  state = {
    package: '',
  }

  componentDidMount() {
    const { isEdit, model } = this.props
    const { package: selectedPackage } = model
    const { _id: packageId } = selectedPackage || {}

    if (isEdit) {
      this.setState({ package: packageId })
    }
  }

  packageChangeHandler = (valueObj) => {
    const { changeHandler } = this.props
    const { package: selectedPackage = '' } = valueObj
    this.setState({ package: selectedPackage })
    changeHandler({
      $merge: valueObj,
    })
  }

  render() {
    const { package: selectedPackage } = this.state
    const { model = {}, errorMap = {} } = this.props
    const { packageCategory } = model
    return (
      <Panel title="Customer package details" classes="mar-b-15">
        <PackageSelection
          category={packageCategory}
          value={selectedPackage}
          categoryError={errorMap.packageCategory}
          valueError={errorMap.package}
          changeHandler={this.packageChangeHandler}
        />
      </Panel>
    )
  }
}

PackageDetails.propTypes = {
  model: shape({
    packageCategory: string,
  }),
  errorMap: shape({
    packageCategory: string,
  }),
  changeHandler: func,
  isEdit: bool,
}

PackageDetails.defaultProps = {
  changeHandler: () => {},
  model: {},
  errorMap: {},
  isEdit: false,
}

export default PackageDetails
