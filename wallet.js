/* =========================================
   TANNU VOICE CHAT - SHARED WALLET V1
   ========================================= */

const WALLET_KEY = "tannuWallet";
const COIN_KEY = "tannuCoins";

const DEFAULT_WALLET = {
  coins: 100000,
  transactions: []
};

function getWallet() {
  try {
    const saved = localStorage.getItem(WALLET_KEY);

    if (!saved) {
      const oldCoins = Number(localStorage.getItem(COIN_KEY));

      const wallet = {
        coins: oldCoins > 0 ? oldCoins : DEFAULT_WALLET.coins,
        transactions: []
      };

      saveWallet(wallet);
      return wallet;
    }

    const wallet = JSON.parse(saved);

    return {
      coins: Number(wallet.coins) || 0,
      transactions: Array.isArray(wallet.transactions)
        ? wallet.transactions
        : []
    };

  } catch (error) {
    console.error("Wallet read error:", error);
    return { ...DEFAULT_WALLET };
  }
}


function saveWallet(wallet) {
  localStorage.setItem(WALLET_KEY, JSON.stringify(wallet));

  // Compatibility with existing profile/room code
  localStorage.setItem(COIN_KEY, String(wallet.coins));

  window.dispatchEvent(
    new CustomEvent("tannuWalletUpdated", {
      detail: wallet
    })
  );
}


function getCoins() {
  return getWallet().coins;
}


function formatCoins(amount) {
  amount = Number(amount) || 0;

  if (amount >= 10000000) {
    return (amount / 10000000).toFixed(2).replace(/\.00$/, "") + "Cr";
  }

  if (amount >= 100000) {
    return (amount / 100000).toFixed(2).replace(/\.00$/, "") + "L";
  }

  if (amount >= 1000) {
    return (amount / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }

  return amount.toLocaleString("en-IN");
}


function addCoins(amount, reason = "Coins added") {
  amount = Number(amount);

  if (!Number.isFinite(amount) || amount <= 0) {
    return false;
  }

  const wallet = getWallet();

  wallet.coins += Math.floor(amount);

  wallet.transactions.unshift({
    type: "credit",
    amount: Math.floor(amount),
    reason,
    time: new Date().toISOString()
  });

  wallet.transactions = wallet.transactions.slice(0, 100);

  saveWallet(wallet);

  return true;
}


function spendCoins(amount, reason = "Coins spent") {
  amount = Number(amount);

  if (!Number.isFinite(amount) || amount <= 0) {
    return false;
  }

  amount = Math.floor(amount);

  const wallet = getWallet();

  if (wallet.coins < amount) {
    return false;
  }

  wallet.coins -= amount;

  wallet.transactions.unshift({
    type: "debit",
    amount,
    reason,
    time: new Date().toISOString()
  });

  wallet.transactions = wallet.transactions.slice(0, 100);

  saveWallet(wallet);

  return true;
}


function getTransactions() {
  return getWallet().transactions;
}


function resetWalletDemo() {
  saveWallet({
    coins: DEFAULT_WALLET.coins,
    transactions: []
  });
}


/* Update all common coin elements */
function updateWalletUI() {
  const coins = getCoins();

  document.querySelectorAll(
    "[data-wallet-coins], .wallet-coins, #walletCoins, #coinBalance"
  ).forEach(element => {
    element.textContent = formatCoins(coins);
  });
}


/* Same-page update */
window.addEventListener("tannuWalletUpdated", () => {
  updateWalletUI();
});


/* Other tabs/pages update */
window.addEventListener("storage", event => {
  if (event.key === WALLET_KEY || event.key === COIN_KEY) {
    updateWalletUI();
  }
});


/* Initial update */
document.addEventListener("DOMContentLoaded", () => {
  getWallet();
  updateWalletUI();
});


/* Make functions available globally */
window.TannuWallet = {
  getWallet,
  getCoins,
  formatCoins,
  addCoins,
  spendCoins,
  getTransactions,
  resetWalletDemo,
  updateWalletUI
};
