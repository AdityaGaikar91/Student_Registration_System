 let students = JSON.parse(localStorage.getItem("students")) || [];

    function saveToLocalStorage() {
        localStorage.setItem("students", JSON.stringify(students));
    }

    function renderTable() {
        const tbody = document.querySelector("#studentTable tbody");
        tbody.innerHTML = "";

        students.forEach((student, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td data-label="Student Name">${student.name}</td>
                <td data-label="Student ID">${student.id}</td>
                <td data-label="Email ID">${student.email}</td>
                <td data-label="Contact No.">${student.contact}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });

        // Add scrollbar if needed
        const wrapper = document.getElementById("tableWrapper");
        wrapper.style.overflowY = students.length > 5 ? "scroll" : "auto";
    }

    function validateForm(name, id, email, contact) {
        const nameRegex = /^[A-Za-z\s]+$/;
        const idRegex = /^[0-9]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const contactRegex = /^[0-9]{10,}$/;

        if (!nameRegex.test(name)) {
            alert("Name must contain only letters and spaces.");
            return false;
        }
        if (!idRegex.test(id)) {
            alert("Student ID must contain only numbers.");
            return false;
        }
        if (!emailRegex.test(email)) {
            alert("Enter a valid email address.");
            return false;
        }
        if (!contactRegex.test(contact)) {
            alert("Contact number must be at least 10 digits and only numbers.");
            return false;
        }
        return true;
    }

    document.getElementById("registrationForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("studentName").value.trim();
        const id = document.getElementById("studentId").value.trim();
        const email = document.getElementById("email").value.trim();
        const contact = document.getElementById("contactNumber").value.trim();

        if (!name || !id || !email || !contact) {
            alert("Please fill all fields.");
            return;
        }

        if (!validateForm(name, id, email, contact)) return;

        students.push({ name, id, email, contact });
        saveToLocalStorage();
        renderTable();
        this.reset();
    });

    function editStudent(index) {
        const student = students[index];
        document.getElementById("studentName").value = student.name;
        document.getElementById("studentId").value = student.id;
        document.getElementById("email").value = student.email;
        document.getElementById("contactNumber").value = student.contact;

        deleteStudent(index); // Remove the record so we can save edited one
    }

    function deleteStudent(index) {
        if (confirm("Are you sure you want to delete this record?")) {
            students.splice(index, 1);
            saveToLocalStorage();
            renderTable();
        }
    }

    renderTable();