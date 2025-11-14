document.addEventListener('DOMContentLoaded', () => {
    const editButtons = document.querySelectorAll('.editCowBtn');
    const form = document.querySelector('#editCowForm');

    const tagInput = document.querySelector('#EditcowTag');
    const weightInput = document.querySelector('#EditcowWeight');
    const breedCountInput = document.querySelector('#EditcowBreedCount');
    const lastTimeInput = document.querySelector('#EditcowlastTimeCalved');
    const imagePreview = document.querySelector('#EditcowImagePreview');
    const idInput = document.querySelector('#EditcowId');

    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const cowId = button.getAttribute('data-id');
            const tag = button.getAttribute('data-tag');
            const weight = button.getAttribute('data-weight');
            const breedCount = button.getAttribute('data-breedcount');
            const lastTime = button.getAttribute('data-lasttimecalved');
            const image = button.getAttribute('data-image');

            // Fill form fields
            idInput.value = cowId;
            tagInput.value = tag;
            weightInput.value = weight;
            breedCountInput.value = breedCount;
            lastTimeInput.value = lastTime ? new Date(lastTime).toISOString().split('T')[0] : '';
            imagePreview.src = `/${image}`;

            // Update form action dynamically
            form.action = `/update/${cowId}`;
            //form.action = '/add';

        });
    });
});
