    (function () {
        const input = document.getElementById('tkInput');
        const trackBtn = document.getElementById('tkTrackBtn');
        const results = document.getElementById('tkResults');
        const demoNote = document.getElementById('tkDemoNote');

        function trackShipment() {
            // Demo behavior: any query reveals the sample tracking
            // timeline. Wire this up to a real API call as needed.
            const originalHTML = trackBtn.innerHTML;
            trackBtn.disabled = true;
            trackBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

            setTimeout(() => {
                trackBtn.disabled = false;
                trackBtn.innerHTML = originalHTML;
                results.classList.remove('d-none');
                results.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 600);
        }

        trackBtn.addEventListener('click', trackShipment);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                trackShipment();
            }
        });
    })();