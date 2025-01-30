document.addEventListener('DOMContentLoaded', () => {
    // Sélection des éléments du DOM
    const form = document.getElementById('conference-form');
    const mainSection = document.querySelector('main');
    const ticketSection = document.getElementById('ticket');

    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const githubInput = document.getElementById('github');
    const avatarInput = document.getElementById('avatar');

    const ticketName = document.getElementById('ticket-name'); 
    const ticketEmail = document.getElementById('ticket-email');
    const ticketGithub = document.getElementById('ticket-github');
    const ticketAvatar = document.getElementById('ticket-avatar');

    const fileUpload = document.querySelector('.file-upload');
    const filePreview = document.querySelector('.file-preview');
    const fileHint = document.querySelector('.file-hint');
    const uploadedImage = document.getElementById('uploaded-image');
    const removeImageBtn = document.querySelector('.remove-image-btn');
    const changeImageBtn = document.querySelector('.change-image-btn');

    // Événement de soumission du formulaire
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();

        if (validateForm()) {
            generateTicket();
        }
    });

    // Gestion du changement d'avatar (prévisualisation)
    avatarInput.addEventListener('change', () => {
        const file = avatarInput.files[0];
        if (file) {
            if (!validateFile(file)) {
                showError(avatarInput, 'Avatar must be a JPG or PNG file and less than 500KB.');
            } else {
                clearErrors();
                previewImage(file);
            }
        }
    });

    // Suppression de l'image
    removeImageBtn.addEventListener('click', () => {
        avatarInput.value = '';
        uploadedImage.src = '';

        if (fileHint) {
            fileHint.classList.remove('hidden');
        }

        fileUpload.querySelector('.icon-upload').classList.remove('hidden');
        filePreview.classList.add('hidden');
    });

    // Changer d'image
    changeImageBtn.addEventListener('click', () => {
        avatarInput.click();
    });

    // 🔹 Fonction pour générer le ticket
    function generateTicket() {
        console.log("Génération du ticket...");

        mainSection.style.display = 'none';
        ticketSection.classList.remove('hidden');
        ticketSection.style.display = 'flex';

        ticketName.textContent = nameInput.value.trim();
        ticketEmail.textContent = emailInput.value.trim();
        ticketGithub.textContent = githubInput.value.trim();

        const file = avatarInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                ticketAvatar.style.backgroundImage = `url('${e.target.result}')`;
            };
            reader.readAsDataURL(file);
        }

        ticketSection.scrollIntoView({ behavior: 'smooth' });
    }

    // 🔹 Fonction pour valider le formulaire
    function validateForm() {
        let isValid = true;

        if (!validateRequired(nameInput.value.trim())) {
            showError(nameInput, 'Full Name is required.');
            isValid = false;
        }

        if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address.');
            isValid = false;
        }

        if (!validateRequired(githubInput.value.trim())) {
            showError(githubInput, 'GitHub Username is required.');
            isValid = false;
        }

        if (avatarInput.files.length === 0) {
            showError(avatarInput, 'Please upload an avatar.');
            isValid = false;
        } else if (!validateFile(avatarInput.files[0])) {
            showError(avatarInput, 'Avatar must be a JPG or PNG file and less than 500KB.');
            isValid = false;
        }

        return isValid;
    }

    // 🔹 Fonction pour valider si un champ est rempli
    function validateRequired(value) {
        return value !== '';
    }

    // 🔹 Fonction pour valider l'email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 🔹 Fonction pour valider le fichier image
    function validateFile(file) {
        const validTypes = ['image/jpeg', 'image/png'];
        const maxSize = 500 * 1024; // 500KB
        return validTypes.includes(file.type) && file.size <= maxSize;
    }

    // 🔹 Fonction pour afficher un message d'erreur
    function showError(input, message) {
        const error = document.createElement('p');
        error.className = 'error-message';
        error.textContent = message;
        input.closest('.form-group').appendChild(error);
        input.classList.add('input-error');
    }    

    // 🔹 Fonction pour effacer les erreurs existantes
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach((error) => error.remove());
        document.querySelectorAll('.input-error').forEach((input) => input.classList.remove('input-error'));
    }

    // 🔹 Fonction pour afficher un aperçu de l'image uploadée
    function previewImage(file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            uploadedImage.src = e.target.result;
            fileUpload.querySelector('.icon-upload').classList.add('hidden');
            fileHint.classList.add('hidden');
            filePreview.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }

    // 🔹 Fonction pour réinitialiser le ticket (si besoin)
    function clearTicket() {
        ticketName.textContent = '';
        ticketEmail.textContent = '';
        ticketGithub.textContent = '';
        ticketAvatar.style.backgroundImage = '';
    }
});