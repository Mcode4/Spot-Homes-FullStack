import { NavLink} from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  return (
    <ul id='navbar'>
      <li id='home'>
        <NavLink to="/">
          <img id='site-logo' src="../../../public/Rent-a-Spot.png" alt="Home" />
        </NavLink>
      </li>
      {isLoaded && (
          <li id='profile'>
            <ProfileButton user={sessionUser} />
          </li>
      )}
    </ul>
  );
}

export default Navigation;