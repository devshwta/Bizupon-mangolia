const toggleBtns = document.querySelectorAll('.pr-toggle-btn');
    toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        toggleBtns.forEach(b => b.classList.remove('pr-toggle-active'));
        btn.classList.add('pr-toggle-active');
    });
});


    (function () {
        const combos = document.querySelectorAll('[data-combo]');
        combos.forEach(combo => {
            const input = combo.querySelector('[data-combo-input]');
            const list = combo.querySelector('[data-combo-list]');
            const items = Array.from(list.querySelectorAll('li'));
            const defaultValue = input.value;

            function openList() {
                list.classList.add('dn-combo-show');
                items.forEach(li => li.style.display = '');
            }

            function closeList() {
                list.classList.remove('dn-combo-show');
                
                const match = items.find(li => li.dataset.value.toLowerCase() === input.value.toLowerCase());
                if (!match) {
                    input.value = defaultValue;
                }
                items.forEach(li => li.style.display = '');
            }

            function filterItems(query) {
                const q = query.trim().toLowerCase();
                items.forEach(li => {
                    const text = li.textContent.trim().toLowerCase();
                    li.style.display = text.includes(q) ? '' : 'none';
                });
            }

            function selectItem(li) {
                input.value = li.dataset.value;
                items.forEach(i => i.classList.remove('dn-combo-active'));
                li.classList.add('dn-combo-active');
                list.classList.remove('dn-combo-show');
                input.blur();
            }

            input.addEventListener('focus', openList);
            input.addEventListener('click', openList);

            input.addEventListener('input', () => {
                list.classList.add('dn-combo-show');
                filterItems(input.value);
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    closeList();
                    input.blur();
                }
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const visible = items.filter(li => li.style.display !== 'none');
                    if (visible.length) selectItem(visible[0]);
                }
            });

            items.forEach(li => {
                li.addEventListener('mousedown', (e) => {
                    
                    e.preventDefault();
                    selectItem(li);
                });
            });

            document.addEventListener('click', (e) => {
                if (!combo.contains(e.target)) {
                    closeList();
                }
            });
        });
    })();

    // Calculater Form Section
    (function () {
            // ---- pill group single-select behavior ----
            document.querySelectorAll('.cw-pill-group').forEach(group => {
                group.addEventListener('click', (e) => {
                    const btn = e.target.closest('.cw-pill');
                    if (!btn) return;
                    group.querySelectorAll('.cw-pill').forEach(p => p.classList.remove('cw-pill-active'));
                    btn.classList.add('cw-pill-active');
                });
            });

            // ---- stepper visuals ----
            const circles = [null, document.getElementById('cwCircle1'), document.getElementById('cwCircle2'), document.getElementById('cwCircle3')];
            const lines = [null, document.getElementById('cwLine1'), document.getElementById('cwLine2')];
            const panels = [null, document.getElementById('cwPanel1'), document.getElementById('cwPanel2'), document.getElementById('cwPanel3')];

            function goToStep(step) {
                for (let i = 1; i <= 3; i++) {
                    panels[i].classList.toggle('d-none', i !== step);
                    circles[i].classList.remove('cw-circle-active', 'cw-circle-done');
                    if (i < step) {
                        circles[i].classList.add('cw-circle-done');
                        circles[i].innerHTML = '<i class="fa-solid fa-check"></i>';
                    } else if (i === step) {
                        circles[i].classList.add('cw-circle-active');
                        circles[i].textContent = i;
                    } else {
                        circles[i].textContent = i;
                    }
                }
                lines[1].classList.toggle('cw-line-done', step > 1);
                lines[2].classList.toggle('cw-line-done', step > 2);
                window.scrollTo({ top: document.querySelector('.cw-section').offsetTop - 20, behavior: 'smooth' });
            }

            document.getElementById('cwToStep2').addEventListener('click', () => goToStep(2));
            document.getElementById('cwToStep1').addEventListener('click', () => goToStep(1));
            document.getElementById('cwToStep2From3').addEventListener('click', () => goToStep(2));
            document.getElementById('cwToStep3').addEventListener('click', () => {
                calculate();
                goToStep(3);
            });

            // ---- calculation ----
            function money(n) {
                return '$' + Math.round(n).toLocaleString('en-US');
            }

            function costRow(label, value, isBold) {
                return `<li class="cw-cost-row${isBold ? ' cw-cost-bold' : ''}"><span>${label}</span><span>${money(value)}</span></li>`;
            }

            function calculate() {
                const make = document.getElementById('cwMake').value || 'Vehicle';
                const model = document.getElementById('cwModel').value || '';
                const year = document.getElementById('cwYear').value || '';
                const engine = document.getElementById('cwEngine').value || '0';
                const fuel = document.querySelector('#cwFuelGroup .cw-pill-active').dataset.value;
                const price = parseFloat(document.getElementById('cwPrice').value) || 0;

                const originBtn = document.querySelector('#cwOriginGroup .cw-pill-active');
                const origin = originBtn.dataset.value;
                const method = document.querySelector('#cwMethodGroup .cw-pill-active').dataset.value;
                const freight = parseFloat(originBtn.dataset[method.toLowerCase()]) || 0;

                const insurance = price * 0.01;
                const cif = price + freight + insurance;
                const duty = cif * 0.20;
                const vat = (cif + duty) * 0.10;
                const portHandling = 450;
                const transport = 350;
                const total = cif + duty + vat + portHandling + transport;

                document.getElementById('cwSummaryBar').textContent =
                    `${year} ${make} ${model} · ${engine}cc ${fuel.toLowerCase()} · from ${origin.toUpperCase()} via ${method === 'RoRo' ? 'RORO' : method.toUpperCase()}`;

                document.getElementById('cwCostList').innerHTML =
                    costRow('Машины худалдан авах үнэ', price) +
                    costRow('Далайн тээвэр', freight) +
                    costRow('Тэнгисийн даатгал (1%)', insurance) +
                    costRow('CIF үнэ', cif, true) +
                    costRow('Гаалийн татвар (20%)', duty) +
                    costRow('НӨАТ (10%)', vat) +
                    costRow('Боомтын боловсруулалт & Гаалийн бүртгэл', portHandling) +
                    costRow('Улаанбаатар хүртэлх тээвэр', transport);

                document.getElementById('cwTotalAmount').textContent = money(total);
            }

            // initial stepper state
            goToStep(1);
        })();