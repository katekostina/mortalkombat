// getting random integer number from 1 to max inclusively
const getRandomNum = (max) => Math.ceil(Math.random() * max);

const getTime = () => {
    const date = new Date();
    return date.toTimeString().slice(0, 5);
}

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

export { getRandomNum, getTime, createElement };
