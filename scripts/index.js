const observer = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
    // If the element is visible
    if (entry.isIntersecting) {
        // Add the transition
        entry.target.classList.add('animate-opacity');
        return;
    }

    // Element exited viewport, remove transition
    entry.target.classList.remove('animate-opacity');
    });
});

// Observe elements that should fade
Array.from(document.getElementsByClassName('fade-on-scroll')).forEach(el => {
    observer.observe(el);
});

redrawSine(1.0, 1.0);

// Copied from https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
function isTouchDevice() {
    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints > 0));
}

function redrawSine(frequencyMultiplier, amplitudeMultiplier) {
    // Adapted from https://stackoverflow.com/questions/29917446/drawing-sine-wave-in-canvas

    // Full width
    var targetWidth = document.body.clientWidth;
    var c = document.getElementById('sineCanvas');
    c.width = targetWidth;
    var ctx = c.getContext("2d");

    var counter = 0
    var x = 0
    var y = 180;

    var increase = 90 / 180 * Math.PI / 9;
    for(var i=0; i<=targetWidth * (1 / frequencyMultiplier); i+=10) {
        ctx.moveTo(x, y);
        x = frequencyMultiplier * i;
        y =  180 - Math.sin(counter) * 120 * amplitudeMultiplier;
        counter += increase;
        
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

window.addEventListener('mousemove', e => {
    var width = window.innerWidth;
    var height = window.innerHeight;

    var relativeX = e.pageX / width;
    var frequencyMultiplier = 1 - relativeX + 0.5;

    var relativeY = e.pageY / height;
    var amplitudeMultiplier = 1.0 - 2.0 * relativeY;
    
    // Stop amplitude from getting infinitely big when scrolling down
    if (amplitudeMultiplier < -1.0) {
        amplitudeMultiplier = -1.0;
    }

    if (frequencyMultiplier < 0.5) {
        frequencyMultiplier = 0.5;
    }
    
    redrawSine(frequencyMultiplier, amplitudeMultiplier);
});

// Manipulate sine wave on scroll on touch screens
// if (isTouchDevice()) {
    
// }

window.addEventListener('scroll', e => {
    var height = window.innerHeight / 2;
    var relativeValue = window.scrollY / (height + 150);

    var frequencyMultiplier = 1.0 - relativeValue + 0.5;
    var amplitudeMultiplier = 1.0 - 2.0 * relativeValue;

    if (amplitudeMultiplier < -1.0) {
        amplitudeMultiplier = -1.0;
    }

    if (frequencyMultiplier < 0.5) {
        frequencyMultiplier = 0.5;
    }

    redrawSine(frequencyMultiplier, amplitudeMultiplier);
});

function scrollToTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
}

var displayedModal = null;

function openModal(modalId) {
    var modal = document.getElementById(modalId);
    displayedModal = modal;
    modal.style.display = "block";
}

function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = event => {
    if (event.target == displayedModal) {
      displayedModal.style.display = "none";
    }
}

window.ontouchend = (event) => {
    if (event.target == displayedModal) {
        displayedModal.style.display = "none";
    }
}

// Super quick and dirty. Fix later.
var cvPageIndices = [1, 2, 3, 4];
var cvPageTitles = ["Education.", "Work.", "Teaching.", "Scholarships and more."];
var cvPageIds = ["education", "work", "teaching", "scholarships"];
var currentCVIndex = 0;

function cvNextPage() {
    currentCVIndex = (currentCVIndex + 1) % cvPageIndices.length;
    updateCVPage()
}

function cvPreviousPage() {
    if (currentCVIndex > 0) {
        currentCVIndex -= 1;
    } else if (currentCVIndex === 0) {
        currentCVIndex = cvPageIndices.length - 1;
    }
    
    updateCVPage();
}

function updateCVPage() {
    var cvCurrentPageTitle = document.getElementById("cvCurrentPageTitle");
    cvCurrentPageTitle.innerHTML = cvPageTitles[currentCVIndex];

    var cvPageNum = document.getElementById("cvPageNum");
    cvPageNum.innerHTML = cvPageIndices[currentCVIndex] + "/4";

    cvPageIds.forEach(id => {
        var el = document.getElementById(id);
        el.style.display = "none";
    });

    var toActivate = document.getElementById(cvPageIds[currentCVIndex]);
    toActivate.style.display = "initial";
}
