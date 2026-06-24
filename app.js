/**
 * Cafe Zaferan Digital Menu Application
 * Handles state, rendering, search, filters, cart, and mock order workflows.
 */

// Menu Items Database
const MENU_DATA = [
  {
    id: 'saffron-tea',
    name: 'چای دمی ایرانی زعفران',
    category: 'hot',
    price: 85000,
    image: 'assets/saffron-tea.png',
    description: 'چای اصیل ایرانی دم‌کشیده با زعفران سرگل، هل سبز و گل سرخ محمدی.',
    ingredients: 'چای سیاه سنتی، زعفران قائنات، هل، گل سرخ، آب جوش',
    prepTime: '۱۰ دقیقه',
    calories: '۵ کیلوکالری',
    tags: ['saffron', 'popular', 'vegetarian', 'gluten-free'],
    featured: true
  },
  {
    id: 'saffron-latte',
    name: 'سافران لاته (لاته زعفران)',
    category: 'hot',
    price: 95000,
    image: 'assets/saffron-latte.png',
    description: 'شیر اسپرسوی نرم و خامه‌ای مخلوط با عصاره غلیظ زعفران و هنر لاته آرت.',
    ingredients: 'اسپرسو، شیر داغ، فوم شیر، عصاره زعفران طبیعی، عسل',
    prepTime: '۵ دقیقه',
    calories: '۱۸۰ کیلوکالری',
    tags: ['saffron', 'popular', 'vegetarian', 'gluten-free'],
    featured: true
  },
  {
    id: 'baklava',
    name: 'باقلوا زعفرانی سنتی با سرشیر',
    category: 'dessert',
    price: 110000,
    image: 'assets/baklava.png',
    description: 'باقلوای ترد خانگی با فیلینگ پسته و گردو، معطر به گلاب و زعفران به همراه سرشیر تازه.',
    ingredients: 'خمیر یوفکا، کره، مغز پسته، مغز گردو، شربت بار زعفرانی، گلاب، سرشیر محلی',
    prepTime: '۳ دقیقه',
    calories: '۳۲۰ کیلوکالری',
    tags: ['saffron', 'popular', 'vegetarian'],
    featured: true
  },
  {
    id: 'omelette',
    name: 'املت گوجه‌فرنگی سنتی با نان سنگک',
    category: 'brunch',
    price: 120000,
    image: 'assets/omelette.png',
    description: 'املت قهوه‌خانه‌ای پرطرفدار، پخته شده با گوجه‌فرنگی محلی رنده شده و کره حیوانی، همراه با ریحان تازه و نان داغ.',
    ingredients: 'تخم‌مرغ محلی، گوجه‌فرنگی تازه، کره حیوانی، ادویه مخصوص، نان سنگک، سبزی خوردن',
    prepTime: '۱۵ دقیقه',
    calories: '۴۱۰ کیلوکالری',
    tags: ['popular', 'vegetarian'],
    featured: true
  },
  {
    id: 'espresso-double',
    name: 'اسپرسو دوبل ریسترتو',
    category: 'hot',
    price: 55000,
    image: 'assets/saffron-latte.png', // Fallback to similar rich look
    description: 'عصاره خالص دانه قهوه ۱۰۰٪ عربیکا با رست مدیوم-دارک و طعم یاد شکلات تلخ.',
    ingredients: 'پودر قهوه عربیکا اسپشیالتی، آب تصفیه شده تحت فشار',
    prepTime: '۳ دقیقه',
    calories: '۲ کیلوکالری',
    tags: ['vegetarian', 'gluten-free'],
    featured: false
  },
  {
    id: 'cappuccino',
    name: 'کاپوچینو کلاسیک',
    category: 'hot',
    price: 75000,
    image: 'assets/saffron-latte.png',
    description: 'ترکیب کلاسیک اسپرسو، شیر گرم شده و فوم مخملی متراکم همراه با پودر کاکائو.',
    ingredients: 'اسپرسو، شیر، فوم شیر، پودر کاکائو',
    prepTime: '۴ دقیقه',
    calories: '۱۲۰ کیلوکالری',
    tags: ['vegetarian', 'gluten-free'],
    featured: false
  },
  {
    id: 'saffron-willow-sharbati',
    name: 'شربت زعفران و بیدمشک خنک',
    category: 'cold',
    price: 78000,
    image: 'assets/saffron-tea.png', // Fallback
    description: 'شربت سنتی و آرامش‌بخش زعفران به همراه عرق بیدمشک، تخم شربتی و تکه‌های یخ.',
    ingredients: 'زعفران دم‌کرده، عرق بیدمشک درجه یک، تخم شربتی، شکر قهوه‌ای، لیموترش تازه، یخ',
    prepTime: '۳ دقیقه',
    calories: '۹۵ کیلوکالری',
    tags: ['saffron', 'vegetarian', 'gluten-free'],
    featured: false
  },
  {
    id: 'mint-narenj-mojito',
    name: 'موهیتو نعناع-نارنج کوهستان',
    category: 'cold',
    price: 82000,
    image: 'assets/saffron-tea.png',
    description: 'پیوند طعم موهیتو غربی با عطر بهارنارنج ایرانی، نعناع محلی تازه و آب گازدار.',
    ingredients: 'نعناع تازه، عصاره بهارنارنج، آب لیموترش تازه، آب گازدار، شکر، یخ',
    prepTime: '۵ دقیقه',
    calories: '۱۱۰ کیلوکالری',
    tags: ['vegetarian', 'gluten-free'],
    featured: false
  },
  {
    id: 'iced-caramel-latte',
    name: 'آیس لاته کارامل نمکی',
    category: 'cold',
    price: 88000,
    image: 'assets/saffron-latte.png',
    description: 'اسپرسو دوبل ریخته شده روی شیر خنک، سس کارامل دست‌ساز نمکی و یخ فراوان.',
    ingredients: 'اسپرسو، شیر خنک، سس کارامل نمکی خانگی، یخ',
    prepTime: '۴ دقیقه',
    calories: '۲۲۰ کیلوکالری',
    tags: ['vegetarian', 'gluten-free'],
    featured: false
  },
  {
    id: 'lava-cake',
    name: 'کیک شکلاتی مذاب (لاوا کیک)',
    category: 'dessert',
    price: 95000,
    image: 'assets/baklava.png',
    description: 'کیک شکلاتی گرم با مغز شکلات بلژیکی روان روان، همراه با یک اسکوپ بستنی وانیلی زعفرانی.',
    ingredients: 'شکلات ۷۰٪ بلژیکی، آرد، تخم‌مرغ، شکر، بستنی وانیلی با طعم زعفران',
    prepTime: '۱۲ دقیقه',
    calories: '۴۵۰ کیلوکالری',
    tags: ['vegetarian'],
    featured: false
  },
  {
    id: 'saffron-cheesecake',
    name: 'چیزکیک نیویورکی با ژله زعفران',
    category: 'dessert',
    price: 105000,
    image: 'assets/baklava.png',
    description: 'چیزکیک نیویورکی پخته با بافت پنیر خامه‌ای نرم، پوشانده شده با لایه درخشان ژله عسل و زعفران.',
    ingredients: 'پنیر خامه‌ای ماسکارپونه، خامه قنادی، بیسکویت دایجستیو، کره، زعفران، عسل طبیعی',
    prepTime: '۳ دقیقه',
    calories: '۳۸۰ کیلوکالری',
    tags: ['saffron', 'vegetarian'],
    featured: false
  },
  {
    id: 'persian-brunch-platter',
    name: 'سینی صبحانه ایرانی کامل',
    category: 'brunch',
    price: 145000,
    image: 'assets/omelette.png',
    description: 'مجموعه‌ای اصیل از پنیر لیقوان تبریز، گردوی تازه، خیار و گوجه‌فرنگی محلی، عسل قسب، سرشیر، کره و مربای بالنگ سنتی.',
    ingredients: 'پنیر لیقوان گوسفندی، گردو، کره، عسل کوهی، مربای بالنگ خانگی، خیار، گوجه، نان سنگک داغ',
    prepTime: '۸ دقیقه',
    calories: '۵۲۰ کیلوکالری',
    tags: ['vegetarian'],
    featured: false
  }
];

