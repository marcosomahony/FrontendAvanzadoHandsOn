import { ytapikey } from './api_key.js'

(function () {
    const ytquery = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=pinguinos antartica&key=" + ytapikey;
    const res = JSON.parse(httpGet(ytquery));
    res.items.forEach(
        element => postMessage(process(element))
    );
})()

function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function process(elem) {
    return {
        title: elem.snippet.title,
        channel: elem.snippet.channelTitle,
        description: elem.snippet.description,
        img: elem.snippet.thumbnails.medium.url,
        link: "https://www.youtube.com/watch?v=" + elem.id.videoId
    }
}