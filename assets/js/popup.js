function script() {
    // Show Popup's
    const transferBTNPopup = document.querySelector('#transferBTNConfig');
    const withdrawBTNPopup = document.querySelector('#withdrawBTNConfig');

    const popupTransfer = document.querySelector('#popup-transfer');
    const popupWithdraw = document.querySelector('#popup-withdraw');

    function showTransfer() {
        document.querySelector('.transfer-popup').style.display = 'block';
        popupTransfer.classList.add('active')
    }
    function showWithdraw() {
        document.querySelector('.withdraw-popup').style.display = 'block';
        popupWithdraw.classList.add('active')
    }
    function hideAll() {
        document.querySelector('.transfer-popup').style.display = 'none';
        document.querySelector('.withdraw-popup').style.display = 'none';
        popupTransfer.classList.remove('active');
        popupWithdraw.classList.remove('active');
    }

    transferBTNPopup.addEventListener('click', function(event){
        if (popupTransfer.classList.contains('active')) {
            hideAll();
        }
        else if (popupWithdraw.classList.contains('active')) {
            hideAll();
            showTransfer();
        }
        else {
            showTransfer();
        }
    });
    withdrawBTNPopup.addEventListener('click', function(event){
        if (popupWithdraw.classList.contains('active')) {
            hideAll();
        }
        else if (popupTransfer.classList.contains('active')) {
            hideAll();
            showWithdraw();
        }
        else {
            showWithdraw();
        }
    })
};
script();