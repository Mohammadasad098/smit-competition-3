import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const logout = document.querySelector('#logout-btn');
const form = document.querySelector("#form");
const todo = document.querySelector("#todo");
const todo2 = document.querySelector("#todo2");
const ul = document.querySelector("#ul");

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
    } else {
        window.location = 'index.html';
    }
});

logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('Logout successfully');
        window.location = 'index.html';
    }).catch((error) => {
        console.log(error);
    });
});


let arr = [];

async function getData() {
    arr = [];
    const q = query(collection(db, "todos"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
    });
    console.log(arr);
    renderTodo();
}
getData();


function renderTodo() {
    ul.innerHTML = "";
    if (arr.length === 0) {
        ul.innerHTML = "";
        return;
    }
    arr.forEach((item) => {
        ul.innerHTML += `
        <div class="card" style="width: 18rem;">
        <div class="card-body">
    <h5 class="card-title">${item.todo}</h5>
    <p class="card-text">${item.todo2}</p>
    <button class="deleteBtn btn btn-danger">Delete Ad</button> &nbsp; &nbsp; &nbsp;
    <button class="editBtn btn btn-primary ">Edit Ad</button>
  </div>
</div> 
</hr>
        `;
    });

    const deleteButtons = document.querySelectorAll(".deleteBtn");
    const editButtons = document.querySelectorAll(".editBtn");

    deleteButtons.forEach((btn, index) => {
        btn.addEventListener("click", async () => {
            const id = arr[index].id;
            await deleteDoc(doc(db, "todos", id));
            console.log("Data deleted");
            arr.splice(index, 1);
            renderTodo();
        });
    });

    editButtons.forEach((btn, index) => {
        btn.addEventListener("click", async () => {
            const updatedTodo = prompt("Enter new value of todo:", arr[index].todo);
            const updatedTodo2 = prompt("Enter new value fof description:", arr[index].todo2);

            if (updatedTodo !== null && updatedTodo2 !== null) {
                const todoUpdate = doc(db, "todos", arr[index].id);
                await updateDoc(todoUpdate, {
                    todo: updatedTodo,
                    todo2: updatedTodo2,
                });
                console.log("Data updated");
                arr[index].todo = updatedTodo;
                arr[index].todo2 = updatedTodo2;
                renderTodo();
            }
        });
    });
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const todoValue = todo.value.trim();
    const todo2Value = todo2.value.trim();



    try {
        const docRef = await addDoc(collection(db, "todos"), {
            todo: todoValue,
            todo2: todo2Value,
        });
        console.log("Document written with ID: ", docRef.id);
        arr.push({
            todo: todoValue,
            todo2: todo2Value,
            id: docRef.id,
        });
        renderTodo();
        todo.value = "";
        todo2.value = "";
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});