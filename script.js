let savedClips = JSON.parse(localStorage.getItem('savedClips')) || {};

// Check if any clips need to be deleted on page load
checkAndDeleteExpiredClips();

function saveToClipboard() {
    let clipName = document.getElementById("clipname1").value;
    let clipText = document.getElementById("clipboard").value;
    let deleteTime = document.getElementById("delete-time").value; // Get selected delete time

    if (!clipName.trim()) {
        alert("Please enter a clip name.");
        return;
    }

    if (clipName in savedClips) {
        alert("Clip name already exists.");
        return;
    }

    if (deleteTime === "") {
        alert("Please select an expiration time.");
        return;
    }

    let currentTime = new Date().getTime(); // Get current time in milliseconds


    savedClips[clipName] = {text: clipText, deleteTime: deleteTime, saveTime: currentTime}; // Save clip with delete time and save time
    localStorage.setItem('savedClips', JSON.stringify(savedClips));
    alert('Text saved to clipboard!');
    
    // Clear clip name and text area
    document.getElementById("clipname1").value = "";
    document.getElementById("clipboard").value = "";
}
function loadFromClipboard() {
    let clipName = document.getElementById("clipname").value;
    let clipTextarea = document.getElementById("clipboard");

    if (clipName in savedClips) {
        clipTextarea.value = savedClips[clipName].text;
        clipTextarea.focus(); // Set focus to the textarea
    } else {
        alert("Clip not found.");
    }
}

function deleteClip() {
    let clipName = document.getElementById("clipname").value;

    if (clipName in savedClips) {
        delete savedClips[clipName];
        localStorage.setItem('savedClips', JSON.stringify(savedClips));
        alert('Clip deleted successfully!');
    } else {
        alert("Clip not found.");
    }
    document.getElementById("clipname").value = "";
    document.getElementById("clipboard").value = "";
}

function copyToClipboard() {
    let clipText = document.getElementById("clipboard").value;

    // Create a temporary textarea element
    let tempTextarea = document.createElement("textarea");
    tempTextarea.value = clipText;

    // Append the textarea to the body
    document.body.appendChild(tempTextarea);
