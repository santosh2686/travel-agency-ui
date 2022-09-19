import React, { PureComponent } from 'react'
import {
  bool, func, number, string,
} from 'prop-types'

import {
  TextInput, Layout, Text, CheckBox,
} from '@base'

class OtherChargesItem extends PureComponent {
  changeHandler = (valueObj) => {
    const { category, changeHandler } = this.props
    changeHandler({
      otherCharges: {
        [category]: {
          $merge: valueObj,
        },
      },
    })
  }

  render() {
    const {
      label, category, amount, isChargeableToCustomer,
      isPayableWithSalary, forDriver,
    } = this.props
    return (
      <>
        <Layout
          flex={{
            align: 'center',
            justify: 'space-between',
          }}
          pad={{ b: 5 }}
        >
          <Text tag="label">{label}</Text>
          <CheckBox
            name="isChargeableToCustomer"
            id={category}
            label="Chargeable to customer"
            checked={isChargeableToCustomer}
            changeHandler={this.changeHandler}
          />
        </Layout>
        <TextInput
          type="number"
          name="amount"
          value={amount}
          changeHandler={this.changeHandler}
        />
        {forDriver && (
          <CheckBox
            classes="mar-t-10 text-right"
            name="isPayableWithSalary"
            id={`${category}_isPayableWithSalary`}
            label="Include in driver's salary"
            checked={isPayableWithSalary}
            changeHandler={this.changeHandler}
          />
        )}
      </>
    )
  }
}

OtherChargesItem.propTypes = {
  amount: number,
  isChargeableToCustomer: bool,
  isPayableWithSalary: bool,
  forDriver: bool,
  changeHandler: func,
  category: string.isRequired,
  label: string.isRequired,
}

OtherChargesItem.defaultProps = {
  amount: 0,
  isChargeableToCustomer: false,
  isPayableWithSalary: false,
  forDriver: false,
  changeHandler: () => {},
}

export default OtherChargesItem
