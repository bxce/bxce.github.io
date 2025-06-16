let interval;
let timeout;
let breathing = false;
let duration = 0;

const inhaleSound = document.getElementById("inhaleSound");
const holdSound = document.getElementById("holdSound");
const exhaleSound = document.getElementById("exhaleSound");

function setDuration(mins) {
  duration = mins * 60 * 1000;
  document.getElementById("instruction").textContent = `Ready: ${mins} minutes`;
  document.getElementById("startBtn").disabled = false;
}

function setCustomTime() {
  const time = parseInt(document.getElementById("customTime").value, 10);
  if (!isNaN(time) && time > 0 && time <= 60) {
    setDuration(time);
    toggleCustomInput();
  } else {
    alert("Please enter a valid number (1–60).");
  }
}

function toggleCustomInput() {
  const custom = document.getElementById("customContainer");
  custom.classList.toggle("hidden");
}

function toggleBreathing() {
  const btn = document.getElementById("startBtn");
  if (breathing) {
    stopBreathing();
    btn.textContent = "Start";
  } else {
    startBreathing();
    btn.textContent = "Stop";
  }
  breathing = !breathing;
}

function startBreathing() {
  clearInterval(interval);
  clearTimeout(timeout);
  const startTime = Date.now();

  const circle = document.getElementById("breathingCircle");
  const instruction = document.getElementById("instruction");

  function breathCycle() {
    if (Date.now() - startTime >= duration) {
      stopBreathing();
      instruction.textContent = "Done. Well done!";
      return;
    }

    // INHALE
    circle.className = "circle inhale";
    instruction.textContent = "Breathe in";
    inhaleSound.play();

    timeout = setTimeout(() => {
      // HOLD
      circle.className = "circle hold";
      instruction.textContent = "Hold";
      holdSound.play();

      timeout = setTimeout(() => {
        // EXHALE
        circle.className = "circle exhale";
        instruction.textContent = "Breathe out";
        exhaleSound.play();

        timeout = setTimeout(() => {
          // Pause 1s
          circle.className = "circle";
          instruction.textContent = "Relax";

        }, 4000); // Exhale

      }, 3000); // Hold

    }, 4000); // Inhale
  }

  breathCycle();
  interval = setInterval(breathCycle, 12000); // 4 + 3 + 4 + 1 = 12s total
}

function stopBreathing() {
  clearInterval(interval);
  clearTimeout(timeout);
  document.getElementById("breathingCircle").className = "circle";
  document.getElementById("instruction").textContent = "Paused";
}
