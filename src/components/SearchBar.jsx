import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText, setSelectedCategory } from '../app/blogSlice';

export const SearchBar = () => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { searchText, selectedCategory } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search by title or author..."
        value={searchText}
        onChange={(e) => dispatch(setSearchText(e.target.value))}
        style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
      />
      <select
        value={selectedCategory}
        onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
        style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
      >
        <option value="All">All Categories</option>
        <option value="React">React</option>
        <option value="Redux">Redux</option>
        <option value="Node">Node</option>
      </select>
    </div>
  );
};