import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css'

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div className='signupModal'>
      <h1>Sign Up</h1>
      <form id='signupForm' onSubmit={handleSubmit}>
        <div>
          <label htmlFor="signup-email">Email:</label>
          <input
                id='signup-email'
                placeholder='Email'
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
              id='signup-username'
              placeholder='Username'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div>
          <label htmlFor="signup-first">First Name:</label>
          <input
              id='signup-first'
              placeholder='First Name'
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
          />
          {errors.firstName && <p>{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="signup-last">Last Name:</label>
          <input
              id='signup-last'
              placeholder='Last Name'
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
          />
          {errors.lastName && <p>{errors.lastName}</p>}
        </div>
        <div>
          <label htmlFor="signup-password">Password:</label>
          <input
              placeholder='Password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="signup-confirm">Confirm Password:</label>
          <input
              id='signup-confirm'
              placeholder='Confirm Password'
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
          />
          {errors.confirmPassword && (<p>{errors.confirmPassword}</p>)}
        </div>
        
        
        <button className='submitButton' type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;