import React, { PureComponent } from "react"
import { string, bool, shape } from "prop-types"
import ReactDatePicker from "react-datepicker"
import ClassNames from "classnames"

import { MapCssModules } from "@utils"

import { formatDate, toUTCFormat } from "@utils/date"

import Text from '../Text/Text.jsx'

import "react-datepicker/dist/react-datepicker.css"

class DatePicker extends PureComponent {
  dateChangeHandler = (date) => {
    const { name, changeHandler } = this.props;
    changeHandler({
      [name]: toUTCFormat(date),
    });
  };

  render() {
    const {
      label,
      required,
      errorMessage,
      selected,
      minDate,
      maxDate,
      placeholder,
      format,
      classes,
      options,
      invalid,
    } = this.props;
    const eltClass = ClassNames({
      [classes]: classes,
    });
    const controlClasses = ClassNames("width-100 bg-white pad-tb-5 input-control pad-lr-10 color-gray", {
      'bor-gray-light': !invalid,
      'bor-danger': invalid,
    })
    return (
      <div styleName={eltClass}>
        <div styleName="flex flex-space-between">
          {label && (
            <label styleName="show-block pad-b-5">
              {label}
              {required && <span styleName="color-gray">*</span>}
            </label>
          )}
          <Text color="danger">
            {errorMessage}
          </Text>
        </div>
        <ReactDatePicker
          dateFormat={format}
          placeholderText={placeholder}
          selected={selected ? new Date(selected) : null}
          onChange={this.dateChangeHandler}
          dropdownMode="select"
          minDate={minDate ? new Date(minDate) : null}
          maxDate={maxDate ? new Date(maxDate) : null}
          {...options}
          className={controlClasses}
        />
      </div>
    );
  }
}

DatePicker.propTypes = {
  label: string,
  required: bool,
  selected: string,
  minDate: string,
  maxDate: string,
  classes: string,
  placeholder: string,
  format: string,
  errorMessage: string,
  invalid: bool,
  options: shape({
    timeCaption: string,
  })
};

DatePicker.defaultProps = {
  label: "",
  required: false,
  selected: formatDate(null, 'YYYY-MM-DD hh:mm:ss A'),
  minDate: "",
  maxDate: "",
  classes: "",
  placeholder: "Select Date",
  format: "dd-MMM-yyyy",
  errorMessage: '',
  invalid: false,
  options: {},
};

export default MapCssModules(DatePicker);
