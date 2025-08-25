import React, { useState, useEffect } from 'react';
import CreatorCard from './creator';
import { supabase } from '../client';
import '../css/components/CreatorCard.css';
import { useModal } from '../hooks/useModal';
import Modal from './Modal';

const CreatorsList = ({ onEdit, onView }) => {
    const [creators, setCreators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        creatorId: null,
        creatorName: ''
    });
    
    const { showSuccess, showError } = useModal();

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

    const showDeleteConfirmation = (creatorId, creatorName) => {
        setDeleteModal({
            isOpen: true,
            creatorId,
            creatorName
        });
    };

    const hideDeleteModal = () => {
        setDeleteModal({
            isOpen: false,
            creatorId: null,
            creatorName: ''
        });
    };

    const confirmDelete = async () => {
        const { creatorId } = deleteModal;
        
        try {
            const { error } = await supabase
                .from('creators')
                .delete()
                .eq('id', creatorId);

            if (error) {
                throw error;
            }

            setCreators(creators.filter(creator => creator.id !== creatorId));
       
            showSuccess(
                "Creator deleted successfully!",
                "Creator Deleted"
            );
       
            hideDeleteModal();
            
        } catch (err) {
            console.error('Error deleting creator:', err);
            showError(
                "Failed to delete creator: " + err.message,
                "Delete Failed"
            );
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>Loading creators...</p>
            </div>
        );
    }

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
                <p>Meet the people behind the content you love.</p>
            </hgroup>

            <div className="creators-grid">
                {creators.map((creator) => (
                    <CreatorCard
                        key={creator.id}
                        creator={creator}
                        onEdit={onEdit}
                        onDelete={() => showDeleteConfirmation(creator.id, creator.name)}
                        onView={onView}
                    />
                ))}
            </div>
            
            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={deleteModal.isOpen}
                onClose={hideDeleteModal}
                title="Delete Creator"
                message={`Are you sure you want to delete "${deleteModal.creatorName}"? This action cannot be undone.`}
                type="confirm"
                onConfirm={confirmDelete}
                confirmText="Delete"
                cancelText="Cancel"
            />
        </div>
    );
};

export default CreatorsList;