import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogs, setSearchText, setSelectedCategory, deleteBlog, toggleFeatured } from './app/blogSlice';

export default function App() {
  const dispatch = useDispatch();

  // Part 4: useSelector to read Redux state
  const { items: blogs, searchText, selectedCategory, loading, error } = useSelector((state) => state.blogs);

  // Dispatching async thunk on mount
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // Client-side search and category filtering
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchText.toLowerCase()) ||
                          blog.author.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', fontFamily: 'sans-serif', padding: '0 20px' }}>
      <h2>Redux Blog Dashboard</h2>

      {/* Search & Category Controls */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchText}
          onChange={(e) => dispatch(setSearchText(e.target.value))} // Part 4: useDispatch
          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <select
          value={selectedCategory}
          onChange={(e) => dispatch(setSelectedCategory(e.target.value))} // Part 4: useDispatch
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="All">All Categories</option>
          <option value="React">React</option>
          <option value="Redux">Redux</option>
          <option value="Node">Node</option>
        </select>
      </div>

      {/* Part 5: Async Loading State UI */}
      {loading && <p style={{ color: '#0284c7', fontWeight: 'bold' }}>Loading blogs from server...</p>}

      {/* Part 5: Async Error State UI */}
      {error && <p style={{ color: '#dc2626', fontWeight: 'bold' }}>Error: {error}</p>}

      {/* Blog List View */}
      {!loading && !error && (
        <div style={{ display: 'grid', gap: '15px' }}>
          {filteredBlogs.length === 0 ? (
            <p>No blogs found.</p>
          ) : (
            filteredBlogs.map((blog) => (
              <div key={blog.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', background: blog.featured ? '#f0fdf4' : '#fff' }}>
                <h3>{blog.title}</h3>
                <p><strong>Author:</strong> {blog.author} | <strong>Category:</strong> {blog.category} | <strong>Reading Time:</strong> {blog.readingTime} mins</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => dispatch(toggleFeatured(blog.id))} style={{ padding: '6px 12px', cursor: 'pointer' }}>
                    {blog.featured ? 'Unfavorite' : 'Favorite'}
                  </button>
                  <button onClick={() => dispatch(deleteBlog(blog.id))} style={{ padding: '6px 12px', color: 'white', background: 'red', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}