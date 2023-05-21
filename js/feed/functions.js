const API_BASE_URL = 'https://api.noroff.dev/api/v1';
 
export function logoutUser() {
  localStorage.removeItem('accessToken');
  window.location.href = '/';
}
export async function fetchAndDisplayPosts(sortBy = 'default') {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`${API_BASE_URL}/social/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      let posts = await response.json();

      const postsContainer = document.getElementById('posts-container');
      postsContainer.innerHTML = '';

      if (sortBy === 'ascending') {
        posts.sort((a, b) => a.id - b.id);
      } else if (sortBy === 'descending') {
        posts.sort((a, b) => b.id - a.id);
      }

      posts.forEach((post) => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `
                <div class="container h-100"  >
                <div class="row d-flex justify-content-center align-items-center h-100 ">
                <div class="col col-md-9 col-lg-7 col-xl-5">
                    <div class="card" style="border-radius: 15px;">
                    <div class="card-body p-4">
                        <div class="d-flex text-black">
                        <div class="flex-shrink-1 media-container" style="padding: 5px;">
                            <img src="${post.media}"
                            alt="" class="img-fluid" style="width: 180px; border-radius: 10px;">
                        </div>
                        <div class="flex-grow-1 ">
                            <h5 class="mb-1">${post.title}</h5>
                            <p data-post-id="${post.id}" class="mb-2 pb-1" style="color: #2b2a2a; ${post.body ? 'display: block;' : 'display: none;'}">${post.body}</p>
                            <div class="d-flex justify-content-start rounded-3 p-2 mb-2"
                            style="background-color: #efefef;">
                            <div>
                                <p class="small text-muted mb-1">ID#${post.id}</p>
                            </div>
                            </div>
                            <div class="d-flex pt-1">
                            <button data-post-id="${post.id}" type="button" class="edit-button btn btn-outline-primary me-1 flex-grow-1">Edit</button>
                            <button data-post-id="${post.id}" type="button" class="delete-button btn btn-primary flex-grow-1">Delete</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        `;
        postsContainer.appendChild(postElement);
      });
    } else {
      const error = await response.json();
      console.error('Error fetching posts:', error);
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

export async function createPost(event) {
  event.preventDefault();

  const title = document.getElementById('post-title').value;
  const body = document.getElementById('post-content').value;
  const media = document.getElementById('post-media').value;

  try {
    const response = await fetch(`${API_BASE_URL}/social/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ title, body, media }),
    });

    if (response.ok) {
      document.getElementById('post-title').value = '';
      document.getElementById('post-content').value = '';
      document.getElementById('post-media').value = '';

      fetchAndDisplayPosts();
    } else {
      const error = await response.json();
      console.error('Error creating post:', error);
    }
  } catch (error) {
    console.error('Error creating post:', error);
  }
}

export async function editPost(postId) {
  const newTitle = prompt('Enter a new title:');
  const newContent = prompt('Enter new content:');
  const newMedia = prompt('Enter new media:');

  if (newTitle, newContent, newMedia) {
    try {
      const response = await fetch(`${API_BASE_URL}/social/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ title: newTitle, body: newContent, media: newMedia }),
      });

      if (response.ok) {
        fetchAndDisplayPosts();
      } else {
        const error = await response.json();
        console.error('Error editing post:', error);
      }
    } catch (error) {
      console.error('Error editing post:', error);
    }
  }
}

export async function deletePost(postId) {
  const confirmation = confirm('Are you sure you want to delete this post?');

  if (confirmation) {
    try {
      const response = await fetch(`${API_BASE_URL}/social/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.ok) {
        fetchAndDisplayPosts();
      } else {
        const error = await response.json();
        console.error('Error deleting post:', error);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }
}

export function filterPosts() {
    const filterInput = document.getElementById('filter-input');
    const filterValue = filterInput.value.toLowerCase();
  
    const postsContainer = document.getElementById('posts-container');
    const posts = postsContainer.getElementsByClassName('card');
  
    Array.from(posts).forEach((post) => {
      const postIdElement = post.querySelector('[data-post-id]');
      const postId = postIdElement ? postIdElement.getAttribute('data-post-id') : '';
      const postTitle = post.querySelector('h5');
      const postContent = post.querySelector('p[data-post-id]');
      const postMedia = post.querySelector('img');
  
      const shouldDisplay =
        postId.includes(filterValue) ||
        (postTitle && postTitle.textContent.toLowerCase().includes(filterValue)) ||
        (postContent && postContent.textContent.toLowerCase().includes(filterValue));
  
      post.style.display = shouldDisplay ? 'block' : 'none';
  
      if (shouldDisplay && postMedia) {
        postMedia.style.display = 'block';
      } else if (!shouldDisplay && postMedia) {
        postMedia.style.display = 'none';
      }
    });
  }
  
  export function searchPosts() {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value.trim().toLowerCase();
  
    const postsContainer = document.getElementById('posts-container');
    const posts = postsContainer.getElementsByClassName('card');
  
    Array.from(posts).forEach((post) => {
      const postIdElement = post.querySelector('[data-post-id]');
      const postId = postIdElement ? postIdElement.getAttribute('data-post-id') : '';
      const postTitle = post.querySelector('h5');
      const postContent = post.querySelector('p[data-post-id]');
      const postMedia = post.querySelector('img');
  
      const shouldDisplay =
        postId === searchValue ||
        (postTitle && postTitle.textContent.toLowerCase().includes(searchValue)) ||
        (postContent && postContent.textContent.toLowerCase().includes(searchValue));
  
      post.style.display = shouldDisplay ? 'block' : 'none';
  
      if (shouldDisplay && postMedia) {
        postMedia.style.display = 'block';
      } else if (!shouldDisplay && postMedia) {
        postMedia.style.display = 'none';
      }
    });
  }
  