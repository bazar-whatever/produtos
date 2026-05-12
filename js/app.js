/* WhateverBazar — App Logic */

const state = {
  products: [],
  categories: [],
  stores: [],
  activeCategory: 'todos',
  activeStore: 'todos',
  search: '',
};

// ── Helpers ──────────────────────────────────────────────────────

function formatPrice(val) {
  if (val == null) return null;
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function storeClass(storeId) {
  const map = { mercadolivre: 'store-ml', amazon: 'store-amazon', aliexpress: 'store-aliexpress', shopee: 'store-shopee' };
  return map[storeId] || '';
}

function storeLabel(storeId, stores) {
  const s = stores.find(x => x.id === storeId);
  return s ? s.label : storeId;
}

function renderStars(rating) {
  if (!rating) return '';
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function getProductById(id) {
  return state.products.find(p => p.id === id);
}

// ── Filter & Search ───────────────────────────────────────────────

function filteredProducts() {
  return state.products.filter(p => {
    if (p.placeholder && state.activeCategory !== 'todos' && state.activeCategory !== 'tecnologia') return false;
    const catMatch = state.activeCategory === 'todos' || p.category === state.activeCategory;
    const storeMatch = state.activeStore === 'todos' || p.store === state.activeStore;
    const q = state.search.toLowerCase().trim();
    const searchMatch = !q ||
      p.name.toLowerCase().includes(q) ||
      (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q))) ||
      (p.brand && p.brand.toLowerCase().includes(q));
    return catMatch && storeMatch && searchMatch;
  });
}

// ── Render Product Card ───────────────────────────────────────────

function renderCard(p) {
  const priceHtml = p.price != null
    ? `
      ${p.originalPrice ? `<div class="price-original">De ${formatPrice(p.originalPrice)}</div>` : ''}
      <div class="price-current">${formatPrice(p.price)}</div>
      ${p.pixPrice ? `<div class="price-pix">PIX: ${formatPrice(p.pixPrice)}</div>` : ''}
    `
    : `<div class="price-null">Ver preço no site</div>`;

  const imgHtml = p.images && p.images.main
    ? `<img src="${p.images.main}" alt="${p.name}" loading="lazy" onerror="this.parentElement.innerHTML=placeholderImg()">`
    : `<div class="product-card-img-placeholder"><div class="placeholder-icon">🛒</div><span>Imagem em breve</span></div>`;

  const ratingHtml = p.rating
    ? `<div class="product-rating">
        <span class="stars">${renderStars(p.rating)}</span>
        <span class="rating-num">${p.rating}</span>
        ${p.reviews ? `<span class="rating-count">(${p.reviews.toLocaleString('pt-BR')})</span>` : ''}
       </div>`
    : '';

  return `
    <div class="product-card" onclick="showProduct('${p.id}')">
      <div class="product-card-img">
        ${p.discount ? `<span class="badge-discount">-${p.discount}%</span>` : ''}
        ${p.featured ? `<span class="badge-featured">★ Destaque</span>` : ''}
        ${imgHtml}
      </div>
      <div class="product-card-body">
        <span class="product-store-badge ${storeClass(p.store)}">${storeLabel(p.store, state.stores)}</span>
        <h3 class="product-name">${p.name}</h3>
        ${p.shortDescription ? `<p class="product-desc">${p.shortDescription}</p>` : ''}
        ${ratingHtml}
        <div class="product-price-block">${priceHtml}</div>
        <button class="btn-card">Ver produto →</button>
      </div>
    </div>
  `;
}

function placeholderImg() {
  return `<div class="product-card-img-placeholder"><div class="placeholder-icon">🛒</div><span>Imagem em breve</span></div>`;
}

// ── Render Grid ───────────────────────────────────────────────────

