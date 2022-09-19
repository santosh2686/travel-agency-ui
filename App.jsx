import React from 'react'
import { Provider } from 'react-redux'

import { InternationalizationProvider } from 'react-internationalization'

import * as languages from './i18n'
import { configureStore } from './configureStore'
import Wrapper from './src/Wrapper/Wrapper.jsx'

const store = configureStore({})

const App = () => (
  <Provider store={store}>
    <InternationalizationProvider
      dynamicImports
      defaultLanguage="en"
      languages={languages}
    >
      <Wrapper />
    </InternationalizationProvider>
  </Provider>
)

export default App
