  // Nav start
 const toggleButton = document.getElementById('navbar-toggle');
 const mobileMenu = document.getElementById('mobile-menu');

 toggleButton.addEventListener('click', () => {
     mobileMenu.classList.toggle('hidden');
 });

// Nav end

//Loader start
window.addEventListener('load', function () {
    setTimeout(function () {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';       
        if (typeof initializeCharts === 'function') {
            initializeCharts(); 
        }
    }, 1000);
});

//Loader end  
 

