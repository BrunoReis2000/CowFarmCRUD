document.addEventListener('DOMContentLoaded', () => {
    const editButtons = document.querySelectorAll('.editSheepBtn');
    const form = document.querySelector('#editSheepForm');

    const tagInput = document.querySelector('#EditsheepTag');
    const checkDigitInput = document.querySelector('#EditsheepcheckDigit');
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
            const breedCount = button.getAttribute('data-breedcount');
            const lastTime = button.getAttribute('data-lasttimecalved');
            console.log(lastTime);
            const lastTimeSanitized = button.getAttribute('data-dateoflastsanitation');
            console.log(lastTimeSanitized);
            const comments = button.getAttribute('data-comments');
            // Fill form fields
            idInput.value = sheepId;
            tagInput.value = tag;
            checkDigitInput.value = checkDigit;
            breedCountInput.value = breedCount;
            lastTimeInput.value = lastTime ? new Date(lastTime).toISOString().split('T')[0] : '';
            commentsInput.value = comments;
            lastSanitationInput.value = lastTimeSanitized ? new Date(lastTimeSanitized).toISOString().split('T')[0] : '';
            console.log(lastSanitationInput.value);
            // Update form action dynamically
            form.action = `/updateSheep/${sheepId}`;
            //form.action = '/add';

        });
    });
});
