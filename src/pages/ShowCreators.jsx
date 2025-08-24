import React from 'react';
import Header from '../components/Header';
import '../css/pages/ShowCreators.css';
import backgroundImage from '../assets/header_wallpaper8.png';

const ShowCreators = () => {

    const navigationItems = [ 
        {
            text: "VIEW ALL CREATORS",
            path: "/",
            className: "" // adding the primary class from pico css
        },
        {
            text: "ADD A CREATOR",
            path: "/creators/add",
            className: "",
            onClick: () => {
                console.log("Add Creator button clicked");
            }
        }
    ];

    return (
        <div className="show-creators">
            <Header
                backgroundImage={backgroundImage}
                showNavigation={true}
                navigationItems={navigationItems}
                title="CREATORVERSE"
            />
        </div>
    );
}

export default ShowCreators;

