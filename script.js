let transactions = [];

try {
  transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];
} catch (error) {
  transactions = [];
}
function addTransaction() {
  const amountInput =
    document.getElementById("amountInput");

  const categoryInput =
    document.getElementById("categoryInput");

  const typeInput =
    document.getElementById("typeInput");

  const amount = Number(amountInput.value);
  const category = categoryInput.value.trim();
  const type = typeInput.value;

  if (amount <= 0 || isNaN(amount)) {
    alert("กรุณากรอกจำนวนเงินให้ถูกต้อง");
    return;
  }

  if (category === "") {
    alert("กรุณากรอกหมวดหมู่");
    return;
  }

  transactions.push({
    type: type,
    amount: amount,
    category: category,
    date: new Date().toLocaleString("th-TH"),
    dateKey: getTodayKey(),
  });

saveData();
updateDashboard();
updateWorkStatus();
updateTransactions();
updateWorkHistory();

  amountInput.value = "";
  categoryInput.value = "";
}
function addIncome() {
  const amount = prompt("กรอกจำนวนรายรับ");

  if (amount === null || amount.trim() === "") {
    return;
  }

  const number = Number(amount);

  if (isNaN(number) || number <= 0) {
    alert("กรุณากรอกจำนวนเงินให้ถูกต้อง");
    return;
  }

  const category = prompt(
    "กรอกชื่อหรือหมวดหมู่ เช่น Grab, Bolt, เงินเดือน"
  );

  if (category === null || category.trim() === "") {
    return;
  }

  transactions.push({
    type: "income",
    amount: number,
    category: category,
    date: new Date().toLocaleString("th-TH")
  });

  saveData();
  updateDashboard();
  updateTransactions();
}

function addExpense() {
  const amount = prompt("กรอกจำนวนรายจ่าย");

  if (amount === null || amount.trim() === "") {
    return;
  }

  const number = Number(amount);

  if (isNaN(number) || number <= 0) {
    alert("กรุณากรอกจำนวนเงินให้ถูกต้อง");
    return;
  }

  const category = prompt(
    "กรอกชื่อหรือหมวดหมู่ เช่น อาหาร, น้ำมัน, ค่าโทรศัพท์"
  );

  if (category === null || category.trim() === "") {
    return;
  }

  transactions.push({
    type: "expense",
    amount: number,
    category: category,
    date: new Date().toLocaleString("th-TH")
  });

  saveData();
  updateDashboard();
  updateTransactions();
}
function editTransaction(index) {
  const transaction = transactions[index];

  const newAmount = prompt(
    "แก้ไขจำนวนเงิน",
    transaction.amount
  );

  if (newAmount === null || newAmount.trim() === "") {
    return;
  }

  const number = Number(newAmount);

  if (isNaN(number) || number <= 0) {
    alert("กรุณากรอกจำนวนเงินให้ถูกต้อง");
    return;
  }

  const newCategory = prompt(
    "แก้ไขชื่อหรือหมวดหมู่",
    transaction.category || ""
  );

  if (newCategory === null || newCategory.trim() === "") {
    return;
  }

  transaction.amount = number;
  transaction.category = newCategory;

  saveData();
  updateDashboard();
  updateTransactions();
}
function deleteTransaction(index) {
  const confirmed = confirm("ต้องการลบรายการนี้ใช่ไหม?");

  if (!confirmed) {
    return;
  }

  transactions.splice(index, 1);

  saveData();
  updateDashboard();
  updateTransactions();
}

function saveData() {
  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );
}

function updateDashboard() {
  let income = 0;
  let expense = 0;

  transactions.forEach(function(transaction) {
    if (transaction.type === "income") {
      income += Number(transaction.amount);
    } else if (transaction.type === "expense") {
      expense += Number(transaction.amount);
    }
  });

  const balance = income - expense;

  document.getElementById("income").textContent =
    "฿" + income;

  document.getElementById("expense").textContent =
    "฿" + expense;

  document.getElementById("balance").textContent =
    "฿" + balance;
}

