import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { BlogCard } from './BlogCard';
import { deleteBlog, toggleFeatured } from '../app/blogSlice';

export const BlogList = ({ blogs }) => {
  const dispatch = useDispatch();

  const handleDelete = useCallback((id) => {
    dispatch(deleteBlog(id));
  }, [dispatch]);

  const handleToggleFeatured = useCallback((id) => {
    dispatch(toggleFeatured(id));
  }, [dispatch]);

  if (blogs.length === 0) {
    return <p style={{ color: '#64748b' }}>No blogs found.</p>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          onDelete={handleDelete}
          onToggleFeatured={handleToggleFeatured}
        />
      ))}
    </div>
  );
};