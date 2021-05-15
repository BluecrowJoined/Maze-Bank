function script() {
    let client = {
        clientName: 'Koel Soze', 
        clientID: 439, 
        clientMoney: 56900, 
        clientTransactions: [ 
            {
                transactionType: 'saque',
                transactionDestiny: null, 
                transactionValue: 553, 
                transactionClientName: 'Koel Soze', 
                transactionDate: '19:33:54 21/12/2000', 
                transactionNote: 'car repair'
            },
            {
                transactionType: 'transferencia',
                transactionDestiny: 'forME', 
                transactionValue: 5583, 
                transactionClientName: 'Kevin Stark', 
                transactionDate: '19:33:54 21/12/2000', 
                transactionNote: 'aluguel'
            }
        ],
    };
    
    const otherClients = [
        {clientName: 'Jaiden Foster', clientID: 887, clientMoney: 5400, clientTransactions: []},
        {clientName: 'Terrance Trabelsi', clientID: 937, clientMoney: 900, clientTransactions: []},
        {clientName: 'Carson Yellins', clientID: 207, clientMoney: 100900, clientTransactions: []},
    ];


// Show Client Money
// ----------------------------------------------------------------------------
    showClientBalance();
    function showClientBalance() {
        const showClientMoney = document.querySelector('#clientBalance');
        let money = moneyFormat(client.clientMoney);
        showClientMoney.innerHTML = money;
    };
// ----------------------------------------------------------------------------
    


// Transactions Exhibitions
// ----------------------------------------------------------------------------
    const showTransactions_COLUMN = document.querySelector('#transactions');
    
    for (let i = 0; i < client.clientTransactions.length; i++) {
        let transactionType = client.clientTransactions[i].transactionType;
        let transactionDestiny = client.clientTransactions[i].transactionDestiny;
        let transactionValue = client.clientTransactions[i].transactionValue;
        let transactionClientName = client.clientTransactions[i].transactionClientName;
        let transactionDate = client.clientTransactions[i].transactionDate;
        let transactionNote = client.clientTransactions[i].transactionNote;

        CREATE_TRANSACTION_BOX(transactionType, transactionDestiny, transactionValue, transactionClientName, transactionDate, transactionNote);
    }

    function CREATE_TRANSACTION_BOX(type, destiny, value, name, date, note) {
        const TRANSACTION_BOX = document.createElement("DIV");
        TRANSACTION_BOX.classList.add("transaction-box");

        let typeValue = 'remove-money';
        if (type === 'transferencia' && destiny === 'forME') {
            typeValue = 'add-money'
        }
        
        function formatValue(destiny, value) {
            if (destiny === null || destiny === 'forHE') {
                value = String(value)
                value = `-$${moneyFormat(value)}`
                return value
            }
            else if (destiny === 'forME') {
                value = `$${moneyFormat(value)}`
                return value
            }
        }

        TRANSACTION_BOX.innerHTML = 
        `
        <div>
            <span class="transaction-type">${type}</span>
            <hr class="transaction-divisor">
            <table>
                <tr>
                    <td class="transaction-value ${typeValue}">${formatValue(destiny, value)}</td>
                    <td class="transaction-name">${name}</td>
                    <td class="transaction-date">${date}</td>
                </tr>
            </table>
            <div class="transaction-note">
                <p>
                    <span>nota:</span> ${note}
                </p>
            </div>
        </div>
        `
        showTransactions_COLUMN.appendChild(TRANSACTION_BOX);
    }
// ----------------------------------------------------------------------------



// Insert Transactions Type Transfer
// -------------------------------------------------------------------
    const TRANSFER_FORM = document.querySelector('#transferForm');
    const notificationTransfer = document.querySelector('#transfer-notification')
    function transferAccount(event) {
        event.preventDefault();
        const TRANSFER_VALOR = document.querySelector('#transferFormValue').value;
        const TRANSFER_ID = document.querySelector('#transferFormID').value;
        const TRANSFER_NOTE = document.querySelector('#transferFormNote').value;

        validateTransfer(TRANSFER_VALOR, TRANSFER_ID, TRANSFER_NOTE);
    }
    function validateTransfer(TRANSFER_VALOR, TRANSFER_ID, TRANSFER_NOTE) {
        if (isNaN(TRANSFER_VALOR) || isNaN(TRANSFER_ID) || TRANSFER_VALOR === '' || TRANSFER_ID === '' || TRANSFER_VALOR <= 0 || TRANSFER_ID <= 0 || TRANSFER_VALOR > client.clientMoney) {
            // ERRO DE CREDENCIAL
            notificationTransfer.classList.add('active');
        }
        else if (!isNaN(TRANSFER_VALOR) && !isNaN(TRANSFER_ID) && TRANSFER_VALOR <= client.clientMoney) {
            TRANSFER_VALOR = Number(TRANSFER_VALOR);
            TRANSFER_ID = Number(TRANSFER_ID);
            if (clientExistCheck(TRANSFER_ID) === true) {
                notificationTransfer.classList.remove('active')
                client.clientMoney = client.clientMoney - TRANSFER_VALOR
                showClientBalance();
                
                console.log(searchClientOBJECT(TRANSFER_ID))
                
                client.clientTransactions.push(
                    {
                        transactionType: 'transferencia',
                        transactionDestiny: 'forHE',
                        transactionValue: TRANSFER_VALOR, 
                        transactionClientName: searchClientName(TRANSFER_ID), 
                        transactionDate: date(), 
                        transactionNote: TRANSFER_NOTE,
                    }
                )
                transferOtherAccount(searchClientOBJECT(TRANSFER_ID), TRANSFER_VALOR, client.clientName, date(), TRANSFER_NOTE)
                console.log(searchClientOBJECT(TRANSFER_ID))

                const popupTransfer = document.querySelector('#popup-transfer');
                popupTransfer.classList.remove('active');
                document.querySelector('.transfer-popup').style.display = 'none';
                showAlert('transferência');
                CREATE_TRANSACTION_BOX('transferência', 'forHE', TRANSFER_VALOR, searchClientName(TRANSFER_ID), date(), TRANSFER_NOTE);
                resetInputValue('transfer')
            }
        }
    }
    TRANSFER_FORM.addEventListener('submit', transferAccount);
// -------------------------------------------------------------------



// Insert Transactions Type Withdraw
// -------------------------------------------------------------------
    const WITHDRAW_FORM = document.querySelector('#withdrawForm');
    const notificationWithdraw= document.querySelector('#withdraw-notification')
    function withdrawAccount(event) {
        event.preventDefault();
        const WITHDRAW_VALOR = document.querySelector('#withdrawFormValue').value;
        const WITHDRAW_NOTE = document.querySelector('#withdrawFormNote').value;

        validateWithdraw(WITHDRAW_VALOR, WITHDRAW_NOTE);
    }
    function validateWithdraw(VALOR, NOTE) {
        if  (isNaN(VALOR) || VALOR === '' || VALOR <= 0 || VALOR > client.clientMoney) {
            // MOSTRAR ERRO AO  USUÁRIO
            notificationWithdraw.classList.add('active')
        }
        else if (!isNaN(VALOR)) {
            VALOR = Number(VALOR)
            if (VALOR <= client.clientMoney) {
                notificationWithdraw.classList.remove('active')
                client.clientMoney = client.clientMoney - VALOR
                showClientBalance();
                client.clientTransactions.push(
                    {
                        transactionType: 'saque',
                        transactionDestiny: null,
                        transactionValue: VALOR, 
                        transactionClientName: client.clientName, 
                        transactionDate: date(), 
                        transactionNote: NOTE,
                    }
                )
                const popupWithdraw = document.querySelector('#popup-withdraw');
                popupWithdraw.classList.remove('active');
                document.querySelector('.withdraw-popup').style.display = 'none';
                resetInputValue('withdraw')
                showAlert('saque');
                CREATE_TRANSACTION_BOX('saque', null, VALOR, client.clientName, date(), NOTE);
            }
        }
    }

    WITHDRAW_FORM.addEventListener('submit', withdrawAccount)
//--------------------------------------------------------------------



// FUNCTIONS 
// -------------------------------
function resetInputValue(type) {
    if (type === 'transfer') {
        document.querySelector('#transferFormValue').value = '';
        document.querySelector('#transferFormID').value= '';
        document.querySelector('#transferFormNote').value = '';
    }
    else if (type === 'withdraw') {
        document.querySelector('#withdrawFormValue').value = '';
        document.querySelector('#withdrawFormNote').value = '';
    }
}
function clientExistCheck(TRANSFER_ID) {
    for (let indexOtherClient = 0; indexOtherClient < otherClients.length; indexOtherClient++) {
        const otherClientID = otherClients[indexOtherClient].clientID
        if (TRANSFER_ID === otherClientID) {
            return true
        }
        else if (TRANSFER_ID !== otherClientID) {
            continue
        }
    }
}
function searchClientName(TRANSFER_ID) {
    for (let searchClient = 0; searchClient < otherClients.length; searchClient++) {
        const otherClient = otherClients[searchClient]
        if (otherClient.clientID === TRANSFER_ID) {
            return otherClient.clientName
        }  
    }
}
function searchClientOBJECT(ID) {
    for (let searchClient = 0; searchClient < otherClients.length; searchClient++) {
        if (otherClients[searchClient].clientID === ID) {
            return otherClients[searchClient]
        }
    }
}
function transferOtherAccount(clientOBJ, TRANSACTION_VALOR, TRANSACTION_NAME, TRANSACTION_DATE, TRANSACTION_NOTE) {
    clientOBJ.clientMoney = clientOBJ.clientMoney + TRANSACTION_VALOR
    clientOBJ.clientTransactions.push(
        {
            transactionType: 'transferencia',
            transactionDestiny: 'forME',
            transactionValue: TRANSACTION_VALOR, 
            transactionClientName: TRANSACTION_NAME, 
            transactionDate: TRANSACTION_DATE, 
            transactionNote: TRANSACTION_NOTE,
        }
    )
}
function date() {
    function dateFormatter(insertNumber) {
        if (insertNumber < 10 || insertNumber === 0) {
            insertNumber = `0${insertNumber}`;
        }
        return insertNumber
    };
    const date = new Date();
    const dateDay = dateFormatter(date.getDate());
    const dateMonth = dateFormatter(date.getMonth());
    const dateYear = dateFormatter(date.getFullYear());
    const dateHour = dateFormatter(date.getHours());
    const dateMinute = dateFormatter(date.getMinutes());
    const dateSeconds = dateFormatter(date.getSeconds());
    return `${dateHour}:${dateMinute}:${dateSeconds} ${dateDay}/${dateMonth}/${dateYear}`
}
function moneyFormat(money) {
    let money_format = Intl.NumberFormat('en-IN');
    return `${money_format.format(money)}.00`;
}
function showAlert(type) {
    const showAlert = document.querySelector('#alert');
    showAlert.classList.add('active')
    const alertType = document.querySelector('.alert-type');
    alertType.innerHTML = type
    const alertBlur = document.querySelector('.everything');
    alertBlur.classList.add('alert-blur');

    document.onclick = (e) => {
        if (e.target.id !== 'alert') {
            closeAlert();
        }
    }
    document.querySelector('.alert-close').onclick = () => closeAlert();
}
function closeAlert() {
    const closeAlert = document.querySelector('#alert');
    closeAlert.classList.remove('active');
    const alertBlur = document.querySelector('.everything');
    alertBlur.classList.remove('alert-blur');
}
};
script();