// App State Manager
class CafeApp {
  constructor() {
    this.cart = [];
    this.currentCategory = 'all';
    this.currentTag = 'all';
    this.searchQuery = '';
    
    // Bind Methods
    this.initElements();
    this.initEventListeners();
    this.loadCartFromStorage();
    this.render();
  }

  // Initialize DOM Elements
  initElements() {
    this.menuGrid = document.getElementById('menu-grid');
    this.featuredCarousel = document.getElementById('featured-carousel');
    this.cartTrigger = document.getElementById('cart-trigger');
    this.mobileCartTrigger = document.getElementById('mobile-cart-trigger');
    this.cartDrawer = document.getElementById('cart-drawer');
    this.cartCloseBtn = document.getElementById('cart-close-btn');
    this.cartCloseBackdrop = document.getElementById('cart-close-backdrop');
    this.cartItemsList = document.getElementById('cart-items-list');
    this.cartEmptyState = document.getElementById('cart-empty-state');
    this.cartFooter = document.getElementById('cart-footer');
    this.cartTotalPrice = document.getElementById('cart-total-price');
    this.cartCountBadges = document.querySelectorAll('.cart-count');
    this.tableNumberInput = document.getElementById('table-number');
    this.submitOrderBtn = document.getElementById('submit-order-btn');
    this.callWaiterBtn = document.getElementById('call-waiter-trigger');
    this.callWaiterDrawerBtn = document.getElementById('call-waiter-drawer-btn');
    this.callWaiterMobileBtn = document.getElementById('call-waiter-trigger');
    this.waiterOverlay = document.getElementById('waiter-overlay');
    this.cancelWaiterBtn = document.getElementById('cancel-waiter-btn');
    
    // Modals
    this.detailsModal = document.getElementById('details-modal');
    this.modalCloseBtn = document.getElementById('modal-close-btn');
    this.modalCloseBackdrop = document.getElementById('modal-close-backdrop');
    this.modalBody = document.getElementById('modal-body-content');
    
    this.successModal = document.getElementById('order-success-modal');
    this.successCloseBtn = document.getElementById('success-close-btn');
    this.successCloseBackdrop = document.getElementById('order-success-close-backdrop');
    
    // Filters & Search
    this.searchBar = document.getElementById('menu-search');
    this.categoryTabs = document.querySelectorAll('.category-tab');
    this.tagFilters = document.querySelectorAll('.tag-filter');
    this.filterSummary = document.getElementById('filter-summary');
    this.activeFilterText = document.getElementById('active-filter-text');
    this.clearFiltersBtn = document.getElementById('clear-filters');
    this.cartContinueShopping = document.getElementById('cart-continue-shopping');
    
    // Theme
    this.themeToggle = document.getElementById('theme-toggle');
  }

