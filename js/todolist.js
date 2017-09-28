import IndexedDB from './IndexedDB';


const addLoadEvent = (func) => {
  const oldOnload = window.onload;
  if (typeof window.onload !== 'function') {
    window.onload = func;
  } else {
    window.onload = () => {
      oldOnload();
      func();
    };
  }
};

const del = (delElemnt) => {
  delElemnt.parentNode.parentNode.removeChild(delElemnt.parentNode);
};

const createItem = (item, itemKey) => {
  const creatingItem = document.createElement('li');
  const checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  checkBox.checked = item.checked;
  checkBox.onclick = function () {
    const nowTime = new Date().getTime();
    const updatedItem = Object.assign({}, item, { checked: !item.checked, updateDate: nowTime });
    IndexedDB.addOrSet(updatedItem, itemKey).then((data) => {
      console.log('update success!', data);
      return changeState(this, updatedItem, itemKey);
    });
  };
  const span = document.createElement('span');
  const itemText = document.createTextNode(item.title);
  const delButton = document.createElement('button');
  const delText = document.createTextNode('Del');
  span.appendChild(itemText);
  delButton.appendChild(delText);
  delButton.onclick = function () {
    IndexedDB.delete(itemKey).then((data) => {
      console.log('delete success!', data);
      return del(this);
    });
  };
  creatingItem.appendChild(checkBox);
  creatingItem.appendChild(span);
  creatingItem.appendChild(delButton);

  return creatingItem;
};

const changeState = (checkboxElement, item, itemKey) => {
  const didList = document.getElementById('did');
  const doingList = document.getElementById('doing');
  if (item.checked) {
    const didItem = createItem(item, itemKey);
    doingList.removeChild(checkboxElement.parentNode);
    didList.appendChild(didItem);
  } else {
    const didItem = createItem(item, itemKey);
    doingList.appendChild(didItem);
    didList.removeChild(checkboxElement.parentNode);
  }
};

const add = () => {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  if (!document.createElement) return false;
  if (!document.createTextNode) return false;
  if (!document.getElementById('doing')) return false;
  if (!document.getElementById('did')) return false;
  const input = document.getElementsByTagName('input')[0];
  if (!input || !input.value) return false;
  const nowTime = new Date().getTime();
  const item = {
    title: input.value,
    checked: false,
    updateDate: nowTime,
  };
  IndexedDB.addOrSet(item, nowTime).then((data) => {
    console.log('add success!', data);
    const doingList = document.getElementById('doing');
    doingList.appendChild(createItem(item, nowTime));
    input.value = '';
    return false;
  });
  return false;
};

const initDiplay = () => {
  const didList = document.getElementById('did');
  const doingList = document.getElementById('doing');
  IndexedDB.getAll().then((items) => {
    items.sort((a, b) => { // sort by updateDate, latest update display first
      const aKey = Number(Object.keys(a)[0]);
      const bKey = Number(Object.keys(b)[0]);
      return a[aKey].updateDate < b[bKey].updateDate;
    });
    console.log(items);
    items.forEach((item) => {
      const itemKey = Number(Object.keys(item)[0]);
      const itemObj = item[itemKey];
      if (itemObj.checked) {
        didList.appendChild(createItem(itemObj, itemKey));
      } else {
        doingList.appendChild(createItem(itemObj, itemKey));
      }
    });
  });
};

const prepareTodolist = () => {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementsByTagName('button')[0]) return false;
  const button = document.getElementsByTagName('button')[0];
  button.onclick = add;
  initDiplay();
  return false;
};

addLoadEvent(prepareTodolist);
