import React, { useTransition } from 'react';
import TextField from '@mui/material/TextField';
import { Button, inputDiv , textAreaDiv, inputPasswordDiv} from '../styles/MUIComponents.jsx'
import { useNavigate } from 'react-router-dom';
import { useUserUpdateContext } from "../contexts/PostContext.jsx"

const SignUp = () => {
    let navigate = useNavigate();
    const formRef = React.useRef();
    const addUserData = useUserUpdateContext();


    const handleClick = () => {

        // Return if missing fields
        if(!formRef.current.reportValidity()) {
            return;
        }

        let username = document.querySelector('#signup_Username');
        let password = document.querySelector('#signup_Password');
        let owner = document.querySelector('#owner');
        let phone_number = document.querySelector('#phone_number');
        let street_address = document.querySelector('#street_address');
        let city = document.querySelector('#city');
        let state = document.querySelector('#state');

        const body = { 
            username: username.value, 
            password: password.value,
            owner: owner.value,
            phone_number: phone_number.value,
            street_address: street_address.value,
            city: city.value,
            state: state.value
        };

        console.log('signup:', body);
        fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.json())
            .then(data => {
                console.log('signup data resp:', data);
                addUserData(data);
                navigate('/app');
            })
            .catch(err => {
                console.log("Invalid UserName or password");
                username.value = '';
                password.value = '';
                console.log(err)
            });

    }
    return (
        <form ref={formRef}>
            <h4>Username and Password</h4>
            <div className="create-post-inputs">
                {inputDiv('Username', 'signup_Username', true)}
                {inputPasswordDiv('Password', 'signup_Password', true)}
            </div>
            <h4>Your Information</h4>
            <div className="create-post-inputs">
                {inputDiv('Name:', 'owner', true)}
                {inputDiv('Phone Number:', 'phone_number', true)}
                {inputDiv('Street Address:', 'street_address', true)}
                {inputDiv('City:', 'city', true)}
                {inputDiv('State:', 'state', true)}
            </div>
            <Button onClick={() => navigate('/login')}>Login</Button>
            <Button onClick={handleClick}>Submit</Button>
        </form>
        )
}


export default SignUp;