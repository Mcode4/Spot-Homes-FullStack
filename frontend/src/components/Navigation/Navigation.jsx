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
          <img src="/Rent-a-Spot.png" alt="Home" />
        </NavLink>
      </li>
      {isLoaded && (
        <div style={{marginLeft: 'auto'}}>
          {sessionUser && (<li>
            <NavLink to={'/spots/new'}>Create a New Spot</NavLink>
          </li>)}
          <li id='profile'>
            <ProfileButton user={sessionUser} />
          </li>
        </div>
      )}
    </ul>
  );
}

export default Navigation;