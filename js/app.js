/* WhateverBazar — App Logic */

const state = {
  products: [],
  categories: [],
  stores: [],
  activeCategory: 'todos',
  activeStore: 'todos',
  search: '',
};

// ── Helpers ───────────────────────────────────────────────────────

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
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function getProductById(id) {
  return state.products.find(p => p.id === id);
}

// ── Filter & Search ───────────────────────────────────────────────

function filteredProducts() {
  return state.products.filter(p => {
    const catMatch   = state.activeCategory === 'todos' || p.category === state.activeCategory;
    const storeMatch = state.activeStore === 'todos' || p.store === state.activeStore;
    const q          = state.search.toLowerCase().trim();
    const searchMatch = !q
      || p.name.toLowerCase().includes(q)
      || (p.shortDescription && p.shortDescription.toLowerCase().includes(q))
      || (p.tags  && p.tags.some(t => t.toLowerCase().includes(q)))
      || (p.brand && p.brand.toLowerCase().includes(q));
    return catMatch && storeMatch && searchMatch;
  });
}

// ── Render Product Card ───────────────────────────────────────────

function renderCard(p) {
  const priceHtml = p.price != null
    ? `
      ${p.originalPrice ? `<div class="text-[11px] text-[#55557A] line-through">De ${formatPrice(p.originalPrice)}</div>` : ''}
      <div class="text-[22px] font-extrabold text-turquesa leading-tight">${formatPrice(p.price)}</div>
      ${p.pixPrice ? `<div class="text-[11px] text-[#55557A]">PIX: ${formatPrice(p.pixPrice)}</div>` : ''}
    `
    : `<div class="text-sm text-[#8888AA] italic">Ver preço no site</div>`;

  const imgHtml = p.images && p.images.main
    ? `<img src="${p.images.main}" alt="${p.name}" loading="lazy"
            class="card-img-zoom w-full h-full object-cover"
            onerror="this.parentElement.innerHTML=placeholderImg()">`
    : placeholderImg();

  const ratingHtml = p.rating
    ? `<div class="flex items-center gap-1.5">
        <span class="text-yellow-400 text-xs">${renderStars(p.rating)}</span>
        <span class="text-xs font-semibold text-[#8888AA]">${p.rating}</span>
        ${p.reviews ? `<span class="text-[11px] text-[#55557A]">(${p.reviews.toLocaleString('pt-BR')})</span>` : ''}
       </div>`
    : '';

  return `
    <div class="product-card bg-[#12121F] border border-[#1E1E32] rounded-2xl overflow-hidden cursor-pointer
                transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(123,44,255,0.5)]
                hover:shadow-[0_8px_32px_rgba(123,44,255,0.2)] flex flex-col"
         onclick="showProduct('${p.id}')">

      <div class="relative aspect-square overflow-hidden bg-[#16162A]">
        ${p.discount ? `<span class="absolute top-3 left-3 z-10 bg-gradient-to-br from-[#FF2D55] to-[#FF9500] text-white text-[11px] font-bold px-2.5 py-1 rounded-full">-${p.discount}%</span>` : ''}
        ${p.featured ? `<span class="absolute top-3 right-3 z-10 bg-gradient-to-br from-roxo to-azul text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">★ Destaque</span>` : ''}
        ${imgHtml}
      </div>

      <div class="p-4 flex flex-col gap-2.5 flex-1">
        <span class="${storeClass(p.store)} inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full w-fit">
          ${storeLabel(p.store, state.stores)}
        </span>
        <h3 class="text-sm font-semibold leading-snug text-[#F0F0FF] line-clamp-2">${p.name}</h3>
        ${p.shortDescription ? `<p class="text-xs text-[#8888AA] leading-relaxed line-clamp-2">${p.shortDescription}</p>` : ''}
        ${ratingHtml}
        <div class="mt-auto pt-1">${priceHtml}</div>
        <button class="w-full py-3 rounded-xl bg-gradient-to-r from-roxo via-azul to-turquesa text-white text-sm font-bold mt-3
                       hover:opacity-90 hover:shadow-[0_0_20px_rgba(123,44,255,0.4)] transition-all">
          Ver produto →
        </button>
      </div>
    </div>
  `;
}

function placeholderImg() {
  return `<div class="w-full h-full flex flex-col items-center justify-center gap-2 text-[#55557A] text-xs bg-[#16162A]">
    <span style="font-size:40px;opacity:0.35">🛒</span>
    <span>Imagem em breve</span>
  </div>`;
}

// ── Render Grid ───────────────────────────────────────────────────

