import React from 'react';

export const BlogStats = ({ totalBlogs, featuredCount }) => {
  return (
    <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
      <div style={{ padding: '12px 20px', backgroundColor: '#f1f5f9', borderRadius: '8px', flex: 1 }}>
        <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Total Articles</p>
        <h2 style={{ margin: '4px 0 0 0' }}>{totalBlogs}</h2>
      </div>
      <div style={{ padding: '12px 20px', backgroundColor: '#f1f5f9', borderRadius: '8px', flex: 1 }}>
        <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Featured Articles</p>
        <h2 style={{ margin: '4px 0 0 0' }}>{featuredCount}</h2>
      </div>
    </div>
  );
};