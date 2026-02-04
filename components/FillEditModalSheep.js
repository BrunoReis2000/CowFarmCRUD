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
    const editButtons = document.querySelectorAll('.editSheepBtn');
    const form = document.querySelector('#editSheepForm');

    const tagInput = document.querySelector('#EditsheepTag');
    const checkDigitInput = document.querySelector('#EditsheepcheckDigit');
    const birthDateInput = document.querySelector('#EditsheepbirthDate');
    const breedCountInput = document.querySelector('#EditsheepBreedCount');
    const lastTimeInput = document.querySelector('#EditsheeplastTimeCalved');
    const lastSanitationInput = document.querySelector("#EditsheepdateOfLastSanitation");
    const idInput = document.querySelector('#EditsheepId');
    const commentsInput = document.querySelector('#EditsheepComments');

    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sheepId = button.getAttribute('data-id');
            const tag = button.getAttribute('data-tag');
            const checkDigit = button.getAttribute('data-checkDigit');
            const birthDate = button.getAttribute('data-birthDate');
            const breedCount = button.getAttribute('data-breedcount');
            const lastTime = button.getAttribute('data-lasttimecalved');
            const lastTimeSanitized = button.getAttribute('data-dateoflastsanitation');
            
            const comments = button.getAttribute('data-comments');
            // Fill form fields
            idInput.value = sheepId;
            tagInput.value = tag;
            checkDigitInput.value = checkDigit;
            birthDateInput.value = formatDateForInput(birthDate);
            breedCountInput.value = breedCount;
            lastTimeInput.value = formatDateForInput(lastTime);
            commentsInput.value = comments;
            lastSanitationInput.value = formatDateForInput(lastTimeSanitized);
            
            // Update form action dynamically
            form.action = `/updateSheep/${sheepId}`;
            //form.action = '/add';

        });
    });
});
