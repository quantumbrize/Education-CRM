document.addEventListener('DOMContentLoaded', function () {
    const popularPaperBtn = document.getElementById('popularPaperBtn');
    const studyMaterialBtn = document.getElementById('studyMaterialBtn');
    const popularPaperContent = document.getElementById('popularPaperContent');
    const studyMaterialContent = document.getElementById('studyMaterialContent');
    const studyMaterialContainer = document.getElementById('study-material');
    const bannerContainer = document.getElementById('banner-container');

    let allStudyMaterials = [];
    let allPopularPapers = [];

    async function fetchData() {
        try {
            // Fetch study materials
            const materialResponse = await fetch('/material.json');
            const materialData = await materialResponse.json();
            allStudyMaterials = materialData;
            
            // Fetch popular papers
            const cardsResponse = await fetch('/cards.json');
            const cardsData = await cardsResponse.json();
            allPopularPapers = cardsData; // Include all data

            console.log('Study Materials:', allStudyMaterials);
            console.log('Popular Papers:', allPopularPapers);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function renderStudyMaterials() {
        studyMaterialContainer.innerHTML = ''; // Clear existing content
        allStudyMaterials.forEach(material => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${material.imagePath || '/assets/images/pdfimage.png'}" alt="${material.title}">
                <h5>${material.title}</h5>
            `;
            studyMaterialContainer.appendChild(card);
        });
    }

    function renderPopularPapers() {
        bannerContainer.innerHTML = ''; // Clear existing content
        allPopularPapers.forEach(paper => {
            const banner = document.createElement('div');
            banner.className = 'banner';
            banner.innerHTML = `
                   <img src="/assets/images/pdfimage.png" alt="${paper.title}">
            <div class="banner-content">
                <h3>${paper.title}</h3>
                <p>${paper.tag}</p>
                <div class="rating">
                    <img src="/assets/images/star.svg" alt="Star" class="star-icon">
                    <span class="rating-value">${paper.rating || 'N/A'}</span>
                </div>
            </div>
            `;
            bannerContainer.appendChild(banner);
        });
    }

    popularPaperBtn.addEventListener('click', () => {
        popularPaperBtn.classList.add('active');
        studyMaterialBtn.classList.remove('active');
        popularPaperContent.classList.add('active');
        studyMaterialContent.classList.remove('active');
    });

    studyMaterialBtn.addEventListener('click', () => {
        studyMaterialBtn.classList.add('active');
        popularPaperBtn.classList.remove('active');
        studyMaterialContent.classList.add('active');
        popularPaperContent.classList.remove('active');
        renderStudyMaterials(); // Render study materials on click
    });

    fetchData().then(() => {
        renderPopularPapers(); // Render popular papers after data is fetched
    });
});

