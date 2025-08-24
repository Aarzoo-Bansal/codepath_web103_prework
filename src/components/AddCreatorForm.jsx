import React, { useState } from 'react';
import { supabase } from '../client';
import '../css/components/AddCreatorForm.css';

const AddCreatorForm = ({ onCancel, onSubmit }) => {
    const [creatorData, setCreatorData] = useState({
        name: '',
        url: '',
        description: '',
        imageURL: null,
    });

    const handleChange = (e) => {
        setCreatorData( {
            ...creatorData,
            [e.target.name] : e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Form submitted:', creatorData);

        const { data, error } = await supabase
        .from ('creators')
        .insert({name: creatorData.name, url: creatorData.url, description: creatorData.description, imageURL: creatorData.imageURL})
        .select()
        if (error) {
            console.error('Error creating creator:', error);
            alert("Failed to create creator");
        } else {
            alert("Creator created successfully");
            onSubmit(data);
        }
    };

    return (
        <main>
            <section>
                <hgroup>
                    <h2> Add a New Creator</h2>
                    <p>Share your favorite creators with the community!</p>
                </hgroup>

                <article>
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <div className="form-group">
                            <label>
                                Name
                                <input 
                                    type="text"
                                    name="name"
                                    value={creatorData.name}
                                    onChange={handleChange}
                                    placeholder="Enter creator's name"
                                    required
                                />
                            </label>

                            </div>
                            

                            <label>
                                Social Media URL
                                <input
                                    type="url"
                                    name="url"
                                    value={creatorData.url}
                                    onChange={handleChange}
                                    placeholder="https://www.instagram.com/username"
                                    required
                                />
                            </label>

                            <label>
                                Description
                                <textarea
                                    name="description"
                                    value={creatorData.description}
                                    onChange={handleChange}
                                    placeholder="Tell us about this creator..."
                                    rows="4"
                                    required
                                />
                            </label>

                            <label>
                                Image URL
                                <input
                                    type="url"
                                    name="imageURL"
                                    value={creatorData.imageURL}
                                    onChange={handleChange} 
                                    placeholder="https://www.example.com/image.jpg"
                                />
                                <small>Optional: Add a profile image for the creator</small>
                            </label>
                        </fieldset>

                        <div role="group">
                            <button
                                type="button"
                                className="secondary outline"
                                onClick={onCancel}
                            >
                                Cancel
                            </button>

                            <button 
                            type="submit">
                                Add Creator</button>
                        </div>
                    </form>
                </article>
            </section>
        </main>

    );
};

export default AddCreatorForm;