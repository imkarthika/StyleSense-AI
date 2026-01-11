document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('style-form');
    const resultSection = document.getElementById('result-section');
    const outfitImage = document.getElementById('outfit-image');
    const outfitDescription = document.getElementById('outfit-description');
    const resetBtn = document.getElementById('reset-btn');
    const inputSection = document.querySelector('.input-section');

    // Mapping logic
    // We only have a subset of images generated to respect quota/time.
    // We will map as best as possible.
    
    const imageMap = {
        male: {
            casual: {
                sunny: 'male_casual_sunny.png',
                default: 'male_casual_sunny.png' 
            },
            office: {
                cold: 'male_office_cold.png',
                default: 'male_office_cold.png'
            },
            party: {
                default: 'male_party.png'
            },
            default: 'male_casual_sunny.png'
        },
        female: {
            casual: {
                sunny: 'female_casual_sunny.png',
                default: 'female_casual_sunny.png'
            },
            office: {
                cold: 'female_office_cold.png',
                default: 'female_office_cold.png'
            },
            party: {
                // Missing specific party image due to quota, map to casual or office?
                // Or reuse casual which is a nice dress
                default: 'female_casual_sunny.png' 
            },
            default: 'female_casual_sunny.png'
        }
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get inputs
        const formData = new FormData(form);
        const gender = formData.get('gender');
        const occasion = formData.get('occasion');
        const bodyShape = formData.get('body-shape');
        const climate = formData.get('climate');

        // Logic to select image
        let imageFilename = 'male_casual_sunny.png'; // Fallback
        let description = '';

        if (gender && occasion) {
            const genderData = imageMap[gender] || imageMap.male;
            const occasionData = genderData[occasion] || genderData.default;
            
            // Check specifically for climate match if available
            if (occasionData[climate]) {
                imageFilename = occasionData[climate];
            } else {
                imageFilename = occasionData.default || Object.values(occasionData)[0];
            }
        }

        // Construct description
        description = `Based on your request for a <strong>${gender}</strong> outfit for a <strong>${occasion}</strong> occasion in <strong>${climate}</strong> weather. 
        <br><br>
        This look is curated to flatter a <strong>${bodyShape}</strong> body shape, balancing proportions while keeping you comfortable and stylish.`;

        // Update DOM
        outfitImage.src = `images/outfits/${imageFilename}`;
        outfitDescription.innerHTML = description;

        // Transition
        inputSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
    });

    resetBtn.addEventListener('click', () => {
        resultSection.classList.add('hidden');
        inputSection.classList.remove('hidden');
        form.reset();
    });
});
