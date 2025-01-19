import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import * as sessionActions from './store/session';
import * as spotActions from "./store/spot";
import Navigation from './components/Navigation';
import SpotsPage from './components/SpotPages';
import SpotPage from './components/SpotPages/SpotPage';
import ManageSpots from './components/ManageSpots';
import CreateSpot from './components/CreateSpotForm';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const loadFunc = async()=>{
    await dispatch(spotActions.loadSpots())
    await dispatch(sessionActions.restoreUser())
    console.log('load complete')
  }

  useEffect(() => {
    loadFunc().then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  if(isLoaded){
      return (
      <>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && <Outlet />}
      </>
    );
  } else {
    return (
      <>
        <h1>Page Loading</h1>
      </>
    )
  }
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SpotsPage />
      },
      {
        path: '/spots/:id',
        element: <SpotPage />
      },
      {
        path: '/spots/current',
        element: <ManageSpots /> 
      },
      {
        path: '/spots/new',
        element: <CreateSpot />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