function updateTransactions() {
  const list = document.getElementById("transactionList");

  if (!list) {
    return;
  }

  if (transactions.length === 0) {
    list.innerHTML = "<p>ยังไม่มีรายการ</p>";
    return;
  }

  list.innerHTML = "";

  transactions
    .map(function(transaction, index) {
      return {
        transaction: transaction,
        index: index
      };
    })
    .reverse()
    .forEach(function(itemData) {

      const transaction = itemData.transaction;
      const index = itemData.index;

      const item = document.createElement("div");
      item.className = "transaction";

      const category =
        transaction.category || "ไม่ระบุหมวดหมู่";

      const date =
        transaction.date || "รายการเก่า";

      let symbol = "-";
      let typeText = "รายจ่าย";

      if (transaction.type === "income") {
        symbol = "+";
        typeText = "รายรับ";
      }

      item.innerHTML =
        "<div>" +
          "<strong>" +
            symbol + " ฿" + transaction.amount +
          "</strong>" +
          "<br>" +
          category + " | " + typeText +
          "<br>" +
          "<small>" + date + "</small>" +
        "</div>" +

        '<div class="action-buttons">' +

            '<button class="edit-btn" onclick="editTransaction(' +
                index +
            ')">แก้ไข</button>' +

            '<button class="delete-btn" onclick="deleteTransaction(' +
                 index +
             ')">ลบ</button>' +

    '</div>';

      list.appendChild(item);
    });
}
function showPage(pageId) {
  const pages = document.querySelectorAll(".page");

  pages.forEach(function(page) {
    page.style.display = "none";
  });

  document.getElementById(pageId).style.display = "block";
}let habits = [];

try {
  habits =
    JSON.parse(localStorage.getItem("habits")) || [];
} catch (error) {
  habits = [];
}

function addHabit() {
  const input = document.getElementById("habitInput");
  const name = input.value.trim();
  const type = document.getElementById("habitType").value;

  if (name === "") {
    alert("กรุณากรอกชื่อนิสัย");
    return;
  }

  habits.push({
  name: name,
  type: type,
  createdDate: getTodayKey(),
  history: {}
});

  localStorage.setItem(
    "habits",
    JSON.stringify(habits)
  );

  input.value = "";

  updateHabits();
}

function toggleHabit(index) {
  const today = getTodayKey();

  if (!habits[index].history) {
    habits[index].history = {};
  }

  habits[index].history[today] =
    !habits[index].history[today];

  localStorage.setItem(
    "habits",
    JSON.stringify(habits)
  );

  updateHabits();
}

function updateHabits() {
  const list = document.getElementById("habitList");

  if (!list) {
    return;
  }

  if (habits.length === 0) {
    list.innerHTML = "<p>ยังไม่มีนิสัย</p>";
    return;
  }

  list.innerHTML =
    "<h3>นิสัยที่อยากสร้าง</h3>" +
    '<div id="buildHabitList"></div>' +
    "<h3>นิสัยที่อยากเลิก</h3>" +
    '<div id="quitHabitList"></div>';

  const buildList =
    document.getElementById("buildHabitList");

  const quitList =
    document.getElementById("quitHabitList");

  habits.forEach((habit, index) => {
  const item = document.createElement("div");
  item.className = "habit-item";

  const today = getTodayKey();

if (habit.history && habit.history[today]) {
  item.classList.add("habit-done");
} else if (
  habit.createdDate &&
  habit.createdDate < today
) {
  item.classList.add("habit-missed");
}

  // โค้ดเดิมด้านล่างต่อไป

    item.innerHTML =
      '<input type="checkbox" ' +
      (habit.history && habit.history[getTodayKey()]
  ? "checked"
  : "") +
      ' onchange="toggleHabit(' + index + ')">' +
      "<span>" + habit.name + "</span>";

    if (habit.type === "quit") {
      quitList.appendChild(item);
    } else {
      buildList.appendChild(item);
    }
  });
}

