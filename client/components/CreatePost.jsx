import React from 'react';
import { usePetContext, usePetUpdateContext } from '../contexts/PostContext.jsx';
import TextField from '@mui/material/TextField';
import { Button, inputDiv, textAreaDiv } from '../styles/MUIComponents.jsx'

const CreatePost = () => {
  const addPetData = usePetUpdateContext();
  const formRef = React.useRef();

  // const petDetails = usePetContext()
  // _id (req), pet_name (req), owner, address, eye_color, gender, image_url, fur_color, last_found, comments

  function handleClick() {
    // addPetData(petData())
    // fetch(postURL).then(whtvr).catch(handleerr)

    console.log('clicked!');

    if(!formRef.current.reportValidity()) {
      return;
    }

    fetch('/api/pet', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(petData())
    })
      .then(res => res.json()) //then adding the pet to our state
      .then(data => addPetData(data))
      .catch(err => console.log('Create Post Err:', err))
  }

  return (
    <form ref={formRef}>

      <div className="create-post">
        <h1>Create a Post</h1>

        <h4>Your Information</h4>
        <div className="create-post-inputs">
          {inputDiv('Name:', 'owner', true)}
          {inputDiv('Phone Number:', 'phone_number', true)}
          {textAreaDiv('Address:', 'address')}
        </div>

        <h4>Pet's Information</h4>
        <div className="create-post-inputs">
          {inputDiv('Name:', 'pet_name', true)}
          {inputDiv('Breed:', 'breed', true)}
          {inputDiv('Fur Color:', 'fur_color', true)}
          {inputDiv('Eye Color:', 'eye_color', true)}
          {inputDiv('Gender:', 'gender')}
          {inputDiv('Pet Photo URL:', 'image_url',)}
          {textAreaDiv('Additional Comments:', 'comments')}
        </div>

        <h4>Last known Location:</h4>
        <div className="create-post-inputs">
          {inputDiv('Street Address:', 'street_address', true)}
          {inputDiv('City:', 'city', true)}
          {inputDiv('State:', 'state', true)}
        </div>

        <div className="create-post-submit">
          <Button onClick={() => { handleClick() }}>Submit Lost Pet</Button>
        </div>
        <div className="cat-divider">
          <img id="cat-divider" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/de114712-7dca-4f5b-920a-8a7d7d75c452/de0jawd-5dcf5ace-2070-45d1-9511-9d6277d25180.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RlMTE0NzEyLTdkY2EtNGY1Yi05MjBhLThhN2Q3ZDc1YzQ1MlwvZGUwamF3ZC01ZGNmNWFjZS0yMDcwLTQ1ZDEtOTUxMS05ZDYyNzdkMjUxODAuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.lDQR5USnXOaRH_Y0ijIykOzRbAO-9Zh3GlzdTvrY-Ms" />
        </div>

      </div>
    </form>

  )
}

//make a petData a function that returns an Object with all the data from the input fields of the DOM
//make sure he data is formatted with correct key value pairs
//NOTE: make sure elements of dataKey match with the second param of inputDiv
const dataKeys = ['pet_name', 'breed', 'owner', 'address', 'eye_color', 'gender', 'image_url', 'fur_color', 'street_address', 'city', 'state', 'comments', 'phone_number']
const petData = () => {
  const dataObj = {}

  for (let key of dataKeys) {
    if (document.getElementById(key)) {
      console.log(" *** LOAD USER DATA FROM CONTEXT HERE!!! *** ");
      dataObj[key] = document.getElementById(key).value;
      document.getElementById(key).value = '';
    }
  }

  return dataObj;
}

export default CreatePost