import React, { memo } from 'react'
import {
  arrayOf, bool, object, string,
} from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'
import ClassNames from 'classnames'
import { MapCssModules } from '@utils'

import Layout from '../Layout/Layout.jsx'
import Anchor from '../Anchor/Anchor.jsx'

const Tabs = ({ data, full, classes }) => {
  if (data.length === 0) {
    return null
  }

  const wrapperClasses = ClassNames('overflow-hidden', {
    [classes]: classes,
  })

  const tabClasses = ClassNames('pad-tb-10 pad-lr-20 hover-color-gray-darker font-bold text-decoration-none', {
    'flex-1 text-center': full,
  })

  return (
    <div styleName={wrapperClasses}>
      <div styleName="flex bor-b-gray-light tab-list">
        {data.map((tab, index) => (
          <Anchor
            key={index}
            href={tab.link}
            color="gray"
            hoverColor="gray-darker"
            classes={tabClasses}
            asLink
            attributes={{
              activeClassName: 'color-gray-darker selected',
            }}
          >
            {tab.label}
          </Anchor>
        ))}
      </div>
      <Layout mar={{ tb: 20 }}>
        <Switch>
          {data.map((tab, index) => (<Route key={index} exact path={tab.route} render={() => tab.component} />))}
          <Route render={() => <Redirect to={data[0].link} />} />
        </Switch>
      </Layout>
    </div>
  )
}

Tabs.propTypes = {
  data: arrayOf(object),
  full: bool,
  classes: string,
}

Tabs.defaultProps = {
  data: [{
    label: 'Tab1',
    link: '/category/123/tab1',
    route: '/category/:categoryId/tab1',
    component: ({ name }) => (
      <div>
        My Tab1
        {name}
      </div>
    ),
    selected: true,
  },
  {
    label: 'Tab2',
    link: '/category/123/tab2',
    route: '/category/:categoryId/tab2',
    component: () => <div>My Tab2</div>,
  },
  {
    label: 'Tab3',
    link: '/category/123/tab3',
    route: '/category/:categoryId/tab3',
    component: () => <div>My Tab3</div>,
  },
  {
    label: 'Tab4',
    link: '/category/123/tab4',
    route: '/category/:categoryId/tab4',
    component: () => <div>My Tab4</div>,
  },
  {
    label: 'Tab5',
    link: '/category/456/tab5',
    route: '/category/:categoryId/tab5',
    component: () => <div>My Tab5</div>,
  }],
  full: false,
  classes: '',
}

export default memo(MapCssModules(Tabs))
