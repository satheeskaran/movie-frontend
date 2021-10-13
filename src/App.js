import logo from './logo.svg'
import RootNav from './RootNav'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import reduxStore from './store/store'

function App() {
  const { store, persistor } = reduxStore()

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNav/>
      </PersistGate>
    </Provider>
  )
}

export default App
