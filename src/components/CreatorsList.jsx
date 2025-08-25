import React, { useState, useEffect } from 'react';
import CreatorCard from './creator';
import { supabase } from '../client';
import '../css/components/CreatorCard.css';

const CreatorsList = ({ onEdit, onView }) => {
    const [creators, setCreators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch creators from Supabase
    useEffect(() => {
        fetchCreators();
    }, []);

    const fetchCreators = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                throw error;
            }

            setCreators(data || []);
        } catch (err) {
            console.error('Error fetching creators:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete creator
    const handleDelete = async (creatorId) => {
        if (window.confirm('Are you sure you want to delete this creator?')) {
            try {
                const { error } = await supabase
                    .from('creators')
                    .delete()
                    .eq('id', creatorId);

                if (error) {
                    throw error;
                }

                // Remove from local state
                setCreators(creators.filter(creator => creator.id !== creatorId));
                alert('Creator deleted successfully!');
            } catch (err) {
                console.error('Error deleting creator:', err);
                alert('Failed to delete creator: ' + err.message);
            }
        }
    };

    // Loading state
    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>Loading creators...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p style={{ color: 'var(--pico-del-color)' }}>
                    Error loading creators: {error}
                </p>
                <button onClick={fetchCreators} className="secondary">
                    Try Again
                </button>
            </div>
        );
    }

    // Empty state
    if (creators.length === 0) {
        return (
            <div className="empty-state">
                <hgroup>
                    <h2 className="heading"> No Creators Found</h2>
                    <p>Be the first to add a creator to the community!</p>
                    <p>Click the "Add Creator" button to get started.</p>
                </hgroup>
            </div>
        );
    }

    return (
        <div>
            <hgroup>
                <h2 className="heading"> Your Favorite Creators</h2>
                <p>Meet your favorite creators—because stalking celebrities in real life is frowned upon.</p>
            </hgroup>

            <div className="creators-grid">
                {creators.map((creator) => (
                    <CreatorCard
                        key={creator.id}
                        creator={creator}
                        onEdit={onEdit}
                        onDelete={handleDelete}
                        onView={onView}
                    />
                ))}
            </div>
        </div>
    );
};

export default CreatorsList;