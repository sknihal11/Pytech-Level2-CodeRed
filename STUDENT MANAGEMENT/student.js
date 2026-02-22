let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

/* Validation */
function validateInput(name, gpa, attendance) {
    if (!name.trim()) return "Name required";
    if (isNaN(gpa) || gpa < 0 || gpa > 10) return "GPA must be 0-10";
    if (isNaN(attendance) || attendance < 0 || attendance > 100)
        return "Attendance must be 0-100";
    return null;
}

/* Risk Logic */
function calculateRisk(gpa, attendance) {
    if (gpa < 6 || attendance < 65) return "High Risk";
    if (gpa < 7) return "Moderate";
    return "Safe";
}

/* Save */
function saveData() {
    localStorage.setItem("students", JSON.stringify(students));
}

/* Create + Update */
function addStudent() {
    let name = document.getElementById("name").value;
    let gpa = parseFloat(document.getElementById("gpa").value);
    let attendance = parseInt(document.getElementById("attendance").value);

    let error = validateInput(name, gpa, attendance);
    if (error) {
        alert(error);
        return;
    }

    let risk = calculateRisk(gpa, attendance);

    if (editIndex === -1) {
        students.push({ name, gpa, attendance, risk });
    } else {
        students[editIndex] = { name, gpa, attendance, risk };
        editIndex = -1;
    }

    saveData();
    renderTable();

    document.getElementById("name").value = "";
    document.getElementById("gpa").value = "";
    document.getElementById("attendance").value = "";
}

/* Edit */
function editStudent(index) {
    let student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("gpa").value = student.gpa;
    document.getElementById("attendance").value = student.attendance;
    editIndex = index;
}

/* Delete */
function deleteStudent(index) {
    students.splice(index, 1);
    saveData();
    renderTable();
}

/* Read */
function renderTable() {
    let table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach((student, index) => {
        table.innerHTML += `
        <tr>
            <td>${student.name}</td>
            <td>${student.gpa}</td>
            <td>${student.attendance}%</td>
            <td>${student.risk}</td>
            <td><button class="btn btn-sm btn-info" onclick="editStudent(${index})">Edit</button></td>
            <td><button class="btn btn-sm btn-danger" onclick="deleteStudent(${index})">Delete</button></td>
        </tr>`;
    });
}

renderTable();
