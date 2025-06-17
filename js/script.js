function calculate() {
  const startTime = document.getElementById('startTime').value;
  const breakMinutes = parseInt(document.getElementById('breakTime').value) || 0;
  const workHours = parseFloat(document.getElementById('workDuration').value) || 8;

  if (!startTime) {
    alert("Please enter your arrival time.");
    return;
  }

  const now = new Date();
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute);

  const requiredTimeMs = (workHours * 60 + breakMinutes) * 60 * 1000;
  const leave = new Date(start.getTime() + requiredTimeMs);

  const workedMs = now.getTime() - start.getTime();
  const workedEffectiveMs = workedMs - breakMinutes * 60 * 1000;
  const remainingMs = (workHours * 60 * 60 * 1000) - workedEffectiveMs;

  function formatTime(date) {
    return date.toTimeString().slice(0, 5);
  }

  function formatDuration(ms) {
    const totalMinutes = Math.max(0, Math.floor(ms / 60000));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}min`;
  }

  document.getElementById('leaveTime').textContent = "You can leave at: " + formatTime(leave);
  document.getElementById('timeWorkedNow').textContent = "Time worked (excluding break): " + formatDuration(workedEffectiveMs);
  document.getElementById('timeLeft').textContent = "Time left to work: " + formatDuration(remainingMs);
}
