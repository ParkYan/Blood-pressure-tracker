/* 	Developer: Yana Park
    Start Date: 03/03/2026 */


const statusFill = document.getElementById('status-fill');
const dateInput = document.getElementById('date');
const sysInput = document.getElementById('systolic');
const diaInput = document.getElementById('diastolic');
const bpForm = document.getElementById('bpForm');
const statusDisplay = document.getElementById('status-display');
const historyBody = document.getElementById('history-log-body');

/*Form validation*/

// Function to handle the message when leaving a field
function blurValidation() {
    //Date field
    dateInput.addEventListener('blur', function () {
        const msgArea = document.getElementById('date-msg');

        if (this.value === "") {
            msgArea.textContent = "Please enter a date";
            this.style.borderColor = "red";
        } else {
            msgArea.textContent = "";
            this.style.borderColor = "";
        }
    });

    // Systolic field
    sysInput.addEventListener('blur', function () {
        const msgArea = document.getElementById('systolic-msg');
        const val = parseInt(this.value);

        if (isNaN(val) || val < 70 || val > 250) {
            msgArea.textContent = "Please enter a value between 70-250";
            this.style.borderColor = "red";
        } else {
            msgArea.textContent = "";
            this.style.borderColor = "";
        }
    });

    // Diastolic field
    diaInput.addEventListener('blur', function () {
        const msgArea = document.getElementById('diastolic-msg');
        const val = parseInt(this.value);

        if (isNaN(val) || val < 40 || val > 150) {
            msgArea.textContent = "Please enter a value between 40-150";
            this.style.borderColor = "red";
        } else {
            msgArea.textContent = "";
            this.style.borderColor = "";
        }
    });
}

function setupSubmitHandler() {
    bpForm.addEventListener('submit', function (e) {
        e.preventDefault();
        //grabing the value from the input fields
        const dateVal = dateInput.value;
        const sysVal = parseInt(sysInput.value);
        const diaVal = parseInt(diaInput.value);

        //validation of the input fields with alert
        if (!dateVal || isNaN(sysVal) || isNaN(diaVal)) {
            alert("Please input valid data.");
            return;
            //exit the function, stops and doesn't run any code below
        }

        // Conditional statement. Logic for Category and Bar when submit button is clicked
        //Using ternary operator to practice
        let category = (sysVal >= 180 || diaVal >= 120)
            ? "Hypertension Crisis"
            : (sysVal >= 140 || diaVal >= 90)? "Hypertension Stage 2" // If True, we stop here.
            : (sysVal >= 130 || diaVal >= 80)? "Hypertension Stage 1"
                    : (sysVal >= 120 && diaVal < 80)? "Elevated" 
                    : "Normal";// If all were false, it must be Normal.

        //Zones for needle points           
        let barPos =
            (category === "Normal") ? 8 :
            (category === "Elevated") ? 25 :
            (category === "Hypertension Stage 1") ? 41 :
            (category === "Hypertension Stage 2") ? 58 :
            (category === "Hypertension Crisis") ? 83 :0;

        //update UI
        statusDisplay.textContent = "Current Status: " + category;
        statusFill.style.left = barPos + "%";
        // Passes variables into the next function
        addTableRow(dateVal, sysVal, diaVal, category);
    });
}

function addTableRow(date, sys, dia, category) {
    const tableBody = document.getElementById('history-log-body');
    const newRow = document.createElement('tr');//A row exists in memory, but is invisible.

    newRow.innerHTML = `
        <td>${date}</td>
        <td>${sys}</td>
        <td>${dia}</td>
        <td>${category}</td>
        <td>
        <button class="edit-button">Edit</button>
        <button class="delete-btn" style="color: red;">Delete</button>
        </td>
    `;

    //Deletes the row when Delete button clicked
    newRow.querySelector(".delete-btn").addEventListener("click", () => {
        newRow.remove();
        // Reset the inputs
        dateInput.value = "";
        sysInput.value = "";
        diaInput.value = "";

        // Bring initial instruction back to the current status field 
        statusDisplay.textContent = "Enter your readings to see your status";

        // Move the needle back
        statusFill.style.left = "0%";
    });

    //Edit button logic
    newRow.querySelector(".edit-button").addEventListener("click", () => {
        // Moves the data from the table cells back into the input fields
        dateInput.value = newRow.cells[0].textContent;
        sysInput.value = newRow.cells[1].textContent;
        diaInput.value = newRow.cells[2].textContent;

    // Removes the row from the table because the user will change the value in this row
        newRow.remove();

    // Moves the cursor to the Systolic field so the user can start retyping
        sysInput.focus();
    });

    //The row is placed on the web page, in the table body.
    tableBody.appendChild(newRow);
}

    // Call this function when the page loads
document.addEventListener('DOMContentLoaded', function () {
    blurValidation(); // Sets up the red error messages
    setupSubmitHandler();
});


