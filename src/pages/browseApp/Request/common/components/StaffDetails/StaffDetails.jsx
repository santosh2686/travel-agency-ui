import React, { PureComponent } from 'react'
import {
  bool, func, shape, string,
} from 'prop-types'

import {
  Panel, Row, Col, TextInput,
} from '@base'

import { StaffSelection } from '@local'

class StaffDetails extends PureComponent {
  state = {
    staff: '',
  }

  componentDidMount() {
    const { isEdit, model } = this.props
    const { staff } = model
    const { _id: staffId } = staff || {}

    if (isEdit) {
      this.setState({ staff: staffId })
    }
  }

  staffChangeHandler = (valueObj) => {
    const { changeHandler } = this.props
    const { staff } = valueObj
    this.setState({
      staff,
    })
    changeHandler({
      $merge: valueObj,
    })
  }

  staffDetailChangeHandler = (valueObj) => {
    const { changeHandler } = this.props
    changeHandler({
      staffDetails: {
        $merge: valueObj,
      },
    })
  }

  render() {
    const { staff } = this.state
    const { model = {}, errorMap = {} } = this.props
    const { staffType, staffCategory, staffDetails = {} } = model
    const { name, contact, license } = staffDetails

    return (
      <Panel title="Staff details" classes="mar-b-15">
        {staffType === 'existing' && (
          <StaffSelection
            category={staffCategory}
            value={staff}
            categoryError={errorMap.staffCategory}
            valueError={errorMap.staff}
            changeHandler={this.staffChangeHandler}
          />
        )}
        {staffType === 'new' && (
          <Row>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <TextInput
                label="Staff name"
                name="name"
                value={name}
                required
                invalid={!!errorMap['staffDetails.name']}
                errorMessage={errorMap['staffDetails.name']}
                changeHandler={this.staffDetailChangeHandler}
              />
            </Col>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <TextInput
                label="Contact"
                name="contact"
                value={contact}
                required
                invalid={!!errorMap['staffDetails.contact']}
                errorMessage={errorMap['staffDetails.contact']}
                changeHandler={this.staffDetailChangeHandler}
              />
            </Col>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <TextInput
                label="License"
                name="license"
                value={license}
                changeHandler={this.staffDetailChangeHandler}
              />
            </Col>
          </Row>
        )}
      </Panel>
    )
  }
}

StaffDetails.propTypes = {
  model: shape({
    staffType: string,
  }),
  errorMap: shape({
    staff: string,
  }),
  isEdit: bool,
  changeHandler: func,
}

StaffDetails.defaultProps = {
  changeHandler: () => {},
  model: {},
  errorMap: {},
  isEdit: false,
}

export default StaffDetails
