import React, { useState } from 'react';

import AddListingButton from './components/AddListingButton';
import AddListingForm from './components/AddListingForm';
import ListingCard from './components/ListingCard';
import SearchBar from './components/SearchBar';
import { Listing } from './types/Listing';

const mockListings: Listing[] = [
  {
    id: '1',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    price: 50,
    neighborhood: 'Downtown',
    condition: 'Good',
    tags: ['Chair', 'Office'],
    description: 'Comfortable office chair with lumbar support',
    userId: 'user1',
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    price: 100,
    neighborhood: 'Campus',
    condition: 'Like New',
    tags: ['Desk', 'Study'],
    description: 'Modern wooden study desk with drawers',
    userId: 'user2',
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
  },
  {
    id: '3',
    image:
      'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop',
    price: 25,
    neighborhood: 'Westside',
    condition: 'Fair',
    tags: ['Bookshelf', 'Storage'],
    description: 'Bookshelf with adjustable shelves',
    userId: 'user3',
    createdAt: new Date(Date.now() - 259200000), // 3 days ago
  },
  {
    id: '4',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    price: 75,
    neighborhood: 'Eastside',
    condition: 'New',
    tags: ['Chair', 'Gaming'],
    description: 'Ergonomic gaming chair with RGB lighting',
    userId: 'user4',
    createdAt: new Date(Date.now() - 345600000), // 4 days ago
    isAuction: true,
  },
  {
    id: '5',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    price: 40,
    neighborhood: 'North Campus',
    condition: 'Good',
    tags: ['Desk', 'Compact'],
    description: 'Compact writing desk perfect for dorms',
    userId: 'user5',
    createdAt: new Date(Date.now() - 432000000), // 5 days ago
  },
  {
    id: '6',
    image:
      'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop',
    price: 15,
    neighborhood: 'Southside',
    condition: 'Poor',
    tags: ['Bookshelf', 'Used'],
    description: 'Old bookshelf needs some TLC',
    userId: 'user6',
    createdAt: new Date(Date.now() - 518400000), // 6 days ago
  },
  // Add more mock listings as needed
];

function App() {
  const [listings, setListings] = useState<Listing[]>(mockListings);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [sortMethod, setSortMethod] = useState<
    'newest' | 'oldest' | 'priceAsc' | 'priceDesc'
  >('newest');

  const tagSet = Array.from(new Set(listings.flatMap((listing) => listing.tags))).sort();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredListings = listings
    .filter((listing) => {
      const query = searchQuery.toLowerCase();
      const inText =
        listing.description.toLowerCase().includes(query) ||
        listing.neighborhood.toLowerCase().includes(query) ||
        listing.tags.some((tag) => tag.toLowerCase().includes(query));
      const selected = selectedTags.map((t) => t.toLowerCase());
      const tagFilter =
        selected.length === 0 ||
        selected.some((tag) => listing.tags.map((t) => t.toLowerCase()).includes(tag));
      return inText && tagFilter;
    })
    .slice()
    .sort((a, b) => {
      if (sortMethod === 'newest') return b.createdAt.getTime() - a.createdAt.getTime();
      if (sortMethod === 'oldest') return a.createdAt.getTime() - b.createdAt.getTime();
      if (sortMethod === 'priceAsc') return a.price - b.price;
      if (sortMethod === 'priceDesc') return b.price - a.price;
      return 0;
    });

  const handleAddListing = (newListing: Omit<Listing, 'id' | 'userId' | 'createdAt'>) => {
    const listing: Listing = {
      ...newListing,
      id: Date.now().toString(),
      userId: 'currentUser',
      createdAt: new Date(),
    };
    setListings((prev) => [...prev, listing]);
    setShowAddForm(false);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">dormdeals</h1>
          <div className="search-bar-wrapper">
            <SearchBar onSearch={setSearchQuery} />
          </div>
          <div className="control-row">
            <div className="tag-filters">
              <button
                className={`btn ${selectedTags.length === 0 ? 'active' : ''}`}
                onClick={() => setSelectedTags([])}
              >
                All
              </button>
              {tagSet.map((tag) => {
                const isChecked = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    className={`btn ${isChecked ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedTags((prev) =>
                        prev.includes(tag)
                          ? prev.filter((t) => t !== tag)
                          : [...prev, tag],
                      );
                    }}
                  >
                    {tag}
                    {isChecked && ' ✓'}
                  </button>
                );
              })}
            </div>
            <div>
              <label htmlFor="sort" className="sort-label">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortMethod}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSortMethod(
                    e.target.value as 'newest' | 'oldest' | 'priceAsc' | 'priceDesc',
                  )
                }
                className="sort-select"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="grid">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
        {filteredListings.length === 0 && (
          <div className="empty-state">
            <svg
              className="empty-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-5v2m0 0v2m0-2h2m-2 0h-2"
              />
            </svg>
            <h3 className="empty-title">No listings found</h3>
            <p className="empty-message">Try adjusting your search or tag filter.</p>
          </div>
        )}
      </main>

      <AddListingButton onClick={() => setShowAddForm(true)} />

      {showAddForm && (
        <AddListingForm
          onSubmit={handleAddListing}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}

export default App;
