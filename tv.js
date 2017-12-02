const MAX_DELTA = 0.04;

function Color(x = 0, y = 0, blur = 0, color = 'white') {
    this.xi, this.x = x;
    this.yi, this.y = y;
    this.blur = blur;
    this.color = color;
}

function toEm(val) {
    return val + 'em ';
}

Color.prototype.toString = function() {
    return toEm(this.x)
        + toEm(this.y)
        + toEm(this.blur)
        + this.color;
}

function jitter(val, max) {
    return (((Math.random() - 0.5) * 0.01) + val) % MAX_DELTA;
}

Color.prototype.jitter = function() {
    if (this.color === 'white') { return; }
    this.x = jitter(this.x);
    this.y = jitter(this.y);
    // this.blur = jitter(this.blur);
}

function toTextShadow(colors) {
    return colors
        .map(function(color) { return color.toString(); })
        .join(', ');
}

function JitterText(el) {
    this.el = el;
    this.colors = [
        new Color(0, 0, .01, 'white'),
        new Color(-.03, .04, .03, 'cyan'),
        new Color(-0.04, 0, .03, '#20ff00'),
        new Color(.04, 0, .05, 'magenta'),
        new Color(.04, -.03, .05, 'red'),
        new Color(0.04, 0.04, .05, 'blue')
    ];
}

JitterText.prototype.render = function() {
    this.el.style.textShadow = toTextShadow(this.colors);
}

JitterText.prototype.jitter = function() {
    this.colors.forEach(function(color) { color.jitter(); })
}

let el = document.querySelector('[data-main-text]');
let text = new JitterText(el);

function loop() {
    text.render();
    text.jitter();
    window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
