// getting random integer number from 1 to max inclusively
const getRandomNum = (max) => Math.ceil(Math.random() * max);

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

export { getRandomNum, createElement };
