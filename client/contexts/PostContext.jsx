import React, { useContext, useState } from 'react';

const PetContext = React.createContext();
const PetUpdateContext = React.createContext();
const UserContext = React.createContext();
const UserUpdateContext = React.createContext();

export function usePetContext() {
  return useContext(PetContext);
}

export function usePetUpdateContext() {
  return useContext(PetUpdateContext);
}

export function useUserContext() {
  return useContext(UserContext);
}

export function useUserUpdateContext() {
  return useContext(UserUpdateContext);
}

/*
        {inputDiv('Name:', 'owner', true)}
        {inputDiv('Phone Number:', 'phone_number', true)}
        {textAreaDiv('Address:', 'address')}
      </div>

      <h4>Pet's Information</h4>
      <div className="create-post-inputs">
        {inputDiv('Name:', 'pet_name', true)}
        {inputDiv('Breed:', 'type', true)}
        {inputDiv('Fur Color:', 'fur_color')}
        {inputDiv('Eye Color:', 'eye_color')}
        {inputDiv('Gender:', 'gender')}
        {inputDiv('Pet Photo URL:', 'image_url',)}
        {textAreaDiv('Last Known Location:', 'last_found')}
        {textAreaDiv('Additional Comments:', 'comments')}
*/

const defaultPetData = [
  // {
  //   owner: 'Bruce Wayne',
  //   phone_number: '1800-Gotham-Bros',
  //   address: 'Gotham Manor',
  //   pet_name: 'Ace',
  //   type: 'Ace',
  //   fur_color: "Gray",
  //   eye_color: 'White',
  //   gender: 'Male',
  //   image_url: "https://en.wikipedia.org/wiki/Dog#/media/File:Black_Labrador_Retriever_-_Male_IMG_3323.jpg",
  //   last_found: "Fighting the Joker",
  //   comments: "He's a good boy. Likes bat shaped treats.",
  // }
  // {
  //   owner: 'Jack',
  //   address: 'Nunya Bizness',
  //   phone_number: '123-123-123',
  //   pet_name: 'UNDERDOG',
  //   eye_color: 'Brown',
  //   gender: 'Male',
  //   fur_color: "White/Brown",
  //   last_found: "Flying through the Skies!",
  //   comments: "He has super-powers. Handle with care",
  // }
]

const defaultUserData = {
  username: '',
  password: '',
  owner: '',
  phone_number: '',
  street_address: '',
  city: '',
  state: '',
  userPetData: []
}

export function PetDataProvider({ children }) {
  const [petData, setPetData] = useState(defaultPetData);
  const [userData, setUserData] = useState(defaultUserData);

  //why do we need this functionality below?  Why should we ever change state in this way
  //shouldn't we update the database and the then update state with a query?

  function addPetData(newPetObj) {
    setPetData(oldState => {
      if (newPetObj.hasOwnProperty('DELETEID')) {
        //Logic to remove the object with this id from our state
        let newState = [...oldState]
        newState = newState.filter(element => {
          if (element._id === newPetObj.DELETEID) return false
          return true;
        })
        return newState;
      }
      if (Array.isArray(newPetObj)) return [...oldState, ...newPetObj]
      return [...oldState, newPetObj]
    })
  }

  function addUserData(newUserObj, pets=[]) {
    setUserData(oldState => {
      console.log('oldState:', oldState);
      //console.log('pets:', pets);
      console.log('PostContext.addUserData.setUserData', newUserObj);
      //pets.forEach((pet) => newUserObj.userPetData.push(pet));
      return newUserObj;
    })
  }

  return (
    <UserContext.Provider value={userData}>
      <UserUpdateContext.Provider value={addUserData}>
        <PetContext.Provider value={petData}>
          <PetUpdateContext.Provider value={addPetData}>
            {children}
          </PetUpdateContext.Provider>
        </PetContext.Provider>
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  )
}