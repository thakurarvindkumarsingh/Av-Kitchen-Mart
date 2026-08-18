// === 1. PRELOADER LOGIC ===
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (preloader) preloader.style.display = "none";
});

// === 2. MOBILE MENU DRAWER LOGIC (OPEN, CLOSE & OVERLAY CLICK) ===
const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const navbarMenu = document.getElementById("navbarMenu");
const navOverlay = document.getElementById("navOverlay");

// 1. Hamburg Icon Click -> Open Menu (Slide Left to Right) & Show Backdrop
if (menuBtn && navbarMenu && navOverlay) {
    menuBtn.addEventListener("click", () => {
        navbarMenu.classList.add("open");
        navOverlay.classList.add("show");
    });
}

// 2. Cross Icon Click -> Close Menu & Hide Backdrop
if (closeMenu && navbarMenu && navOverlay) {
    closeMenu.addEventListener("click", () => {
        navbarMenu.classList.remove("open");
        navOverlay.classList.remove("show");
    });
}

// 3. 70% Outer Area Overlay Click -> Close Menu Automatically
if (navOverlay && navbarMenu) {
    navOverlay.addEventListener("click", () => {
        navbarMenu.classList.remove("open");
        navOverlay.classList.remove("show");
    });
}

// === 3. PRODUCTS DYNAMIC RENDER & FILTERS ===
const productContainer = document.getElementById("productContainer");
if (productContainer && typeof products !== 'undefined') {
    function showProducts(data) {
    productContainer.innerHTML = "";
    data.forEach((product, index) => {
        
        // 1. Pehle check karo ki images hain ya nahi, aur pehli image ko main image banao
        const mainImage = product.images && product.images.length > 0 ? product.images[0] : 'images/default.jpg';
        
        // 2. Thumbnails ke liye HTML taiyar karo
        let thumbnailsHTML = "";
        if (product.images && product.images.length > 1) {
            thumbnailsHTML = `<div class="product-thumbnails">`;
            product.images.forEach((img, imgIndex) => {
                // Pehli thumbnail par active class lagayenge
                const activeClass = imgIndex === 0 ? 'active-thumb' : '';
                // Onclick lagaya hai taaki click karte hi main image badal jaye
                thumbnailsHTML += `<img src="${img}" class="thumb-img ${activeClass}" onclick="changeProductImage(this, 'main-img-${index}')">`;
            });
            thumbnailsHTML += `</div>`;
        }

        // 3. Poora card append karo
        productContainer.innerHTML += `
        <div class="product-card">
            <div class="product-img-container">
                <img src="${mainImage}" id="main-img-${index}" class="product-main-img">
            </div>
            ${thumbnailsHTML} <h3>${product.name}</h3>
            <h4>${product.price}</h4>
            <p>${product.category}</p>
            <a href="https://wa.me/919999999999" class="buy-btn" target="_blank">WhatsApp Inquiry</a>
        </div>`;
    });
}

// 4. Yeh naya function hai jo thumbnail click karne par main image ko badlega
function changeProductImage(thumbElement, mainImgId) {
    const mainImg = document.getElementById(mainImgId);
    if (mainImg) {
        mainImg.src = thumbElement.src;
        
        // Purani active thumbnail se border hatakar naye wale par lagane ke liye
        const parent = thumbElement.parentElement;
        parent.querySelectorAll('.thumb-img').forEach(t => t.classList.remove('active-thumb'));
        thumbElement.classList.add('active-thumb');
    }
}
    showProducts(products);

    // Live Search Filter
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("keyup", () => {
            const value = searchInput.value.toLowerCase();
            const result = products.filter(item => item.name.toLowerCase().includes(value));
            showProducts(result);
        });
    }

    // Category Tabs Filter Button Click
    const filterButtons = document.querySelectorAll(".filter-buttons button");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const category = btn.dataset.filter;
            if (category === "All") {
                showProducts(products);
            } else {
                const result = products.filter(item => item.category === category);
                showProducts(result);
            }
        });
    });
}

// === 4. SERVICES DYNAMIC RENDER ===
const serviceContainer = document.getElementById("serviceContainer");
if (serviceContainer && typeof services !== 'undefined') {
    function loadServices() {
        serviceContainer.innerHTML = "";
        services.forEach(service => {
            serviceContainer.innerHTML += `
            <div class="service-card">
                <img src="${service.image}" alt="${service.title}">
                <div class="service-content">
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                    <div class="service-buttons">
                        <a href="tel:+919999999999" class="call-btn">Call Now</a>
                        <a href="https://wa.me/919999999999" class="whatsapp-btn" target="_blank">WhatsApp</a>
                    </div>
                </div>
            </div>`;
        });
    }
    loadServices();
}

// === 5. GALLERY & POPUP LIGHTBOX LOGIC ===
const galleryContainer = document.getElementById("galleryContainer");
if (galleryContainer && typeof galleryImages !== 'undefined') {
    galleryImages.forEach(image => {
        galleryContainer.innerHTML += `
        <div class="gallery-item">
            <img src="${image}" alt="Gallery Image">
        </div>`;
    });

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");

    document.querySelectorAll(".gallery-item img").forEach(img => {
        img.onclick = () => {
            lightbox.style.display = "flex";
            lightboxImage.src = img.src;
        }
    });

    const closeBtn = document.getElementById("closeLightbox");
    if (closeBtn) {
        closeBtn.onclick = () => {
            lightbox.style.display = "none";
        }
    }
}

// === 6. SCROLL TO TOP ACTIVE STATE ===
const scrollBtn = document.getElementById("scrollTopBtn");
if (scrollBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollBtn.style.display = "block";
        } else {
            scrollBtn.style.display = "none";
        }
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}