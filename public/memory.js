import {images} from '../meta.js'

const IMAGE_PATH = "../images/"
let CURRENT_IMAGE = undefined;
const BLANK_TIME = 3

function randomItem(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function getImage() {
    return document.getElementById("current-image");
}

function getButton() {
    return document.getElementById("scene-changer")
}

function setImage(path) {
    getImage().src = IMAGE_PATH + path;
}

function newListEntry(text) {
    const entry = document.createElement("li");
    entry.innerText = text;
    return entry;
}

function setAnswers(changes) {
    document.getElementById("answers").replaceChildren(...(changes.map(entry => newListEntry(entry.from + "->" + entry.to))))
}

function cycleImage() {
    setImage("__loading__.png");
    setTimeout(() => {
        setImage(CURRENT_IMAGE['filename'])
    }, BLANK_TIME * 1000)
    setAnswers(CURRENT_IMAGE.changes)

}

function createImage(path) {
    const imageTag = document.createElement("img");
    imageTag.src = IMAGE_PATH + path;
    return imageTag;
}

function displayRandomImage() {
    const filenames = Object.keys(images.images)
    const selectedKey = randomItem(filenames);
    const selectedImage = images.images[selectedKey];
    const imageDiv = getImage();
    setImage(selectedImage['source']);
    CURRENT_IMAGE = selectedImage;
}

getButton().onclick = cycleImage;
displayRandomImage()