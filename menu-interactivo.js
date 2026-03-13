const bebidas = [
  { id: 1, nombre: 'Realitro Clásico', categoria: 'citrico', etiqueta: 'Cítrico', descripcion: 'Michelada tradicional con balance fresco.', ingredientes: 'Cerveza clara, limón, sal de mar, mix de la casa', precio: 120 },
  { id: 2, nombre: 'Realitro Supremo', categoria: 'signature', etiqueta: 'Signature', descripcion: 'Versión de autor con perfil profundo.', ingredientes: 'Cerveza, clamato premium, toque especiado', precio: 148 },
  { id: 3, nombre: 'Realitro Negra', categoria: 'especiado', etiqueta: 'Especiado', descripcion: 'Intenso y tostado, ideal para paladar robusto.', ingredientes: 'Cerveza oscura, limón tatemado, salsa picante', precio: 142 },
  { id: 4, nombre: 'Realitro Golden Citrus', categoria: 'citrico', etiqueta: 'Cítrico', descripcion: 'Brillante y elegante con acidez limpia.', ingredientes: 'Lager, cítricos seleccionados, borde especiado', precio: 146 },
  { id: 5, nombre: 'Realitro Mango Fuego', categoria: 'frutal', etiqueta: 'Frutal', descripcion: 'Tropical con final picante controlado.', ingredientes: 'Mango natural, chile, limón, cerveza', precio: 158 },
  { id: 6, nombre: 'Realitro Tamarindo Blend', categoria: 'frutal', etiqueta: 'Frutal', descripcion: 'Equilibrio dulce-ácido con cuerpo.', ingredientes: 'Tamarindo, chamoy ligero, cerveza', precio: 154 },
  { id: 7, nombre: 'Realitro Piña Brava', categoria: 'frutal', etiqueta: 'Frutal', descripcion: 'Refrescante y perfumado, ideal de tarde.', ingredientes: 'Piña, limón verde, sal ahumada', precio: 156 },
  { id: 8, nombre: 'Realitro Diablo', categoria: 'especiado', etiqueta: 'Especiado', descripcion: 'Perfil atrevido para amantes del picante.', ingredientes: 'Blend de chiles, cerveza, cítrico intenso', precio: 170 },
  { id: 9, nombre: 'Realitro Pepino Fresh', categoria: 'citrico', etiqueta: 'Cítrico', descripcion: 'Limpio y herbal, estilo contemporáneo.', ingredientes: 'Pepino, limón, tajín, cerveza', precio: 152 },
  { id: 10, nombre: 'Realitro X Signature', categoria: 'signature', etiqueta: 'Signature', descripcion: 'Receta insignia REALITROS de la casa.', ingredientes: 'Blend secreto, cerveza premium, cítricos', precio: 210 }
];

const menuGrid = document.querySelector('#menuGrid');
const searchInput = document.querySelector('#buscarBebida');
const filterButtons = document.querySelectorAll('[data-filter]');
const cartItems = document.querySelector('#cartItems');
const cartTotal = document.querySelector('#cartTotal');
const sendOrder = document.querySelector('#sendOrder');
const customBuilder = document.querySelector('#customBuilder');

const drinkDetail = document.querySelector('#drinkDetail');

let currentFilter = 'all';
let term = '';
const cart = new Map();
const customItems = new Map();
let customId = 1000;

const money = (n) => `$${n.toFixed(0)}`;

const categoryClass = {
  citrico: 'dot-citrico',
  frutal: 'dot-frutal',
  especiado: 'dot-especiado',
  signature: 'dot-signature'
};

function filteredDrinks() {
  return bebidas.filter((b) => {
    const byFilter = currentFilter === 'all' || b.categoria === currentFilter;
    const byTerm = `${b.nombre} ${b.descripcion} ${b.ingredientes}`.toLowerCase().includes(term.toLowerCase());
    return byFilter && byTerm;
  });
}

function addToCart(id) {
  cart.set(id, (cart.get(id) || 0) + 1);
  renderCart();
}

function addCustomToCart(item) {
  const id = customId;
  customItems.set(id, item);
  cart.set(id, 1);
  customId += 1;
  renderCart();
}

function getItem(id) {
  return bebidas.find((x) => x.id === id) || customItems.get(id);
}

function changeQty(id, delta) {
  const next = (cart.get(id) || 0) + delta;
  if (next <= 0) {
    cart.delete(id);
    if (customItems.has(id)) customItems.delete(id);
  } else {
    cart.set(id, next);
  }
  renderCart();
}