function getTodayKey() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return year + "-" + month + "-" + day;
}

function getYesterdayKey() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, "0");
  const day = String(yesterday.getDate()).padStart(2, "0");

  return year + "-" + month + "-" + day;
}
function updateWorkStatus() {
  const workStatus = document.getElementById("workStatus");
  const workStatusText = document.getElementById("workStatusText");
  const todayIncomeText = document.getElementById("todayIncome");

  if (!workStatus || !workStatusText || !todayIncomeText) {
    return;
  }

  const today = getTodayKey();
  const thaiToday = new Date().toLocaleDateString("th-TH");

  let todayIncome = 0;

  transactions.forEach(function(transaction) {
    const isToday =
      transaction.dateKey === today ||
      (
        !transaction.dateKey &&
        transaction.date &&
        transaction.date.startsWith(thaiToday)
      );

    if (
      transaction.type === "income" &&
      isToday
    ) {
      todayIncome += Number(transaction.amount);
    }
  });

  workStatus.classList.remove(
    "work-done",
    "work-missed"
  );

  if (todayIncome > 0) {
    workStatus.classList.add("work-done");
    workStatusText.textContent = "🟢 ทำงานแล้ว";
  } else {
    workStatus.classList.add("work-missed");
    workStatusText.textContent = "🔴 ยังไม่มีรายรับวันนี้";
  }

  todayIncomeText.textContent =
    "รายรับวันนี้ ฿" + todayIncome;
}function updateWorkHistory() {
  const list = document.getElementById("workHistoryList");

  if (!list) {
    return;
  }

  list.innerHTML = "";

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const dateKey = year + "-" + month + "-" + day;
    const thaiDate = date.toLocaleDateString("th-TH");

    let dailyIncome = 0;

    transactions.forEach(function(transaction) {
      const isThisDay =
        transaction.dateKey === dateKey ||
        (
          !transaction.dateKey &&
          transaction.date &&
          transaction.date.startsWith(thaiDate)
        );

      if (
        transaction.type === "income" &&
        isThisDay
      ) {
        dailyIncome += Number(transaction.amount);
      }
    });

    const item = document.createElement("div");
    item.className = "work-history-item";

    if (dailyIncome > 0) {

  item.classList.add("worked");

  item.innerHTML =
    "<strong>🟢 " + thaiDate + "</strong>" +
    "<span>ทำงาน | ฿" + dailyIncome + "</span>";

} else if (i === 0) {

  item.classList.add("pending");

  item.innerHTML =
    "<strong>🟡 " + thaiDate + "</strong>" +
    "<span>รอดำเนินการ</span>";

} else {

  item.classList.add("not-worked");

  item.innerHTML =
    "<strong>🔴 " + thaiDate + "</strong>" +
    "<span>ไม่ได้ทำงาน</span>";
}

    list.appendChild(item);
  }
}let goals = [];

try {
  goals =
    JSON.parse(localStorage.getItem("goals")) || [];
} catch (error) {
  goals = [];
}

function addGoal() {
  const nameInput =
    document.getElementById("goalNameInput");

  const amountInput =
    document.getElementById("goalAmountInput");

  const name = nameInput.value.trim();
  const amount = Number(amountInput.value);

  if (name === "") {
    alert("กรุณากรอกชื่อเป้าหมาย");
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    alert("กรุณากรอกจำนวนเงินเป้าหมายให้ถูกต้อง");
    return;
  }

  goals.push({
    name: name,
    target: amount,
    saved: 0
  });

  saveGoals();
  updateGoals();

  nameInput.value = "";
  amountInput.value = "";
}

