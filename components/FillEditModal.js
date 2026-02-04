// Helper function to safely format dates
function formatDateForInput(dateValue) {
    if (!dateValue) return '';
    try {
        // If it's already in ISO format (YYYY-MM-DD), just return it
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
            return dateValue;
        }
        const date = new Date(dateValue);
        // Check if date is valid
        if (isNaN(date.getTime())) {
            return '';
        }
        // Check if it's the exact epoch timestamp (0) - which indicates an empty/null date
        if (date.getTime() === 0) {
            return '';
        }
        return date.toISOString().split('T')[0];
    } catch (e) {
        return '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const editButtons = document.querySelectorAll('.editCowBtn');
    const form = document.querySelector('#editCowForm');

    const tagInput = document.querySelector('#EditcowTag');
    const checkDigitInput = document.querySelector('#EditcowcheckDigit');
    const birthDateInput = document.querySelector('#EditcowbirthDate');
    const raceInput = document.querySelector('#EditcowRace');
    const breedCountInput = document.querySelector('#EditcowBreedCount');
    const lastTimeInput = document.querySelector('#EditcowlastTimeCalved');
    const lastSanitationInput = document.querySelector('#EditdateOfLastSanitation');
    const commentsInput = document.querySelector('#EditcowComments');
    const idInput = document.querySelector('#EditcowId');



    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const cowId = button.getAttribute('data-id');
            const tag = button.getAttribute('data-tag');
            const checkDigit = button.getAttribute('data-checkDigit');
            const brithDate = button.getAttribute('data-birthDate');
            const race = button.getAttribute('data-race');
            const breedCount = button.getAttribute('data-breedcount');
            const lastTimeCalved = button.getAttribute('data-lasttimecalved');
            const lastTimeSanitized = button.getAttribute('data-lasttimesanitized');
            const comments = button.getAttribute('data-comments');
            

            // Fill form fields
            idInput.value = cowId;
            tagInput.value = tag;
            checkDigitInput.value = checkDigit;
            raceInput.value = race;
            birthDateInput.value = formatDateForInput(brithDate);
            breedCountInput.value = breedCount;
            lastTimeInput.value = formatDateForInput(lastTimeCalved);
            lastSanitationInput.value = formatDateForInput(lastTimeSanitized);
            commentsInput.value = comments;

            // Update form action dynamically
            form.action = `/updateCow/${cowId}`;
            //form.action = '/add';

        });
    });
});
