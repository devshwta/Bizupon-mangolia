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

