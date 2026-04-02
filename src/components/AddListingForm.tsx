import React, { useState } from 'react';

import { Listing } from '../types/Listing';

interface AddListingFormProps {
  onSubmit: (listing: Omit<Listing, 'id' | 'userId' | 'createdAt'>) => void;
  onCancel: () => void;
}

const AddListingForm: React.FC<AddListingFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    image: '',
    price: 0,
    neighborhood: '',
    condition: 'Good' as const,
    tags: '',
    description: '',
    isAuction: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : type === 'number'
            ? Number(value)
            : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = {
      ...formData,
      tags: formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    } as Omit<Listing, 'id' | 'userId' | 'createdAt'>;
    onSubmit(formatted);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Add New Listing</h2>
          <button onClick={onCancel} className="modal-close">
            <svg
              style={{ width: '1.5rem', height: '1.5rem' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="image" className="form-label">
                Image URL
              </label>
              <input
                id="image"
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="form-input"
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="form-input"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="condition" className="form-label">
                  Condition
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="New">New</option>
                  <option value="Like New">Like New</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="neighborhood" className="form-label">
                Neighborhood
              </label>
              <input
                id="neighborhood"
                type="text"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., Downtown, Campus"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="tags" className="form-label">
                Tags (comma-separated)
              </label>
              <input
                id="tags"
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="form-input"
                placeholder="chair, desk, storage"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="form-textarea"
                placeholder="Describe the furniture item..."
                required
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="isAuction"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <input
                  id="isAuction"
                  type="checkbox"
                  name="isAuction"
                  checked={formData.isAuction}
                  onChange={handleChange}
                  style={{ marginRight: '0.5rem' }}
                />
                Auction Mode
              </label>
            </div>
            <div className="form-actions">
              <button type="button" onClick={onCancel} className="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddListingForm;
