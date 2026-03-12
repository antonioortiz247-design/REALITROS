const bebidas = [
  { id: 1, nombre: 'Realitro Clásico', categoria: 'clasico', descripcion: 'Michelada tradicional REALITROS.', ingredientes: 'Cerveza, limón, sal, salsas de la casa', precio: 120 },
  { id: 2, nombre: 'Realitro Supremo', categoria: 'clasico', descripcion: 'Versión premium del clásico.', ingredientes: 'Cerveza, clamato, mix premium', precio: 145 },
  { id: 3, nombre: 'Realitro Negra', categoria: 'clasico', descripcion: 'Perfil intenso y tostado.', ingredientes: 'Cerveza oscura, limón, mix picante', precio: 138 },
  { id: 4, nombre: 'Realitro Golden', categoria: 'clasico', descripcion: 'Toque cítrico brillante.', ingredientes: 'Cerveza lager, cítricos, borde especiado', precio: 140 },
  { id: 5, nombre: 'Realitro Naranja', categoria: 'frutal', descripcion: 'Dulce-picante vibrante.', ingredientes: 'Pulpa de naranja, chile, cerveza', precio: 150 },
  { id: 6, nombre: 'Realitro Mango Fuego', categoria: 'frutal', descripcion: 'Mango tropical con kick picante.', ingredientes: 'Mango, chile, limón, cerveza', precio: 158 },
  { id: 7, nombre: 'Realitro Tamarindo', categoria: 'frutal', descripcion: 'Equilibrio dulce y ácido.', ingredientes: 'Tamarindo, chamoy, cerveza', precio: 152 },
  { id: 8, nombre: 'Realitro Piña Brava', categoria: 'frutal', descripcion: 'Refrescante y especiado.', ingredientes: 'Piña, limón, sal ahumada, cerveza', precio: 156 },
  { id: 9, nombre: 'Realitro Fresa Nocturna', categoria: 'frutal', descripcion: 'Frutos rojos y textura suave.', ingredientes: 'Fresa, berries, cerveza', precio: 160 },
  { id: 10, nombre: 'Realitro Sandía Chill', categoria: 'frutal', descripcion: 'Ideal para noche cálida.', ingredientes: 'Sandía, menta, cerveza', precio: 155 },
  { id: 11, nombre: 'Realitro Maracuyá', categoria: 'frutal', descripcion: 'Aromático y tropical.', ingredientes: 'Maracuyá, limón, cerveza', precio: 162 },
  { id: 12, nombre: 'Realitro Lychee', categoria: 'frutal', descripcion: 'Exótico con notas dulces.', ingredientes: 'Lychee, cítricos, cerveza', precio: 168 },
  { id: 13, nombre: 'Realitro Diablo', categoria: 'especial', descripcion: 'Para paladares extremos.', ingredientes: 'Mix de chiles, cerveza, limón', precio: 170 },
  { id: 14, nombre: 'Realitro Ahumado', categoria: 'especial', descripcion: 'Perfil robusto nocturno.', ingredientes: 'Salsa ahumada, especias, cerveza', precio: 172 },
  { id: 15, nombre: 'Realitro Cítrico 24K', categoria: 'especial', descripcion: 'Sello de la casa.', ingredientes: 'Blend cítrico premium, cerveza', precio: 178 },
  { id: 16, nombre: 'Realitro Pepino Fresh', categoria: 'especial', descripcion: 'Fresco y crujiente.', ingredientes: 'Pepino, limón, cerveza, tajín', precio: 160 },
  { id: 17, nombre: 'Realitro Black Pepper', categoria: 'especial', descripcion: 'Final especiado elegante.', ingredientes: 'Pimienta negra, limón, cerveza', precio: 169 },
  { id: 18, nombre: 'Realitro Blue Night', categoria: 'especial', descripcion: 'Color icónico y sabor vibrante.', ingredientes: 'Jarabe blue, cítricos, cerveza', precio: 175 },
  { id: 19, nombre: 'Realitro Clam Real', categoria: 'premium', descripcion: 'Clamato de autor.', ingredientes: 'Clamato premium, limón, cerveza', precio: 182 },
  { id: 20, nombre: 'Realitro Gold Edition', categoria: 'premium', descripcion: 'Experiencia de lujo.', ingredientes: 'Mix especial dorado, cerveza', precio: 198 },
  { id: 21, nombre: 'Realitro Mezcal Twist', categoria: 'premium', descripcion: 'Toque mezcalado sofisticado.', ingredientes: 'Nota de mezcal, cerveza, cítricos', precio: 205 },
  { id: 22, nombre: 'Realitro Tequila Citrus', categoria: 'premium', descripcion: 'Inspiración tequilera.', ingredientes: 'Esencia tequilera, limón, cerveza', precio: 199 },
  { id: 23, nombre: 'Realitro X Signature', categoria: 'premium', descripcion: 'Receta insignia REALITROS.', ingredientes: 'Blend secreto, cerveza premium', precio: 215 },
  { id: 24, nombre: 'Realitro Trufa Picante', categoria: 'premium', descripcion: 'Premium bold.', ingredientes: 'Toque trufa, chile, cerveza', precio: 220 },
  { id: 25, nombre: 'Realitro Zero Clásico', categoria: 'sin-alcohol', descripcion: 'Todo el sabor, sin alcohol.', ingredientes: 'Base sin alcohol, limón, sal', precio: 115 },
  { id: 26, nombre: 'Realitro Zero Mango', categoria: 'sin-alcohol', descripcion: 'Tropical sin alcohol.', ingredientes: 'Mango, base zero, chile', precio: 128 },
  { id: 27, nombre: 'Realitro Zero Tamarindo', categoria: 'sin-alcohol', descripcion: 'Intenso y refrescante.', ingredientes: 'Tamarindo, base zero, limón', precio: 126 },
  { id: 28, nombre: 'Realitro Zero Pepino', categoria: 'sin-alcohol', descripcion: 'Muy fresco.', ingredientes: 'Pepino, hierbas, base zero', precio: 124 },
  { id: 29, nombre: 'Realitro Zero Maracuyá', categoria: 'sin-alcohol', descripcion: 'Aromático y cítrico.', ingredientes: 'Maracuyá, base zero', precio: 132 },
  { id: 30, nombre: 'Realitro Zero Berries', categoria: 'sin-alcohol', descripcion: 'Dulce balanceado.', ingredientes: 'Frutos rojos, base zero', precio: 134 }
];

