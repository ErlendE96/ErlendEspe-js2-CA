import {
    logoutUser,
    createPost,
    fetchAndDisplayPosts,
    editPost,
    deletePost,
    filterPosts,
    searchPosts,
  } from './feed/functions.js';
  
  document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');
    const createPostForm = document.getElementById('create-post-form');
    const sortAscendingButton = document.getElementById('sort-ascending-button');
    const sortDescendingButton = document.getElementById('sort-descending-button');
    const filterInput = document.getElementById('filter-input');
    const searchButton = document.getElementById('search-button');
    const postsContainer = document.getElementById('posts-container');
  
    logoutButton.addEventListener('click', logoutUser);
    createPostForm.addEventListener('submit', createPost);
    sortAscendingButton.addEventListener('click', () => fetchAndDisplayPosts('ascending'));
    sortDescendingButton.addEventListener('click', () => fetchAndDisplayPosts('descending'));
    filterInput.addEventListener('input', filterPosts);
    searchButton.addEventListener('click', searchPosts);
  
    postsContainer.addEventListener('click', handlePostContainerClick);
  
    const token = localStorage.getItem('accessToken');
    if (token) {
      fetchAndDisplayPosts();
    } else {
      console.log('User not authenticated. Please login.');
    }
  });
  
  function handlePostContainerClick(event) {
    const postId = event.target.getAttribute('data-post-id');
  
    if (event.target.classList.contains('edit-button')) {
      editPost(postId);
    } else if (event.target.classList.contains('delete-button')) {
      deletePost(postId);
    }
  }
  