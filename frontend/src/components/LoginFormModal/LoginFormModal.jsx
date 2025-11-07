import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch} from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css'

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({
            failed: 'Login failed, please check credentials and try again'
          });
        }
      });
  };

  return (
    <div className='modal'>
      <h1>Log In</h1>
      <form id='loginForm' onSubmit={handleSubmit}>
        <label htmlFor='login-email'>Email:</label>
        <input
              id="login-email"
              placeholder='Username or Email'
              type="email"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
          />
        <label htmlFor='login-password'>Password:</label>
        <input
              id="login-password"
              placeholder='Password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
          />
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        {errors.failed && (
            <p>{errors.failed}</p>
          )}
        <button className='submitButton' type="submit">Log In</button>
        <button className='demoUser' type="submit" onClick={()=>{
          setCredential('demo@user.io')
          setPassword('password')
        }}>Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;