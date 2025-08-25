import React from 'react';
import { FaYoutube, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
import '../css/components/CreatorCard.css';
import { IoInformationOutline, IoPencilOutline, IoTrashOutline } from "react-icons/io5";



const CreatorCard = ({ creator, onEdit, onDelete, onView }) => {
    const { id, name, tagline, imageURL, instaURL, youtubeURL, twitterURL, tiktokURL } = creator;

    return (
        <article className="creator-card">
            <div
                className="creator-image-container"
                style={{
                    backgroundImage: imageURL ? `url(${imageURL})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                {!imageURL && (
                    <div className="creator-image-placeholder">
                        <span>{name ? name.charAt(0).toUpperCase() : '?'}</span>
                    </div>
                )}


                <div className="image-overlay"></div>

                <div className="card-actions">
                    <button
                        onClick={() => onView(creator)}
                        className="action-btn view-btn"
                        title="View Creator">
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IoInformationOutline /></span>
                    </button>
                    <button
                        onClick={() => onEdit(creator)}
                        className="action-btn edit-btn"
                        title="Edit Creator"
                    >
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IoPencilOutline /></span>
                    </button>
                    <button
                        onClick={() => onDelete(id)}
                        className="action-btn delete-btn"
                        title="Delete Creator"
                    >
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IoTrashOutline /></span>
                    </button>
                </div>


                <div className="card-content">
                    <div className="creator-info">
                        <h3 className="creator-name">{name}</h3>
                        <p className="creator-description">{tagline}</p>
                    </div>


                    <div className="social-links">
                        {youtubeURL && (
                            <a
                                href={youtubeURL.startsWith('http') ? youtubeURL : `https://youtube.com/@${youtubeURL}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link youtube"
                                title="YouTube"
                            >
                                <FaYoutube />
                            </a>
                        )}
                        {instaURL && (
                            <a
                                href={instaURL.startsWith('http') ? instaURL : `https://instagram.com/${instaURL}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link instagram"
                                title="Instagram"
                            >
                                <FaInstagram />
                            </a>
                        )}
                        {twitterURL && (
                            <a
                                href={twitterURL.startsWith('http') ? twitterURL : `https://twitter.com/${twitterURL}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link twitter"
                                title="Twitter"
                            >
                                <FaTwitter />
                            </a>
                        )}
                        {tiktokURL && (
                            <a
                                href={tiktokURL.startsWith('http') ? tiktokURL : `https://tiktok.com/@${tiktokURL}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link tiktok"
                                title="TikTok"
                            >
                                <FaTiktok />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default CreatorCard;