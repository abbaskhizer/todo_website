// 1) Navbar Mobile Menu (show/hide)
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
}

// 2) Get HTML elements for Todo
const form = document.getElementById("todoForm");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const tableBody = document.getElementById("tableBody");
const countEl = document.getElementById("count");
const msg = document.getElementById("msg");
const clearAllBtn = document.getElementById("clearAll");

// 3) LocalStorage helper functions
function getTodos() {
    // if nothing in storage, return empty array []
    return JSON.parse(localStorage.getItem("todos")) || [];
}

function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// 4) Show message (error)
function showMessage(text) {
    msg.textContent = text;
    msg.classList.remove("hidden");
    setTimeout(() => msg.classList.add("hidden"), 2000);
}

// 5) Render todos in table
function renderTodos() {
    const todos = getTodos();
    tableBody.innerHTML = ""; // clear old rows

    countEl.textContent = `${todos.length} task(s)`;

    // if no todos
    if (todos.length === 0) {
        tableBody.innerHTML = `
      <tr>
        <td colspan="4" class="px-4 py-6 text-center text-slate-500 bg-slate-50 rounded-xl">
          No tasks yet. Add one above.
        </td>
      </tr>
    `;
        return;
    }

    // show todos
    todos.forEach((todo, index) => {
        tableBody.innerHTML += `
      <tr class="bg-slate-50 border border-slate-200">
        <td class="px-4 py-3 rounded-l-xl font-semibold">${index + 1}</td>
        <td class="px-4 py-3 font-semibold">${todo.title}</td>
        <td class="px-4 py-3">${todo.description}</td>
        <td class="px-4 py-3 rounded-r-xl">
          <button class="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl"
            onclick="deleteTodo(${index})">
            Delete
          </button>
        </td>
      </tr>
    `;
    });
}

// 6) Add todo on form submit
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const description = descInput.value.trim();

    if (title === "" || description === "") {
        showMessage("Please enter both title and description.");
        return;
    }

    const todos = getTodos();
    todos.push({ title, description }); // add new todo
    saveTodos(todos);

    // clear inputs
    titleInput.value = "";
    descInput.value = "";

    renderTodos();
});

// 7) Delete todo function (called by button)
function deleteTodo(index) {
    const todos = getTodos();
    todos.splice(index, 1);   // remove 1 item
    saveTodos(todos);
    renderTodos();
}

// Make deleteTodo available globally (important)
window.deleteTodo = deleteTodo;

// 8) Clear all
clearAllBtn.addEventListener("click", () => {
    localStorage.removeItem("todos");
    renderTodos();
});

// 9) Initial load
renderTodos();
