document.querySelectorAll('.dropdown-submenu > .submenu-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
        var panel = trigger.nextElementSibling;
        var isTouch = window.matchMedia('(hover: none)').matches;

        if (isTouch) {
            e.preventDefault();
            e.stopPropagation();

            document.querySelectorAll('.submenu-panel.show').forEach(function (openPanel) {
                if (openPanel !== panel) openPanel.classList.remove('show');
            });

            panel.classList.toggle('show');
        }
    });
});

// Register Page
 var toggle = document.querySelector('.toggle-password');
  var pwd = document.getElementById('password');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var isHidden = pwd.type === 'password';
      pwd.type = isHidden ? 'text' : 'password';
      toggle.classList.toggle('bi-eye');
      toggle.classList.toggle('bi-eye-slash');
    });
  }

// Login Page
var CAPTCHA_LENGTH = 6;
var CAPTCHA_CHARS = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789';
var currentCaptcha = '';

function generateCaptcha() {
  var code = '';
  for (var i = 0; i < CAPTCHA_LENGTH; i++) {
    code += CAPTCHA_CHARS.charAt(Math.floor(Math.random() * CAPTCHA_CHARS.length));
  }
  return code;
}

function renderCaptcha() {
  currentCaptcha = generateCaptcha();
  var el = document.getElementById('captchaText');
  el.innerHTML = '';

  currentCaptcha.split('').forEach(function (ch) {
    var span = document.createElement('span');
    span.textContent = ch;
    var rotate = (Math.random() * 24 - 12).toFixed(1);
    var rise = (Math.random() * 8 - 4).toFixed(1);
    span.style.transform = 'rotate(' + rotate + 'deg) translateY(' + rise + 'px)';
    el.appendChild(span);
  });

  var feedback = document.getElementById('captchaFeedback');
  if (feedback) feedback.textContent = '';
  var input = document.getElementById('verificationCode');
  if (input) input.value = '';
}

document.getElementById('refreshCaptcha').addEventListener('click', renderCaptcha);
renderCaptcha();

// ---------- Password show/hide ----------
var toggle = document.querySelector('.toggle-password');
var pwd = document.getElementById('password');
if (toggle) {
  toggle.addEventListener('click', function () {
    var isHidden = pwd.type === 'password';
    pwd.type = isHidden ? 'text' : 'password';
    toggle.classList.toggle('bi-eye');
    toggle.classList.toggle('bi-eye-slash');
  });
}

// ---------- Submit ----------
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  var enteredCode = document.getElementById('verificationCode').value.trim();
  var feedback = document.getElementById('captchaFeedback');

  if (enteredCode.toLowerCase() !== currentCaptcha.toLowerCase()) {
    feedback.textContent = 'Security code does not match. Please try again.';
    feedback.classList.add('is-error');
    renderCaptcha();
    return;
  }

  feedback.classList.remove('is-error');
  feedback.textContent = '';

  console.log('Login submitted — captcha verified.');
});

// Admin Login
function togglePw(){
    const field = document.getElementById('pwField');
    const icon = document.getElementById('pwIcon');
    if(field.type === 'password'){
      field.type = 'text';
      icon.textContent = '🙈';
    } else {
      field.type = 'password';
      icon.textContent = '👁️';
    }
  }

// User Product Detail Page
document.addEventListener('DOMContentLoaded', function () {

  /* ---- 1. Tooltips on the (i) icons ---- */
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(function (el) {
    new bootstrap.Tooltip(el, { trigger: 'hover focus' });
  });

  /* ---- 2. Managers list ---- */
  var managers = [
    { phone: '+81 80-7505-1919', name: 'Anna' },
    { phone: '+81 80-2956-1568', name: 'Lyudmila' },
    { phone: '+81 80-8016-3056', name: 'Nominal' },
    { phone: '+81 70-2620-6438', name: 'Nadezhda' },
    { phone: '+81 90-8493-4040', name: 'Anya' },
    { phone: '+81 90-2638-9090', name: 'Alexandra' },
    { phone: '+81 70-3967-0694', name: 'Lyuda' },
    { phone: '+81 80-1457-5050', name: 'Gleb' },
    { phone: '+81 90-2461-4251', name: 'Igor' }
  ];

  var list = document.getElementById('managersList');
  if (list) {
    list.innerHTML = managers.map(function (m) {
      var digits = m.phone.replace(/\D/g, '');       // 818075051919
      return '' +
        '<li class="bk-mgr">' +
          '<span class="bk-mgr__info">' + m.phone + ' — ' + m.name + '</span>' +
          '<span class="bk-mgr__actions">' +
            '<a class="bk-ico bk-ico--wa" href="https://wa.me/' + digits + '" target="_blank" rel="noopener" aria-label="WhatsApp ' + m.name + '"><i class="fa-brands fa-whatsapp"></i></a>' +
            '<a class="bk-ico bk-ico--tg" href="https://t.me/+' + digits + '" target="_blank" rel="noopener" aria-label="Telegram ' + m.name + '"><i class="fa-brands fa-telegram"></i></a>' +
          '</span>' +
        '</li>';
    }).join('');
  }

  /* ---- 3. Keep ARIA state of the tabs in sync ---- */
  document.querySelectorAll('.bk-tab').forEach(function (tab) {
    tab.addEventListener('shown.bs.tab', function () {
      document.querySelectorAll('.bk-tab').forEach(function (t) {
        t.setAttribute('aria-selected', t.classList.contains('active') ? 'true' : 'false');
      });
    });
  });

  /* Always reopen on "New registration" and clear validation messages */
  var authModal = document.getElementById('authModal');
  if (authModal) {
    authModal.addEventListener('show.bs.modal', function () {
      bootstrap.Tab.getOrCreateInstance(document.getElementById('tab-register')).show();
    });
    authModal.addEventListener('hidden.bs.modal', function () {
      authModal.querySelectorAll('form').forEach(function (f) {
        f.classList.remove('was-validated');
      });
    });
  }

  /* ---- 4. Show / hide password ---- */
  var toggle = document.querySelector('.bk-pass__toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var input = document.getElementById('login-pass');
      var show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      toggle.setAttribute('aria-pressed', show);
      toggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
      toggle.innerHTML = show ? '<i class="fa-regular fa-eye-slash"></i>' : '<i class="fa-regular fa-eye"></i>';
    });
  }

  /* ---- 5. Client-side validation (valid forms submit normally to action=) ---- */
  document.querySelectorAll('.bk-form.needs-validation').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      form.classList.add('was-validated');
    });
  });
});

