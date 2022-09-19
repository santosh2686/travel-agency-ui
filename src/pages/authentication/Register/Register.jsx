import React from 'react'
import { MapCssModules } from '@utils'
import {
  Text, Button, TextInput,
} from '@base'
import Header from '../Header/Header'
import AuthPanel from '../AuthPanel/AuthPanel'

const Register = () => (
  <>
    <Header>
      <Text color="gray" classes="hidden-xs">
        Already have an account?
      </Text>
      <Button
        href="/login"
        category="success"
        size="small"
        asLink
        outline
        rounded
        classes="mar-l-5"
      >
        Login
      </Button>
    </Header>
    <AuthPanel
      title="Register to Travel Agency"
      subTitle="Enter your details below"
    >
      <form>
        <TextInput
          type="text"
          label="First Name"
          classes="pad-b-15"
          attributes={{
            placeholder: 'Enter First Name',
          }}
        />
        <TextInput
          type="text"
          label="Last Name"
          classes="pad-b-15"
          attributes={{
            placeholder: 'Enter Last Name',
          }}
        />
        <TextInput
          type="text"
          label="Email Address"
          classes="pad-b-15"
          attributes={{
            placeholder: 'Enter Email Address',
          }}
        />
        <TextInput
          type="password"
          label="Password"
          classes="pad-b-15"
          attributes={{
            placeholder: 'Enter Password',
          }}
        />
        <TextInput
          type="password"
          label="Confirm Password"
          classes="pad-b-15"
          attributes={{
            placeholder: 'Enter Password',
          }}
        />
        <div styleName="text-center">
          <Button type="submit" category="success">
            Submit
          </Button>
        </div>
      </form>
    </AuthPanel>
  </>
)

export default MapCssModules(Register)