function renderGrid() {
  const grid = document.getElementById('products-grid');
  const count = document.getElementById('result-count');
  const products = filteredProducts();

  count.textContent = `${products.length} produto${products.length !== 1 ? 's' : ''}`;

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <p>Nenhum produto encontrado para este filtro.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = products.map(renderCard).join('');
}

// ── Render Product Page ───────────────────────────────────────────

function showProduct(id) {
  const p = getProductById(id);
  if (!p) return;

  window.location.hash = `produto/${id}`;
  document.getElementById('page-home').style.display = 'none';
  document.getElementById('page-product').style.display = 'block';
  renderProductPage(p);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderProductPage(p) {
  const container = document.getElementById('product-content');

  const galleryThumbs = (p.images && p.images.gallery && p.images.gallery.length > 1)
    ? p.images.gallery.map((url, i) => `
        <div class="gallery-thumb ${i === 0 ? 'active' : ''}" onclick="changeMainImg(this, '${url}')">
          <img src="${url}" alt="${p.name}" loading="lazy">
        </div>
      `).join('')
    : '';

  const mainImgSrc = p.images && p.images.main ? p.images.main : '';

  const priceSection = p.price != null ? `
    <div class="product-price-section">
      ${p.discount ? `<span class="discount-badge">-${p.discount}% de desconto</span>` : ''}
      ${p.originalPrice ? `<div class="price-original">De ${formatPrice(p.originalPrice)}</div>` : ''}
      <div class="price-current">${formatPrice(p.price)}</div>
      ${p.pixPrice ? `<div class="price-pix">💳 PIX: ${formatPrice(p.pixPrice)} (3% de desconto)</div>` : ''}
    </div>
  ` : `
    <div class="product-price-section">
      <div class="price-null">Preço disponível no site da loja</div>
    </div>
  `;

  const specsRows = p.specs && Object.keys(p.specs).length > 0
    ? Object.entries(p.specs).map(([k, v]) => `
        <div class="spec-row">
          <div class="spec-key">${k}</div>
          <div class="spec-val">${v}</div>
        </div>
      `).join('')
    : '<div class="spec-row"><div class="spec-key">—</div><div class="spec-val">Sem especificações cadastradas</div></div>';

  const tagsHtml = (p.tags && p.tags.length)
    ? p.tags.map(t => `<span class="tag">#${t}</span>`).join('')
    : '';

  const ratingHtml = p.rating
    ? `<div class="product-rating-block">
        <span class="stars">${renderStars(p.rating)}</span>
        <span class="rating-num">${p.rating}/5</span>
        ${p.reviews ? `<span class="rating-count">${p.reviews.toLocaleString('pt-BR')} avaliações</span>` : ''}
       </div>`
    : '';

  container.innerHTML = `
    <button class="back-btn" onclick="goHome()">← Voltar para a loja</button>

    <div class="product-layout">
      <div class="gallery">
        <div class="gallery-main">
          ${mainImgSrc
            ? `<img id="gallery-main-img" src="${mainImgSrc}" alt="${p.name}">`
            : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--text-muted);flex-direction:column;gap:8px;"><div style="font-size:60px;opacity:.3">🛒</div><span>Imagem em breve</span></div>`
          }
        </div>
        ${galleryThumbs ? `<div class="gallery-thumbs">${galleryThumbs}</div>` : ''}
      </div>

      <div class="product-info">
        <div class="product-info-store">
          <span class="product-store-badge ${storeClass(p.store)}">${storeLabel(p.store, state.stores)}</span>
        </div>

        <h1>${p.name}</h1>

        ${ratingHtml}

        ${priceSection}

        <p class="product-desc-full">${p.description}</p>

        <a href="${p.affiliateLink}" target="_blank" rel="noopener noreferrer" class="btn-affiliate" onclick="event.stopPropagation()">
          🛒 Comprar em ${storeLabel(p.store, state.stores)} →
        </a>

        <div class="specs-section">
          <div class="specs-title">Especificações</div>
          <div class="specs-table">${specsRows}</div>
        </div>

        ${tagsHtml ? `<div class="tags-section">${tagsHtml}</div>` : ''}
      </div>
    </div>
  `;
}

function changeMainImg(thumb, url) {
  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
  const mainImg = document.getElementById('gallery-main-img');
  if (mainImg) mainImg.src = url;
}

// ── Navigation ───────────────────────────────────────────────────

function goHome() {
  window.location.hash = '';
  document.getElementById('page-home').style.display = 'block';
  document.getElementById('page-product').style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleHash() {
  const hash = window.location.hash;
  if (hash.startsWith('#produto/')) {
    const id = hash.replace('#produto/', '');
    const p = getProductById(id);
    if (p) {
      document.getElementById('page-home').style.display = 'none';
      document.getElementById('page-product').style.display = 'block';
      renderProductPage(p);
    } else {
      goHome();
    }
  } else {
    document.getElementById('page-home').style.display = 'block';
    document.getElementById('page-product').style.display = 'none';
  }
}

// ── Chips ────────────────────────────────────────────────────────

function renderChips() {
  // Category chips
  const catContainer = document.getElementById('category-chips');
  catContainer.innerHTML = state.categories.map(c => `
    <button class="chip ${state.activeCategory === c.id ? 'active' : ''}"
      onclick="setCategory('${c.id}')">${c.label}</button>
  `).join('');

  // Store chips
  const storeContainer = document.getElementById('store-chips');
  storeContainer.innerHTML = `
    <button class="chip ${state.activeStore === 'todos' ? 'active' : ''}"
      onclick="setStore('todos')">Todos</button>
    ${state.stores.map(s => `
      <button class="chip ${state.activeStore === s.id ? 'active' : ''}"
        data-store="${s.id}"
        onclick="setStore('${s.id}')">${s.label}</button>
    `).join('')}
  `;
}

function setCategory(id) {
  state.activeCategory = id;
  renderChips();
  renderGrid();
}

function setStore(id) {
  state.activeStore = id;
  renderChips();
  renderGrid();
}

// ── Hero Stats ───────────────────────────────────────────────────

function renderStats() {
  const total = state.products.filter(p => !p.placeholder).length;
  const stores = new Set(state.products.map(p => p.store)).size;
  const cats = new Set(state.products.filter(p => !p.placeholder).map(p => p.category)).size;

  const statsEl = document.getElementById('hero-stats');
  if (statsEl) {
    statsEl.innerHTML = `
      <div class="hero-stat">
        <span class="hero-stat-num gradient-text">${total}+</span>
        <span class="hero-stat-label">Produtos</span>
      </div>
      <div class="hero-stat">
        <span class="hero-stat-num gradient-text">${stores}</span>
        <span class="hero-stat-label">Lojas</span>
      </div>
      <div class="hero-stat">
        <span class="hero-stat-num gradient-text">${cats}</span>
        <span class="hero-stat-label">Categorias</span>
      </div>
    `;
  }
}

// ── Search ───────────────────────────────────────────────────────

function initSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;
  input.addEventListener('input', (e) => {
    state.search = e.target.value;
    renderGrid();
  });
}

// ── Init ─────────────────────────────────────────────────────────

async function init() {
  try {
    const res = await fetch('./data/products.json');
    const data = await res.json();

    state.products = data.products || [];
    state.categories = data.categories || [];
    state.stores = data.stores || [];

    renderStats();
    renderChips();
    renderGrid();
    initSearch();

    window.addEventListener('hashchange', handleHash);
    handleHash();

  } catch (err) {
    console.error('Erro ao carregar produtos:', err);
    const grid = document.getElementById('products-grid');
    if (grid) {
      grid.innerHTML = `<div class="empty-state"><div class="empty-icon">⚠️</div><p>Erro ao carregar produtos.</p></div>`;
    }
  }
}

document.addEventListener('DOMContentLoaded', init);
