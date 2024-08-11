// Fonction pour afficher une section spécifique
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none'; // Masquer toutes les sections
    });

    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.style.display = 'block'; // Afficher la section demandée
    }
}

// Afficher la section d'accueil par défaut lors du chargement
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
});

// Fonction pour enregistrer un employé
document.getElementById('employeeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const dob = document.getElementById('dob').value;
    const birthPlace = document.getElementById('birthPlace').value;
    const currentCity = document.getElementById('currentCity').value;
    const code = document.getElementById('code').value;
    
    if (!firstName || !lastName || !dob || !birthPlace || !currentCity || !code) {
        alert("Tous les champs doivent être remplis !");
        return;
    }

    const employee = {
        firstName,
        lastName,
        dob,
        birthPlace,
        currentCity,
        code
    };

    localStorage.setItem(code, JSON.stringify(employee));
    
    alert("Employé enregistré avec succès !");
    document.getElementById('employeeForm').reset();
});

// Fonction pour rechercher un employé
function searchEmployee() {
    const searchCode = document.getElementById('searchCode').value;
    const result = document.getElementById('result');

    if (!searchCode) {
        alert("Veuillez entrer un code d'identification !");
        return;
    }

    const employee = JSON.parse(localStorage.getItem(searchCode));

    if (employee) {
        result.innerHTML = `
            <strong>Prénom:</strong> ${employee.firstName}<br>
            <strong>Nom:</strong> ${employee.lastName}<br>
            <strong>Date de Naissance:</strong> ${employee.dob}<br>
            <strong>Lieu de Naissance:</strong> ${employee.birthPlace}<br>
            <strong>Ville Actuelle:</strong> ${employee.currentCity}<br>
            <strong>Code d'Identification:</strong> ${employee.code}
        `;
    } else {
        result.innerHTML = "Aucun employé trouvé avec ce code d'identification.";
    }
}

// Fonction pour mettre à jour les informations d'un employé
function updateEmployee() {
    const updateCode = document.getElementById('updateCode').value;
    const newName = document.getElementById('newName').value;
    const newCode = document.getElementById('newCode').value;

    if (!updateCode || (!newName && !newCode)) {
        alert("Veuillez entrer un code d'identification et au moins une information à mettre à jour !");
        return;
    }

    const employee = JSON.parse(localStorage.getItem(updateCode));

    if (employee) {
        if (newName) {
            employee.lastName = newName;
        }
        if (newCode) {
            localStorage.removeItem(updateCode); // Supprimer l'ancien code
            employee.code = newCode; // Mettre à jour le code
        }

        localStorage.setItem(employee.code, JSON.stringify(employee)); // Enregistrer avec le nouveau code si modifié
        alert("Employé mis à jour avec succès !");
        document.getElementById('updateForm').reset();
    } else {
        alert("Aucun employé trouvé avec ce code d'identification.");
    }
}