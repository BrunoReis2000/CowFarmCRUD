document.addEventListener('DOMContentLoaded', () => {
    const infoButtons = document.querySelectorAll('.infoCowBtn');
    const form = document.querySelector('#infoCowForm');

    const tagInput = document.querySelector('#InfocowTag');
    const checkDigitInput = document.querySelector('#InfocowcheckDigit');
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
            const checkDigit = button.getAttribute('data-checkDigit');
            const race = button.getAttribute('data-inforace');
            const breedCount = button.getAttribute('data-infobreedcount');
            const lastTimeCalved = button.getAttribute('data-infolasttimecalved');
            const lastTimeSanitized = button.getAttribute('data-infolasttimesanitized');
            const comments = button.getAttribute('data-infocomments');
            

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
