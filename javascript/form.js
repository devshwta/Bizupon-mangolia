document.addEventListener("DOMContentLoaded", function () {

    const buttons = document.querySelectorAll(".btn-module");

    buttons.forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault();

            const page = this.dataset.page;

            if (page) {
                window.location.href = page;
            }
        });
    });

});

// Add Yard Out Form
document.addEventListener("DOMContentLoaded", function () {

    const yardForm = document.getElementById("yardOutForm");
    const portForm = document.getElementById("portImagesForm");
    const btnGoToYardIn = document.getElementById("btnGoToYardIn");
    const btnBackToYardOut = document.getElementById("btnBackToYardOut");

    btnGoToYardIn.addEventListener("click", function () {

        // Hide Yard Out Form
        yardForm.classList.add("d-none");

        // Show Port Images Form
        portForm.classList.remove("d-none");

        // Smooth Scroll
        portForm.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

    btnBackToYardOut.addEventListener("click", function () {

        // Hide Port Images Form
        portForm.classList.add("d-none");

        // Show Yard Out Form
        yardForm.classList.remove("d-none");

        // Smooth Scroll
        yardForm.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


// Dropdown With Search 

document.querySelectorAll('.ss-dropdown').forEach(function(wrapper){
  const toggle = wrapper.querySelector('.ss-toggle');
  const toggleText = wrapper.querySelector('.ss-toggle-text');
  const searchInput = wrapper.querySelector('.ss-search');
  const options = wrapper.querySelectorAll('.ss-option');
  const placeholder = wrapper.getAttribute('data-placeholder');

  // focus search box whenever the dropdown opens
  wrapper.addEventListener('shown.bs.dropdown', function(){
    searchInput.value = '';
    options.forEach(o => o.classList.remove('d-none'));
    searchInput.focus();
  });

  // filter options as the user types
  searchInput.addEventListener('input', function(){
    const term = this.value.trim().toLowerCase();
    options.forEach(function(opt){
      const match = opt.textContent.trim().toLowerCase().includes(term);
      opt.classList.toggle('d-none', !match);
    });
  });

  // stop typing/clicking inside the search box from closing the menu
  searchInput.addEventListener('click', e => e.stopPropagation());

  // select an option
  options.forEach(function(opt){
    opt.addEventListener('click', function(){
      options.forEach(o => o.classList.remove('active'));
      this.classList.add('active');
      toggleText.textContent = this.getAttribute('data-value') ? this.textContent : placeholder;
      bootstrap.Dropdown.getOrCreateInstance(toggle).hide();
    });
  });
});

// Product Details Script

const carImages = [
  { src: '/images/cars/Toyota-Alphard.jpg', alt: 'Honda N-BOX Custom — вид спереди' },
  { src: '/images/cars/Honda.jpg', alt: 'Honda N-BOX Custom — вид сбоку' },
  { src: '/images/cars/BMW.jpg', alt: 'Honda N-BOX Custom — вид сзади' },
  { src: '/images/cars/Lexus.jpg', alt: 'Honda N-BOX Custom — салон' },
  { src: '/images/cars/Mercedes-Benz.jpg', alt: 'Honda N-BOX Custom — колёса' }
];

let current = 0;
const mainImage = document.getElementById('mainImage');
const thumbRow = document.getElementById('thumbRow');
const counter = document.getElementById('imgCounter');

carImages.forEach((s,i)=>{
  const img = document.createElement('img');
  img.src = s.src;
  img.alt = s.alt;
  img.loading = i===0 ? 'eager' : 'lazy';
  if(i===0) img.classList.add('active');
  mainImage.insertBefore(img, mainImage.querySelector('.nav-arrow'));

  const t = document.createElement('div');
  t.className = 'thumb' + (i===0?' active':'');
  const timg = document.createElement('img');
  timg.src = s.src;
  timg.alt = s.alt;
  timg.loading = 'lazy';
  t.appendChild(timg);
  t.addEventListener('click', ()=> goTo(i));
  thumbRow.appendChild(t);
});

function render(){
  document.querySelectorAll('#mainImage > img').forEach((el,i)=> el.classList.toggle('active', i===current));
  document.querySelectorAll('.thumb').forEach((el,i)=> el.classList.toggle('active', i===current));
  counter.textContent = (current+1) + ' / ' + carImages.length;
}
function goTo(i){ current = (i + carImages.length) % carImages.length; render(); }
document.getElementById('prevBtn').addEventListener('click', ()=> goTo(current-1));
document.getElementById('nextBtn').addEventListener('click', ()=> goTo(current+1));
render();

/* ---------- Tabs ---------- */
document.querySelectorAll('.tab-head').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.tab-head').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-'+btn.dataset.tab).classList.add('active');
  });
});

/* ---------- Modals ---------- */
function openModal(id){ document.getElementById(id).classList.add('open'); document.body.style.overflow='hidden'; }
function closeModal(id){ document.getElementById(id).classList.remove('open'); document.body.style.overflow=''; }
document.querySelectorAll('.modal-overlay').forEach(ov=>{
  ov.addEventListener('click', e=>{ if(e.target===ov) closeModal(ov.id); });
});
document.addEventListener('keydown', e=>{
  if(e.key==='Escape') document.querySelectorAll('.modal-overlay.open').forEach(ov=>closeModal(ov.id));
});

function switchRegTab(which){
  document.getElementById('tabNew').classList.toggle('active', which==='new');
  document.getElementById('tabLogin').classList.toggle('active', which==='login');
  document.getElementById('regNewForm').style.display = which==='new' ? 'block' : 'none';
  document.getElementById('regLoginForm').style.display = which==='login' ? 'block' : 'none';
}

function submitReg(e){
  e.preventDefault();
  closeModal('registerModal');
  showToast('Заявка отправлена — менеджер свяжется с вами.');
}

/* ---------- Managers ---------- */
const managers = [
  {phone:'+81 80-7505-1919', name:'Anna'},
  {phone:'+81 80-2956-1568', name:'Lyudmila'},
  {phone:'+81 80-8016-3056', name:'Nominal'},
  {phone:'+81 70-2620-6438', name:'Nadezhda'},
  {phone:'+81 90-8493-4040', name:'Anya'},
  {phone:'+81 90-2638-9090', name:'Alexandra'},
  {phone:'+81 70-3967-0694', name:'Lyuda'},
  {phone:'+81 80-1457-5050', name:'Gleb'},
  {phone:'+81 90-2461-4251', name:'Igor'},
];
const mgrList = document.getElementById('mgrList');
managers.forEach(m=>{
  const row = document.createElement('div');
  row.className = 'mgr-row';
  row.innerHTML = `
    <div class="mgr-info"><span class="num">${m.phone}</span><span class="name">${m.name}</span></div>
    <div class="mgr-icons">
      <a class="wa" href="#" title="WhatsApp" onclick="showToast('Открываем чат с ${m.name}…');return false;"><i class="fa-brands fa-whatsapp"></i></a>
      <a class="tg" href="#" title="Telegram" onclick="showToast('Открываем Telegram — ${m.name}…');return false;"><i class="fa-brands fa-telegram"></i></a>
    </div>`;
  mgrList.appendChild(row);
});

/* ---------- Actions / toast ---------- */
function shareTo(kind){
  const label = kind==='tg' ? 'Telegram' : kind==='wa' ? 'WhatsApp' : 'X';
  showToast('Ссылка готова к отправке в ' + label);
}
let toastTimer;
function showToast(msg){
  const t = document.getElementById('toast');
  document.getElementById('toastText').textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> t.classList.remove('show'), 2600);
}