function saveGoals() {
  localStorage.setItem(
    "goals",
    JSON.stringify(goals)
  );
}
function addGoalMoney(index) {
  const amount = prompt("กรอกจำนวนเงินที่ต้องการเพิ่ม");

  if (amount === null || amount.trim() === "") {
    return;
  }

  const number = Number(amount);

  if (isNaN(number) || number <= 0) {
    alert("กรุณากรอกจำนวนเงินให้ถูกต้อง");
    return;
  }

  goals[index].saved += number;

  saveGoals();
  function editGoal(index) {
  const goal = goals[index];

  const newName = prompt(
    "แก้ไขชื่อเป้าหมาย",
    goal.name
  );

  if (newName === null || newName.trim() === "") {
    return;
  }

  const newTarget = prompt(
    "แก้ไขจำนวนเงินเป้าหมาย",
    goal.target
  );

  if (newTarget === null || newTarget.trim() === "") {
    return;
  }

  const number = Number(newTarget);

  if (isNaN(number) || number <= 0) {
    alert("กรุณากรอกจำนวนเงินให้ถูกต้อง");
    return;
  }

  goal.name = newName.trim();
  goal.target = number;

  saveGoals();
  updateGoals();
}

function deleteGoal(index) {
  const confirmed = confirm(
    "ต้องการลบเป้าหมายนี้ใช่ไหม?"
  );

  if (!confirmed) {
    return;
  }

  goals.splice(index, 1);

  saveGoals();
  updateGoals();
}
  updateGoals();
}
function updateGoals() {
  const list = document.getElementById("goalList");

  if (!list) {
    return;
  }

  if (goals.length === 0) {
    list.innerHTML = "<p>ยังไม่มีเป้าหมาย</p>";
    return;
  }

  list.innerHTML = "";

  goals.forEach(function(goal, index) {
  const item = document.createElement("div");
  item.className = "goal-item";

  const percent = Math.min(
    100,
    Math.round((goal.saved / goal.target) * 100)
  );

  item.innerHTML =
    "<strong>" + goal.name + "</strong>" +
    "<p>เป้าหมาย ฿" + goal.target + "</p>" +
    "<p>เก็บแล้ว ฿" + goal.saved + "</p>" +

    '<div class="goal-progress">' +
      '<div class="goal-progress-bar" style="width:' +
        percent +
      '%"></div>' +
    '</div>' +

    "<p>" + percent + "%</p>" +

    '<div class="goal-actions">' +

  '<button onclick="addGoalMoney(' +
    index +
  ')">เพิ่มเงิน</button>' +

  '<button onclick="editGoal(' +
    index +
  ')">แก้ไข</button>' +

  '<button onclick="deleteGoal(' +
    index +
  ')">ลบ</button>' +

'</div>';

  list.appendChild(item);
});
}
function updateSummary() {
  let totalIncome = 0;
  let totalExpense = 0;
  let todayIncome = 0;
  let completedHabits = 0;

  const today = getTodayKey();

  transactions.forEach(function(transaction) {
    if (transaction.type === "income") {
      totalIncome += Number(transaction.amount);
    }

    if (transaction.type === "expense") {
      totalExpense += Number(transaction.amount);
    }

    if (
      transaction.type === "income" &&
      transaction.dateKey === today
    ) {
      todayIncome += Number(transaction.amount);
    }
  });

  habits.forEach(function(habit) {
    if (
      habit.history &&
      habit.history[today]
    ) {
      completedHabits++;
    }
  });

  const balance = totalIncome - totalExpense;

  document.getElementById("summaryBalance").textContent =
    "฿" + balance;

  document.getElementById("summaryIncome").textContent =
    "฿" + totalIncome;

  document.getElementById("summaryExpense").textContent =
    "฿" + totalExpense;

  document.getElementById("summaryTodayIncome").textContent =
    "฿" + todayIncome;

  document.getElementById("summaryHabits").textContent =
    completedHabits;

  document.getElementById("summaryGoals").textContent =
    goals.length;

  document.getElementById("summaryWorkStatus").textContent =
    todayIncome > 0 ? "🟢 ทำงานแล้ว" : "🟡 รอดำเนินการ";
}
updateHabits();
updateDashboard();
updateTransactions();
updateWorkStatus();
updateWorkHistory();
updateGoals();
updateSummary();