import React from 'react';

const ConfirmDeletePopup = ({ title, message, onCancel, onConfirm }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="popup-buttons">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletePopup;