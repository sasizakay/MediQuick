//var localHostAPI = 'https://localhost:7253/';
var localHostAPI = 'https://proj.ruppin.ac.il/cgroup58/test2/tar1/';
var ruppinServerAPI = 'https://proj.ruppin.ac.il/cgroup58/test2/tar1/';
let currentURL = window.location.href;

if (!(currentURL.includes('login') || currentURL.includes('admin'))) {
    function toggleMenu() {
        var menu = document.getElementById('mobileMenu');
        if (menu.classList.contains('open')) {
            menu.classList.remove('open');
        } else {
            menu.classList.add('open');
        }
    }
    
    function closeMenu() {
        var menu = document.getElementById('mobileMenu');
        if (menu.classList.contains('open')) {
            menu.classList.remove('open');
        }
    }
    
    // Function to hide the mobile menu if screen width is greater than 600px
    function checkScreenSize() {
        var menu = document.getElementById('mobileMenu');
        if (window.innerWidth > 600) {
        //    menu.classList.remove('open');
        }
    }
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Add event listener for click on the window
    window.addEventListener('click', function(event) {
        var menu = document.getElementById('mobileMenu');
        var menuIcon = document.querySelector('.nav-links .menu');
    
        // Check if the click was outside the menu and menu icon
        if (menu.classList.contains('open') && !menu.contains(event.target) && !menuIcon.contains(event.target)) {
            closeMenu();
        }
    });
    
    // Add event listener for scrolling
    window.addEventListener('scroll', closeMenu);
    
    // Initial check on page load
    checkScreenSize();    
}
