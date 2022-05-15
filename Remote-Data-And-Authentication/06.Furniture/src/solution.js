let userData = null;

async function solve() {
  userData = JSON.parse(sessionStorage.getItem('userData'));
  document.querySelector('tbody').innerHTML = '<h2>Loading...</h2>';

  if (userData != null) {
    document.querySelector('#guest').style.display = 'none';

    document.querySelector('#logoutBtn').addEventListener('click', logout);
    document.querySelector('form').addEventListener('submit', onCreate);
    document.querySelector('button.user').addEventListener('click', buyItems);
    document.querySelector('#orders').addEventListener('click', showOrders);
  } else {
    document.querySelector('#user').style.display = 'none';
    document.querySelectorAll('.user').forEach(x => x.style.display = 'none');
  }

  loadItems();
}

solve();

async function onCreate(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = [...formData.entries()]
    .reduce((acc, [k, v]) => Object.assign(acc, {
      [k]: v
    }), {});

  try {
    if (Object.values(data).some(x => x == '')) {
      throw new Error('All fields are required.');
    }

    const res = await fetch('http://localhost:3030/data/furniture', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userData.token
      },
      body: JSON.stringify(data)
    });

    if (res.ok == false) {
      const error = await res.json();
      throw new Error(error.message);
    }

    document.querySelector('tbody').appendChild(createTableRow(data));
    event.target.reset();
  } catch (error) {
    alert(error.message);
  }
}

async function buyItems() {
  const checked = [...document.querySelectorAll('input[type="checkbox"]:checked')]
    .map(c => c.parentElement.parentElement)
    .map(r => ({
      name: r.children[1].firstElementChild.textContent,
      price: Number(r.children[2].firstElementChild.textContent)
    }));

  try {
    if (checked.length == 0) {
      throw new Error('There are not checked items.');
    }

    const res = await fetch('http://localhost:3030/data/orders', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userData.token
      },
      body: JSON.stringify(checked)
    });

    if (res.ok == false) {
      const error = await res.json();
      throw new Error(error.message);
    }

    window.location = '/';
    return await res.json();
  } catch (error) {
    alert(error.message);
  }
}

async function getOrders() {
  try {
    const ownerId = userData.id;
    const res = await fetch(`http://localhost:3030/data/orders?where=_ownerId%3D"${ownerId}"`);

    if (res.ok == false) {
      const error = await res.json();
      throw new Error(error.message);
    }

    const data = Object.values(await res.json())
      .map(o => Object.values(o).filter(x => typeof x == 'object'))
      .reduce((acc, curr) => acc.concat(curr), []);
    
    if (data.length == 0) {
      throw new Error('There are not orders.');
    }

    return data;
  } catch (error) {
    alert(error.message);
  }
}

async function showOrders() {
  let totalPrice = 0;
  let names = [];

  (await getOrders()).forEach(x => {
    totalPrice += x.price;
    names.push(x.name);
  });

  document.querySelector('.orders.user').innerHTML = `<p>Bought furniture: 
  <span>${names.join(', ')}</span></p>
<p>Total price: <span>${totalPrice} $</span></p>
<button id="orders">All orders</button>`;
}

async function loadItems() {
  try {
    const res = await fetch('http://localhost:3030/data/furniture');

    if (res.ok != true) {
      error = await res.json();
      throw new Error(error.message);
    }

    const items = await res.json();
    document.querySelector('tbody').replaceChildren(...items.map(createTableRow));
  } catch (error) {
    alert(error.message);
  }
}

async function logout() {
  const response = await fetch('http://localhost:3030/users/logout', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': userData.token
    }
  });

  sessionStorage.clear();
  window.location = '/';
}

function createTableRow(data) {
  const row = document.createElement('tr');
  row.innerHTML = `<td>
<img src="${data.img}">
</td>
<td>
  <p>${data.name}</p>
</td>
<td>
  <p>${data.price}</p>
</td>
<td>
  <p>${data.factor}</p>
</td>
<td>
  <input type="checkbox" ${!userData ? 'disabled' : ''}/>
</td>`;

  return row;
}