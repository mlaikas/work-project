import React from 'react';

export const BlogCard = React.memo(({ blog, onDelete, onToggleFeatured }) => {
  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: blog.featured ? '#f0fdf4' : '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', background: '#e0f2fe', color: '#0369a1', padding: '4px 8px', borderRadius: '4px' }}>
            {blog.category}
          </span>
          {blog.featured && <span style={{ fontSize: '12px', color: '#15803d', fontWeight: 'bold' }}>★ Featured</span>}
        </div>
        <h3 style={{ margin: '12px 0 8px 0', fontSize: '18px' }}>{blog.title}</h3>
        <p style={{ margin: '4px 0', color: '#64748b', fontSize: '14px' }}>Author: {blog.author}</p>
        <p style={{ margin: '4px 0', color: '#64748b', fontSize: '14px' }}>Reading Time: {blog.readingTime} mins</p>
      </div>

      <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
        <button
          onClick={() => onToggleFeatured(blog.id)}
          style={{ padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#f59e0b', color: '#fff' }}
        >
          {blog.featured ? 'Unfavorite' : 'Favorite'}
        </button>
        <button
          onClick={() => onDelete(blog.id)}
          style={{ padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#ef4444', color: '#fff' }}
        >
          Delete
        </button>
      </div>
    </div>
  );
});

BlogCard.displayName = 'BlogCard';