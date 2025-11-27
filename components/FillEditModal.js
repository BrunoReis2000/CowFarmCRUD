document.addEventListener('DOMContentLoaded', () => {
    const editButtons = document.querySelectorAll('.editCowBtn');
    const form = document.querySelector('#editCowForm');

    const tagInput = document.querySelector('#EditcowTag');
    const checkDigitInput = document.querySelector('#EditcowcheckDigit');
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
            breedCountInput.value = breedCount;
            lastTimeInput.value = lastTimeCalved ? new Date(lastTimeCalved).toISOString().split('T')[0] : '';
            lastSanitationInput.value = lastTimeSanitized ? new Date(lastTimeSanitized).toISOString().split('T')[0] : '';
            commentsInput.value = comments;

            // Update form action dynamically
            form.action = `/updateCow/${cowId}`;
            //form.action = '/add';

        });
    });
});
