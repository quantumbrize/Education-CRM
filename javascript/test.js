document.addEventListener('DOMContentLoaded', () => {
    const testInfoContainer = document.getElementById('test-info');
    const searchInput = document.getElementById('search-input');
    const searchHistoryContainer = document.getElementById('search-history');
    let allTests = [];
    let searchHistory = [];

    async function fetchData() {
        try {
            const testsResponse = await fetch('/test.json');
            allTests = await testsResponse.json();
            renderTests(allTests);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function renderTests(tests) {
        testInfoContainer.innerHTML = ''; // Clear existing content

        tests.forEach(test => {
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
            section.addEventListener('click', () => {
                window.location.href = `/tests/${test.id}.html`; // Redirect to respective test page
            });
            testInfoContainer.appendChild(section);
        });
    }

    function updateSearchHistory(term) {
        if (term && !searchHistory.includes(term)) {
            searchHistory.push(term);
            const historyItem = document.createElement('p');
            historyItem.innerHTML = `${term} <span class="delete-icon">&times;</span>`;
            historyItem.addEventListener('click', (e) => {
                if (e.target.classList.contains('delete-icon')) {
                    const index = searchHistory.indexOf(term);
                    if (index > -1) {
                        searchHistory.splice(index, 1);
                        searchHistoryContainer.removeChild(historyItem);
                    }
                } else {
                    searchInput.value = term;
                    filterTests(term);
                    searchHistoryContainer.classList.remove('show');
                }
            });
            searchHistoryContainer.appendChild(historyItem);
        }
    }

    function filterTests(term) {
        const filteredTests = allTests.filter(test => 
            test.subject.toLowerCase().includes(term.toLowerCase())
        );
        renderTests(filteredTests);
    }

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            filterTests(searchTerm);
            searchHistoryContainer.classList.add('show');
        } else {
            renderTests(allTests);
            searchHistoryContainer.classList.remove('show');
        }
    });

    searchInput.addEventListener('blur', () => {
        setTimeout(() => {
            searchHistoryContainer.classList.remove('show');
        }, 200); // Delay to allow click events to process
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                filterTests(searchTerm);
                updateSearchHistory(searchTerm);
                searchHistoryContainer.classList.remove('show');
            }
        }
    });

    fetchData();
});
