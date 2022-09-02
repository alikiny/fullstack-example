import instance from "./axios/instance";
import { GoogleLogin, CredentialResponse} from '@react-oauth/google'
import { useEffect } from "react";
import UserForm from "./components/UserForm";
import { useCookies, Cookies } from "react-cookie";

function App() {
  /** use the credential from google to login in the backend*/
  const cookie = new Cookies()
  const responseGoogle = async (response: CredentialResponse) => {
    await instance.post("users/auth/google", {
      id_token: response.credential
    })
  }
  const signOut = () => {
    console.log(cookie.getAll())
  }
  useEffect(() => {
    instance.get("users").then(res=>console.log(res.data))
  })
  return (
    <div className="App">
      {/* verify via google platform and get google credential */}
      <GoogleLogin
        onSuccess={credentialResponse => {
          responseGoogle(credentialResponse);
        }}
        onError={() => {
          alert('Login Failed');
        }}
        type = "icon"
      />
      <button onClick={signOut}>Sign out</button>
      <UserForm />
    </div>
  );
}

export default App;
