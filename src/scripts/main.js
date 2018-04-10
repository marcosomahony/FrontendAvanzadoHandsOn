export class Main {

    constructor() {
        /*IMPORTS Y TEMPLATES*/
        this.vista = {
            aBtnsMenu: document.querySelectorAll('nav ul a'),                 //botones
            eMain: document.querySelector('main'),                     //seccion main
            aImports: document.querySelectorAll('link[rel="import"]'),  //array de imports
            oImports: {}                                                //imports
        }

        this.vista.aBtnsMenu.forEach((item) => {
            item.addEventListener('click', this.menuItems.bind(this), false);
        })

        this.vista.aImports.forEach((elem) => {
            this.vista.oImports[elem.title] = elem.import;
        })

        this.cargarTemplate('home');

        /*MENU REPLEGABLE */
        document.addEventListener("click", function menuReplegable() {
            let opcionesRep = document.querySelector("#opRep").classList.toggle("esconder")
        });

        /* VIDEO */

        let video = document.getElementById('video'),
            controls = document.getElementsByClassName('controls')[0],
            playPause = document.getElementsByClassName('playpause')[0],
            progress = document.getElementsByClassName('progress')[0],
            volume = document.getElementsByClassName('volume-input')[0],
            fullscreen = document.getElementsByClassName('fullscreen')[0],
            updateProgress;

        console.log(video, controls, playPause);

        playPause.addEventListener('click', function () {
            if (playPause.className == 'playpause pause fa fa-play') {
                playPause.className = 'playpause play fa fa-pause';
                video.play();
            } else {
                playPause.className = 'playpause pause fa fa-play';
                video.pause();
            }
        });

        fullscreen.addEventListener("click", function () {
            if (
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement
            ) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                controls.className = 'controls';
                fullscreen.className = 'fullscreen fa fa-expand';
            } else {
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.mozRequestFullScreen) {
                    video.mozRequestFullScreen();
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen();
                }
                controls.className = 'controls extended';
                fullscreen.className = 'fullscreen fa fa-compress';
            }
        });

        video.addEventListener('play', function () {
            progress.max = Math.round(video.duration * 10);
            updateProgress = setInterval(function () {
                progress.value = video.currentTime * 10;
            }, 100);
        });

        volume.addEventListener('input', function () {
            video.volume = volume.value / 100;
        });

        progress.addEventListener('input', function () {
            updateProgress = null;
            video.currentTime = progress.value / 10
        });
    }

    menuItems(oEv) {
        oEv.preventDefault();
        if (!this.vista.oImports[oEv.target.id]) {
            // Si no existe template
            this.vista.eMain.innerHTML = `
            <article>
                <h2>404 Not Found</h2>
                <p>No hemos encontrado lo que estabas buscando</p>
            </article>`
        } else {
            this.cargarTemplate(oEv.target.id)
        }
    }

    cargarTemplate(id) {
        const IMPORT = this.vista.oImports[id];
        const ELEM = IMPORT.querySelector(`#${id}`);
        this.highlightSelected(id)
        this.vista.eMain.innerHTML = ELEM.innerHTML;
    }

    highlightSelected(id) {
        this.vista.aBtnsMenu.forEach(element => {
            element.classList.remove("active")
        });
        document.getElementById(id).classList.add("active")
    }
}