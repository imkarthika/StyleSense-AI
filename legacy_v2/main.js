document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const form = document.getElementById('style-form');
    const inputSection = document.getElementById('input-section');
    const resultSection = document.getElementById('result-section');
    const resultsGrid = document.getElementById('results-grid');
    const resultContext = document.getElementById('result-context');
    const resetBtn = document.getElementById('reset-btn');

    // Modal Elements
    const modal = document.getElementById('detail-modal');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalComponents = document.getElementById('modal-components');
    const modalVariations = document.getElementById('modal-variations');

    // Asset Database 
    const outfitDatabase = {
        male: {
            casual: 'male_casual_sunny.png',
            office: 'male_office_cold.png',
            party: 'male_party.png',
            default: 'male_casual_sunny.png'
        },
        female: {
            casual: 'female_casual_sunny.png',
            office: 'female_office_cold.png',
            party: 'female_casual_sunny.png',
            default: 'female_casual_sunny.png'
        }
    };

    // Rich Metadata for Components
    const outfitComponents = {
        male_casual: {
            top: { name: 'Premium Cotton Tee', brand: 'Essentials', material: '100% Organic Cotton' },
            bottom: { name: 'Slim-Fit Chinos', brand: 'Theory', material: 'Cotton Blend' },
            shoes: { name: 'Leather Sneakers', brand: 'Common Projects', material: 'Italian Leather' }
        },
        male_office: {
            top: { name: 'Structured Blazer', brand: 'Hugo Boss', material: 'Wool Blend' },
            bottom: { name: 'Tailored Trousers', brand: 'Hugo Boss', material: 'Wool' },
            shoes: { name: 'Oxford Brogues', brand: 'Allen Edmonds', material: 'Calfskin Leather' }
        },
        male_party: {
            top: { name: 'Silk Shirt', brand: 'Sandro', material: 'Pure Silk' },
            bottom: { name: 'Dark Denim', brand: 'Acne Studios', material: 'Raw Denim' },
            shoes: { name: 'Chelsea Boots', brand: 'Saint Laurent', material: 'Suede' }
        },
        female_casual: {
            top: { name: 'Cashmere Knit', brand: 'Vince', material: 'Cashmere' },
            bottom: { name: 'Pleated Midi Skirt', brand: 'Reiss', material: 'Polyester Blend' },
            shoes: { name: 'Ankle Boots', brand: 'Stuart Weitzman', material: 'Suede' }
        },
        female_office: {
            top: { name: 'Silk Blouse', brand: 'Theory', material: 'Silk Georgette' },
            bottom: { name: 'Pencil Skirt', brand: 'J.Crew', material: 'Wool Crepe' },
            shoes: { name: 'Classic Pumps', brand: 'Jimmy Choo', material: 'Patent Leather' }
        },
        female_party: {
            top: { name: 'Embellished Top', brand: 'Alice + Olivia', material: 'Sequins' },
            bottom: { name: 'Leather Trousers', brand: 'Frame', material: 'Lambskin' },
            shoes: { name: 'Strappy Heels', brand: 'Manolo Blahnik', material: 'Satin' }
        }
    };

    // Helper: Get Component Data
    const getComponents = (gender, occasion) => {
        const key = `${gender}_${occasion}`;
        return outfitComponents[key] || outfitComponents.male_casual;
    };

    // Helper: Smart Style Titles
    const getStyleTitle = (occasion, variant) => {
        const titles = {
            casual: ['The Weekend Relaxed', 'Smart Casual Edit'],
            office: ['The Executive', 'Modern Professional'],
            party: ['Evening Elegance', 'Night Out Statement']
        };
        const list = titles[occasion] || titles.casual;
        return list[variant] || list[0];
    };

    // Helper: Generate Recommendation Text
    const getRecommendationContent = (inputs, isAlternative) => {
        const { occasion, climate } = inputs;
        return !isAlternative
            ? `Perfect for a <strong>${climate}</strong> day.`
            : `A bold alternative for when you want to switch up your vibe.`;
    };

    // Logic: Get 2 Distinct Recommendations + Variations logic
    const getRecommendations = (gender, occasion) => {
        const category = outfitDatabase[gender] || outfitDatabase.male;

        let primaryImg = category[occasion] || category.default;

        // Secondary Match logic
        let secondaryLabel = occasion === 'office' ? 'party' : (occasion === 'party' ? 'casual' : 'office');
        let secondaryImg = category[secondaryLabel];

        return [
            { img: primaryImg, type: occasion, isAlt: false, gender: gender },
            { img: secondaryImg, type: secondaryLabel, isAlt: true, gender: gender }
        ];
    };

    // Logic: Get 2 Variations for Modal
    const getVariations = (currentType, gender) => {
        const allTypes = ['casual', 'office', 'party'];
        const swaps = allTypes.filter(t => t !== currentType); // The other 2 types

        return swaps.map(type => {
            const img = outfitDatabase[gender][type];
            return {
                type: type,
                img: img,
                name: getStyleTitle(type, 0)
            };
        });
    };

    // Open Modal
    const openModal = (rec) => {
        const components = getComponents(rec.gender, rec.type);
        const variations = getVariations(rec.type, rec.gender);

        modalImg.src = `images/outfits/${rec.img}`;
        modalTitle.textContent = getStyleTitle(rec.type, rec.isAlt ? 1 : 0);
        modalDesc.innerHTML = `Detailed breakdown for this ${rec.type} look.`;

        // Render Components
        modalComponents.innerHTML = Object.entries(components).map(([part, details]) => `
            <div class="product-row">
                <div class="product-info">
                    <h4>${details.name}</h4>
                    <div class="product-meta">${part.toUpperCase()} • ${details.brand}</div>
                </div>
                <div style="font-size: 0.85rem; color: var(--accent-cyan);">${details.material}</div>
            </div>
        `).join('');

        // Render Variations
        modalVariations.innerHTML = variations.map(v => `
            <div class="variation-card" onclick="alert('Variation Preview: ${v.name}')">
                <img src="images/outfits/${v.img}" alt="${v.name}">
                <p>${v.name}</p>
            </div>
        `).join('');

        modal.classList.add('active');
    };

    // Close Modal
    const closeModal = () => {
        modal.classList.remove('active');
    };

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Event Listener
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {
            gender: formData.get('gender'),
            occasion: formData.get('occasion'),
            bodyShape: formData.get('body-shape'),
            climate: formData.get('climate')
        };

        const recs = getRecommendations(data.gender, data.occasion);

        resultContext.innerHTML = `Analyzing for: <strong>${data.gender}</strong> • <strong>${data.occasion}</strong>`;
        resultsGrid.innerHTML = '';

        recs.forEach((rec, index) => {
            const card = document.createElement('div');
            card.className = 'recommendation-card';

            const title = index === 0 ? "Best Match" : "Stylist's Alternative";
            const styleName = getStyleTitle(rec.type, index);
            const desc = getRecommendationContent(data, rec.isAlt);

            card.innerHTML = `
                <div class="card-title">${title}</div>
                <div class="image-container">
                    <img src="images/outfits/${rec.img}" alt="${styleName}">
                </div>
                <div class="outfit-info">
                    <h3>${styleName}</h3>
                    <p>${desc}</p>
                </div>
            `;

            // Add click listener properly
            card.addEventListener('click', () => openModal(rec));

            resultsGrid.appendChild(card);
        });

        inputSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    resetBtn.addEventListener('click', () => {
        resultSection.classList.add('hidden');
        inputSection.classList.remove('hidden');
        form.reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
