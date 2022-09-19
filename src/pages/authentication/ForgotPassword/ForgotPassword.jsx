import React, { Fragment } from 'react'
import { MapCssModules } from '@utils'
import { Text, Button, TextInput } from '@base'
import Header from '../Header/Header'
import AuthPanel from '../AuthPanel/AuthPanel'

const ForgotPassword = () => (
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
      title="Need help with your password?"
      subTitle="Enter the email you use for travel agency, and we’ll help you create a new password."
    >
      <form>
        <TextInput
          type="text"
          label="Email Address"
          classes="pad-b-15"
          attributes={{
            placeholder: 'Enter Email',
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

export default MapCssModules(ForgotPassword)
