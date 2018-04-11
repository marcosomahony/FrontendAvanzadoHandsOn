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

        if (document.querySelector('.wrapper_video')) {
            this.cargarVideoPlayer();
        }
        if (document.querySelector('.worker_out')) {
            this.cargarVideos();
        }
    }

    highlightSelected(id) {
        this.vista.aBtnsMenu.forEach(element => {
            element.classList.remove("active")
        });
        document.getElementById(id).classList.add("active")
    }

    cargarVideoPlayer() {
        let video = document.getElementById('video'),
            controls = document.querySelector('.controls'),
            playPause = document.querySelector('.playpause'),
            progress = document.querySelector('.progress'),
            volume = document.querySelector('.volume-input'),
            fullscreen = document.querySelector('.fullscreen'),
            updateProgress;

        if (playPause != null && video!=null) {
            playPause.addEventListener('click', function () {
                if (playPause.className == 'playpause pause fa fa-play') {
                    playPause.className = 'playpause play fa fa-pause';
                    video.play();
                } else {
                    playPause.className = 'playpause pause fa fa-play';
                    video.pause();
                }
            });

            video.addEventListener('click', function () {
                if (playPause.className == 'playpause pause fa fa-play') {
                    playPause.className = 'playpause play fa fa-pause';
                    video.play();
                } else {
                    playPause.className = 'playpause pause fa fa-play';
                    video.pause();
                }
            });
        }

        if (fullscreen != null) {
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
        }

        if (video != null) {
            video.addEventListener('play', function () {
                progress.max = Math.round(video.duration * 10);
                updateProgress = setInterval(function () {
                    progress.value = video.currentTime * 10;
                }, 100);
            });
        }

        if (volume != null) {
            volume.addEventListener('input', function () {
                video.volume = volume.value / 100;
            });
        }

        if (progress != null) {
            progress.addEventListener('input', function () {
                updateProgress = null;
                video.currentTime = progress.value / 10
            });
        }
    }

    cargarVideos() {
        var worker = new Worker("./ytworker.js")
        var out = document.querySelector("span.worker_out");
        let vids = "";
        worker.onmessage = function (oEvent) {
            vids += _videoToSpan(oEvent.data);
            out.innerHTML = vids;
        };
        
        function _videoToSpan(video) {
            var out = ('<div class="vidWrapper"><div class="vidFrame">');
            out += ('<img class="vidImg" src="' + video.img + '" style="float: left;">');
            out += ('<p class="vidTitle">' + video.title + '</p>');
            out += ('<input class="vidButton" type="button" value="Ver en YouTube" onclick="location.href=\'' + video.link + '\'">');
            out += ('<p class="vidChannel">' + video.channel + '</p>');
            out += ('<p class="vidDescription">' + video.description + '</p>');
            out += ('</div></div>');
            return out;
        }
    }
}