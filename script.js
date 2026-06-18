const introOverlay = document.getElementById("introOverlay");
const mainOverlay = document.getElementById("mainOverlay");

const introSection = document.getElementById("introSection");
const mainSection = document.getElementById("mainSection");

const hhicButton = document.getElementById("hhicButton");
const dvdButtonContainer = document.getElementById("dvdButtonContainer");

const introMusic = document.getElementById("introMusic");
const playlistPlayer = document.getElementById("playlistPlayer");

/* ==========================
   PLAYLIST
========================== */

const playlist = [
    "song1.mp3",
    "song2.mp3",
    "song3.mp3"
];

let currentSong = 0;

/* ==========================
   APARICION INICIAL
========================== */

window.addEventListener("load", () => {

    let opacity = 1;

    const fade = setInterval(() => {

        opacity -= 0.01;

        if(opacity <= 0){

            opacity = 0;

            clearInterval(fade);

            hhicButton.style.opacity = "1";

            try{
                introMusic.volume = 1;
                introMusic.play();
            }catch(e){}

        }

        introOverlay.style.opacity = opacity;

    },50);

});

/* ==========================
   BOTON DVD
========================== */

let bx = 150;
let by = 150;

let bdx = 1;
let bdy = 1;

function moveButton(){

    const w = window.innerWidth;
    const h = window.innerHeight;

    const bw = dvdButtonContainer.offsetWidth;
    const bh = dvdButtonContainer.offsetHeight;

    bx += bdx;
    by += bdy;

    if(bx <= 0 || bx + bw >= w){
        bdx *= -1;
    }

    if(by <= 0 || by + bh >= h){
        bdy *= -1;
    }

    dvdButtonContainer.style.left = bx + "px";
    dvdButtonContainer.style.top = by + "px";

    requestAnimationFrame(moveButton);
}

moveButton();

/* ==========================
   CLICK HHIC
========================== */

hhicButton.addEventListener("click", () => {

    fadeOutIntro();

});

function fadeOutIntro(){

    let opacity = 0;

    const fade = setInterval(() => {

        opacity += 0.01;

        introOverlay.style.opacity = opacity;

        introMusic.volume = Math.max(
            0,
            1 - opacity
        );

        if(opacity >= 1){

            clearInterval(fade);

            introMusic.pause();

            showMainSection();

        }

    },50);
}

/* ==========================
   MOSTRAR SECCION 2
========================== */

function showMainSection(){

    introSection.style.display = "none";

    mainSection.style.display = "block";

    let opacity = 1;

    const fade = setInterval(() => {

        opacity -= 0.01;

        mainOverlay.style.opacity = opacity;

        if(opacity <= 0){

            clearInterval(fade);

        }

    },50);

    startPlaylist();
}

/* ==========================
   PLAYLIST INFINITA
========================== */

function startPlaylist(){

    playlistPlayer.src = playlist[currentSong];

    playlistPlayer.volume = 1;

    playlistPlayer.load();

    playlistPlayer.play().catch(err => {
        console.log(err);
    });
}

playlistPlayer.addEventListener(
    "ended",
    () => {

        console.log("Canción terminada");

        currentSong++;

        if(currentSong >= playlist.length){
            currentSong = 0;
        }

        console.log("Reproduciendo:", playlist[currentSong]);

        startPlaylist();
    }
);

/* ==========================
   IMAGENES DVD
========================== */

const dvdImages =
document.querySelectorAll(
".dvdImage, .dvdVideo"
);

dvdImages.forEach((img) => {

    const parent =
    img.parentElement;

    let x = 20;
    let y = 20;

    let dx = 0.45;
    let dy = 0.45;

    function animate(){

        const pw =
        parent.clientWidth;

        const ph =
        parent.clientHeight;

        const iw =
        img.offsetWidth;

        const ih =
        img.offsetHeight;

        x += dx;
        y += dy;

        if(
            x <= 0 ||
            x + iw >= pw
        ){
            dx *= -1;
        }

        if(
            y <= 0 ||
            y + ih >= ph
        ){
            dy *= -1;
        }

        img.style.left =
        x + "px";

        img.style.top =
        y + "px";

        requestAnimationFrame(
            animate
        );
    }

    animate();

});