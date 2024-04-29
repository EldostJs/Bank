////////////Pages/////////////////////

const pageHom = document.querySelector('.page2')

///////////////////////////////////////

const bankCard = document.querySelector('.bank-card')

//////////////////////////////////////

const incrementBtn = document.querySelector('#incrementBtn');
const decrementBtn = document.querySelector('#decrementBtn');
const balanceEl = document.querySelector('#balanceEl');
const listTable = document.querySelector('#list');
const moneyInput = document.querySelector('#moneyInput');
const error = document.querySelector('.error');
const recept = document.querySelector('.recept')
const receptBtn = document.querySelector('#receptBtn')


class BankAccount {
    balance = 0;
    limit = 0;
    hesabat = [];
    date = new Date();

    constructor(verBalance = 0, verLimit = 0) {
        this.balance = verBalance;
        this.limit = verLimit;


    }


    replenish(m) {
        if (this.balance >= this.limit || m <= 0) {
            return;
        }

        this.balance += m;
        const history = {
            num: this.hesabat.length + 1,
            his: `28 Moll, Bravo-Store, ATM`,
            type: 'Replenish',
            balanc: this.balance,
            transaction: `+${m}$`,
            created: this.date
        };

        this.hesabat.push(history);

        this.updateList();

        this.updatePrice()

        return this.balance;
    }

    withdraw(m) {
        if (this.balance <= 0) {
            return;
        }

        this.balance -= m;
        const history = {
            num: this.hesabat.length + 1,
            his: `28 Moll, Bravo-Store`,
            type: "Withdraw",
            balanc: this.balance,
            transaction: `-${m}$`,
            created: this.date
        };

        this.hesabat.push(history);

        this.updatePrice();

        this.updateList();

        return this.balance;
    }


    updatePrice() {

        this.hesabat.forEach(operation => {
            const receptPrice = document.querySelector('.price').textContent = operation.transaction
            const receptData = document.querySelector('.dataRecept').textContent = operation.created
            const receptKind = document.querySelector('.kind').textContent = operation.type
            const receptHis = document.querySelector('.his').textContent = operation.his

        })
    }


    updateList() {
        balanceEl.textContent = this.balance;

        listTable.innerHTML = '';


        this.hesabat.forEach(operation => {
            const row = document.createElement('tr');

            const numberCell = document.createElement('td');
            numberCell.textContent = operation.num;

            const typeCell = document.createElement('td');
            typeCell.textContent = operation.type;

            const transactionCell = document.createElement('td');
            transactionCell.textContent = operation.transaction;

            const balancCell = document.createElement('td');
            balancCell.textContent = `${operation.balanc}$`


            const createdCell = document.createElement('td');
            createdCell.textContent = operation.created.toLocaleString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            }).replace(',', '');

            row.appendChild(numberCell);
            row.appendChild(typeCell);
            row.appendChild(transactionCell);
            row.appendChild(balancCell)
            row.appendChild(createdCell);

            listTable.appendChild(row);
        });
    }
}

const bankAccount = new BankAccount(100, 2000);

incrementBtn.addEventListener('click', function () {
    const value = moneyInput.value;
    bankAccount.replenish(+value);

    moneyInput.value = '';
});

decrementBtn.addEventListener('click', function () {
    const value = moneyInput.value;

    if (moneyInput.value == 0) {
        error.style.display = 'inline-block'
        bankCard.style.display = 'none'
        setTimeout(() => {
            error.style.display = 'none'
            bankCard.style.display = 'inline-block'
            butDiv.style.display = 'inline-block'

        }, 1000)
        return;
    }

    if (value > bankAccount.balance) {
        error.style.display = 'inline-block';
        bankCard.style.display = 'none'
        setTimeout(() => {
            error.style.display = 'none';
            bankCard.style.display = 'inline-block'
        }, 1000);
        return;
    }

    bankAccount.withdraw(+value);
    moneyInput.value = '';
});


receptBtn.addEventListener('click', function () {

    if (bankAccount.hesabat.length === 0) {
        error.style.display = 'inline-block'
    } else {
        recept.style.display = 'inline-block'
        bankCard.style.display = 'none'

    }
    setTimeout(() => {
        error.style.display = 'none'
    },1500)
    const publishBtn = document.querySelector('.checkout-btn').addEventListener('click', () =>{
        recept.style.display = 'none'
        bankCard.style.display = 'inline-block'
    })
})


