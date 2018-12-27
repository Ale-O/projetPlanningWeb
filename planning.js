// CLAVIER
// Raccourci caché black et white
function cvBlackEtWhite(e) {
    var touche = String.fromCharCode(e.charCode);
    touche = touche.toUpperCase();
    var divsElts = document.getElementsByTagName("body");
    switch (touche) {
    case "B":
        for (var i = 0; i < divsElts.length; i++) {
            divsElts[i].style.color = "white";
            divsElts[i].style.backgroundColor = "black";
        }
    break;
    }
    console.log("Evènement clavier : " + e.type + ", touche : " + e.keyCode);
    e.stopPropagation(); // Arrêt de la propagation de l'événement
}

function cvParDefault(e) {
    var divsElts = document.getElementsByTagName("body");
    for (var i = 0; i < divsElts.length; i++) {
        divsElts[i].style.color = "black";
        divsElts[i].style.backgroundColor = "white";
    console.log("Evènement clavier : " + e.type + ", touche : " + e.keyCode);
    }
}

document.addEventListener("keypress", cvBlackEtWhite);
document.addEventListener("keyup", cvParDefault);


// CHARGEMENT
// Chargement de la page web
window.addEventListener("load", function () {
    console.log("Page chargée");
});


// Fermeture de la page web
window.addEventListener("beforeunload", function (e) {
    var message = "Vous êtes sûr d'avoir tout lu?";
    e.returnValue = message; // Provoque une demande de confirmation (standard)
    return message; // Provoque une demande de confirmation (certains navigateurs)
});


// LIENS
// Clic sur le lien interdit
document.getElementById("interdit").addEventListener("click", function (e) {
    console.log("Allons, pourquoi cliquer sur ce lien alors que la rubrique est déjà visible!");
    e.preventDefault(); // Annulation de la navigation vers la cible du lien
});



// SCRIPT DE GENERATION PLANNING
var collaborateur = {
// initialise le collaborateur
    init: function (nom, prenom, rythme, absence, quartHeureReservoir) {
        this.nom = nom;
        this.prenom = prenom;
        this.rythme = rythme;
        this.absence = absence;
        this.quartHeureReservoir = quartHeureReservoir;
    },
    decrire: function () {
        return "Nom : " + this.nom + ", prénom : " + this.prenom + ", rythme : " + this.rythme + ", absence : " + this.absence + ", quartHeureReservoir : " + this.quartHeureReservoir;
    },
};


var christian = Object.create(collaborateur);
christian.init("Olan", "Christian", "matin", "lundi", 150);

var equipe = [];
equipe.push(christian);
// Introduction d'un exemple


console.log("Bienvenue dans le gestionnaire de l'équipe !");
var choix;
while (choix !== "0") {
    console.log("1 : Lister les collaborateurs");
    console.log("2 : Ajouter un collaborateur");
    console.log("0 : Quitter");
    var choix = prompt("Choisissez une option :");

    switch (choix) {
    case "1":
        console.log("Voici la liste de tous vos collaborateurs :");
        // Avec une boucle for
        for (var i = 0; i < equipe.length; i++) {
            console.log(equipe[i].decrire());
        }
        // Avec une boucle foreach
        /*contacts.forEach(function (contact) {
            console.log(contact.decrire());
        });*/
        break;
    case "2":
        var nom = prompt("Entrez le nom du nouveau collaborateur :");
        var prenom = prompt("Entrez le prénom du nouveau collaborateur :");
        var rythme = prompt("Entrez le rythme du nouveau collaborateur :");
        var absence = prompt("Entrez l'absence du nouveau collaborateur :");
        var quartHeureReservoir = 150;
        var collaborateur = Object.create(collaborateur);
        collaborateur.init(nom, prenom, rythme, absence, quartHeureReservoir);
        equipe.push(collaborateur);
        console.log("Le nouveau collaborateur a été ajouté");
        break;
    }
    console.log(); // Passe une ligne
}
console.log("Au revoir !");


