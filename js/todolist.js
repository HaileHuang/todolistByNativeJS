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
  var input = document.getElementsByTagName('input')[0];
  if(!input || !input.value)return false;
  var doingList = document.getElementById('doing');
  var doingItem = document.createElement('li');
  var itemText = document.createTextNode(input.value);
  doingItem.appendChild(itemText);
  doingList.appendChild(doingItem);
  input.value = '';
  return false;
}

addLoadEvent(prepareTodolist);