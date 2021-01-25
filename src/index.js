const {ipcRenderer} = require('electron');
const axios = require('axios');
const path = require('path');

let price = document.getElementById('price');
let TargetPrice = document.getElementById('TargetPrice');
let TargetPriceVal;

const notification = {
    title: 'BTC Alert',
    body: 'BTC just beat your target price!',
    icon: "../assets/images/btc2.png"
};


const getBTC = () => {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,INR')
    .then(res => {
        const crypto_usd = res.data.BTC.USD;
        const crypto_inr = res.data.BTC.INR;
        price.innerHTML = '$' + crypto_usd.toLocaleString('en') + 
                          '<br/>or<br/>₹' + crypto_inr.toLocaleString('en');
        if (TargetPrice.innerHTML != '' && TargetPriceVal < res.data.BTC.USD) {
            const myNotification = new window.Notification(notification.title, notification);
        }
    });
};

getBTC();
setInterval(getBTC, 10000);

document.getElementById('notifyBtn').addEventListener('click', event => {
    ipcRenderer.send('main:add');
});


ipcRenderer.on('targetPriceVal', function (event, args){
    TargetPriceVal = Number(args)
    TargetPrice.innerHTML = ' $' + TargetPriceVal.toLocaleString('en');    
});


window.onerror = function(msg, url, linenumber) {
    alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
    return true;
}