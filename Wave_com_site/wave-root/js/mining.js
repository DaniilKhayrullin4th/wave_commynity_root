class WaveMiner {
    constructor() {
        this.isMining = false;
        this.interval = null;
        this.hashRate = 0;
        this.rewardRate = 0.01; // WAC per second
    }

    start() {
        if (this.isMining) return;
        
        this.isMining = true;
        this.hashRate = Math.floor(Math.random() * 100) + 50;
        
        document.querySelector('.mining-status').textContent = 'Active';
        document.querySelector('.mining-status').classList.add('mining-active');
        document.querySelector('.mining-hashrate').textContent = `${this.hashRate} H/s`;
        
        this.interval = setInterval(() => this.updateBalance(), 1000);
    }

    stop() {
        clearInterval(this.interval);
        this.isMining = false;
        this.hashRate = 0;
        
        document.querySelector('.mining-status').textContent = 'Inactive';
        document.querySelector('.mining-status').classList.remove('mining-active');
        document.querySelector('.mining-hashrate').textContent = '0 H/s';
    }

    updateBalance() {
        if (!wallet.isConnected) {
            this.stop();
            return;
        }
        
        const reward = (Math.random() * this.rewardRate).toFixed(4);
        const balanceElement = document.querySelector('.card-balance .amount');
        const currentBalance = parseFloat(balanceElement.textContent);
        wallet.balance = (currentBalance + parseFloat(reward)).toFixed(2);
        balanceElement.textContent = `${wallet.balance} WAC`;
    }
}

const miner = new WaveMiner();

document.querySelector('.start-mining')?.addEventListener('click', () => {
    if (!wallet.isConnected) {
        wallet.showNotification('Сначала подключите кошелёк', 'error');
        return;
    }
    
    if (miner.isMining) {
        miner.stop();
        document.querySelector('.start-mining').textContent = 'Начать майнинг';
    } else {
        miner.start();
        document.querySelector('.start-mining').textContent = 'Остановить майнинг';
    }
});