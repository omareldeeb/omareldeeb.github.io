redrawSine(1.0);

function redrawSine(frequencyMultiplier) {
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
        y =  180 - Math.sin(counter) * 120;
        counter += increase;
        
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

window.addEventListener('mousemove', e => {
    var targetWidth = document.body.clientWidth;

    var relativeX = e.pageX / targetWidth;
    var frequencyMultiplier = 1 - relativeX + 0.5;
    // if (frequencyMultiplier < 0.1) {
    //     frequencyMultiplier = 0.1
    // }
    
    redrawSine(frequencyMultiplier);
});
