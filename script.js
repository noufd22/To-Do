

// التعامل مع قائمة المهام
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
    updateStats(); // تحديث الإحصائيات
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
    updateStats(); // تحديث الإحصائيات
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    updateStats(); // تحديث الإحصائيات
}
showTask();

function updateStats() {
    const totalTasks = listContainer.children.length;
    const completedTasks = document.querySelectorAll(".checked").length;
    const pendingTasks = totalTasks - completedTasks;

    // document.getElementById("stats").innerHTML = `
    //     Total: ${totalTasks}, Completed: ${completedTasks}, Pending: ${pendingTasks}
    // `;


//     document.getElementById("stats").innerHTML = `
//     <img src="total.png"> Total: ${totalTasks} <br>
//      <img src="completed.png"> Completed: ${completedTasks} <br>
//      <img src="pending.png"> Pending: ${pendingTasks}
// `;
// }

document.getElementById("stats").innerHTML = `
    <span class="stat-item"><img src="/media/total.png" class="stat-icon"> Total: ${totalTasks}</span><br>
    <span class="stat-item"><img src="/media/completed.png" class="stat-icon"> Completed: ${completedTasks}</span><br>
    <span class="stat-item"><img src="/media/pending.png" class="stat-icon"> Pending: ${pendingTasks}</span>
`;
}




// التعامل مع الملاحظات المحسّنة
document.addEventListener("DOMContentLoaded", function () {
    const noteBox = document.getElementById("note-box");

    // استرجاع النص المحفوظ
    noteBox.innerHTML = localStorage.getItem("note") || "";

    // حفظ النصوص عند الكتابة
    noteBox.addEventListener("input", function () {
        localStorage.setItem("note", noteBox.innerHTML);
    });
});

// تنسيق النص
function formatText(command) {
    document.execCommand(command, false, null);
}