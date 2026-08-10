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