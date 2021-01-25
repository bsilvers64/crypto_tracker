const { remote, ipcRenderer} = require('electron');
const path = require('path');


const updateBtn = document.getElementById('updateBtn')
updateBtn.addEventListener('click', () => {
    ipcRenderer.send('update-notify-value', document.getElementById('notifyVal').value);
    var window = remote.getCurrentWindow();
    window.close();
})

const closeBtn = document.getElementById('closeBtn')
closeBtn.addEventListener('click', event => {
    var window = remote.getCurrentWindow();
    window.close();
})


window.onerror = function(msg, url, linenumber) {
    alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
    return true;
}