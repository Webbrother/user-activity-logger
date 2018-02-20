import lib from './lib';

lib('hello from index');


function component() {
    var element = document.createElement('div');

    element.innerHTML = 'hello world!';
alert();
    return element;
}

document.body.appendChild(component());