function renderGrid() {
  const grid     = document.getElementById('products-grid');
  const count    = document.getElementById('result-count');
  const products = filteredProducts();

  count.textContent = `${products.length} produto${products.length !== 1 ? 's' : ''}`;

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-20 text-[#55557A]">
        <div style="font-size:48px;opacity:0.4;margin-bottom:16px">🔍</div>
        <p class="text-base">Nenhum produto encontrado para este filtro.</p>
      </div>`;
    return;
  }

  grid.innerHTML = products.map(renderCard).join('');
}

// ── Render Product Page ───────────────────────────────────────────

function showProduct(id) {
  const p = getProductById(id);
  if (!p) return;

  window.location.hash = `produto/${id}`;
  document.getElementById('page-home').classList.add('hidden');
  document.getElementById('page-product').classList.remove('hidden');
  renderProductPage(p);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderProductPage(p) {
  const container = document.getElementById('product-content');

  const galleryThumbs = (p.images && p.images.gallery && p.images.gallery.length > 1)
    ? p.images.gallery.map((url, i) => `
        <div class="gallery-thumb w-[70px] h-[70px] rounded-lg overflow-hidden cursor-pointer shrink-0
                    border-2 ${i === 0 ? 'border-roxo shadow-[0_0_20px_rgba(123,44,255,0.4)] active' : 'border-[#1E1E32]'}
                    bg-[#16162A] hover:border-lilas"
             onclick="changeMainImg(this, '${url}')">
          <img src="${url}" alt="${p.name}" loading="lazy" class="w-full h-full object-contain p-1">
        </div>`).join('')
    : '';

  const mainImgSrc = p.images && p.images.main ? p.images.main : '';

  const priceSection = p.price != null ? `
    <div class="bg-[#16162A] border border-[#1E1E32] rounded-2xl p-5">
      ${p.discount ? `<span class="inline-block bg-gradient-to-br from-[#FF2D55] to-[#FF9500] text-white text-sm font-bold px-3 py-1 rounded-full mb-3">-${p.discount}% de desconto</span>` : ''}
      ${p.originalPrice ? `<div class="text-sm text-[#55557A] line-through mb-0.5">De ${formatPrice(p.originalPrice)}</div>` : ''}
      <div class="text-[36px] font-black text-turquesa leading-tight">${formatPrice(p.price)}</div>
      ${p.pixPrice ? `<div class="text-sm text-[#55557A] mt-1">💳 PIX: ${formatPrice(p.pixPrice)} (3% de desconto)</div>` : ''}
    </div>
  ` : `
    <div class="bg-[#16162A] border border-[#1E1E32] rounded-2xl p-5">
      <div class="text-base text-[#8888AA] italic">Preço disponível no site da loja</div>
    </div>`;

  const specsRows = p.specs && Object.keys(p.specs).length > 0
    ? Object.entries(p.specs).map(([k, v]) => `
        <div class="grid border-b border-[#1E1E32] last:border-b-0" style="grid-template-columns:140px 1fr">
          <div class="px-4 py-3 text-xs font-semibold text-[#55557A] uppercase tracking-wide bg-white/[0.02] border-r border-[#1E1E32]">${k}</div>
          <div class="px-4 py-3 text-sm text-[#8888AA]">${v}</div>
        </div>`).join('')
    : `<div class="grid" style="grid-template-columns:140px 1fr">
        <div class="px-4 py-3 text-xs text-[#55557A]">—</div>
        <div class="px-4 py-3 text-sm text-[#8888AA]">Sem especificações cadastradas</div>
       </div>`;

  const tagsHtml = (p.tags && p.tags.length)
    ? p.tags.map(t => `<span class="px-3 py-1 rounded-full bg-[rgba(123,44,255,0.1)] border border-[rgba(123,44,255,0.3)] text-[#B57CFF] text-xs">#${t}</span>`).join('')
    : '';

  const ratingHtml = p.rating
    ? `<div class="flex items-center gap-2.5">
        <span class="text-yellow-400 text-base">${renderStars(p.rating)}</span>
        <span class="text-[15px] font-bold text-[#8888AA]">${p.rating}/5</span>
        ${p.reviews ? `<span class="text-sm text-[#55557A]">${p.reviews.toLocaleString('pt-BR')} avaliações</span>` : ''}
       </div>`
    : '';

  container.innerHTML = `
    <button class="inline-flex items-center gap-2 text-[#8888AA] text-sm mb-8 hover:text-[#B57CFF] transition-colors cursor-pointer bg-transparent border-none p-0"
            onclick="goHome()">← Voltar para a loja</button>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

      <!-- Gallery -->
      <div class="flex flex-col gap-3">
        <div class="rounded-2xl overflow-hidden bg-[#16162A] aspect-square border border-[#1E1E32]">
          ${mainImgSrc
            ? `<img id="gallery-main-img" src="${mainImgSrc}" alt="${p.name}" class="w-full h-full object-contain p-5 transition-transform duration-300">`
            : `<div class="w-full h-full flex flex-col items-center justify-center gap-2 text-[#55557A]"><span style="font-size:60px;opacity:0.3">🛒</span><span>Imagem em breve</span></div>`
          }
        </div>
        ${galleryThumbs ? `<div class="flex gap-2 flex-wrap">${galleryThumbs}</div>` : ''}
      </div>

      <!-- Info -->
      <div class="flex flex-col gap-5">
        <span class="${storeClass(p.store)} inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full w-fit">
          ${storeLabel(p.store, state.stores)}
        </span>

        <h1 class="font-extrabold leading-snug" style="font-size:clamp(20px,3vw,28px)">${p.name}</h1>

        ${ratingHtml}

        ${priceSection}

        <p class="text-[#8888AA] leading-relaxed text-sm">${p.description}</p>

        <a href="${p.affiliateLink}" target="_blank" rel="noopener noreferrer"
           onclick="event.stopPropagation()"
           class="flex items-center justify-center gap-2.5 py-4 px-8 rounded-2xl no-underline
                  bg-gradient-to-r from-roxo via-azul to-turquesa text-white text-base font-bold
                  hover:opacity-90 hover:shadow-[0_0_30px_rgba(123,44,255,0.5)] hover:-translate-y-px transition-all
                  shadow-[0_0_20px_rgba(123,44,255,0.4)]">
          🛒 Comprar em ${storeLabel(p.store, state.stores)} →
        </a>

        <div>
          <div class="text-base font-bold mb-3 flex items-center gap-2">
            <span class="inline-block w-1 rounded-sm" style="height:18px;background:linear-gradient(to bottom,#7B2CFF,#00F0CB)"></span>
            Especificações
          </div>
          <div class="bg-[#16162A] border border-[#1E1E32] rounded-2xl overflow-hidden">
            ${specsRows}
          </div>
        </div>

        ${tagsHtml ? `<div class="flex flex-wrap gap-2">${tagsHtml}</div>` : ''}
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
  document.getElementById('page-home').classList.remove('hidden');
  document.getElementById('page-product').classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleHash() {
  const hash = window.location.hash;
  if (hash.startsWith('#produto/')) {
    const id = hash.replace('#produto/', '');
    const p  = getProductById(id);
    if (p) {
      document.getElementById('page-home').classList.add('hidden');
      document.getElementById('page-product').classList.remove('hidden');
      renderProductPage(p);
    } else {
      goHome();
    }
  } else {
    document.getElementById('page-home').classList.remove('hidden');
    document.getElementById('page-product').classList.add('hidden');
  }
}

// ── Chips ────────────────────────────────────────────────────────

function renderChips() {
  const catContainer = document.getElementById('category-chips');
  catContainer.innerHTML = state.categories.map(c => `
    <button class="chip ${state.activeCategory === c.id ? 'active' : ''}"
            onclick="setCategory('${c.id}')">${c.label}</button>`).join('');

  const storeContainer = document.getElementById('store-chips');
  storeContainer.innerHTML = `
    <button class="chip ${state.activeStore === 'todos' ? 'active' : ''}"
            onclick="setStore('todos')">Todos</button>
    ${state.stores.map(s => `
      <button class="chip ${state.activeStore === s.id ? 'active' : ''}"
              data-store="${s.id}"
              onclick="setStore('${s.id}')">${s.label}</button>`).join('')}
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
  const total  = state.products.length;
  const stores = new Set(state.products.map(p => p.store)).size;
  const cats   = new Set(state.products.map(p => p.category)).size;

  const statsEl = document.getElementById('hero-stats');
  if (!statsEl) return;
  statsEl.innerHTML = `
    <div class="text-center">
      <span class="block text-[28px] font-extrabold gradient-text">${total}+</span>
      <span class="block text-[11px] text-[#55557A] uppercase tracking-widest mt-0.5">Produtos</span>
    </div>
    <div class="text-center">
      <span class="block text-[28px] font-extrabold gradient-text">${stores}</span>
      <span class="block text-[11px] text-[#55557A] uppercase tracking-widest mt-0.5">Lojas</span>
    </div>
    <div class="text-center">
      <span class="block text-[28px] font-extrabold gradient-text">${cats}</span>
      <span class="block text-[11px] text-[#55557A] uppercase tracking-widest mt-0.5">Categorias</span>
    </div>
  `;
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

function init() {
  const data = window.CATALOG;
  if (!data) {
    const grid = document.getElementById('products-grid');
    if (grid) {
      grid.innerHTML = `<div class="col-span-full text-center py-20 text-[#55557A]">
        <div style="font-size:48px;opacity:0.4;margin-bottom:16px">⚠️</div>
        <p>Catálogo não encontrado. Verifique se data/products.js está carregado.</p>
      </div>`;
    }
    return;
  }

  state.products   = data.products   || [];
  state.categories = data.categories || [];
  state.stores     = data.stores     || [];

  renderStats();
  renderChips();
  renderGrid();
  initSearch();

  window.addEventListener('hashchange', handleHash);
  handleHash();
}

document.addEventListener('DOMContentLoaded', init);
