import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import '../css/pages/ShowCreators.css';
import AddCreatorForm from '../components/AddCreatorForm';
import backgroundImage from '../assets/header_wallpaper8.png';
import CreatorsList from '../components/CreatorsList';

const ShowCreators = () => {
    const [currentView, setCurrentView] = useState('');
    const [hasUserClicked, setHasUserClicked] = useState(false);
    const [selectedCreator, setSelectedCreator] = useState(null);
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

    const handleEditCreator = (creator) => {
        setSelectedCreator(creator);
        setCurrentView('edit');
        setHasUserClicked(true);
        // Scroll to form
        setTimeout(() => {
            if (formRef.current) {
                formRef.current.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }, 50);
    };

    const handleViewCreator = (creator) => {
        setSelectedCreator(creator);
        setCurrentView('detail');
        setHasUserClicked(true);
        // Scroll to detail view
        setTimeout(() => {
            if (creatorsRef.current) {
                creatorsRef.current.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }, 50);
    };

    const handleFormSubmit = () => {
        setHasUserClicked(true);
        setCurrentView('view');
        setSelectedCreator(null);
        // Scroll back to creators list
        setTimeout(() => {
            if (creatorsRef.current) {
                creatorsRef.current.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }, 50);
    };

    const handleFormCancel = () => {
        setHasUserClicked(true);
        setCurrentView('view');
        setSelectedCreator(null);
        // Scroll back to creators list
        setTimeout(() => {
            if (creatorsRef.current) {
                creatorsRef.current.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }, 50);
    };

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
                setSelectedCreator(null);
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
                setSelectedCreator(null);
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
        // <div className="show-creators">
        //     <Header
        //         backgroundImage={backgroundImage}
        //         showNavigation={true}
        //         navigationItems={navigationItems}
        //         title="CREATORVERSE"
        //     />

        //     {currentView === 'view' ? (
        //         <div className="content-area" ref={creatorsRef}>
        //             <div className="creators-container">
        //                 <h2 className="content-title">Creators</h2>
        //                 <div className="creators-list">
        //                     <p className="no-creators-message">NO CREATORS YET 😔</p>
        //                 </div>
        //             </div>
        //         </div>
        //     ) : (
        //         <div ref={formRef}>
        //             <AddCreatorForm
        //                 onCancel={() => {
        //                     setHasUserClicked(true);
        //                     setCurrentView('view');
        //                 }}
        //                 onSubmit={() => {
        //                     setHasUserClicked(true);
        //                     setCurrentView('view');
        //                 }}
        //             />
        //         </div>
        //     )}
        // </div>

        <div className="show-creators">
        <Header
            backgroundImage={backgroundImage}
            showNavigation={true}
            navigationItems={navigationItems}
            title="CREATORVERSE"
        />

        {/* CREATORS LIST VIEW */}
        {currentView === 'view' && (
            <div className="content-area" ref={creatorsRef}>
                <div className="creators-container">
                    <h2 className="content-title">Creators</h2>
                    <div className="creators-list">
                        <CreatorsList 
                            onEdit={handleEditCreator}
                            onView={handleViewCreator}
                        />
                    </div>
                </div>
            </div>
        )}

        {/* CREATOR DETAIL VIEW */}
        {currentView === 'detail' && selectedCreator && (
            <div className="content-area" ref={creatorsRef}>
                <div className="creators-container">
                    <div style={{ marginBottom: '1rem' }}>
                        <button 
                            onClick={() => {
                                setCurrentView('view');
                                setSelectedCreator(null);
                            }}
                            className="secondary"
                            style={{ marginRight: '1rem' }}
                        >
                            ← Back to List
                        </button>
                        <button 
                            onClick={() => handleEditCreator(selectedCreator)}
                            className="primary"
                        >
                            Edit Creator
                        </button>
                    </div>

                    <article className="creator-detail">
                        {selectedCreator.imageURL && (
                            <div className="creator-detail-image">
                                <img 
                                    src={selectedCreator.imageURL} 
                                    alt={`${selectedCreator.name} profile`}
                                    style={{ 
                                        width: '100%', 
                                        maxWidth: '300px', 
                                        height: '300px', 
                                        objectFit: 'cover',
                                        borderRadius: 'var(--pico-border-radius)'
                                    }}
                                />
                            </div>
                        )}
                        
                        <hgroup>
                            <h1>{selectedCreator.name}</h1>
                        </hgroup>
                        
                        <p>{selectedCreator.description}</p>
                        
                        <div className="social-links">
                            {selectedCreator.youtubeURL && (
                                <a 
                                    href={selectedCreator.youtubeURL.startsWith('http') ? selectedCreator.youtubeURL : `https://youtube.com/@${selectedCreator.youtubeURL}`}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="social-link youtube"
                                >
                                    🎥 YouTube
                                </a>
                            )}
                            {selectedCreator.instaURL && (
                                <a 
                                    href={selectedCreator.instaURL.startsWith('http') ? selectedCreator.instaURL : `https://instagram.com/${selectedCreator.instaURL}`}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="social-link instagram"
                                >
                                    📷 Instagram
                                </a>
                            )}
                            {selectedCreator.twitterURL && (
                                <a 
                                    href={selectedCreator.twitterURL.startsWith('http') ? selectedCreator.twitterURL : `https://twitter.com/${selectedCreator.twitterURL}`}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="social-link twitter"
                                >
                                    🐦 Twitter
                                </a>
                            )}
                        </div>
                    </article>
                </div>
            </div>
        )}

        {/* ADD CREATOR FORM */}
        {(currentView === 'add' || currentView === 'edit') && (
            <div ref={formRef}>
                <AddCreatorForm
                    creator={currentView === 'edit' ? selectedCreator : null}
                    isEditing={currentView === 'edit'}
                    onCancel={handleFormCancel}
                    onSubmit={handleFormSubmit}
                />
            </div>
        )}
    </div>

    );
}

export default ShowCreators;

