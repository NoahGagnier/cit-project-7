const form = document.getElementById('itemForm');
const input = document.getElementById('itemInput');
const list = document.getElementById('itemList');

async function loadItems() {
  const res = await fetch('/api/items');
  const items = await res.json();
  list.innerHTML = '';
  items.forEach(addItemToDOM);
}

function addItemToDOM(item) {
  const li = document.createElement('li');
  li.textContent = item.name;

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.onclick = async () => {
    const newName = prompt('Edit item:', item.name);
    if (newName) {
      await fetch(`/api/items/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName })
      });
      loadItems();
    }
  };

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.onclick = async () => {
    await fetch(`/api/items/${item.id}`, { method: 'DELETE' });
    loadItems();
  };

  li.append(' ', editBtn, ' ', delBtn);
  list.appendChild(li);
}

form.onsubmit = async (e) => {
  e.preventDefault();
  const name = input.value.trim();
  if (!name) return;
  await fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  input.value = '';
  loadItems();
};

loadItems();
