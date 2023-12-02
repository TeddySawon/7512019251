// Fungsi untuk menambahkan ke localStorage
function addPost(title, content) {
  const data = JSON.parse(localStorage.getItem('blogPosts')) || [];

  const newPost = {
    id: data.length + 1,
    title: title,
    content: content
  };

  data.push(newPost);

  localStorage.setItem('blogPosts', JSON.stringify(data));

  displayAllPosts(); // Tampilkan ulang setelah menambahkan artikel
}

function displayAllPosts() {
  const blogPosts = document.getElementById('blog-posts');
  blogPosts.innerHTML = '';

  const data = JSON.parse(localStorage.getItem('blogPosts')) || [];

  data.forEach(post => {
    const postElement = document.createElement('div');
    postElement.innerHTML = `
      <h2 class="text-xl font-bold">${post.title}</h2>
      <p>${post.content}</p>
      <button onclick="editPost(${post.id})">Edit</button>
      <button onclick="deletePost(${post.id})">Hapus</button>
      <hr class="my-4">
    `;
    blogPosts.appendChild(postElement);
  });
}


// Tangani submit form tambah artikel
window.addEventListener('DOMContentLoaded', () => {
  displayAllPosts();

  const addPostForm = document.getElementById('add-post-form');
  addPostForm.addEventListener('submit', event => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    addPost(title, content);
    addPostForm.reset();
  });
});

// Fungsi untuk mengedit entri berdasarkan ID
function editPost(id, newTitle, newContent) {
  const data = JSON.parse(localStorage.getItem('blogPosts')) || [];
  const index = data.findIndex(post => post.id === id);

  if (index !== -1) {
    data[index].title = newTitle;
    data[index].content = newContent;
    localStorage.setItem('blogPosts', JSON.stringify(data));
    displayAllPosts();
  }
}

// Fungsi untuk menghapus entri berdasarkan ID
function deletePost(id) {
  const data = JSON.parse(localStorage.getItem('blogPosts')) || [];
  const newData = data.filter(post => post.id !== id);
  localStorage.setItem('blogPosts', JSON.stringify(newData));
  displayAllPosts();
}
