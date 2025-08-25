import React, { useState } from 'react';
import { supabase } from '../client';
import '../css/components/AddCreatorForm.css';
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";


const AddCreatorForm = ({ onCancel, onSubmit }) => {
    const [creatorData, setCreatorData] = useState({
        name: '',
        tagline: '',
        description: '',
        instaURL: '',
        youtubeURL: '',
        twitterURL: '',
        tiktokURL: ''
    });

    const handleChange = (e) => {
        setCreatorData({
            ...creatorData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!creatorData.instaURL && !creatorData.youtubeURL && !creatorData.twitterURL) {
            alert("Please provide at least one social media link");
            return;
        }

        console.log('Form submitted:', creatorData);
        if(creatorData.instaURL){
            creatorData.instaURL = 'https://www.instagram.com/' + creatorData.instaURL;
        }
        if(creatorData.youtubeURL){
            creatorData.youtubeURL = 'https://www.youtube.com/channel/' + creatorData.youtubeURL;
        }
        if(creatorData.twitterURL){
            creatorData.twitterURL = 'https://x.com/' + creatorData.twitterURL;
        }
        if(creatorData.tiktokURL){
            creatorData.tiktokURL = 'https://www.tiktok.com/@' + creatorData.tiktokURL;
        }
        

        const { data, error } = await supabase
            .from('creators')
            .insert({
                name: creatorData.name,
                tagline: creatorData.tagline,
                instaURL: creatorData.instaURL,
                youtubeURL: creatorData.youtubeURL,
                twitterURL: creatorData.twitterURL,
                tiktokURL: creatorData.tiktokURL,
                description: creatorData.description,
                imageURL: creatorData.imageURL
            })
            .select();

        if (error) {
            console.error('Error creating creator:', error);
            alert("Failed to create creator");
        } else {
            alert("Creator created successfully");
            onSubmit(data);
        }
    };

    return (
        <main className="container" style={{ marginTop: '0px' }}>
            <section className="section-width">
                <hgroup>
                    <h2 className="heading"> Add a New Creator</h2>
                    <p>Share your favorite creators with the community!</p>
                </hgroup>


                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <div className="individual-input">
                            <label className='label'>
                                Name
                                <input
                                    type="text"
                                    name="name"
                                    value={creatorData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                        </div>

                        <div className="individual-input">
                            <label className='label'>
                                Tagline
                                <br></br>
                                <small className="tips">Briefly describe what this creator is known for</small>
                                <input
                                    type="text"
                                    name="tagline"
                                    value={creatorData.tagline}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                        </div>

                        <div className="individual-input">
                            <label className='label'>
                                Description
                                <br></br>
                                <small className="tips">Provide a description of your creator. Who are they? What do they do? What makes them unique?</small>
                                <textarea
                                    name="description"
                                    value={creatorData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    required
                                />
                            </label>
                        </div>

                        <div className="individual-input">
                            <label className='label'>
                                Image URL
                                <br></br>
                                <small className="tips">Provide a link to an image of your creator. Be sure to include the http:// or https://</small>
                                <input
                                    type="url"
                                    name="imageURL"
                                    value={creatorData.imageURL}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        <div className="individual-input">
                            <h3>SOCIAL MEDIA LINKS</h3>
                            <small className="tips">Provide atleast one of the creator's social media links. This will help users find them and follow them.</small>
                            <br></br>
                            <br></br>

                            <label className='label' style={{padding: '10px'}}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' , marginBottom: '5px'}}>
                                    <span style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                                        <span className="fa-brands fa-instagram" aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>
                                            <FaYoutube /> 
                                        </span>
                                        <span style={{ fontSize: '20px', marginLeft: '10px', display: 'flex', alignItems: 'center' }}>Youtube</span>
                                    </span>
                                </span>
                                <br></br>
                                <small className="tips">The creator's Youtube handle (without the @)  </small>

                                <input
                                    type="text"
                                    name="youtubeURL"
                                    value={creatorData.youtubeURL}
                                    onChange={handleChange}
                                />
                            </label>


                            <label className='label' style={{padding: '10px'}}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' , marginBottom: '5px'}}>
                                    <span style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                                        <span className="fa-brands fa-instagram" aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>
                                            <FaInstagram />
                                        </span>
                                        <span style={{ fontSize: '20px', marginLeft: '10px', display: 'flex', alignItems: 'center' }}>Instagram</span>
                                    </span>
                                </span>
                                <br></br>
                                <small className="tips">The creator's Instagram handle (without the @)  </small>

                                <input
                                    type="text"
                                    name="instaURL"
                                    value={creatorData.instaURL}
                                    onChange={handleChange}
                                />
                            </label>

                            <label className='label' style={{padding: '10px'}}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' , marginBottom: '5px'}}>
                                    <span style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                                        <span className="fa-brands fa-instagram" aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>
                                            <FaSquareXTwitter />
                                        </span>
                                        <span style={{ fontSize: '20px', marginLeft: '10px', display: 'flex', alignItems: 'center' }}>X (Twitter)</span>
                                    </span>
                                </span>
                                <br></br>
                                <small className="tips">The creator's X handle (without the @)  </small>

                                <input
                                    type="text"
                                    name="twitterURL"
                                    value={creatorData.twitterURL}
                                    onChange={handleChange}
                                />
                            </label>

                            <label className='label' style={{padding: '10px'}}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' , marginBottom: '5px'}}>
                                    <span style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                                        <span className="fa-brands fa-instagram" aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>
                                            <FaTiktok />
                                        </span>
                                        <span style={{ fontSize: '20px', marginLeft: '10px', display: 'flex', alignItems: 'center' }}>Tiktok</span>
                                    </span>
                                </span>
                                <br></br>
                                <small className="tips">The creator's Tiktok handle (without the @)  </small>

                                <input
                                    type="text"
                                    name="tiktokURL"
                                    value={creatorData.tiktokURL}
                                    onChange={handleChange}
                                />
                            </label>

                            
                        </div>

                    </fieldset>

                    <div role="group" className="individual-input">
                        <button
                            role="button"
                            type="button"
                            className="secondary"
                            onClick={onCancel}
                        >Cancel
                        </button>

                        <button
                            role="button"
                            type="submit"
                            className="primary"
                        >Add Creator</button>
                    </div>
                </form>

            </section>
        </main>

    );
};

export default AddCreatorForm;