document.addEventListener('DOMContentLoaded', () => {
    const categoryGrid = document.getElementById('categoryGrid');
    const productListSection = document.getElementById('productList');
    const backToCategoriesBtn = document.getElementById('backToCategories');
    const currentCategoryTitle = productListSection.querySelector('.current-category-title');
    const productGrid = productListSection.querySelector('.product-grid');

    // Dummy Product Data (Replace with real data later)
    const productData = {
        vegetables: [
            { name: 'Fresh Tomatoes', price: '₹ 45/kg', image: 'images/product-placeholder.jpg' },
            { name: 'Onions', price: '₹ 30/kg', image: 'images/product-placeholder.jpg' },
            { name: 'Potatoes', price: '₹ 25/kg', image: 'images/product-placeholder.jpg' },
            { name: 'Spinach', price: '₹ 20/bunch', image: 'images/product-placeholder.jpg' },
            { name: 'Capsicum', price: '₹ 60/kg', image: 'images/product-placeholder.jpg' },
            { name: 'Cucumbers', price: '₹ 35/kg', image: 'images/product-placeholder.jpg' }
        ],
        fruits: [
            { name: 'Apples', price: '₹ 150/kg', image: 'images/product-placeholder.jpg' },
            { name: 'Bananas', price: '₹ 40/dozen', image: 'images/product-placeholder.jpg' },
            { name: 'Oranges', price: '₹ 80/kg', image: 'images/product-placeholder.jpg' },
            { name: 'Grapes', price: '₹ 120/kg', image: 'images/product-placeholder.jpg' },
            { name: 'Mangoes (Seasonal)', price: '₹ 90/kg', image: 'images/product-placeholder.jpg' }
        ],
        dairy: [
            { name: 'Milk (1L)', price: '₹ 60', image: 'images/product-placeholder.jpg' },
            { name: 'Fresh Curd (500g)', price: '₹ 45', image: 'images/product-placeholder.jpg' },
            { name: 'Paneer (200g)', price: '₹ 90', image: 'images/product-placeholder.jpg' },
            { name: 'Eggs (6 Pcs)', price: '₹ 40', image: 'images/product-placeholder.jpg' }
        ],
        bakery: [
            { name: 'Whole Wheat Bread', price: '₹ 50', image: 'images/product-placeholder.jpg' },
            { name: 'Multigrain Loaf', price: '₹ 70', image: 'images/product-placeholder.jpg' },
            { name: 'Cookies (Assorted)', price: '₹ 80', image: 'images/product-placeholder.jpg' }
        ],
        staples: [
            { name: 'Basmati Rice (1kg)', price: '₹ 110', image: 'images/product-placeholder.jpg' },
            { name: 'Wheat Flour (5kg)', price: '₹ 180', image: 'images/product-placeholder.jpg' },
            { name: 'Toor Dal (1kg)', price: '₹ 100', image: 'images/product-placeholder.jpg' }
        ],
        spices: [
            { name: 'Turmeric Powder (100g)', price: '₹ 30', image: 'images/product-placeholder.jpg' },
            { name: 'Red Chili Powder (100g)', price: '₹ 40', image: 'images/product-placeholder.jpg' },
            { name: 'Cumin Seeds (100g)', price: '₹ 35', image: 'images/product-placeholder.jpg' }
        ],
        snacks: [
            { name: 'Potato Chips (Large)', price: '₹ 30', image: 'images/product-placeholder.jpg' },
            { name: 'Biscuits (Pack)', price: '₹ 25', image: 'images/product-placeholder.jpg' },
            { name: 'Soft Drink (600ml)', price: '₹ 40', image: 'images/product-placeholder.jpg' }
        ],
        organic: [
            { name: 'Organic Apples', price: '₹ 200/kg', image: 'images/product-placeholder.jpg' },
            { name: 'Local Farm Eggs (6 Pcs)', price: '₹ 60', image: 'images/product-placeholder.jpg' }
        ],
        frozen: [
            { name: 'Frozen Peas (500g)', price: '₹ 80', image: 'images/product-placeholder.jpg' },
            { name: 'Frozen Corn (500g)', price: '₹ 70', image: 'images/product-placeholder.jpg' }
        ],
        'personal-care': [
            { name: 'Soap (Pack of 3)', price: '₹ 90', image: 'images/product-placeholder.jpg' },
            { name: 'Shampoo (200ml)', price: '₹ 150', image: 'images/product-placeholder.jpg' }
        ],
        household: [
            { name: 'Dishwashing Liquid (500ml)', price: '₹ 70', image: 'images/product-placeholder.jpg' },
            { name: 'Laundry Detergent (1kg)', price: '₹ 180', image: 'images/product-placeholder.jpg' }
        ],
        offers: [ // This category can show special offer products
            { name: 'Special Offer Milk (1L)', price: '₹ 55 (was ₹ 60)', image: 'images/product-placeholder.jpg' },
            { name: 'Combo: Spices & Oil', price: '₹ 250', image: 'images/product-placeholder.jpg' }
        ]
    };

    function loadProductsForCategory(categoryKey, categoryName) {
        productGrid.innerHTML = ''; // Clear previous products
        currentCategoryTitle.textContent = categoryName;

        const products = productData[categoryKey] || [];
        if (products.length === 0) {
            productGrid.innerHTML = '<p>No products found in this category yet. Please check back soon!</p>';
            return;
        }

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>${product.price}</p>
            `;
            productGrid.appendChild(productCard);
        });

        categoryGrid.classList.add('hidden');
        productListSection.classList.remove('hidden');
        // Scroll to the product list section
        productListSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Event listener for category clicks
    categoryGrid.addEventListener('click', (event) => {
        const targetCard = event.target.closest('.category-card');
        if (targetCard) {
            event.preventDefault(); // Prevent default link behavior
            const categoryKey = targetCard.dataset.category;
            const categoryName = targetCard.querySelector('h3').textContent;
            loadProductsForCategory(categoryKey, categoryName);
        }
    });

    // Event listener for "Back to Categories" button
    backToCategoriesBtn.addEventListener('click', () => {
        productListSection.classList.add('hidden');
        categoryGrid.classList.remove('hidden');
        // Scroll back to the categories section
        categoryGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
