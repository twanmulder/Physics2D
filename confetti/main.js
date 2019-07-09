function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getDegAngle(x0, y0, x1, y1) {
    var y = y1 - y0;
    var x = x1 - x0;
    return Math.atan2(y, x) * (180 / Math.PI);
}

function addClass(el, className) {
    el.classList.add(className);
}
function removeClass(el, className) {
    el.classList.remove(className);
}

var DECAY = 10;
var SPREAD = 50;
var GRAVITY = 1200;

var angle = 270;
var shoot = false;

var dpr = window.devicePixelRatio || 1;
var wrapper = document.querySelector('.canvas-wrapper')
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var confettiSpriteIds = [];
var confettiSprites = {};

ctx.scale(dpr, dpr);

function setCanvasSize() {
    canvas.width = wrapper.offsetWidth * dpr;
    canvas.height = wrapper.offsetHeight * dpr;
}

function setupListeners() {
    // Use TweenLite tick event for the render loop
    TweenLite.ticker.addEventListener('tick', render);

    canvas.addEventListener('mousedown', handleMousedown);
    canvas.addEventListener('mouseup', handleMouseup);
    canvas.addEventListener('mousemove', handleMousemove);
    canvas.addEventListener('touchstart', handleMousedown);
    canvas.addEventListener('touchend', handleMouseup);
    canvas.addEventListener('touchmove', handleTouchmove);
    canvas.addEventListener('resize', setCanvasSize);
}

function handleMousemove(e) {
    var pointerAngle = getDegAngle(canvas.width / 2, canvas.height * .9, e.clientX * dpr, e.clientY * dpr);
    angle = pointerAngle;
}
function handleTouchmove(e) {
    var pointerAngle = getDegAngle(canvas.width / 2, canvas.height * .9, e.touches[0].clientX * dpr, e.touches[0].clientY * dpr);
    angle = pointerAngle;
}

function handleMousedown() {
    shoot = true;
}
function handleMouseup() {
    shoot = false;
}

function addConfettiParticles(amount, angle, velocity, x, y) {
    var i = 0;
    while (i < amount) {
        // sprite
        var r = _.random(4, 6) * dpr;
        var d = _.random(15, 25) * dpr;

        var cr = _.random(50, 255);
        var cg = _.random(50, 200);
        var cb = _.random(50, 200);
        var color = 'rgb(' + cr + ', ' + cg + ', ' + cb + ')';

        var tilt = _.random(10, -10);
        var tiltAngleIncremental = _.random(0.07, 0.05);
        var tiltAngle = 0;

        var id = _.uniqueId();
        var sprite = _defineProperty({}, id, {
            angle: angle,
            velocity: velocity,
            x: x,
            y: y,
            r: r,
            d: d,
            color: color,
            tilt: tilt,
            tiltAngleIncremental: tiltAngleIncremental,
            tiltAngle: tiltAngle
        });

        Object.assign(confettiSprites, sprite);
        confettiSpriteIds.push(id);
        tweenConfettiParticle(id);
        i++;
    }
}

function tweenConfettiParticle(id) {
    var minAngle = confettiSprites[id].angle - SPREAD / 2;
    var maxAngle = confettiSprites[id].angle + SPREAD / 2;

    var minVelocity = confettiSprites[id].velocity / 4;
    var maxVelocity = confettiSprites[id].velocity;

    // Physics Props
    var velocity = _.random(minVelocity, maxVelocity);
    var angle = _.random(minAngle, maxAngle);
    var gravity = GRAVITY;
    // const friction = _.random(0.1, 0.25);
    var friction = _.random(0.01, 0.05);
    var d = 0;

    TweenLite.to(confettiSprites[id], DECAY, {
        physics2D: {
            velocity: velocity,
            angle: angle,
            gravity: gravity,
            friction: friction
        },
        d: d,
        ease: Power4.easeIn,
        onComplete: function onComplete() {
            // remove confetti sprite and id
            _.pull(confettiSpriteIds, id);
            delete confettiSprites[id];
        }
    });
}

function updateConfettiParticle(id) {
    var sprite = confettiSprites[id];

    var tiltAngle = 0.0005 * sprite.d;

    sprite.angle += 0.01;
    sprite.tiltAngle += tiltAngle;
    sprite.tiltAngle += sprite.tiltAngleIncremental;
    sprite.tilt = Math.sin(sprite.tiltAngle - sprite.r / 2) * sprite.r * 2;
    sprite.y += Math.sin(sprite.angle + sprite.r / 2) * 2;
    sprite.x += Math.cos(sprite.angle) / 2;
}

function drawConfetti() {
    confettiSpriteIds.map(function (id) {
        var sprite = confettiSprites[id];

        ctx.beginPath();
        ctx.lineWidth = sprite.d / 2;
        ctx.strokeStyle = sprite.color;
        ctx.moveTo(sprite.x + sprite.tilt + sprite.r, sprite.y);
        ctx.lineTo(sprite.x + sprite.tilt, sprite.y + sprite.tilt + sprite.r);
        ctx.stroke();

        updateConfettiParticle(id);
    });
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawConfetti();
}

function shootConfetti() {
    requestAnimationFrame(shootConfetti);
    if (shoot) {
        // addConfettiParticles(10, angle, 5000, canvas.width / 2, canvas.height * .9);
        addConfettiParticles(10, 240, 3000, canvas.width, canvas.height);
        addConfettiParticles(10, -60, 3000, canvas.width - canvas.width, canvas.height);
    }
}

setupListeners();
setCanvasSize();

setTimeout(function(){ 
  addConfettiParticles(100, 240, 3000, canvas.width, canvas.height);
  addConfettiParticles(100, -60, 3000, canvas.width - canvas.width, canvas.height);
}, 1000);

shootConfetti();

let frameStart = document.querySelector('.frameStart'),
    frameEnd = document.querySelector('.frameEnd'),
    logo = document.querySelector('.logo'),
    cta = document.querySelector('.cta'),
    master = new TimelineMax();

master.from([frameStart, logo], .5, {opacity: 0}, "=+.5")
      .to(frameStart, .5, {opacity: 0}, "=+1.5")
      .call(handleMousedown)
      .from(frameEnd, .5, {opacity: 0})
      .to({}, .5, {})
      .call(handleMouseup)
      .from(cta, .5, {opacity: 0}, "=+2")
