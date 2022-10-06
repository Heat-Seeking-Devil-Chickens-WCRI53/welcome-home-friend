import React from 'react';
import TextField from '@mui/material/TextField';
//import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
//import MyModule from '../styles/MUIComponents.jsx'
import { Button, inputDiv } from '../styles/MUIComponents.jsx'
import { useUserUpdateContext } from "../contexts/PostContext.jsx"

const Login = () => {
    let navigate = useNavigate();
    const addUserData = useUserUpdateContext();
    const formRef = React.useRef();
    console.log('addUserData:', addUserData);

    let handleClick = () => {
        // Return if missing fields
        if(!formRef.current.reportValidity()) {
            return;
        }

        let username = document.getElementById('login_Username');
        let password = document.getElementById('login_Password');
        fetch('/api/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: username.value, password: password.value })
        })
            .then((data) => {
                console.log('data:', data, data.status);
                if (data.status !== 200) {
                    throw new Error("Invalid UserName or password");
                }
                return data.json();
            })
            .then((json) => {
                console.log('login response:', json);
                addUserData(json);
                navigate('/App');
                // if (json.status === 200) {
                // }
            })
            .catch((err) => {
                console.log("Invalid UserName or password");
                console.log('error:', err);
            })
    }

    return (
        <form ref={formRef}>
            <h4>Login</h4>
            <div className="create-post-inputs">
                <>{inputDiv('Username', 'login_Username', true)}</>
                <>{inputDiv('Password', 'login_Password', true)}</>
            </div>
            <Button onClick={() => navigate('/signup')}>Register</Button>
            <Button onClick={() => { handleClick() }}>Submit</Button>
        </form>);
}
//<Button label='Log In'>Login</Button>
//            <Button onClick={navigate}>Submit</Button>


export default Login;