const socket = io.connect('http://localhost:8080', { forceNew: true });

const FormWS = document.getElementById('form-ws');

FormWS.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title-ws');
  const price = document.getElementById('price-ws');
  const thumbnail = document.getElementById('thumbnail-ws');

  const body = {
    title: title.value,
    price: price.value,
    thumbnail: thumbnail.value,
    ws: true,
  };
  const res = await fetch('/api/productos/guardar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  title.value = '';
  price.value = '';
  thumbnail.value = '';
});

const renderProducts = (data) => {
  const table = document.getElementById('tableTbody');
  let html = '';
  if (data.length) {
    data.forEach((item) => {
      html += `
        <tr class="product-item">
          <th scope='row'>${item.id}</th>
          <td>${item.title}</td>
          <td>${item.price}</td>
          <td>
            <img class="product-img" src="${item.thumbnail}" alt="" />
          </td>
        </tr>
      `;
    });

    table.innerHTML = html;
  }
};

socket.on('products', renderProducts);
