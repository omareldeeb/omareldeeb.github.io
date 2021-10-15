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

function redrawSine(frequencyMultiplier, amplitudeMultiplier) {
    // adapted from https://stackoverflow.com/questions/29917446/drawing-sine-wave-in-canvas

    // full width
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
    var width = document.body.clientWidth;
    var height = document.body.clientHeight / 2;

    var relativeX = e.pageX / width;
    var frequencyMultiplier = 1 - relativeX + 0.5;

    var relativeY = e.pageY / height;
    console.log(relativeY);
    var amplitudeMultiplier = 1.0 - relativeY * 2.0;
    // if (frequencyMultiplier < 0.1) {
    //     frequencyMultiplier = 0.1
    // }
    
    redrawSine(frequencyMultiplier, amplitudeMultiplier);
});
