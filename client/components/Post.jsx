import React from "react";
import Modal from "./PostModal.jsx"
import pushpin from '../images/randoogle_Thumbtack_Pushpin.svg';
import { usePetUpdateContext } from "../contexts/PostContext.jsx";
import { Button } from '../styles/MUIComponents.jsx'


const Post = ( {petObj} ) => {
  //petObj will be a giant object with key value pairs of:
      // _id (req), pet_name (req), owner, address, 
      //eye_color, gender, image_url, fur_color, last_found, comments
  console.log(petObj);
  const addPetData = usePetUpdateContext();

  function loadImg(url) {
    if (url) return <img className="lost-pet-pic" src={petObj.image_url}></img>
  }

  function handleClick() {
    fetch('/api/found', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( {_id: petObj._id} )
    })
      .then(() => {
        addPetData({DELETEID: petObj._id});
      })
      .catch(err => console.log(err))
  }
  try {
    return (
      <div className="post">
        <div className="petPic">
          <img className="pushPin" src={pushpin} />
        </div>
        <h4 className="header4"><span className="petName">{petObj.pet_name.toUpperCase()}</span> is lost!</h4>
        <div className="petPic">{loadImg(petObj.image_url)}</div>
        <div className="info">
          <p>Pet is a <b>{petObj.gender.toUpperCase()} {petObj.breed.toUpperCase()}</b></p> {/* put type in line 15 or here? */}
          <p>Has <b>{petObj.fur_color.toUpperCase()}</b> colored fur</p>
          <p>Has <b>{petObj.eye_color.toUpperCase()}</b> colored eyes</p>
          <p>Owner is: <b>{petObj.owner ? petObj.owner.toUpperCase() : ""}</b></p>
          <Modal petObj={petObj}></Modal>
        </div>
        {petObj.isUser && (
          <div className="found-button">
            <Button onClick={() => { handleClick() }}>Found</Button>
          </div>
        )}
      </div>
    )
  }
  catch (err) {
    console.log('ERROR IN POST:', err);
  }
}

export default Post;

/*
 onClick={() => {
        fetch('/api/found', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify( {_id: petObj._id} )
        })
          .then(() => {
            addPetData({DELETEID: petObj._id});
          })
          .catch(err => console.log(err))
      }}
*/