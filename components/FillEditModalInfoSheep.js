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
    const infoButtons = document.querySelectorAll('.infoSheepBtn');

    const tagInput = document.querySelector('#InfosheepTag');
    const checkDigitInput = document.querySelector('#InfosheepcheckDigit');
    const birthDateInput = document.querySelector('#InfosheepbirthDate');
    const breedCountInput = document.querySelector('#InfosheepBreedCount');
    const lastTimeInput = document.querySelector('#InfosheeplastTimeCalved');
    const lastSanitationInput = document.querySelector("#InfosheepdateOfLastSanitation");
    const commentsInput = document.querySelector('#InfosheepComments');
    const idInput = document.querySelector('#InfosheepId');



    infoButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const sheepId = button.getAttribute('data-infoid');
            const tag = button.getAttribute('data-infotag');
            const checkDigit = button.getAttribute('data-infocheckDigit');
            const birthDate = button.getAttribute('data-infobirthDate');
            const breedCount = button.getAttribute('data-infobreedcount');
            const lastTimeCalved = button.getAttribute('data-infolasttimecalved');
            const comments = button.getAttribute('data-infocomments');
            const lastTimeSanitized = button.getAttribute('data-infodateoflastsanitation');
            

            // Fill form fields
            idInput.value = sheepId;
            tagInput.value = tag;
            checkDigitInput.value = checkDigit;
            birthDateInput.value = formatDateForInput(birthDate);
            breedCountInput.value = breedCount;
            lastTimeInput.value = formatDateForInput(lastTimeCalved);
            commentsInput.value = comments;
            lastSanitationInput.value = formatDateForInput(lastTimeSanitized);
            

            // Update form action dynamically
            //form.action = `/updateSheep/${sheepId}`;
            //form.action = '/add';

        });
        
    });

    const sheepinfoEditBtn = document.querySelector('#sheepinfoEditBtn');

    sheepinfoEditBtn.addEventListener('click', () => {
        const sheepId = idInput.value; // pega o id da vaca do modal info
        if (!sheepId) return;

        // Encontra o botão de editar na tabela com o mesmo id
        const editBtn = document.querySelector(`.editSheepBtn[data-id="${sheepId}"]`);
        if (editBtn) {
            editBtn.click(); // simula o clique
        }

        // Fecha o modal info
        const infoModal = bootstrap.Modal.getInstance(document.getElementById('infoSheepModal'));
        if (infoModal) infoModal.hide();
    });

    const sheepinfoDeleteBtn = document.querySelector('#sheepinfoDeleteBtn');

    sheepinfoDeleteBtn.addEventListener('click', () => {
        const sheepId = idInput.value; // pega o id da vaca do modal info
        if (!sheepId) return;

        // Encontra o botão de editar na tabela com o mesmo id
            const deleteBtn = document.querySelector(`.deleteSheepBtn[data-id="/deleteSheep/${sheepId}"]`);

        if (deleteBtn) {
            deleteBtn.click(); // simula o clique
        }

        // Fecha o modal info
        const infoModal = bootstrap.Modal.getInstance(document.getElementById('infoSheepModal'));
        if (infoModal) infoModal.hide();
    });
});
