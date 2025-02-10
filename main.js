document.addEventListener('DOMContentLoaded', () => {
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
    const fileInfoText = document.querySelector('.info-text');
    const fileInfoIcon = document.querySelector('.file-info img'); // Sélectionne l'icône

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();

        if (validateForm()) {
            generateTicket();
        }
    });

    avatarInput.addEventListener('change', () => {
        const file = avatarInput.files[0];
        if (file) {
            if (!validateFile(file)) {
                updateFileInfo("File too large. Please upload a photo under 500KB.", true);
            } else {
                clearErrors();
                previewImage(file);
                updateFileInfo("Upload your photo (JPG or PNG, max size: 500KB).", false);
            }
        } else {
            updateFileInfo("Please upload a photo.", true);
        }
    });

    removeImageBtn.addEventListener('click', () => {
        avatarInput.value = '';
        uploadedImage.src = '';
        fileHint.classList.remove('hidden');
        fileUpload.querySelector('.icon-upload').classList.remove('hidden');
        filePreview.classList.add('hidden');
        updateFileInfo("Please upload a photo.", true);
    });

    changeImageBtn.addEventListener('click', () => {
        avatarInput.click();
    });

    function updateFileInfo(message, isError) {
        const fileInfo = document.querySelector('.file-info');
        const infoText = fileInfo.querySelector('.info-text');

        infoText.textContent = message;

        if (fileInfoIcon) { // Vérifie si l'icône existe
            fileInfoIcon.src = isError ? "assets/images/icon-info-error.svg" : "chemin/vers/icon-info.png";
        }

        if (isError) {
            infoText.style.color = "hsl(7, 71%, 60%)";
        } else {
            infoText.style.color = "";
        }
    }

    function generateTicket() {
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

    function validateForm() {
        let isValid = true;

        if (!validateRequired(nameInput.value.trim())) {
            showError(nameInput, 'Full Name is required.');
            isValid = false;
        }

        if (!validateEmail(emailInput.value.trim())) {
            showErrorWithIcon(emailInput, 'Please enter a valid email address.');
            emailInput.style.border = '2px solid hsl(7, 71%, 60%)';
            isValid = false;
        }

        if (!validateRequired(githubInput.value.trim())) {
            showError(githubInput, 'GitHub Username is required.');
            isValid = false;
        }

        if (avatarInput.files.length === 0) {
            updateFileInfo("Please upload a photo.", true);
            isValid = false;
        } else if (!validateFile(avatarInput.files[0])) {
            updateFileInfo("File too large. Please upload a photo under 500KB.", true);
            isValid = false;
        }

        return isValid;
    }

    function validateRequired(value) {
        return value !== '';
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateFile(file) {
        const validTypes = ['image/jpeg', 'image/png'];
        const maxSize = 500 * 1024; // 500KB
        return validTypes.includes(file.type) && file.size <= maxSize;
    }

    function showError(input, message) {
        const error = document.createElement('p');
        error.className = 'error-message';
        error.textContent = message;
        error.style.color = "hsl(7, 71%, 60%)";
        input.closest('.form-group').appendChild(error);
    }

    function showErrorWithIcon(input, message) {
        const error = document.createElement('p');
        error.className = 'error-message';

        const icon = document.createElement('img');
        icon.src = "assets/images/icon-info-error.svg"; // Image d'erreur
        icon.style.width = "16px";
        icon.style.height = "16px";
        icon.style.marginRight = "5px";

        error.appendChild(icon);
        error.appendChild(document.createTextNode(message));
        error.style.color = "hsl(7, 71%, 60%)";

        input.closest('.form-group').appendChild(error);
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach((error) => error.remove());
    }

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
});