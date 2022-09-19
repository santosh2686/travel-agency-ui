import React, { PureComponent } from 'react'
import { func, shape, string } from 'prop-types'

import {
  Panel, Row, Col, TextInput, TextArea, Toggle,
} from '@base'

class CreateForm extends PureComponent {
  changeHandler = (valueObj) => {
    const { changeHandler } = this.props
    changeHandler({
      $merge: valueObj,
    })
  }

  render() {
    const { model, errorMap } = this.props
    const {
      packageCode, baseAmount, minimumKm, extraKmPerKmRate,
      minimumHr, extraHrPerHrRate, isActive, comment,
    } = model
    return (
      <>
        <Panel title="Package details" classes="mar-b-15">
          <Row>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <TextInput
                label="Package code"
                name="packageCode"
                value={packageCode}
                invalid={!!errorMap.packageCode}
                required
                errorMessage={errorMap.packageCode}
                changeHandler={this.changeHandler}
              />
            </Col>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <TextInput
                type="number"
                label="Minimum KM"
                name="minimumKm"
                value={minimumKm}
                invalid={!!errorMap.minimumKm}
                required
                errorMessage={errorMap.minimumKm}
                changeHandler={this.changeHandler}
              />
            </Col>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <TextInput
                type="number"
                label="Minimum Hour"
                name="minimumHr"
                value={minimumHr}
                invalid={!!errorMap.minimumHr}
                required
                errorMessage={errorMap.minimumHr}
                changeHandler={this.changeHandler}
              />
            </Col>
          </Row>
          <Row>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <TextInput
                type="number"
                label="Basic amount"
                name="baseAmount"
                value={baseAmount}
                invalid={!!errorMap.baseAmount}
                required
                errorMessage={errorMap.baseAmount}
                changeHandler={this.changeHandler}
              />
            </Col>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <TextInput
                type="number"
                label="Extra KM rate"
                name="extraKmPerKmRate"
                value={extraKmPerKmRate}
                invalid={!!errorMap.extraKmPerKmRate}
                required
                errorMessage={errorMap.extraKmPerKmRate}
                changeHandler={this.changeHandler}
              />
            </Col>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <TextInput
                type="number"
                label="Extra hour rate"
                name="extraHrPerHrRate"
                value={extraHrPerHrRate}
                invalid={!!errorMap.extraHrPerHrRate}
                required
                errorMessage={errorMap.extraHrPerHrRate}
                changeHandler={this.changeHandler}
              />
            </Col>
          </Row>
          <Row>
            <Col
              col={{
                xs: 12, sm: 12, md: 6, lg: 6,
              }}
              classes="pad-b-15"
            >
              <TextArea
                label="Comments"
                name="comment"
                value={comment}
                changeHandler={this.changeHandler}
              />
            </Col>
          </Row>
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
}

CreateForm.defaultProps = {
  changeHandler: () => {},
  model: {},
  errorMap: {},
}

export default CreateForm