  // Attach Event Handlers
  initEventListeners() {
    // Theme toggle
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
    
    // Cart open/close
    const openCart = () => this.toggleCartDrawer(true);
    const closeCart = () => this.toggleCartDrawer(false);
    this.cartTrigger.addEventListener('click', openCart);
    if (this.mobileCartTrigger) this.mobileCartTrigger.addEventListener('click', openCart);
    this.cartCloseBtn.addEventListener('click', closeCart);
    this.cartCloseBackdrop.addEventListener('click', closeCart);
    this.cartContinueShopping.addEventListener('click', closeCart);
    
    // Category Tabs
    this.categoryTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.categoryTabs.forEach(t => t.classList.remove('active'));
        const target = e.currentTarget;
        target.classList.add('active');
        this.currentCategory = target.dataset.category;
        this.renderMenu();
        this.updateFilterSummary();
      });
    });
    
    // Tag Filters
    this.tagFilters.forEach(filter => {
      filter.addEventListener('click', (e) => {
        this.tagFilters.forEach(f => f.classList.remove('active'));
        const target = e.currentTarget;
        target.classList.add('active');
        this.currentTag = target.dataset.tag;
        this.renderMenu();
        this.updateFilterSummary();
      });
    });
    
    // Search input
    this.searchBar.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.trim().toLowerCase();
      this.renderMenu();
      this.updateFilterSummary();
    });
    
    // Clear filters
    this.clearFiltersBtn.addEventListener('click', () => {
      this.resetFilters();
    });
    
    // Close Details Modal
    const closeDetails = () => this.toggleDetailsModal(false);
    this.modalCloseBtn.addEventListener('click', closeDetails);
    this.modalCloseBackdrop.addEventListener('click', closeDetails);
    
    // Close Success Modal
    const closeSuccess = () => this.toggleSuccessModal(false);
    this.successCloseBtn.addEventListener('click', closeSuccess);
    this.successCloseBackdrop.addEventListener('click', closeSuccess);
    
    // Call Waiter Workflows
    const triggerWaiter = () => this.callWaiter();
    if (this.callWaiterBtn) this.callWaiterBtn.addEventListener('click', triggerWaiter);
    if (this.callWaiterDrawerBtn) this.callWaiterDrawerBtn.addEventListener('click', triggerWaiter);
    document.getElementById('call-waiter-trigger').addEventListener('click', triggerWaiter);
    this.cancelWaiterBtn.addEventListener('click', () => this.cancelWaiterCall());
    
    // Submit order
    this.submitOrderBtn.addEventListener('click', () => this.submitOrder());
    
    // Prevent zoom/scroll lock adjustments on input focus
    this.tableNumberInput.addEventListener('change', () => {
      if (this.tableNumberInput.value < 1) this.tableNumberInput.value = 1;
    });
  }

  // Format numbers to Persian currency style
  formatCurrency(value) {
    const formatter = new Intl.NumberFormat('fa-IR');
    return `${formatter.format(value)} تومان`;
  }

  // Convert numbers to Persian digits (for counts, times, etc.)
  toPersianDigits(num) {
    const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/[0-9]/g, function(w) {
      return id[+w];
    });
  }

  // Theme Management
  toggleTheme() {
    const isDark = document.body.classList.contains('theme-dark');
    if (isDark) {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
      localStorage.setItem('cafe-theme', 'light');
    } else {
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
      localStorage.setItem('cafe-theme', 'dark');
    }
  }

  // Load Saved Theme
  loadTheme() {
    const savedTheme = localStorage.getItem('cafe-theme') || 'light';
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${savedTheme}`);
  }

  // Reset all filters and search input
  resetFilters() {
    this.searchBar.value = '';
    this.searchQuery = '';
    
    this.categoryTabs.forEach(t => t.classList.remove('active'));
    this.categoryTabs[0].classList.add('active');
    this.currentCategory = 'all';
    
    this.tagFilters.forEach(f => f.classList.remove('active'));
    this.tagFilters[0].classList.add('active');
    this.currentTag = 'all';
    
    this.renderMenu();
    this.updateFilterSummary();
  }

  // Update visual filter header text
  updateFilterSummary() {
    const activeFilters = [];
    
    if (this.currentCategory !== 'all') {
      const activeTab = Array.from(this.categoryTabs).find(t => t.dataset.category === this.currentCategory);
      if (activeTab) activeFilters.push(activeTab.innerText.trim());
    }
    
    if (this.currentTag !== 'all') {
      const activeFilter = Array.from(this.tagFilters).find(f => f.dataset.tag === this.currentTag);
      if (activeFilter) activeFilters.push(activeFilter.innerText.trim());
    }
    
    if (this.searchQuery) {
      activeFilters.push(`جستجوی "${this.searchQuery}"`);
    }
    
    if (activeFilters.length > 0) {
      this.filterSummary.style.display = 'flex';
      this.activeFilterText.innerText = activeFilters.join(' + ');
    } else {
      this.filterSummary.style.display = 'none';
    }
  }

  // Render Full Application Layout
  render() {
    this.loadTheme();
    this.renderFeatured();
    this.renderMenu();
    this.updateCartUI();
    lucide.createIcons();
  }

  // Render Featured Items Carousel
  renderFeatured() {
    const featured = MENU_DATA.filter(item => item.featured);
    this.featuredCarousel.innerHTML = featured.map(item => `
      <div class="featured-card" onclick="window.app.openDetails('${item.id}')">
        <div class="featured-img-wrapper">
          <img src="${item.image}" alt="${item.name}" class="featured-img" loading="lazy">
          <span class="featured-badge"><i data-lucide="sparkles" class="tag-icon"></i> محبوب‌ترین</span>
        </div>
        <div class="featured-info">
          <h4 class="featured-name">${item.name}</h4>
          <p class="featured-desc">${item.description}</p>
          <div class="featured-footer">
            <span class="featured-price">${this.formatCurrency(item.price)}</span>
            <button class="add-to-cart-btn" aria-label="افزودن به سبد خرید" onclick="window.app.addToCartEvent(event, '${item.id}')">
              <i data-lucide="plus"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Render Filtered Menu Grid
  renderMenu() {
    const filteredItems = MENU_DATA.filter(item => {
      // Category filter
      const matchesCategory = this.currentCategory === 'all' || item.category === this.currentCategory;
      // Tag filter
      const matchesTag = this.currentTag === 'all' || item.tags.includes(this.currentTag);
      // Search search
      const matchesSearch = !this.searchQuery || 
                            item.name.toLowerCase().includes(this.searchQuery) || 
                            item.description.toLowerCase().includes(this.searchQuery) ||
                            (item.ingredients && item.ingredients.toLowerCase().includes(this.searchQuery));
      
      return matchesCategory && matchesTag && matchesSearch;
    });

    if (filteredItems.length === 0) {
      this.menuGrid.innerHTML = `
        <div class="cart-empty" style="grid-column: 1 / -1;">
          <i data-lucide="search-x" class="empty-icon"></i>
          <p>هیچ محصولی مطابق با فیلترهای انتخابی شما پیدا نشد.</p>
          <button class="btn btn-outline btn-sm" onclick="window.app.resetFilters()">پاک کردن فیلترها</button>
        </div>
      `;
      lucide.createIcons();
      return;
    }

    this.menuGrid.innerHTML = filteredItems.map(item => {
      const isSaffron = item.tags.includes('saffron') ? '<span class="menu-card-badge">زعفرانی</span>' : '';
      return `
        <div class="menu-card" onclick="window.app.openDetails('${item.id}')">
          <div class="menu-card-img-wrapper">
            <img src="${item.image}" alt="${item.name}" class="menu-card-img" loading="lazy">
            ${isSaffron}
          </div>
          <div class="menu-card-content">
            <div class="menu-card-header">
              <h4 class="menu-card-name">${item.name}</h4>
            </div>
            <p class="menu-card-desc">${item.description}</p>
            <div class="menu-card-tags">
              ${item.tags.map(t => {
                if (t === 'saffron') return '';
                let label = t === 'vegetarian' ? 'گیاهی' : t === 'gluten-free' ? 'بدون گلوتن' : t === 'popular' ? 'محبوب' : t;
                return `<span class="menu-card-tag">${label}</span>`;
              }).join('')}
            </div>
            <div class="menu-card-footer">
              <span class="menu-card-price">${this.formatCurrency(item.price)}</span>
              <button class="add-to-cart-btn" aria-label="افزودن به سبد خرید" onclick="window.app.addToCartEvent(event, '${item.id}')">
                <i data-lucide="plus"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
    
    lucide.createIcons();
  }

  // Open Details Modal
  openDetails(itemId) {
    const item = MENU_DATA.find(i => i.id === itemId);
    if (!item) return;

    this.modalBody.innerHTML = `
      <div class="detail-img-wrapper">
        <img src="${item.image}" alt="${item.name}" class="detail-img">
        ${item.tags.includes('saffron') ? '<span class="detail-badge">پیشنهاد زعفرانی کافه</span>' : ''}
      </div>
      <div class="detail-content">
        <h3 class="detail-title">${item.name}</h3>
        <p class="detail-desc">${item.description}</p>
        
        <div class="detail-meta-grid">
          <div class="detail-meta-item">
            <span class="detail-meta-label">ترکیبات اصلی:</span>
            <span class="detail-meta-value">${item.ingredients}</span>
          </div>
          <div class="detail-meta-item">
            <span class="detail-meta-label">زمان تقریبی آماده‌سازی:</span>
            <span class="detail-meta-value">${item.prepTime}</span>
          </div>
          <div class="detail-meta-item">
            <span class="detail-meta-label">کالری:</span>
            <span class="detail-meta-value">${item.calories}</span>
          </div>
          <div class="detail-meta-item">
            <span class="detail-meta-label">ویژگی‌ها:</span>
            <div class="detail-tags" style="margin-top: 4px;">
              ${item.tags.map(t => {
                let label = t === 'saffron' ? 'زعفرانی' : t === 'vegetarian' ? 'گیاهی' : t === 'gluten-free' ? 'بدون گلوتن' : t === 'popular' ? 'محبوب' : t;
                return `<span class="detail-tag">${label}</span>`;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
      <div class="detail-footer">
        <span class="detail-price">${this.formatCurrency(item.price)}</span>
        <button class="btn btn-primary" onclick="window.app.addToCart('${item.id}'); window.app.toggleDetailsModal(false);">
          <i data-lucide="plus"></i> افزودن به سبد خرید
        </button>
      </div>
    `;
    
    this.toggleDetailsModal(true);
    lucide.createIcons();
  }

  // Toggle Details Modal Open/Close State
  toggleDetailsModal(open) {
    if (open) {
      this.detailsModal.classList.add('open');
      this.detailsModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else {
      this.detailsModal.classList.remove('open');
      this.detailsModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  // Toggle Success Modal Open/Close State
  toggleSuccessModal(open) {
    if (open) {
      this.successModal.classList.add('open');
      this.successModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else {
      this.successModal.classList.remove('open');
      this.successModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  // Toggle Cart Drawer
  toggleCartDrawer(open) {
    if (open) {
      this.cartDrawer.classList.add('open');
      this.cartDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else {
      this.cartDrawer.classList.remove('open');
      this.cartDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  // Add Special Item to Cart (Hero Button)
  addSpecialToCart() {
    this.addToCart('saffron-tea');
    this.toggleCartDrawer(true);
  }

  // Stop click propagation on card when clicking the cart icon directly
  addToCartEvent(event, itemId) {
    event.stopPropagation();
    this.addToCart(itemId);
  }

  // Cart Operations: Add
  addToCart(itemId) {
    const item = MENU_DATA.find(i => i.id === itemId);
    if (!item) return;

    const existingIndex = this.cart.findIndex(cartItem => cartItem.id === itemId);
    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += 1;
    } else {
      this.cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1
      });
    }

    this.saveCartToStorage();
    this.updateCartUI();
    this.showToast(`${item.name} به سبد خرید اضافه شد.`);
  }

  // Cart Operations: Remove / Decrement
  changeQuantity(itemId, amount) {
    const existingIndex = this.cart.findIndex(cartItem => cartItem.id === itemId);
    if (existingIndex === -1) return;

    this.cart[existingIndex].quantity += amount;
    
    if (this.cart[existingIndex].quantity <= 0) {
      this.cart.splice(existingIndex, 1);
    }

    this.saveCartToStorage();
    this.updateCartUI();
  }

  // Cart Operations: Remove entirely
  removeFromCart(itemId) {
    this.cart = this.cart.filter(item => item.id !== itemId);
    this.saveCartToStorage();
    this.updateCartUI();
  }

  // Save Cart state
  saveCartToStorage() {
    localStorage.setItem('cafe-cart', JSON.stringify(this.cart));
  }

  // Load Saved Cart state
  loadCartFromStorage() {
    const saved = localStorage.getItem('cafe-cart');
    if (saved) {
      try {
        this.cart = JSON.parse(saved);
      } catch (e) {
        this.cart = [];
      }
    }
  }

  // Sync Cart State with UI
  updateCartUI() {
    // Total count
    const totalCount = this.cart.reduce((total, item) => total + item.quantity, 0);
    this.cartCountBadges.forEach(badge => {
      badge.innerText = this.toPersianDigits(totalCount);
      badge.style.display = totalCount > 0 ? 'flex' : 'none';
    });

    // Cart Items Rendering
    if (this.cart.length === 0) {
      this.cartEmptyState.style.display = 'flex';
      this.cartItemsList.style.display = 'none';
      this.cartFooter.style.display = 'none';
    } else {
      this.cartEmptyState.style.display = 'none';
      this.cartItemsList.style.display = 'flex';
      this.cartFooter.style.display = 'block';

      this.cartItemsList.innerHTML = this.cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-price">${this.formatCurrency(item.price)}</span>
          </div>
          <div class="cart-item-actions">
            <button class="quantity-btn" onclick="window.app.changeQuantity('${item.id}', -1)">-</button>
            <span class="cart-item-qty">${this.toPersianDigits(item.quantity)}</span>
            <button class="quantity-btn" onclick="window.app.changeQuantity('${item.id}', 1)">+</button>
            <button class="cart-item-remove" aria-label="حذف" onclick="window.app.removeFromCart('${item.id}')">
              <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
            </button>
          </div>
        </div>
      `).join('');

      // Total Price
      const totalAmount = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      this.cartTotalPrice.innerText = this.formatCurrency(totalAmount);
      
      lucide.createIcons();
    }
  }

  // Show dynamic system toast message
  showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i data-lucide="check-circle-2" class="toast-icon"></i>
      <span class="toast-message">${message}</span>
    `;
    
    container.appendChild(toast);
    lucide.createIcons();
    
    // Slide out and remove
    setTimeout(() => {
      toast.style.animation = 'toast-in 0.3s reverse forwards';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 2500);
  }

  // Simulation: Call Server (Waitress)
  callWaiter() {
    this.toggleCartDrawer(false);
    this.waiterOverlay.style.display = 'flex';
    
    // Auto-complete call after 3.5 seconds
    this.waiterTimer = setTimeout(() => {
      this.waiterOverlay.style.display = 'none';
      const tableNum = this.tableNumberInput.value || '۱';
      this.showToast(`گارسون برای میز شماره ${this.toPersianDigits(tableNum)} فراخوانده شد.`);
    }, 3500);
  }

  // Cancel calling waitress
  cancelWaiterCall() {
    if (this.waiterTimer) {
      clearTimeout(this.waiterTimer);
    }
    this.waiterOverlay.style.display = 'none';
    this.showToast('درخواست فراخوانی گارسون لغو شد.');
  }

  // Simulation: Submit Order Workflow
  submitOrder() {
    const tableNum = this.tableNumberInput.value;
    if (!tableNum) {
      this.showToast('لطفاً شماره میز خود را وارد کنید.');
      this.tableNumberInput.focus();
      return;
    }

    // Prepare receipt
    const orderId = Math.floor(1000 + Math.random() * 9000);
    const totalAmount = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    document.getElementById('success-order-id').innerText = `#${this.toPersianDigits(orderId)}`;
    document.getElementById('receipt-table-num').innerText = this.toPersianDigits(tableNum);
    
    const receiptList = document.getElementById('receipt-items-list');
    receiptList.innerHTML = this.cart.map(item => `
      <div class="receipt-row">
        <span>${item.name} (${this.toPersianDigits(item.quantity)} عدد)</span>
        <span>${this.formatCurrency(item.price * item.quantity)}</span>
      </div>
    `).join('');
    
    document.getElementById('receipt-total-price').innerText = this.formatCurrency(totalAmount);

    // Clear cart
    this.cart = [];
    this.saveCartToStorage();
    this.updateCartUI();
    this.toggleCartDrawer(false);
    
    // Show order success modal
    this.toggleSuccessModal(true);
    lucide.createIcons();
  }
}

// Instantiate App when Document is Ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new CafeApp();
});
