import React, { useState } from 'react';
import Header from '../components/Header';
import '../css/pages/ShowCreators.css';
import AddCreatorForm from '../components/AddCreatorForm';
import backgroundImage from '../assets/header_wallpaper8.png';

const ShowCreators = () => {
    const [currentView, setCurrentView] = useState('view');

    const navigationItems = [ 
        {
            text: "VIEW ALL CREATORS",
            path: "#",
            className: "" // adding the primary class from pico css
        },
        {
            text: "ADD A CREATOR",
            path: "#",
            className: currentView === 'add' ? 'contrast' : 'outline secondary',
            onClick: (e) => {
                console.log("Add Creator button clicked");
                e.preventDefault();
                setCurrentView('add');
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

            {currentView === 'view' ? (
                <div className="content-area">
                    <div className="creators-container">
                        <h2 className="content-title">Creators</h2>
                        <div className="creators-list">
                            <p className="no-creators-message">NO CREATORS YET 😔</p>
                        </div>
                    </div>
                </div>
            ) : (
                <AddCreatorForm
                    onCancel={() => setCurrentView('view')}
                    onSubmit={() => setCurrentView('view')}
                />
            )}
        </div>
    );
}

export default ShowCreators;

