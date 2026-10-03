import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial sample blog data
const initialBlogs = [
  {
    id: 1,
    title: "Understanding React Hooks",
    category: "React",
    author: "Ali Khan",
    readingTime: 6,
    featured: true
  },
  {
    id: 2,
    title: "Redux Toolkit Basics",
    category: "Redux",
    author: "Sara Ahmed",
    readingTime: 8,
    featured: false
  },
  {
    id: 3,
    title: "Building Blog UI in React",
    category: "React",
    author: "Hamza Malik",
    readingTime: 5,
    featured: false
  },
  {
    id: 4,
    title: "Node.js and Express Introduction",
    category: "Node",
    author: "Ayesha Noor",
    readingTime: 7,
    featured: true
  }
];

// Part 5: Simulated Async API Call using createAsyncThunk
export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async (_, { rejectWithValue }) => {
  try {
    // Simulating 1-second network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return initialBlogs;
  } catch (error) {
    return rejectWithValue('Failed to fetch blog posts from API.');
  }
});

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    items: [],
    searchText: '',
    selectedCategory: 'All',
    loading: false,
    error: null,
  },
  reducers: {
    // Part 3: Reducers/Actions
    addBlog: (state, action) => {
      state.items.push({ id: Date.now(), ...action.payload });
    },
    deleteBlog: (state, action) => {
      state.items = state.items.filter((blog) => blog.id !== action.payload);
    },
    toggleFeatured: (state, action) => {
      const blog = state.items.find((b) => b.id === action.payload);
      if (blog) {
        blog.featured = !blog.featured;
      }
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Part 5: Handling pending, fulfilled, and rejected async states
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addBlog, deleteBlog, toggleFeatured, setSearchText, setSelectedCategory } = blogSlice.actions;
export default blogSlice.reducer;