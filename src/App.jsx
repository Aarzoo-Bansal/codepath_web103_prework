import { useRoutes } from 'react-router-dom'
import './App.css'
import ShowCreators from './pages/ShowCreators'

function App() {
  
  const routes = useRoutes([
    {
      path: '/',
      element: <ShowCreators />
    }
  ])

  return (
    <div className="App">
      {routes}
    </div>
  )
}

export default App
