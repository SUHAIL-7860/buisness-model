window.onload = function () {
  const form = document.getElementById('transactionForm');
  const transactionList = document.getElementById('transactionList');

  let totalCredit = 0;
  let totalDebit = 0;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const date = document.getElementById('date').value;
    const note = document.getElementById('note').value;

    try {
      await db.collection("transactions").add({
        name,
        amount,
        type,
        date,
        note
      });

      form.reset();
      loadTransactions();
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  });

  async function loadTransactions() {
    try {
      transactionList.innerHTML = '';
      totalCredit = 0;
      totalDebit = 0;

      const snapshot = await db.collection("transactions").orderBy("date", "desc").get();
      snapshot.forEach(doc => {
        const data = doc.data();
        const li = document.createElement('li');
        li.textContent = `${data.date} - ${data.name} - ₹${data.amount} - ${data.type.toUpperCase()} - ${data.note}`;
        transactionList.appendChild(li);

        if (data.type === 'credit') totalCredit += data.amount;
        else totalDebit += data.amount;
      });

      document.getElementById('totalCredit').textContent = totalCredit;
      document.getElementById('totalDebit').textContent = totalDebit;
      document.getElementById('balance').textContent = totalCredit - totalDebit;
    } catch (error) {
      console.error("Error loading transactions:", error);
    }
  }

  loadTransactions();
};


