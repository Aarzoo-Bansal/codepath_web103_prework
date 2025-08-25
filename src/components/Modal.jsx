import React, { useEffect, useRef } from 'react';
import '../css/components/Modal.css';

const Modal = ({
    isOpen,
    onClose,
    title,
    message,
    type = 'info', // 'success', 'error', 'warning', 'confirm'
    onConfirm = null,
    confirmText = 'OK',
    cancelText = 'Cancel'
}) => {
    const modalRef = useRef(null);
    const closeBtnRef = useRef(null);

    useEffect(() => {
        if (isOpen) {

            closeBtnRef.current?.focus();

            document.body.style.overflow = 'hidden';

            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    onClose();
                }
            };

            document.addEventListener('keydown', handleEscape);

            return () => {
                document.removeEventListener('keydown', handleEscape);
                document.body.style.overflow = 'unset';
            };
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
        onClose();
    };

    const getTypeIcon = () => {
        switch (type) {
            case 'success':
                return '✅';
            case 'error':
                return '❌';
            case 'warning':
                return '⚠️';
            case 'confirm':
                return '❓';
            default:
                return 'ℹ️';
        }
    };

    const getTypeColor = () => {
        switch (type) {
            case 'success':
                return '#28a745';
            case 'error':
                return '#dc3545';
            case 'warning':
                return '#ffc107';
            case 'confirm':
                return '#007bff';
            default:
                return 'var(--pico-primary)';
        }
    };

    return (
        <div
            className="modal-overlay"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-message"
        >
            <div
                ref={modalRef}
                className={`modal-container ${type}`}
                style={{
                    '--modal-accent-color': getTypeColor()
                }}
            >
                <div className="modal-header">
                    <h3
                        id="modal-title"
                        className="modal-title"
                        style={{ color: getTypeColor() }}
                    >
                        <span className="modal-icon">{getTypeIcon()}</span>
                        {title}
                    </h3>
                    <button
                        ref={closeBtnRef}
                        className="modal-close-btn"
                        onClick={onClose}
                        aria-label="Close modal"
                        style={{
                            '--close-hover-color': getTypeColor()
                        }}
                    >
                        <span aria-hidden="true">✕</span>
                    </button>
                </div>

                <div className="modal-body">
                    <p
                        id="modal-message"
                        className="modal-message"
                    >
                        {message}
                    </p>
                </div>

                <div className="modal-footer">
                    {type === 'confirm' ? (
                        <>
                            <button
                                className="modal-btn secondary"
                                onClick={onClose}
                                aria-label={`Cancel: ${cancelText}`}
                            >
                                {cancelText}
                            </button>
                            <button
                                className="modal-btn primary"
                                onClick={handleConfirm}
                                aria-label={`Confirm: ${confirmText}`}
                                autoFocus
                            >
                                {confirmText}
                            </button>
                        </>
                    ) : (
                        <button
                            className={`modal-btn ${type === 'error' ? 'secondary' : 'primary'}`}
                            onClick={onClose}
                            aria-label={`Close: ${confirmText}`}
                            autoFocus
                        >
                            {confirmText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;