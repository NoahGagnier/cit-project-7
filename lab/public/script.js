// public/script.js
document.addEventListener('DOMContentLoaded', () => {
  fetch('/photos')
    .then(res => res.json())
    .then(photos => {
      const list = document.getElementById('photo-list');
      photos.forEach(photo => {
        const item = document.createElement('li');
        item.textContent = photo.title;
        item.addEventListener('click', () => loadPhotoDetails(photo.id));
        list.appendChild(item);
      });
    })
    .catch(err => {
      console.error('Error fetching photos:', err);
    });
});

function loadPhotoDetails(id) {
  fetch(`/photos/${id}`)
    .then(res => res.json())
    .then(photo => {
      const details = document.getElementById('photo-details');
      details.innerHTML = `
        <h2>Photo Details</h2>
        <p><strong>ID:</strong> ${photo.id}</p>
        <p><strong>Title:</strong> ${photo.title}</p>
        <p><strong>Album ID:</strong> ${photo.albumId}</p>
        <p><strong>URL:</strong> ${photo.url}</p>
        <p><strong>Thumbnail URL:</strong> ${photo.thumbnailUrl}</p>
      `;
    })
    .catch(err => {
      console.error('Error fetching photo details:', err);
    });
}
