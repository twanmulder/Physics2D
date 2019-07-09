let master = new TimelineMax(),
    flakes = new TimelineMax({repeat: -1}),
    bg = document.getElementById('featureBackground'),
    snowy = document.querySelector('.snowy'),
    beach = document.querySelector('.beach'),
    favicon = document.querySelector('link[rel="icon"]'),
    containerWidth = 970;

function control() {
  let qty = 200,
      duration = 5

  for (i = 0; i < qty; i++) {
    flake = $("<img class='snowflake' src='snowflake.png'</img>").appendTo(bg)[0];
    TweenMax.set(flake, {x:Math.random() * containerWidth, y:-250});
    delay = Math.random() * duration;
    flakes.to(flake, duration, {repeat: -1, physics2D:{velocity:Math.random() * 100 + 150, angle:Math.random() * 180 , gravity:10}, rotation: Math.random() * 200 + 120}, delay);
  }
  return flakes;
}

let button = document.getElementById('button');

function toggleState() {
    function addSnow() {
        console.log('Adding snow')
        document.title = '❄️ BRRRRRRR ❄️';
        favicon.href = 'faviconIce.ico';
        button.innerHTML = '❄️';
        master.add(control());
        bg.classList.toggle('snow');
        bg.classList.toggle('hidden');
        beach.classList.toggle('hidden');
    }
    function removeSnow(){
        console.log('Removing snow')
        document.title = '🔥 HOT! 🔥';
        favicon.href = 'faviconFire.ico';
        button.innerHTML = '🔥';
        master.remove(control());
        bg.classList.toggle('snow');
        bg.classList.toggle('hidden');
        beach.classList.toggle('hidden');
        master.add(function(){bg.innerHTML = ''}, "=+1");
    }

    if(!bg.classList.contains('snow')){
        addSnow();
    } else{
        removeSnow();
    }
}

button.addEventListener("click", toggleState);