const menuGrid = document.querySelector('#menuGrid');
const searchInput = document.querySelector('#buscarBebida');
const filterButtons = document.querySelectorAll('[data-filter]');
const cartItems = document.querySelector('#cartItems');
const cartTotal = document.querySelector('#cartTotal');
const sendOrder = document.querySelector('#sendOrder');
const drinkDetail = document.querySelector('#drinkDetail');

let currentFilter = 'all';
let term = '';
const cart = new Map();

const money = (n) => `$${n.toFixed(0)}`;

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

function changeQty(id, delta) {
  const next = (cart.get(id) || 0) + delta;
  if (next <= 0) cart.delete(id);
  else cart.set(id, next);
  renderCart();
}

function renderDrinks() {
  if (!menuGrid) return;
  const items = filteredDrinks();
  if (!items.length) {
    menuGrid.innerHTML = '<p>No encontramos bebidas con ese criterio.</p>';
    return;
  }

  menuGrid.innerHTML = items.map((b) => `
    <article class="card reveal visible">
      <h3>${b.nombre}</h3>
      <p>${b.descripcion}</p>
      <p><strong>Ingredientes:</strong> ${b.ingredientes}</p>
      <p class="price">${money(b.precio)}</p>
      <div class="actions">
        <button class="btn btn-primary" data-add="${b.id}">Agregar</button>
        <a class="btn btn-outline" href="bebida.html?id=${b.id}">Ver detalle</a>
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
    const b = bebidas.find((x) => x.id === id);
    return { ...b, qty, subtotal: b.precio * qty };
  });

  if (!lines.length) {
    cartItems.innerHTML = '<p>Tu carrito está vacío.</p>';
    cartTotal.textContent = '$0';
    if (sendOrder) sendOrder.href = 'https://wa.me/525657038871';
    return;
  }

  cartItems.innerHTML = lines.map((l) => `
    <div class="cart-item">
      <div>
        <strong>${l.qty}x ${l.nombre}</strong>
        <p>${money(l.subtotal)}</p>
      </div>
      <div class="qty-controls">
        <button data-minus="${l.id}">-</button>
        <button data-plus="${l.id}">+</button>
      </div>
    </div>
  `).join('');

  cartItems.querySelectorAll('[data-minus]').forEach((btn) => btn.addEventListener('click', () => changeQty(Number(btn.dataset.minus), -1)));
  cartItems.querySelectorAll('[data-plus]').forEach((btn) => btn.addEventListener('click', () => changeQty(Number(btn.dataset.plus), 1)));

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
    <article class="card">
      <h2>${b.nombre}</h2>
      <p class="lead">${b.descripcion}</p>
      <p><strong>Categoría:</strong> ${b.categoria}</p>
      <p><strong>Ingredientes:</strong> ${b.ingredientes}</p>
      <p class="price">${money(b.precio)}</p>
      <div class="actions">
        <button class="btn btn-primary" id="detailAdd">Agregar al pedido</button>
        <a class="btn btn-outline" href="menu.html">Volver al menú</a>
      </div>
    </article>
  `;

  const detailAdd = document.querySelector('#detailAdd');
  if (detailAdd) detailAdd.addEventListener('click', () => addToCart(b.id));
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

renderDrinks();
renderCart();
renderDetail();
