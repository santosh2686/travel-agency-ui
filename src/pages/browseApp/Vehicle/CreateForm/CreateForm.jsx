import React, { PureComponent } from 'react'
import {
  arrayOf, bool, func, shape, string,
} from 'prop-types'

import { Panel, TextArea, Toggle } from '@base'

import VehicleDetails from './components/VehicleDetails.jsx'
import MonthlyFixedDetails from './components/MonthlyFixedDetails.jsx'

class CreateForm extends PureComponent {
  changeHandler = (valueObj) => {
    const { changeHandler } = this.props
    changeHandler({
      $merge: valueObj,
    })
  }

  render() {
    const {
      vehicleTypes, model, errorMap = {}, isEdit, changeHandler,
    } = this.props
    const { isMonthlyFixed, comment, isActive } = model
    return (
      <>
        <VehicleDetails
          vehicleTypes={vehicleTypes}
          model={model}
          errorMap={errorMap}
          isEdit={isEdit}
          changeHandler={changeHandler}
        />
        {isMonthlyFixed && (
          <MonthlyFixedDetails
            model={model}
            errorMap={errorMap}
            isEdit={isEdit}
            changeHandler={changeHandler}
          />
        )}
        <Panel title="Comments" classes="mar-b-15 pad-b-15">
          <TextArea
            name="comment"
            value={comment}
            changeHandler={this.changeHandler}
          />
        </Panel>
        <Panel title="Is active" classes="mar-b-15 pad-b-15">
          <Toggle checked={isActive} name="isActive" changeHandler={this.changeHandler} />
        </Panel>
      </>
    )
  }
}

CreateForm.propTypes = {
  changeHandler: func,
  model: shape({
    packageCode: string,
  }),
  errorMap: shape({
    packageCode: string,
  }),
  vehicleTypes: arrayOf(shape({
    name: string,
  })),
  isEdit: bool,
}

CreateForm.defaultProps = {
  changeHandler: () => {},
  model: {},
  errorMap: {},
  vehicleTypes: [],
  isEdit: false,
}

export default CreateForm
