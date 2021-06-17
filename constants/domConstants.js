import { createElement } from '../utils';

const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $formButton = document.querySelector('.control .buttonWrap .button');
const $chat = document.querySelector('.chat');

function createReloadButton() {
    const $reloadButtonContainer = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Restart';

    $reloadButton.addEventListener('click', function () {
        window.location.reload();
    })

    $reloadButtonContainer.appendChild($reloadButton);
    $arenas.appendChild($reloadButtonContainer);
}

export { $arenas, $formFight, $formButton, $chat, createReloadButton };