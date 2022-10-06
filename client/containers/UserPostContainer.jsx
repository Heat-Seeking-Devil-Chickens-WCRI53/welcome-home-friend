import React, { useEffect, useState } from "react";
import Post from "../components/Post.jsx";
import { useUserContext } from "../contexts/PostContext.jsx";

const UserPostContainer = () => {
//const [userPets, setUserPets] = useState();
   const userData = useUserContext();
   //console.log('userData:', userData);

    useEffect(() => {
        fetch('/api/user')
            .then(res => res.json())
            .then(data => {
                console.log('user pet data:', data);
                // setUserPets(data);
            })
            .catch(err => console.log(err));
    }, [])
   //{userData.userPetData.map((el, i) => <Post key={i} petObj={el} isUser={true} />)}

    return (
        <div className="user-container">
            <h1 className="center-text">Your Lost Friends</h1>
            <div className="post-list">
                {/* Array of Post Components */}
            </div>
        </div>
    )
}

export default UserPostContainer;