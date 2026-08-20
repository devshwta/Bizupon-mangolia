
// ---- Variant B: dropdown-menu search filter ----
function filterDDMenu(input){
    const menu = input.closest('.dd-search-menu');
    const term = input.value.toLowerCase();
    menu.querySelectorAll('.dropdown-item').forEach(item=>{
        item.classList.toggle('hidden', !item.textContent.toLowerCase().includes(term));
    });
}
document.querySelectorAll('.dd-search-menu .dropdown-item').forEach(item=>{
    item.addEventListener('click', function(e){
        e.preventDefault();
        const btn = this.closest('.dropdown').querySelector('.dropdown-toggle');
        btn.textContent = this.textContent;
    });
});

// ---- Variant C: custom combobox ----
function toggleCombo(input, show){
    const panel = input.closest('.combo-wrap').querySelector('.combo-panel');
    panel.classList.toggle('show', show);
}
function filterCombo(input){
    const panel = input.closest('.combo-wrap').querySelector('.combo-panel');
    panel.classList.add('show');
    const term = input.value.toLowerCase();
    panel.querySelectorAll('.combo-option').forEach(opt=>{
        opt.classList.toggle('hidden', !opt.textContent.toLowerCase().includes(term));
    });
}
function selectCombo(opt){
    const wrap = opt.closest('.combo-wrap');
    wrap.querySelector('input').value = opt.textContent;
    wrap.querySelector('.combo-panel').classList.remove('show');
}
document.addEventListener('click', function(e){
    document.querySelectorAll('.combo-wrap').forEach(wrap=>{
        if(!wrap.contains(e.target)) wrap.querySelector('.combo-panel').classList.remove('show');
    });
});

// ---- Dual range ----
function updateDual(){
    const minEl = document.getElementById('dualMin');
    const maxEl = document.getElementById('dualMax');
    let min = parseInt(minEl.value), max = parseInt(maxEl.value);
    if(min > max - 1){ min = max - 1; minEl.value = min; }
    const range = parseInt(minEl.max);
    document.getElementById('dualFill').style.left = (min/range*100)+'%';
    document.getElementById('dualFill').style.width = ((max-min)/range*100)+'%';
    document.getElementById('dualVal').textContent = min + ' – ' + max;
}
if(document.getElementById('dualMin')) updateDual();

// ---- Drag & drop upload (Variant B) ----
function handleDzFiles(input, listId){
    const list = document.getElementById(listId);
    list.innerHTML = '';
    Array.from(input.files).forEach(f=>{
        const chip = document.createElement('div');
        chip.className = 'file-chip';
        chip.innerHTML = `<span><i class="bi bi-file-earmark"></i>${f.name}</span><i class="bi bi-x-lg" style="cursor:pointer;color:#B23A3A"></i>`;
        list.appendChild(chip);
    });
}
const dz1 = document.getElementById('dz1');
if(dz1){
    ['dragover','dragleave','drop'].forEach(evt=>{
        dz1.addEventListener(evt, e=>{
            e.preventDefault();
            dz1.classList.toggle('dragover', evt==='dragover');
        });
    });
    dz1.addEventListener('drop', e=>{
        document.getElementById('dzFile1').files = e.dataTransfer.files;
        handleDzFiles(document.getElementById('dzFile1'),'dz1list');
    });
}

// ---- Multi image preview (Variant C) ----
function handleImagePreview(input){
    const grid = document.getElementById('previewGrid');
    grid.innerHTML = '';
    Array.from(input.files).forEach(file=>{
        const reader = new FileReader();
        reader.onload = e=>{
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'preview-thumb';
            grid.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
}