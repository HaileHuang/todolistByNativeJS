import IndexedDB from './IndexedDB';


function addLoadEvent(func) {
  const oldOnload = window.onload;
  if (typeof window.onload !== 'function') {
    window.onload = func;
  } else {
    window.onload = () => {
      oldOnload();
      func();
    };
  }
}

function del(delElemnt) {
  delElemnt.parentNode.parentNode.removeChild(delElemnt.parentNode);
}

function isDoingItem(e) {
  return e.parentNode.parentNode === document.getElementById('doing');
}

function createItem(value, checked) {
  const doingItem = document.createElement('li');
  const checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  checkBox.checked = checked;
  checkBox.onclick = function () {
    return changeState(this);
  };
  const span = document.createElement('span');
  const itemText = document.createTextNode(value);
  const delButton = document.createElement('button');
  const delText = document.createTextNode('Del');
  span.appendChild(itemText);
  delButton.appendChild(delText);
  delButton.onclick = function () {
    return del(this);
  };
  doingItem.appendChild(checkBox);
  doingItem.appendChild(span);
  doingItem.appendChild(delButton);

  return doingItem;
}

function changeState(checkboxElement) {
  const didList = document.getElementById('did');
  const doingList = document.getElementById('doing');
  const value = checkboxElement.nextSibling.firstChild.nodeValue;
  if (isDoingItem(checkboxElement)) {
    const didItem = createItem(value, true);
    doingList.removeChild(checkboxElement.parentNode);
    didList.appendChild(didItem);
  } else {
    const didItem = createItem(value, false);
    doingList.appendChild(didItem);
    didList.removeChild(checkboxElement.parentNode);
  }
}

function add() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  if (!document.createElement) return false;
  if (!document.createTextNode) return false;
  if (!document.getElementById('doing')) return false;
  if (!document.getElementById('did')) return false;
  const input = document.getElementsByTagName('input')[0];
  if (!input || !input.value) return false;

  const doingList = document.getElementById('doing');
  doingList.appendChild(createItem(input.value));
  input.value = '';
  return false;
}

function prepareTodolist() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementsByTagName('button')[0]) return false;
  const button = document.getElementsByTagName('button')[0];
  button.onclick = add;
  return false;
}

addLoadEvent(prepareTodolist);
