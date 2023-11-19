import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const UploadModal = ({ show, handleClose }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    // Implement the upload logic here
    console.log(file);
    handleClose(); // Close the modal after upload
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Upload Documents/License/Certification</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: 'center' }}>
        <div style={{ border: '2px dashed #ccc', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="file-upload"
          />
          <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
            <i className="fa fa-cloud-upload" aria-hidden="true" style={{ fontSize: '50px', color: '#ccc' }}></i>
            <p>{file ? file.name : 'No file chosen'}</p>
          </label>
        </div>
        <Button variant="primary" onClick={handleUpload}>
          Upload
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default UploadModal; 