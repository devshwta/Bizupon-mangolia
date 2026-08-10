    (function () {
        const cards = Array.from(document.querySelectorAll('.iv-card-col'));
        const grid = document.getElementById('ivGrid');
        const countEl = document.getElementById('ivCount');
        const noResults = document.getElementById('ivNoResults');

        const makeEl = document.getElementById('ivMake');
        const locationEl = document.getElementById('ivLocation');
        const yearEl = document.getElementById('ivYear');
        const yearValueEl = document.getElementById('ivYearValue');
        const mileageEl = document.getElementById('ivMileage');
        const mileageValueEl = document.getElementById('ivMileageValue');
        const priceEl = document.getElementById('ivPrice');
        const priceValueEl = document.getElementById('ivPriceValue');
        const sortEl = document.getElementById('ivSort');

        let activeFuel = 'all';
        let activeDrive = 'all';

        // pill single-select behavior
        function wirePillGroup(groupEl, onChange) {
            groupEl.addEventListener('click', (e) => {
                const btn = e.target.closest('.iv-pill');
                if (!btn) return;
                groupEl.querySelectorAll('.iv-pill').forEach(p => p.classList.remove('iv-pill-active'));
                btn.classList.add('iv-pill-active');
                onChange(btn.dataset.value);
                applyFilters();
            });
        }

        wirePillGroup(document.getElementById('ivFuelGroup'), (v) => activeFuel = v);
        wirePillGroup(document.getElementById('ivDriveGroup'), (v) => activeDrive = v);

        function applyFilters() {
            const make = makeEl.value;
            const location = locationEl.value;
            const minYear = parseInt(yearEl.value, 10);
            const maxMileage = parseInt(mileageEl.value, 10);
            const maxPrice = parseInt(priceEl.value, 10);

            let visibleCount = 0;

            cards.forEach(card => {
                const d = card.dataset;
                const matches =
                    (make === 'all' || d.make === make) &&
                    (activeFuel === 'all' || d.fuel === activeFuel) &&
                    (activeDrive === 'all' || d.drive === activeDrive) &&
                    (location === 'all' || d.location === location) &&
                    parseInt(d.year, 10) >= minYear &&
                    parseInt(d.mileage, 10) <= maxMileage &&
                    parseInt(d.price, 10) <= maxPrice;

                card.classList.toggle('d-none', !matches);
                if (matches) visibleCount++;
            });

            countEl.textContent = `${visibleCount} vehicle${visibleCount !== 1 ? 's' : ''} found`;
            noResults.classList.toggle('d-none', visibleCount !== 0);
            grid.classList.toggle('d-none', visibleCount === 0);
        }

        function applySort() {
            const sortedCards = cards.slice().sort((a, b) => {
                const val = sortEl.value;
                if (val === 'price-low') return a.dataset.price - b.dataset.price;
                if (val === 'price-high') return b.dataset.price - a.dataset.price;
                if (val === 'mileage-low') return a.dataset.mileage - b.dataset.mileage;
                return b.dataset.year - a.dataset.year; // newest first
            });
            sortedCards.forEach(card => grid.appendChild(card));
        }

        makeEl.addEventListener('change', applyFilters);
        locationEl.addEventListener('change', applyFilters);

        yearEl.addEventListener('input', () => {
            yearValueEl.textContent = yearEl.value;
            applyFilters();
        });
        mileageEl.addEventListener('input', () => {
            mileageValueEl.textContent = parseInt(mileageEl.value, 10).toLocaleString('en-US');
            applyFilters();
        });
        priceEl.addEventListener('input', () => {
            priceValueEl.textContent = '$' + parseInt(priceEl.value, 10).toLocaleString('en-US');
            applyFilters();
        });

        sortEl.addEventListener('change', applySort);

        document.getElementById('ivReset').addEventListener('click', () => {
            makeEl.value = 'all';
            locationEl.value = 'all';
            yearEl.value = 2010; yearValueEl.textContent = '2010';
            mileageEl.value = 200000; mileageValueEl.textContent = '200,000';
            priceEl.value = 250000; priceValueEl.textContent = '$250,000';
            activeFuel = 'all'; activeDrive = 'all';
            document.querySelectorAll('#ivFuelGroup .iv-pill, #ivDriveGroup .iv-pill').forEach(p => p.classList.remove('iv-pill-active'));
            document.querySelector('#ivFuelGroup .iv-pill[data-value="all"]').classList.add('iv-pill-active');
            document.querySelector('#ivDriveGroup .iv-pill[data-value="all"]').classList.add('iv-pill-active');
            applyFilters();
        });

        // grid / list view toggle
        const gridBtn = document.getElementById('ivGridBtn');
        const listBtn = document.getElementById('ivListBtn');
        gridBtn.addEventListener('click', () => {
            grid.classList.remove('iv-grid-list');
            gridBtn.classList.add('iv-view-active');
            listBtn.classList.remove('iv-view-active');
        });
        listBtn.addEventListener('click', () => {
            grid.classList.add('iv-grid-list');
            listBtn.classList.add('iv-view-active');
            gridBtn.classList.remove('iv-view-active');
        });

        applyFilters();
    })();