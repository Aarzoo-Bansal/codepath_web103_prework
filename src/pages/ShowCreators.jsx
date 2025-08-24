import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import '../css/pages/ShowCreators.css';
import AddCreatorForm from '../components/AddCreatorForm';
import backgroundImage from '../assets/header_wallpaper8.png';

const ShowCreators = () => {
    const [currentView, setCurrentView] = useState('');
    const [hasUserClicked, setHasUserClicked] = useState(false);
    const formRef = useRef(null);
    const creatorsRef = useRef(null);

    
    useEffect(() => {
        if (currentView === 'add' && hasUserClicked) {
            if (formRef.current) {
                formRef.current.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }
    }, [currentView, hasUserClicked]);

    
    useEffect(() => {
        if (currentView === 'view' && hasUserClicked) {
            if (creatorsRef.current) {
                creatorsRef.current.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }
    }, [currentView, hasUserClicked]);

    const navigationItems = [ 
        {
            text: "VIEW ALL CREATORS",
            path: "#",
            className: "", 
            onClick: (e) => {
                console.log("View Creators button clicked");
                e.preventDefault();
                setHasUserClicked(true);
                setCurrentView('view');
                // Force scroll to creators list
                setTimeout(() => {
                    if (creatorsRef.current) {
                        creatorsRef.current.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                    }
                }, 50);
            }
        },
        {
            text: "ADD A CREATOR",
            path: "#",
            className: 'primary',
            onClick: (e) => {
                console.log("Add Creator button clicked");
                e.preventDefault();
                setHasUserClicked(true);
                setCurrentView('add');
                // Force scroll to form
                setTimeout(() => {
                    if (formRef.current) {
                        formRef.current.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                    }
                }, 50);
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
                <div className="content-area" ref={creatorsRef}>
                    <div className="creators-container">
                        <h2 className="content-title">Creators</h2>
                        <div className="creators-list">
                            <p className="no-creators-message">NO CREATORS YET 😔</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div ref={formRef}>
                    <AddCreatorForm
                        onCancel={() => {
                            setHasUserClicked(true);
                            setCurrentView('view');
                        }}
                        onSubmit={() => {
                            setHasUserClicked(true);
                            setCurrentView('view');
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default ShowCreators;

