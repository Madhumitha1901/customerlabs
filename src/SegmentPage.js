import React, { useState } from 'react';
import axios from 'axios';
const SegmentPage = () => {
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [newSchema, setNewSchema] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSaveSegment = () => {
    // Send data to the server in the desired format
    const data = {
      segment_name: segmentName,
      schema: selectedSchemas.map((schema) => ({ [schema.value]: schema.label })),
    };
    console.log(data); // Replace with actual API call


    axios.post('https://webhook.site/00000000-0000-0000-0000-000000000000', data)
    .then(response => {
      console.log('Webhook request sent successfully:', response.data);
      // Handle success response here
    })
    .catch(error => {
      console.error('Error sending webhook request:', error);
      // Handle error here
    });

  };

  const handleAddSchema = () => {
    if (newSchema) {
      setSelectedSchemas([...selectedSchemas, { value: newSchema, label: newSchema }]);
      setNewSchema('');
      setShowPopup(false);
    }
  };

  const handleAddNewSchemaClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setNewSchema('');
  };

  return (
    <div className="container mt-5">
      <h1>Create Segment</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter segment name"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={() => handleSaveSegment()}>
        Save Segment
      </button>
      <button className="btn btn-secondary ms-2" onClick={() => handleAddNewSchemaClick()}>
        Add Schema to Segment
      </button>
      {showPopup && (
        <div className="popup card p-3 mt-3">
          <select
            className="form-select mb-2"
            value={newSchema}
            onChange={(e) => setNewSchema(e.target.value)}
          >
            <option value="">Select Schema</option>
            <option value="first_name">First Name</option>
            <option value="last_name">Last Name</option>
            <option value="gender">Gender</option>
            <option value="age">Age</option>
            <option value="account_name">Account Name</option>
            <option value="city">City</option>
            <option value="state">State</option>
          </select>
          <div>
            <button className="btn btn-success me-2" onClick={() => handleAddSchema()}>
              Add Schema
            </button>
            <button className="btn btn-danger" onClick={() => handleClosePopup()}>
              Close
            </button>
          </div>
        </div>
      )}
      <div className="mt-3">
        {selectedSchemas.map((schema, index) => (
          <div key={index} className="badge bg-info me-2 mb-2">
            {schema.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SegmentPage;
