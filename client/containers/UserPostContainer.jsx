import React, { useEffect, useState } from "react";
import Post from "../components/Post.jsx";
import { useUserPetsContext, useUserPetsUpdateContext } from "../contexts/PostContext.jsx";

const UserPostContainer = () => {
//const [userPets, setUserPets] = useState();
   const userPetsData = useUserPetsContext();
   const userPetsUpdateData = useUserPetsUpdateContext();
   console.log('UserPostContainer, userData:', userPetsData);

    useEffect(() => {
        fetch('/api/user')
            .then(res => res.json())
            .then(data => {
                console.log('user pet data:', data);
                // setUserPets(data);
                userPetsUpdateData(data);
            })
            .catch(err => console.log(err));
    }, [])
   //{userPetsData.map((el, i) => <Post key={i} petObj={el} isUser={true} />)}

    return (
        <div className="user-container">
            <h1 className="center-text">Your Lost Friends</h1>
            <div className="post-list">
                {/* Array of Post Components */}
                {userPetsData ? userPetsData.map((el, i) => <Post key={i} petObj={el} isUser={true} />) : <></>}
            </div>
        </div>
    )
}

export default UserPostContainer;