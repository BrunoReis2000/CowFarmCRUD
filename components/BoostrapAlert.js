 document.addEventListener('DOMContentLoaded', function () {
    const alertEl = document.querySelector('.alert');
    if (!alertEl) return;
    const delayMs = 3000; // change to desired delay (milliseconds)

    setTimeout(function () {
      // use Bootstrap API if available
      if (typeof bootstrap !== 'undefined' && bootstrap.Alert) {
        const bsAlert = new bootstrap.Alert(alertEl);
        bsAlert.close();
      } else {
        // fallback: remove 'show' to trigger CSS fade then remove element
        alertEl.classList.remove('show');
        setTimeout(() => alertEl.remove(), 3000); // match CSS transition time
      }
    }, delayMs);
  });