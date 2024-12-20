let hr = document.getElementById("hour");
let min = document.getElementById("min");
let sec = document.getElementById("sec");

// To store the manual time rotations
let manualTimeSet = false;
let manualHourRotation = 0;
let manualMinRotation = 0;
let manualSecRotation = 0;

// Function to update live clock
function displayTime() {
  if (!manualTimeSet) {
    let date = new Date();

    let hh = date.getHours();  // Use 24-hour format
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    // Calculate rotations for live clock
    let hRotation = 15 * hh + mm / 4;  // 24-hour format (15° per hour)
    let mRotation = 6 * mm;            // 6° per minute
    let sRotation = 6 * ss;            // 6° per second

    // Apply rotations to the clock hands
    hr.style.transform = `rotate(${hRotation}deg)`;
    min.style.transform = `rotate(${mRotation}deg)`;
    sec.style.transform = `rotate(${sRotation}deg)`;
  } else {
    // Apply manual rotations for the set time
    hr.style.transform = `rotate(${manualHourRotation}deg)`;
    min.style.transform = `rotate(${manualMinRotation}deg)`;
    sec.style.transform = `rotate(${manualSecRotation}deg)`;

    // Increment the manual time step by step (for visual effect)
    manualHourRotation += 0.25; // Hour hand moves slowly (15° per hour)
    manualMinRotation += 6;     // Minute hand moves
    manualSecRotation += 6;     // Second hand moves

    // Reset time after 24 hours
    if (manualHourRotation >= 360) manualHourRotation = 0;
    if (manualMinRotation >= 360) manualMinRotation = 0;
    if (manualSecRotation >= 360) manualSecRotation = 0;
  }
}

// Set interval to keep updating the clock every second
setInterval(displayTime, 1000);

// Function to set manual time based on user input
function setManualTime() {
  const timeInput = document.getElementById("time-input").value;

  // Validate time format (hh:mm:ss)
  const timePattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
  if (!timePattern.test(timeInput)) {
    alert("Please enter time in the format hh:mm:ss (e.g., 10:45:30)");
    return;
  }

  // Split time input into hours, minutes, and seconds
  const [hh, mm, ss] = timeInput.split(":").map(Number);

  // Calculate rotations for manual time (24-hour format)
  manualHourRotation = 15 * hh + mm / 4;  // 15° per hour for 24-hour format
  manualMinRotation = 6 * mm;             // 6° per minute
  manualSecRotation = 6 * ss;             // 6° per second

  // Set the flag that manual time is now active
  manualTimeSet = true;
}
