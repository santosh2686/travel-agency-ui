import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './src/state/reducers'

export const configureStore = (initialState) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // options like actionSanitizer, stateSanitizer
  }) : compose

  const enhancer = composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
    ),
  )
  return createStore(rootReducer, initialState, enhancer)
}
