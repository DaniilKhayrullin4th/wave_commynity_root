class WaveWallet {
    constructor() {
        this.walletAddress = null;
        this.balance = 0;
        this.isConnected = false;
    }

    async connect() {
        try {
            // Simulate wallet connection
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            this.walletAddress = this.generateMockAddress();
            this.balance = (Math.random() * 5000 + 1000).toFixed(2);
            this.isConnected = true;
            
            this.updateUI();
            this.showNotification('Кошелёк успешно подключен!');
            
            return this.walletAddress;
        } catch (error) {
            console.error("Wallet connection error:", error);
            this.showNotification('Ошибка подключения кошелька', 'error');
        }
    }

    generateMockAddress() {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return '7xQZ' + result + '4rT9';
    }

    updateUI() {
        if (this.isConnected) {
            document.querySelector('.card-address .address').textContent = this.walletAddress;
            document.querySelector('.card-balance .amount').textContent = `${this.balance} WAC`;
            document.querySelector('.connect-wallet').textContent = 'Отключить кошелёк';
        } else {
            document.querySelector('.card-address .address').textContent = 'Не подключен';
            document.querySelector('.card-balance .amount').textContent = '0.00 WAC';
            document.querySelector('.connect-wallet').textContent = 'Подключить кошелёк';
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
}

const wallet = new WaveWallet();

document.querySelector('.connect-wallet')?.addEventListener('click', () => {
    if(wallet.isConnected) {
        wallet.isConnected = false;
        wallet.updateUI();
        wallet.showNotification('Кошелёк отключен');
    } else {
        wallet.connect();
    }
});