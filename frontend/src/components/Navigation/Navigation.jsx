import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul id='Navigations'>
      <li id='home'>
        <NavLink to="/">Home</NavLink>
      </li>
      {isLoaded && (
        <div id='left-justified'>
          <li>
            <NavLink to={'/spots/new'}>Create a New Spot</NavLink>
          </li>
          <li id='profile'>
            <ProfileButton user={sessionUser} />
          </li>
        </div>
      )}
    </ul>
  );
}

export default Navigation;