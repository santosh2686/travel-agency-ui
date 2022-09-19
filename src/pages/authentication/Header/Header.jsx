import React, { memo } from 'react'
import { node } from 'prop-types'
import { MapCssModules } from '@utils'
import { Layout } from '@base'

const Header = ({ children }) => (
  <Layout
    flex={{ justify: 'space-between', align: 'center' }}
    bgColor="white"
    border={{ b: 'gray-light' }}
    pad={{ tb: 5, lr: 20 }}
    classes="flex-no-shrink"
  >
    <h2>
      Travel Agency
    </h2>
    <div>
      {children}
    </div>
  </Layout>
)

Header.propTypes = {
  children: node,
}

Header.defaultProps = {
  children: {},
}

export default memo(MapCssModules(Header))
