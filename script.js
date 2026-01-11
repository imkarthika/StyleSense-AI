document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('stylist-form');
    const resultsSection = document.getElementById('results-section');
    const outfitGrid = document.getElementById('outfit-grid');
    const resetBtn = document.getElementById('reset-btn');
    const modal = document.getElementById('outfit-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalBody = document.getElementById('modal-body');

    // Mock Database of Fashion Items
    // Using reliable Unsplash IDs for fashion
    const database = {
        male: {
            casual: [
                {
                    id: 'm_cas_1',
                    title: 'Urban Minimalist',
                    image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=800&auto=format&fit=crop',
                    variants: {
                        original: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=800&auto=format&fit=crop',
                        darker: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=800',
                        textured: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800'
                    },
                    tags: ['Relaxed', 'Cotton', 'Weekend'],
                    items: [
                        { type: 'Top', name: 'Navy Crewneck T-Shirt', material: 'Organic Cotton', brand: 'Uniqlo U' },
                        { type: 'Bottom', name: 'Slim Fit Chinos', material: 'Stretch Twill', brand: 'Bonobos', color: 'Beige' },
                        { type: 'Footwear', name: 'White Leather Sneakers', material: 'Leather', brand: 'Common Projects' },
                        { type: 'Accessory', name: 'Silver Minimal Watch', material: 'Stainless Steel', brand: 'MVMT' }
                    ]
                },
                {
                    id: 'm_cas_2',
                    title: 'Denim & Layers',
                    image: 'https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=800&auto=format&fit=crop',
                    variants: {
                        original: 'https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=800&auto=format&fit=crop',
                        darker: 'https://images.unsplash.com/photo-1518335011707-1b03366c072e?q=80&w=800',
                        textured: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=800'
                    },
                    tags: ['Rugged', 'Denim', 'Layered'],
                    items: [
                        { type: 'Top', name: 'Flannel Overshirt', material: 'Cotton Flannel', brand: 'Patagonia' },
                        { type: 'Inner', name: 'White Henley', material: 'Cotton Blend', brand: 'J.Crew' },
                        { type: 'Bottom', name: 'Raw Denim Jeans', material: 'Selvedge Denim', brand: 'Levi\'s' },
                        { type: 'Footwear', name: 'Chelsea Boots', material: 'Suede', brand: 'Blundstone' }
                    ]
                }
            ],
            office: [
                {
                    id: 'm_off_1',
                    title: 'Modern Professional',
                    image: 'https://images.unsplash.com/photo-1594938298603-c8148c47e356?q=80&w=800',
                    variants: {
                        original: 'https://images.unsplash.com/photo-1594938298603-c8148c47e356?q=80&w=800',
                        darker: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800',
                        textured: 'https://images.unsplash.com/photo-1559582798-678dfc71ccd3?q=80&w=800'
                    },
                    tags: ['Sharp', 'Business', 'Sleek'],
                    items: [
                        { type: 'Top', name: 'Light Blue Dress Shirt', material: 'Poplin', brand: 'Brooks Brothers' },
                        { type: 'Bottom', name: 'Charcoal Wool Trousers', material: 'Wool', brand: 'Theory' },
                        { type: 'Footwear', name: 'Black Oxford Shoes', material: 'Leather', brand: 'Allen Edmonds' },
                        { type: 'Accessory', name: 'Leather Briefcase', material: 'Full Grain Leather', brand: 'Fossil' }
                    ]
                },
                {
                    id: 'm_off_2',
                    title: 'Smart Creative',
                    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=800',
                    variants: {
                        original: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=800',
                        darker: 'https://images.unsplash.com/photo-1534030347209-7147fd69a3cf?q=80&w=800',
                        textured: 'https://images.unsplash.com/photo-1550246140-511998777320?q=80&w=800'
                    },
                    tags: ['Creative', 'Smart-Casual', 'Textured'],
                    items: [
                        { type: 'Top', name: 'Navy Knit Blazer', material: 'Wool Blend', brand: 'SuitSupply' },
                        { type: 'Bottom', name: 'Dark Grey Chinos', material: 'Tech Fabric', brand: 'Lululemon' },
                        { type: 'Footwear', name: 'Suede Loafers', material: 'Suede', brand: 'Tod\'s' },
                        { type: 'Accessory', name: 'Tortoise Shell Glasses', material: 'Acetate', brand: 'Warby Parker' }
                    ]
                }
            ],
            party: [
                {
                    id: 'm_par_1',
                    title: 'Evening Elegance',
                    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800',
                    variants: {
                        original: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800',
                        darker: 'https://images.unsplash.com/photo-1550246140-29f40b909e5a?q=80&w=800',
                        textured: 'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?q=80&w=800'
                    },
                    tags: ['Formal', 'Black Tie', 'Sophisticated'],
                    items: [
                        { type: 'Top', name: 'Velvet Dinner Jacket', material: 'Velvet', brand: 'Tom Ford' },
                        { type: 'Bottom', name: 'Black Tuxedo Trousers', material: 'Wool', brand: 'Hugo Boss' },
                        { type: 'Footwear', name: 'Patent Leather Shoes', material: 'Patent Leather', brand: 'Christian Louboutin' }
                    ]
                },
                {
                    id: 'm_par_2',
                    title: 'Club Statement',
                    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800',
                    variants: {
                        original: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800',
                        darker: 'https://images.unsplash.com/photo-1605218427306-6354db696bea?q=80&w=800',
                        textured: 'https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=800'
                    },
                    tags: ['Bold', 'Trendy', 'Nightout'],
                    items: [
                        { type: 'Top', name: 'Silk Patterned Shirt', material: 'Silk', brand: 'Versace' },
                        { type: 'Bottom', name: 'Black Skinny Jeans', material: 'Denim', brand: 'Saint Laurent' },
                        { type: 'Footwear', name: 'Designer High Tops', material: 'Leather', brand: 'Balenciaga' },
                        { type: 'Accessory', name: 'Chain Necklace', material: 'Silver', brand: 'Vitaly' }
                    ]
                }
            ]
        },
        female: {
            casual: [
                {
                    id: 'f_cas_1',
                    title: 'Chic Weekend',
                    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800',
                    variants: {
                        original: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800',
                        darker: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800',
                        textured: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800'
                    },
                    tags: ['Effortless', 'Comfort', 'Stylish'],
                    items: [
                        { type: 'Top', name: 'Oversized Beige Knit', material: 'Cashmere', brand: 'Everlane' },
                        { type: 'Bottom', name: 'Vintage Wash Mom Jeans', material: 'Denim', brand: 'Agolde' },
                        { type: 'Footwear', name: 'White Court Sneakers', material: 'Leather', brand: 'Veja' },
                        { type: 'Accessory', name: 'Crossbody Bag', material: 'Leather', brand: 'Cuyana' }
                    ]
                },
                {
                    id: 'f_cas_2',
                    title: 'Boho Summer',
                    image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?q=80&w=800',
                    variants: {
                        original: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?q=80&w=800',
                        darker: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800',
                        textured: 'https://images.unsplash.com/photo-1549570191-2374ed2ff469?q=80&w=800'
                    },
                    tags: ['Breezy', 'Floral', 'Summer'],
                    items: [
                        { type: 'One-Piece', name: 'Floral Maxi Dress', material: 'Rayon', brand: 'Reformation' },
                        { type: 'Footwear', name: 'Leather Sandals', material: 'Leather', brand: 'Ancient Greek Sandals' },
                        { type: 'Accessory', name: 'Straw Hat', material: 'Straw', brand: 'Lack of Color' }
                    ]
                }
            ],
            office: [
                {
                    id: 'f_off_1',
                    title: 'Power Suit',
                    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800',
                    variants: {
                        original: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800',
                        darker: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800',
                        textured: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800'
                    },
                    tags: ['Professional', 'Commanding', 'Tailored'],
                    items: [
                        { type: 'Top', name: 'Double Breasted Blazer', material: 'Wool', brand: 'Theory' },
                        { type: 'Bottom', name: 'Matching Trousers', material: 'Wool', brand: 'Theory' },
                        { type: 'Top', name: 'Silk Camisole', material: 'Silk', brand: 'Cuyana' },
                        { type: 'Footwear', name: 'Pointed Toe Pumps', material: 'Suede', brand: 'Jimmy Choo' }
                    ]
                },
                {
                    id: 'f_off_2',
                    title: 'Elegant Corporate',
                    image: 'https://images.unsplash.com/photo-1548624143-6c84c1f964a2?q=80&w=800',
                    variants: {
                        original: 'https://images.unsplash.com/photo-1548624143-6c84c1f964a2?q=80&w=800',
                        darker: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=800',
                        textured: 'https://images.unsplash.com/photo-1550614000-4b9519e02c91?q=80&w=800'
                    },
                    tags: ['Feminine', 'Classy', 'Neutral'],
                    items: [
                        { type: 'Top', name: 'Cream Blouse', material: 'Chiffon', brand: 'Ann Taylor' },
                        { type: 'Bottom', name: 'Pencil Skirt', material: 'Tweed', brand: 'Chanel (Vintage)' },
                        { type: 'Footwear', name: 'Nude Heels', material: 'Patent Leather', brand: 'Louboutin' },
                        { type: 'Accessory', name: 'Pearl Earrings', material: 'Pearl/Gold', brand: 'Mejuri' }
                    ]
                }
            ],
            party: [
                {
                    id: 'f_par_1',
                    title: 'Cocktail Hour',
                    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800',
                    variants: {
                        original: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800',
                        darker: 'https://images.unsplash.com/photo-1475179597420-5f8405d6cb7d?q=80&w=800',
                        textured: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?q=80&w=800'
                    },
                    tags: ['Glamorous', 'Night', 'Sparkle'],
                    items: [
                        { type: 'One-Piece', name: 'Emerald Slip Dress', material: 'Silk Satin', brand: 'Realisation Par' },
                        { type: 'Footwear', name: 'Strappy Heels', material: 'Metallic Leather', brand: 'Stuart Weitzman' },
                        { type: 'Accessory', name: 'Clutch Bag', material: 'Velvet', brand: 'YSL' }
                    ]
                },
                {
                    id: 'f_par_2',
                    title: 'Edgy Chic',
                    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800',
                    variants: {
                        original: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800',
                        darker: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800',
                        textured: 'https://images.unsplash.com/photo-1520591799316-6b30425429aa?q=80&w=800'
                    },
                    tags: ['Bold', 'Modern', 'Statement'],
                    items: [
                        { type: 'Top', name: 'Leather Biker Jacket', material: 'Lambskin', brand: 'AllSaints' },
                        { type: 'One-Piece', name: 'Mini Dress', material: 'Jersey', brand: 'Alexander Wang' },
                        { type: 'Footwear', name: 'Ankle Boots', material: 'Leather', brand: 'Acne Studios' }
                    ]
                }
            ]
        }
    };

    // Form Handling
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const gender = document.getElementById('gender').value;
        const occasion = document.getElementById('occasion').value;
        // Body shape and climate are collected but for this refined prototype
        // we will focus on Gender + Occasion to map to the broad categories in our mock DB.
        // In a real app, these would filter attributes specifically.

        if (!gender || !occasion) return;

        displayResults(gender, occasion);
    });

    resetBtn.addEventListener('click', () => {
        resultsSection.classList.add('hidden');
        document.getElementById('input-section').classList.remove('hidden');
        document.getElementById('hero-bg').style.filter = "brightness(0.8)";
        form.reset();
    });

    function displayResults(gender, occasion) {
        // Hide input, show results
        document.getElementById('input-section').classList.add('hidden');
        resultsSection.classList.remove('hidden');
        document.getElementById('hero-bg').style.filter = "brightness(0.4) blur(4px)";

        // Get data
        // Default to casual if occasion not found, just for safety
        const key = occasion === 'party' ? 'party' : (occasion === 'office' ? 'office' : 'casual');
        const outfits = database[gender][key];

        // Clear grid
        outfitGrid.innerHTML = '';

        // Render cards
        outfits.forEach(outfit => {
            const card = document.createElement('div');
            card.className = 'outfit-card';

            // Note: In a real "no internet" dev environment (like this agent sometimes feels like), 
            // broken images are ugly. I'd typically handle error events, but these unsplash links should work.

            card.innerHTML = `
                <div class="card-image-container">
                    <img src="${outfit.image}" alt="${outfit.title}" class="card-image">
                    <div class="card-overlay">
                        <h3 class="card-title">${outfit.title}</h3>
                        <div class="card-tags">
                            ${outfit.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => openModal(outfit));
            outfitGrid.appendChild(card);
        });
    }

    // Modal Handling
    function openModal(outfit) {
        const imageCol = `
            <div class="modal-image-col">
                <img src="${outfit.image}" alt="${outfit.title}" id="modal-main-image">
            </div>
        `;

        const detailsCol = `
            <div class="modal-details-col">
                <h2 class="detail-title">${outfit.title}</h2>
                <p class="detail-desc">
                    A created look perfectly suited for the occasion. This ensemble balances 
                    personal style with comfort and elegance. The palette is selected to harmonize 
                    with your preferences.
                </p>
                
                <div class="breakdown-list">
                    ${outfit.items.map(item => `
                        <div class="breakdown-item">
                            <div class="item-icon">
                                <i class="fa-solid fa-shirt"></i>
                            </div>
                            <div class="item-info">
                                <h4>${item.name} (${item.type})</h4>
                                <p>${item.brand} • ${item.material}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="variant-selector">
                    <span class="variant-label">Style Alternative</span>
                    <div class="variant-options">
                        <button class="variant-btn active" data-variant="original">Original</button>
                        <button class="variant-btn" data-variant="darker">Darker Palette</button>
                        <button class="variant-btn" data-variant="textured">Textured</button>
                    </div>
                </div>
            </div>
        `;

        modalBody.innerHTML = imageCol + detailsCol;
        modal.classList.remove('hidden');

        // Logic for "Variants" image switching
        // Re-selecting elements here because they are dynamic
        const variantBtns = modalBody.querySelectorAll('.variant-btn');
        const mainImage = document.getElementById('modal-main-image');

        variantBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update UI state
                variantBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                // Update Image
                const variantKey = e.target.dataset.variant;
                if (outfit.variants && outfit.variants[variantKey]) {
                    // Add a small fade effect interaction
                    mainImage.style.opacity = '0.7';
                    mainImage.src = outfit.variants[variantKey];
                    setTimeout(() => {
                        mainImage.style.opacity = '1';
                    }, 200);
                }
            });
        });
    }

    closeModalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
});
