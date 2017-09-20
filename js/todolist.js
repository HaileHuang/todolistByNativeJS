function addLoadEvent(func) {
  var oldOnload = window.onload;
  if(typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldOnload();
      func;
    }
  }
}

function prepareTodolist() {
  if(!document.getElementsByTagName) return false;
  if(!document.getElementsByTagName('button')[0]) return false;
  var button = document.getElementsByTagName('button')[0];
  button.onclick = add;
}

function add() {
  if(!document.getElementsByTagName) return false;
  if(!document.getElementById) return false;
  if(!document.createElement) return false;
  if(!document.createTextNode) return false;
  if(!document.getElementById('doing')) return false;
  if(!document.getElementById('did')) return false;
  var input = document.getElementsByTagName('input')[0];
  if(!input || !input.value)return false;

  var doingList = document.getElementById('doing');
  doingList.appendChild(createItem(input.value));
  input.value = '';
  return false;
}

function createItem(value, checked) {
  if(!checked) checked = false;
  var doingItem = document.createElement('li');
  var checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  checkBox.checked = checked;
  checkBox.onclick = function() {
    return changeState(this);
  }
  var span = document.createElement('span');
  var itemText = document.createTextNode(value);
  span.appendChild(itemText);
  doingItem.appendChild(checkBox);
  doingItem.appendChild(span);

  return doingItem;
}

function changeState(checkboxElement) {
  var didList = document.getElementById('did');
  var doingList = document.getElementById('doing');
  var value = checkboxElement.nextSibling.firstChild.nodeValue;
  if(isDoingItem(checkboxElement)) {
    var didItem = createItem(value, true);
    doingList.removeChild(checkboxElement.parentNode);
    didList.appendChild(didItem);
  } else {
    var didItem = createItem(value, false);
    doingList.appendChild(didItem);
    didList.removeChild(checkboxElement.parentNode);
  }
}

function isDoingItem(e) {
  return e.parentNode.parentNode === document.getElementById('doing');
}

addLoadEvent(prepareTodolist);