// Création du planning
function creerPlanning (jours, heures, quartHeures) {
    
    var jours = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi"];
    var heures = ["8H","9H","10H","11H","12H","13H","14H","15H","16H","17H","18H"];
    var quartHeures = ["00","15","30","45"];
    var sommeUniteDeTemps = jours.length * heures.length * quartHeures.length;

    var uniteDeTemps = {
        init: function (joursConcerne, heuresConcerne, quartHeuresConcerne) {
            this.joursConcerne = joursConcerne;
            this.heuresConcerne = heuresConcerne;
            this.quartHeuresConcerne = quartHeuresConcerne;
        },
        decrire: function () {
        return "Jours concernés : " + this.joursConcerne + ", heures concernées : " + this.heuresConcerne + ", quart d'heures concernées : " + this.quartHeuresConcerne;
        },
    };

    var planning = [];

    var j = 0;
    var h = 0;
    var q = 0;    
    
    for (var i2 = 0; i2 < sommeUniteDeTemps; i2++) {

        var joursConcerne = jours[j];
        var heuresConcerne = heures[h];
        var quartHeuresConcerne = quartHeures[q];
        var uniteDeTemps = Object.create(uniteDeTemps);
        uniteDeTemps.init(joursConcerne, heuresConcerne, quartHeuresConcerne)
        planning.push(uniteDeTemps);
        
        if ((j >= 0) && (j <= 5) && (h >= 0) && (h <= 11) && (q >= 0) && (q <= 4)) {
            q++; // On incrémente les quart d'Heures
            if (q === 4) { // Il faut mettre les quart d'heures à 0 et passer à l'heure suivante
                q = 0;
                h++;
                if (h === 11) { // Il faut mettre les heures à 0 et passer au jour suivant
                    h = 0;
                    j++;
                    if (j === 5) { // L'heure suivante est minuit
                        heures = 0;
                    }
                }
            }
        }
    }
    console.log("Bilan Planning")
        for (var p = 0; p < planning.length; p++) {
            console.log(planning[p].decrire());
        }

    var uniteCollaborateur = {
        init: function (nom, prenom, joursConcerne, heuresConcerne, quartHeuresConcerne, type){
            this.nom = nom;
            this.prenom = prenom;
            this.joursConcerne = joursConcerne;
            this.heuresConcerne = heuresConcerne;
            this.quartHeuresConcerne = quartHeuresConcerne;
            this.type = type;
        },
        decrire: function () {
        return "Nom : " + this.nom + ", prénom : " + this.prenom + " , Jours concernés : " + this.joursConcerne + ", heures concernées : " + this.heuresConcerne + ", quart d'heures concernées : " + this.quartHeuresConcerne + " , type : " + this.type;
        },
    }
    
    var planningDetaille = [];
    
    
    for (var i3 = 0; i3 < planning.length; i3++) { 
        for (var i4 = 0; i4 < equipe.length; i4++) { 
            if (equipe[i4].quartHeureReservoir > 0) {
                equipe[i4].quartHeureReservoir = equipe[i4].quartHeureReservoir - 1;
                var nom = equipe[i4].nom;
                var prenom = equipe[i4].prenom;
                var joursConcerne = planning[i3].joursConcerne;
                var heuresConcerne = planning[i3].heuresConcerne;
                var quartHeuresConcerne = planning[i3].quartHeuresConcerne;
                var typeConcerne = "téléphone"; // créer objet type et les régles d'attribution
                var uniteCollaborateur = Object.create(uniteCollaborateur);
                uniteCollaborateur.init(nom, prenom, joursConcerne, heuresConcerne, quartHeuresConcerne, typeConcerne)
                planningDetaille.push(uniteCollaborateur);
                var rajout = document.createElement("td"); // Création d'un élément span
                rajout.textContent = prenom + " " + nom + " (" + typeConcerne + ") "; // Définition de son contenu textuel
                document.getElementById(joursConcerne + heuresConcerne + quartHeuresConcerne).appendChild(rajout);
            }
        }
    }
    console.log("Bilan Planning Détaillée")
        for (var p2 = 0; p2 < planningDetaille.length; p2++) {
            console.log(planningDetaille[p2].decrire());
        }
    
    console.log(christian.quartHeureReservoir);
    
}    
    
creerPlanning();
