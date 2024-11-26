import './App.css'
import Login from './pages/Login';
import Home from './pages/Home';
import Reports from './pages/Reports';
import ErrorPage from './pages/ErrorPage';
import GestionUsuarios from './pages/GestionUsuarios';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';


function App() {

 const router = createBrowserRouter([ 
  {
    path: '/',
    errorElement: <ErrorPage/>,
    children: [
  {
      index: true,
      element: <Login/>
  },
  {
    path: 'home',
    element: <Home/>
  },
  {
    path: 'reports',
    element: <Reports/>
  },
  {
    path: 'gestion',
    element: <GestionUsuarios/>
  }
]
},
]);

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
