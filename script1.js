document.addEventListener("DOMContentLoaded", function() {
    const doctors = [
        { name: "Dr. John Smith", availableSlots: 5, bookedSlots: 0 },
        { name: "Dr. Emily Johnson", availableSlots: 4, bookedSlots: 1 },
        { name: "Dr. Michael Brown", availableSlots: 6, bookedSlots: 0 }
    ];

    let appointments = [];

    const doctorSelect = document.getElementById("doctor-select");
    const doctorCards = document.getElementById("doctor-cards");
    const appointmentList = document.getElementById("appointments-list");
    const errorMessage = document.getElementById("error-message");

    // Load doctors into select dropdown
    function loadDoctors() {
        doctors.forEach((doctor, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = doctor.name;
            doctorSelect.appendChild(option);
        });
    }

    // Display doctor cards
    function displayDoctorCards() {
        doctorCards.innerHTML = "";
        doctors.forEach((doctor, index) => {
            const doctorCard = document.createElement("div");
            doctorCard.classList.add("doctor-card");

            doctorCard.innerHTML = `
                <h3>${doctor.name}</h3>
                <p>Total Slots: ${doctor.availableSlots}</p>
                <p>Booked Slots: ${doctor.bookedSlots}</p>
            `;

            doctorCards.appendChild(doctorCard);
        });
    }

    // Book Appointment
    document.getElementById("booking-form").addEventListener("submit", function(e) {
        e.preventDefault();

        const patientName = document.getElementById("patient-name").value;
        const doctorIndex = doctorSelect.value;
        const appointmentDate = document.getElementById("appointment-date").value;
        const appointmentTime = document.getElementById("appointment-time").value;

        if (doctorIndex === "" || !patientName || !appointmentDate || !appointmentTime) {
            alert("Please fill in all fields.");
            return;
        }

        const doctor = doctors[doctorIndex];
        if (doctor.bookedSlots >= doctor.availableSlots) {
            alert("This doctor is fully booked.");
            return;
        }

        const appointmentID = Math.random().toString(36).substr(2, 9);
        const appointment = {
            id: appointmentID,
            patientName,
            doctorName: doctor.name,
            date: appointmentDate,
            time: appointmentTime
        };

        appointments.push(appointment);
        doctor.bookedSlots++;
        displayDoctorCards();
        alert("Appointment booked successfully!");

        // Clear the form
        document.getElementById("booking-form").reset();
    });

    // Cancel Appointment
    document.getElementById("cancel-btn").addEventListener("click", function() {
        const appointmentID = document.getElementById("appointment-id").value;
        const index = appointments.findIndex(appointment => appointment.id === appointmentID);

        if (index === -1) {
           