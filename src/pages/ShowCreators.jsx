import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import '../css/pages/ShowCreators.css';
import AddCreatorForm from '../components/AddCreatorForm';
import EditCreatorForm from '../components/EditCreatorForm';
import backgroundImage from '../assets/header_wallpaper8.png';
import CreatorsList from '../components/CreatorsList';
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';

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

            {currentView === 'detail' && selectedCreator && (
                <div className="content-area" ref={creatorsRef}>
                    <div className="creators-container">
                        <div className="creator-detail-actions">
                            <button
                                role="button"
                                onClick={() => {
                                    setCurrentView('view');
                                    setSelectedCreator(null);
                                }}
                                className="secondary"
                            >
                                ← Back to List
                            </button>
                            <button
                                role="button"
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
                                    />
                                </div>
                            )}

                            <hgroup>
                                <h1>{selectedCreator.name}</h1>
                                {selectedCreator.tagline && (
                                    <p className="tagline">{selectedCreator.tagline}</p>
                                )}
                            </hgroup>

                            {selectedCreator.description && (
                                <p className="description">{selectedCreator.description}</p>
                            )}

                            <div className="social-links">
                                {selectedCreator.youtubeURL && (
                                    <a
                                        href={selectedCreator.youtubeURL.startsWith('http') ? selectedCreator.youtubeURL : `https://youtube.com/@${selectedCreator.youtubeURL}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link youtube"
                                    >
                                        <div className="social-icon-container">
                                            <FaYoutube className="social-icon" />
                                            <span className="social-text">YouTube</span>
                                        </div>
                                    </a>
                                )}
                                {selectedCreator.instaURL && (
                                    <a
                                        href={selectedCreator.instaURL.startsWith('http') ? selectedCreator.instaURL : `https://instagram.com/${selectedCreator.instaURL}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link instagram"
                                    >
                                        <div className="social-icon-container">
                                            <FaInstagram className="social-icon" />
                                            <span className="social-text">Instagram</span>
                                        </div>
                                    </a>
                                )}
                                {selectedCreator.twitterURL && (
                                    <a
                                        href={selectedCreator.twitterURL.startsWith('http') ? selectedCreator.twitterURL : `https://twitter.com/${selectedCreator.twitterURL}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link twitter"
                                    >
                                        <div className="social-icon-container">
                                            <FaSquareXTwitter className="social-icon" />
                                            <span className="social-text">Twitter</span>
                                        </div>
                                    </a>
                                )}
                                {selectedCreator.tiktokURL && (
                                    <a
                                        href={selectedCreator.tiktokURL.startsWith('http') ? selectedCreator.tiktokURL : `https://tiktok.com/@${selectedCreator.tiktokURL}`}
                                        target="_blank"

                                        rel="noopener noreferrer"
                                        className="social-link tiktok"
                                    >
                                        <div className="social-icon-container">
                                            <FaTiktok className="social-icon" />
                                            <span className="social-text">TikTok</span>
                                        </div>
                                    </a>
                                )}
                            </div>
                        </article>
                    </div>
                </div>
            )}


            {(currentView === 'edit') && (
                <div ref={formRef}>
                    <EditCreatorForm
                        creator={selectedCreator}
                        onCancel={handleFormCancel}
                        onSubmit={handleFormSubmit}
                    />
                </div>
            )}

            {(currentView === 'add') && (
                <div ref={formRef}>
                    <AddCreatorForm
                        onCancel={handleFormCancel}
                        onSubmit={handleFormSubmit}
                    />
                </div>
            )}
        </div>

    );
}

export default ShowCreators;

