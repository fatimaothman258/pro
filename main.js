const products = [];
const editingIndex = null;

function addProduct() {
  const name = document.getElementById("name").value.trim();
  const description = document.getElementById("description").value.trim();
  const price = document.getElementById("price").value.trim();
  const category = document.getElementById("category").value;

  if (!name || !description || !price || !category) {
    return Swal.fire({
      icon: "error",
      title: "Validation Error",
      text: "All fields are required!",
    });
  }

  if (editingIndex !== null) {
   
    products[editingIndex] = { name, description, price, category };
    editingIndex = null;
    Swal.fire("Success", "Product updated successfully!", "success");
  } else {
   
    products.push({ name, description, price, category });
    Swal.fire("Success", "Product added successfully!", "success");
  }

  resetForm();
  renderTable();
}

function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("price").value = "";
  document.getElementById("category").value = "";
}

function renderTable() {
  const tbody = document.querySelector("#productTable tbody");
  tbody.innerHTML = "";

  products.forEach((product, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${product.name}</td>
      <td>${product.description}</td>
      <td>${product.price}</td>
      <td>${product.category}</td>
      <td class="actions">
        <button onclick="editProduct(${index})">Edit</button>
        <button onclick="deleteProduct(${index})">Delete</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

function editProduct(index) {
  const product = products[index];
  document.getElementById("name").value = product.name;
  document.getElementById("description").value = product.description;
  document.getElementById("price").value = product.price;
  document.getElementById("category").value = product.category;
  editingIndex = index;
}

function deleteProduct(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      products.splice(index, 1);
      renderTable();
      Swal.fire("Deleted!", "Product has been deleted.", "success");
    }
  });
}
