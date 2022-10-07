import React from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '../styles/MUIComponents.jsx'
import { useNavigate } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import kobe from '../images/kobe.jpg';
import jinx from '../images/jinx.jpg';
import logo from '../images/logo_navbar.png';

// const getImgsPaths = () => {
//     fetch('/api/images', {
//         method: 'GET',
//         headers: { "Content-Type": "application/json" },
//         body: ''
//     })
//         .then((data) => {
//             return data.json();
//         })
//         .catch(err => console.log(err))
// }

/*

const imageUrl = "https://.../image.jpg";

fetch(imageUrl)
  //                         vvvv
  .then(response => response.blob())
  .then(imageBlob => {
      // Then create a local URL for that image and print it 
      const imageObjectURL = URL.createObjectURL(imageBlob);
      console.log(imageObjectURL);
  });

*/

//<img src={require('/images/image-name.png')} />

const imagesPathsArray = [kobe, jinx, logo]
// const imagesPathsArray = ['../images/kobe.jpg',
//     '../images/jinx.jpg',
//     '../images/logo_navbar.png']

const CarouselImg = ({ imagesPaths }) => {
    // Map an array of 6 random photos 
    let arrayOfImages = imagesPaths.map((el, i) => {
        console.log(el)
        return (
            <div>
                <img key={i} src={el} width={'50px'} />
                <p className="legend"></p>
            </div>
        )
    });
    console.log(arrayOfImages);
    return (
        <Carousel width={'60vw'}>
            {arrayOfImages}
        </Carousel>
    );
}

const LandingPage = (props) => {
    let navigate = useNavigate();

    // fetch('/api/', {
    //     method: 'GET',
    //     headers: { "Content-Type": "application/json" },
    //     body: ''
    // })
    //     .then((data) => {
    //         return data.json();
    //     })
    //     .catch(err => console.log(err))

    return (
        <>
            <div id="landing-page">
                LandingPage
                <div>
                    <Button onClick={() => { navigate('/login') }}>Login</Button>
                    <Button onClick={() => { navigate('/signup') }}>Sign Up</Button>
                </div>
                <div id='mission-statement'>
                    <h4>Mission Statement</h4>
                    <p>
                    We here at Welcome Home Friend love reuniting pet parents and their furry children. It is always so heartbreaking when our beloved furry friends do not return home. With Welcome Home Friend, you can post your lost pet, last known whereabouts, and your contact information in hopes of someone finding them. Of course we never want you to lose your pet, but we are here to make the process of finding them easier!
                    </p>
                </div>
                <CarouselImg imagesPaths={imagesPathsArray} />
            </div>
        </>
    );
    //            <a href='/auth/google'>Sign in with Google</a>
}


export default LandingPage;

// fetch('/api/found', {
//     method: 'POST',
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify( {_id: petObj._id} )
//   })
//     .then(() => {
//       addPetData({DELETEID: petObj._id});
//     })
//     .catch(err => console.log(err))
// }