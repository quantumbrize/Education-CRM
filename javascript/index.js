document.addEventListener('DOMContentLoaded', () => {
    const studyMaterialContainer = document.getElementById('study-material');
    const testInfoContainer = document.getElementById('test-info');
    const seeAllMaterialButton = document.getElementById('see-all-material');
    const seeAllTestsButton = document.getElementById('see-all-tests');

    let allStudyMaterials = [];
    let allTests = [];

    async function fetchData() {
        try {
            const materialsResponse = await fetch('/material.json');
            const testsResponse = await fetch('/test.json');

            allStudyMaterials = await materialsResponse.json();
            allTests = await testsResponse.json();

            renderStudyMaterials();
            renderTests();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function renderStudyMaterials() {
        studyMaterialContainer.innerHTML = ''; // Clear existing content
        const materialsToShow = allStudyMaterials.slice(0, 6); // Show only first 6 materials

        materialsToShow.forEach(material => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <a href="${material.link}">
                    <img src="${material.image}" alt="${material.title}">
                </a>
                <h5>${material.title}</h5>
            `;
            studyMaterialContainer.appendChild(card);
        });
    }

    function renderTests() {
        testInfoContainer.innerHTML = ''; // Clear existing content
        const testsToShow = allTests.slice(0, 2); // Show only first 2 tests

        testsToShow.forEach(test => {
            const section = document.createElement('section');
            section.className = 'test-info';
            section.innerHTML = `
                <h3>${test.subject}</h3>
                <div class="info-details">
                    <p>Questions: ${test.questions}</p>
                    <p>Time: ${test.time}</p>
                    <p>Date: ${test.date}</p>
                </div>
            `;
            testInfoContainer.appendChild(section);
        });
    }

    seeAllMaterialButton.addEventListener('click', () => {
        window.location.href = '/study.html'; // Example redirect
    });

    seeAllTestsButton.addEventListener('click', () => {
        window.location.href = '/tests.html'; // Example redirect
    });

    fetchData();

    // Carousel functionality
    const carouselImages = document.querySelector('.carousel-images');
    const carouselIndicators = document.querySelectorAll('.carousel-indicators span');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentIndex = 0;
    const totalImages = carouselImages.children.length;

    function updateCarousel() {
        carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`;
        carouselIndicators.forEach(indicator => indicator.classList.remove('active'));
        carouselIndicators[currentIndex].classList.add('active');
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCarousel();
    }

    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);

    carouselIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    setInterval(showNextImage, 3000); // Change image every 3 seconds
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('cards.json')
        .then(response => response.json())
        .then(data => {
            const bannerContainer = document.getElementById('banner-container');
            data.forEach(card => {
                const bannerElement = document.createElement('div');
                bannerElement.className = 'banner';
                bannerElement.innerHTML = `
                    <img src="/assets/images/pdfimage.png" alt="Banner Image">
                    <div class="banner-content">
                        <h3>${card.title}</h3>
                        <p>${card.tag}</p>
                        <p>Rating: ${card.rating}</p>
                    </div>
                `;
                bannerElement.addEventListener('click', () => {
                    window.location.href = 'new-location.html';
                });
                bannerContainer.appendChild(bannerElement);
            });
        })
        .catch(error => console.error('Error fetching banners:', error));
});
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');
    });
});
document.addEventListener('DOMContentLoaded', function() {
    fetch('/teachers.json')
        .then(response => response.json())
        .then(data => {
            const teacherContainer = document.getElementById('teacher-cards');
            data.forEach(teacher => {
                const teacherCard = document.createElement('div');
                teacherCard.className = 'teachers-card';
                teacherCard.innerHTML = `
                    <img src="${teacher.image}" alt="Teacher Image">
                `;
                const teacherName = document.createElement('div');
                teacherName.className = 'teachers-name';
                teacherName.textContent = teacher.name;

                const cardContainer = document.createElement('div');
                cardContainer.style.display = 'inline-block';
                cardContainer.appendChild(teacherCard);
                cardContainer.appendChild(teacherName);

                teacherContainer.appendChild(cardContainer);
            });
        })
        .catch(error => console.error('Error fetching teacher data:', error));
});
