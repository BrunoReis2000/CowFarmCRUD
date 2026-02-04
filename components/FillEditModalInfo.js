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
    const infoButtons = document.querySelectorAll('.infoCowBtn');
    const form = document.querySelector('#infoCowForm');

    const tagInput = document.querySelector('#InfocowTag');
    const checkDigitInput = document.querySelector('#InfocowcheckDigit');
    const birthDateInput = document.querySelector('#InfocowbirthDate');
    const raceInput = document.querySelector('#InfocowRace');
    const breedCountInput = document.querySelector('#InfocowBreedCount');
    const lastTimeInput = document.querySelector('#InfocowlastTimeCalved');
    const lastSanitationInput = document.querySelector('#InfodateOfLastSanitation');
    const commentsInput = document.querySelector('#InfocowComments');
    const idInput = document.querySelector('#InfocowId');



    infoButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const cowId = button.getAttribute('data-infoid');
            const tag = button.getAttribute('data-infotag');
            const checkDigit = button.getAttribute('data-infocheckDigit');
            const birthDate = button.getAttribute('data-infobirthDate');
            const race = button.getAttribute('data-inforace');
            const breedCount = button.getAttribute('data-infobreedcount');
            const lastTimeCalved = button.getAttribute('data-infolasttimecalved');
            const lastTimeSanitized = button.getAttribute('data-infolasttimesanitized');
            const comments = button.getAttribute('data-infocomments');
            

            // Fill form fields
            idInput.value = cowId;
            tagInput.value = tag;
            checkDigitInput.value = checkDigit;
            birthDateInput.value = formatDateForInput(birthDate);
            raceInput.value = race;
            breedCountInput.value = breedCount;
            lastTimeInput.value = formatDateForInput(lastTimeCalved);
            lastSanitationInput.value = formatDateForInput(lastTimeSanitized);
            commentsInput.value = comments;

            // Update form action dynamically
            //form.action = `/updateCow/${cowId}`;
            //form.action = '/add';

        });
        
    });

    const infoEditBtn = document.querySelector('#infoEditBtn');

    infoEditBtn.addEventListener('click', () => {
        const cowId = idInput.value; // pega o id da vaca do modal info
        if (!cowId) return;

        // Encontra o botão de editar na tabela com o mesmo id
        const editBtn = document.querySelector(`.editCowBtn[data-id="${cowId}"]`);
        if (editBtn) {
            editBtn.click(); // simula o clique
        }

        // Fecha o modal info
        const infoModal = bootstrap.Modal.getInstance(document.getElementById('infoCowModal'));
        if (infoModal) infoModal.hide();
    });

    const infoDeleteBtn = document.querySelector('#infoDeleteBtn');

    infoDeleteBtn.addEventListener('click', () => {
        const cowId = idInput.value; // pega o id da vaca do modal info
        if (!cowId) return;

        // Encontra o botão de editar na tabela com o mesmo id
        const deleteBtn = document.querySelector(`.deleteCowBtn[data-id="/deleteCow/${cowId}"]`);
        if (deleteBtn) {
            deleteBtn.click(); // simula o clique
        }

        // Fecha o modal info
        const infoModal = bootstrap.Modal.getInstance(document.getElementById('infoCowModal'));
        if (infoModal) infoModal.hide();
    });
});
