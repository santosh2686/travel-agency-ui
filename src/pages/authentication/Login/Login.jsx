import React from 'react'
import { MapCssModules } from '@utils'
import {
  Anchor, Button, Layout, TextInput, Text,
} from '@base'
import Header from '../Header/Header'
import AuthPanel from '../AuthPanel/AuthPanel'

const Login = () => (
  <>
    <Header>
      <Text color="gray" classes="hidden-xs">
        Don&spos;t Have an Account?
      </Text>
      <Button
        href="/register"
        category="success"
        size="small"
        asLink
        outline
        rounded
        classes="mar-l-5"
      >
        Register
      </Button>
    </Header>
    <AuthPanel
      title="Login in to Travel Agency"
      subTitle="Enter your details below"
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
        <Layout
          flex={{ align: 'center', justify: 'space-between' }}
          pad={{ b: 5 }}
        >
          <Text tag="label">
            Password
          </Text>
          <Anchor
            asLink
            href="/forgot"
            classes="font-12"
          >
            Forgot Password?
          </Anchor>
        </Layout>
        <TextInput
          type="password"
          classes="pad-b-15"
          attributes={{
            placeholder: 'Enter Password',
          }}
        />
        <div styleName="text-center">
          <Button type="submit" category="success">
            Sign In
          </Button>
        </div>
      </form>
    </AuthPanel>
  </>
)

export default MapCssModules(Login)
