// Retrieve saved student records from localStorage, or initialize an empty array if none exist
let students = JSON.parse(localStorage.getItem("students")) || [];

/**
 * Save the current students array to localStorage
 */
function saveToLocalStorage() {
    localStorage.setItem("students", JSON.stringify(students));
}

/**
 * Render the student table based on the current students array
 * Dynamically creates table rows and applies a scrollbar if there are more than 5 records
 */
function renderTable() {
    const tbody = document.querySelector("#studentTable tbody");
    tbody.innerHTML = ""; // Clear previous table contents

    // Loop through each student record and create a row
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

    // Add vertical scrollbar if there are more than 5 records
    const wrapper = document.getElementById("tableWrapper");
    wrapper.style.overflowY = students.length > 5 ? "scroll" : "auto";
}

/**
 * Validate form input fields before saving
 * - Name: only letters and spaces
 * - ID: only numbers
 * - Email: must be a valid email format
 * - Contact: only numbers, at least 10 digits
 */
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
    return true; // All validations passed
}

// Handle form submission event
document.getElementById("registrationForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent page reload on form submit

    // Get values from form fields
    const name = document.getElementById("studentName").value.trim();
    const id = document.getElementById("studentId").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contactNumber").value.trim();

    // Ensure no fields are empty
    if (!name || !id || !email || !contact) {
        alert("Please fill all fields.");
        return;
    }

    // Validate inputs using the validation function
    if (!validateForm(name, id, email, contact)) return;

    // Add the new student record to the array
    students.push({ name, id, email, contact });

    // Save the updated array to localStorage and re-render table
    saveToLocalStorage();
    renderTable();

    // Reset the form after successful submission
    this.reset();
});

/**
 * Edit an existing student record
 * Loads the record into the form fields, then deletes it from the array
 * (So that the updated version can be saved on form submit)
 */
function editStudent(index) {
    const student = students[index];
    document.getElementById("studentName").value = student.name;
    document.getElementById("studentId").value = student.id;
    document.getElementById("email").value = student.email;
    document.getElementById("contactNumber").value = student.contact;

    // Remove the original record before editing
    deleteStudent(index);
}

/**
 * Delete a student record by index
 * Prompts for confirmation before removal
 */
function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        students.splice(index, 1); // Remove 1 record at the specified index
        saveToLocalStorage();
        renderTable();
    }
}

// Initial render when page loads
renderTable();
