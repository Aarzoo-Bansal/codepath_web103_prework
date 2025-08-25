import { useState } from 'react';

export const useModal = () => {
    const [modal, setModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'info',
        onConfirm: null,
        confirmText: 'OK',
        cancelText: 'Cancel'
    });

    const showModal = (config) => {
        setModal({
            isOpen: true,
            title: config.title || 'Message',
            message: config.message || '',
            type: config.type || 'info',
            onConfirm: config.onConfirm || null,
            confirmText: config.confirmText || 'OK',
            cancelText: config.cancelText || 'Cancel'
        });
    };

    const hideModal = () => {
        setModal(prev => ({ ...prev, isOpen: false }));
    };

    // Convenience methods
    const showSuccess = (message, title = 'Success') => {
        showModal({ type: 'success', title, message });
    };

    const showError = (message, title = 'Error') => {
        showModal({ type: 'error', title, message });
    };

    const showWarning = (message, title = 'Warning') => {
        showModal({ type: 'warning', title, message });
    };

    const showConfirm = (message, onConfirm, title = 'Confirm') => {
        showModal({ 
            type: 'confirm', 
            title, 
            message, 
            onConfirm,
            confirmText: 'Yes',
            cancelText: 'No'
        });
    };

    return {
        modal,
        showModal,
        hideModal,
        showSuccess,
        showError,
        showWarning,
        showConfirm
    };
};