function renderDrinks() {
  if (!menuGrid) return;
  const items = filteredDrinks();
  if (!items.length) {
    menuGrid.innerHTML = '<p>No encontramos tragos con ese criterio.</p>';
    return;
  }

  menuGrid.innerHTML = items.map((b) => `
    <article class="card menu-card reveal visible">
      <p class="menu-tag"><i class="dot ${categoryClass[b.categoria]}"></i>${b.etiqueta}</p>
      <h3>${b.nombre}</h3>
      <p>${b.descripcion}</p>
      <p><strong>Ingredientes:</strong> ${b.ingredientes}</p>
      <p class="price">${money(b.precio)}</p>
      <div class="actions">
        <button class="btn btn-primary" data-add="${b.id}">Agregar al pedido</button>
      </div>
    </article>
  `).join('');

  menuGrid.querySelectorAll('[data-add]').forEach((btn) => {
    btn.addEventListener('click', () => addToCart(Number(btn.dataset.add)));
  });
}

function renderCart() {
  if (!cartItems || !cartTotal) return;
  const lines = [...cart.entries()].map(([id, qty]) => {
    const item = getItem(id);
    return { ...item, qty, subtotal: item.precio * qty };
  });

  if (!lines.length) {
    cartItems.innerHTML = '<p>Tu pedido está vacío.</p>';
    cartTotal.textContent = '$0';
    if (sendOrder) sendOrder.href = 'https://wa.me/525657038871';
    return;
  }

  cartItems.innerHTML = lines.map((l, index) => `
    <div class="cart-item">
      <div>
        <strong>${l.qty}x ${l.nombre}</strong>
        <p>${money(l.subtotal)}</p>
      </div>
      <div class="qty-controls">
        <button aria-label="Quitar uno" data-minus="${index}">-</button>
        <button aria-label="Agregar uno" data-plus="${index}">+</button>
      </div>
    </div>
  `).join('');

  const ids = [...cart.keys()];
  cartItems.querySelectorAll('[data-minus]').forEach((btn) => btn.addEventListener('click', () => changeQty(ids[Number(btn.dataset.minus)], -1)));
  cartItems.querySelectorAll('[data-plus]').forEach((btn) => btn.addEventListener('click', () => changeQty(ids[Number(btn.dataset.plus)], 1)));

  const total = lines.reduce((acc, l) => acc + l.subtotal, 0);
  cartTotal.textContent = money(total);

  if (sendOrder) {
    const msg = [
      'Pedido REALITROS',
      '',
      ...lines.map((l) => `${l.qty}x ${l.nombre}`),
      '',
      `Total: ${money(total)}`
    ].join('\n');
    sendOrder.href = `https://wa.me/525657038871?text=${encodeURIComponent(msg)}`;
  }
}


function renderDetail() {
  if (!drinkDetail) return;
  const id = Number(new URLSearchParams(window.location.search).get('id')) || 1;
  const b = bebidas.find((x) => x.id === id) || bebidas[0];

  drinkDetail.innerHTML = `
    <article class="card reveal visible">
      <p class="menu-tag"><i class="dot ${categoryClass[b.categoria]}"></i>${b.etiqueta}</p>
      <h2>${b.nombre}</h2>
      <p class="lead">${b.descripcion}</p>
      <p><strong>Ingredientes:</strong> ${b.ingredientes}</p>
      <p class="price">${money(b.precio)}</p>
      <a class="btn btn-outline" href="menu.html">Volver al menú</a>
    </article>
  `;
}

if (searchInput) {
  searchInput.addEventListener('input', (event) => {
    term = event.target.value || '';
    renderDrinks();
  });
}

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderDrinks();
  });
});

if (customBuilder) {
  customBuilder.addEventListener('submit', (event) => {
    event.preventDefault();
    const base = document.querySelector('#customBase').value;
    const perfil = document.querySelector('#customPerfil').value;
    const extra = document.querySelector('#customExtra').value;
    const nombre = `Mezcla personalizada (${perfil})`;
    addCustomToCart({
      nombre,
      precio: 165,
      descripcion: 'Combinación creada por cliente.',
      ingredientes: `${base}, ${perfil}, ${extra}`
    });
    customBuilder.reset();
  });
}

renderDrinks();
renderCart();
renderDetail();
