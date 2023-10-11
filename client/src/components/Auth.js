import { useState } from 'react'
import { useCookies} from 'react-cookie'

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [isLogIn, setIsLogin] = useState(true)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)

  const viewLogin = (status) => {
    setError(null)
    setIsLogin(status)
  }

  console.log(process.env.REACT_APP_SERVERURL + '     kSADFSDFSAFASFADSFASDFAFDSAFDSAFSAF')  
//console.log(import.meta.env.REACT_APP_SERVERURL + '     SADFSDFSAFASFADSFASDFAFDSAFDSAFSAF')


  const handleSubmit = async (e, endpoint) => {
    console.log("Fetching:", `${process.env.REACT_APP_SERVERURL}/${endpoint}`);

    console.log("hello")
    //e.preventDefault(); // might this be causing the error?
    if (!isLogIn && password !== confirmPassword) {
      setError('Make sure passwords match!');
      //return; /// might this line of code be causing the error?
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
       // const response = await fetch(`${process.env.REACT_APP_SERVERURL}/login`, {
          //const response = await fetch(`http://localhost:3000/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  console.log("duk")
      if (!response.ok) {
        console.error('Response status:', response.status);
        setError('Error occurred while processing the request.');
        return;
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (data.detail) {
          setError(data.detail );
          console.error('Error in data:', data.detail);
        } else {
          console.log(data)
          setCookie('Email', data.email);
          setCookie('AuthToken', data.token);
          window.location.reload();
          console.log("is it working????")
        }
      } else {
        // Handle cases where the response is not JSON
        setError('Unexpected response format.');
        console.log("unexpected response format")
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred while processing the request.');
    }
  };
  


  return (
    <>
    <div className="auth-container">
     
      <div className="auth-container-box">
        <form>
          <h2>{isLogIn  ? 'Please log in' : 'Please sign up!'}</h2>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogIn && <input
            type="password"
            placeholder="confirm password"
            onChange={(e) =>setConfirmPassword(e.target.value)}
          />}
          <input type="submit" className="create" onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')} />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{backgroundColor : !isLogIn ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)'}}
          >Sign Up</button>
          <button
            onClick={() => viewLogin(true)}
            style={{backgroundColor : isLogIn ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)'}}
          >Login</button>
        </div>

      </div>
    </div>
    </>
  )
}

export default Auth
