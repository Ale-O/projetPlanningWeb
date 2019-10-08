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
    e.returnValue = message; // Provoque une demande de confirmation (standard) -> le message n'apparait pas
    return message; // Provoque une demande de confirmation (certains navigateurs)
});


// LIENS
// Clic sur le lien interdit -> Utiliser pour le jour samedi du calendrier
document.getElementById("interdit").addEventListener("click", function (e) {
    console.log("Allons, pourquoi cliquer sur ce lien alors que la rubrique est déjà visible!");
    e.preventDefault(); // Annulation de la navigation vers la cible du lien
});


// FORMULAIRE
// Définition des variables liées au formulaire
var form = document.querySelector("form");

var champFormId = document.getElementById("formIdentite");
var champNom = document.getElementById("nom");
var champPrenom = document.getElementById("prenom");



// Utilisation du focus pour le changement de la couleur de fond du formulaire identité
champPrenom.addEventListener("focus", function () {
    champFormId.style.backgroundColor = "grey";
});
champPrenom.addEventListener("blur", function (e) {
    champFormId.style.backgroundColor = "#7CC9F2";
});
champNom.addEventListener("focus", function () {
    champFormId.style.backgroundColor = "grey";
});
champNom.addEventListener("blur", function (e) {
    champFormId.style.backgroundColor = "#7CC9F2";
});


// Récupération de la case choisi pour la variable absence dans l'initialisation d'un collaborateur
// Les boutons radio ont le même name pour forcer un seul choix -> mettre un name différent pour plusieur choix

// Utilisation du queryselector -> a utiliser pour renseigner la variable absence si un choix possible
var champsAbsences = document.querySelector('input[name=semaine]:checked').value;

// IMPORTANT : rajouter la gestion du champ vide -> ex: radio bouton "aucune absence"

// Utilisation du byId + checked pour obtenir la valeur si coché -> a utiliser pour renseigner la variable absence si plusieurs choix possibles
if (document.getElementById("lundi").checked === true){
    var absence1 = "lundi";
}


// Utilisation de l'événement Input pour controler le prénom -> comment utiliser cet événement?
document.getElementById("prenom").addEventListener("input", function (e) {
    console.log(e.target.value);
});


// Utilisation de blur + indexOf pour contrôler le courriel en fin de saisie
document.getElementById("courriel").addEventListener("blur", function (e) {
    var validiteCourriel = "";
    if (e.target.value.indexOf("/.+@.+\..+/") === -1) {
        // Le courriel saisi ne contient pas le caractère @
        validiteCourriel = "Adresse invalide";
    }
    document.getElementById("aideCourriel").textContent = validiteCourriel;
});
// la valeur de l'indexOf est une expression régulière qui permet de vérifier les contraintes suivantes :  
    // Commence par un ou plusieurs caractères (.+)
    // Contient ensuite le caractère @ (@)
    // Contient ensuite un ou plusieurs caractères (.+)
    // Contient ensuite le caractère.(\.)
    // Finit par  un ou plusieurs caractères (.+)


// SCRIPT DE GENERATION PLANNING


// Définition de l'objet collaborateur
var collaborateur = {
    
    // initialise le collaborateur
    init: function (nom, prenom, rythme, absence, quartHeureReservoir) {
        this.nom = nom;
        this.prenom = prenom;
        this.rythme = rythme;
        this.absence = absence;
        this.quartHeureReservoir = quartHeureReservoir;
    },
    // décrit le collaborateur
    decrire: function () {
        return "Nom : " + this.nom + ", prénom : " + this.prenom + ", rythme : " + this.rythme + ", absence : " + this.absence + ", quartHeureReservoir : " + this.quartHeureReservoir;
    },
};


// Création de l'équipe
var equipe = [];


// Fonction rajout d'un membre
var nombreDeMembre = 1;
function rajoutMembre () {
    var nom = form.elements.nom.value;
    var prenom = form.elements.prenom.value;
    var rythme = form.elements.rythme.value;
    var absence = champsAbsences;
    var quartHeureReservoir = form.elements.reservoir.value;
    var nouveauCollaborateur = Object.create(collaborateur);
    collaborateur.init(nom, prenom, rythme, absence, quartHeureReservoir);
    equipe.push(nouveauCollaborateur);
    console.log("Le nouveau collaborateur a été ajouté");
    var rajout = document.createElement("td"); // création d'un élément span
    rajout.textContent = prenom + " " + nom; // Définition de son contenu textuel
    document.getElementById("membre" + nombreDeMembre).appendChild(rajout); // Intégration de l'élément dans le tableau
    nombreDeMembre++;
    
// Sous-projet planning Bac : Rajouter un champs pour :
// - le nombre d'heures
// - pas plus de 4 classes
// - repartition techno / général
// - ne doivent pas avoir leurs classes
    
}
document.getElementById("rajoutMembre").addEventListener("click",rajoutMembre);


// Définition de l'objet groupe
var groupe = {
    
    // initialise le groupe
    init: function (nomGroupe, uniteGroupe) {
        this.nomGroupe = nomGroupe;
        this.uniteGroupe = uniteGroupe;
    },
    // décrit le groupe
    decrire: function () {
        return "Nom du Groupe : " + this.nomGroupe + ", unités dans le groupe : " + this.uniteGroupe;
    },
};


// Création de la liste des groupes
var listeDesGroupes = [];


// Fonction rajout d'un groupe
var nombreDeGroupe = 1;
function rajoutGroupe () {
    var nomGroupe = form.elements.nomGroupe.value;
    var uniteGroupe = form.elements.uniteGroupe.value;
    var nouveauGroupe = Object.create(groupe);
    groupe.init(nomGroupe, uniteGroupe);
    listeDesGroupes.push(nouveauGroupe);
    console.log("Le nouveau groupe a été ajouté");
    var rajout2 = document.createElement("td"); // création d'un élément span
    rajout2.textContent = nomGroupe + " " + uniteGroupe; // Définition de son contenu textuel
    document.getElementById("groupe" + nombreDeGroupe).appendChild(rajout2); // Intégration de l'élément dans le tableau
    nombreDeGroupe++;  
}
document.getElementById("rajoutGroupe").addEventListener("click",rajoutGroupe);


// Fonction répartition du total des unités de tous les groupes entre le nombre de membre de l'équipe
function repartition (){
    var repartition = 4;
    // Mettre une boucle for pour récupérer le nombre d'unité par groupe puis la diviser par le nombre de membre
    document.getElementById("repartition").input.value = repartition;
}
document.getElementById("calculRepartition").addEventListener("click",repartition);


// Génération du planning

// Fonction création du planning
function creerPlanning (jours, heures, quartHeures) {
    
    // Définition des tableaux à créer par la fonction
    var jours = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi"];
    var heures = ["8H","9H","10H","11H","12H","13H","14H","15H","16H","17H","18H"];
    var quartHeures = ["00","15","30","45"];
    
    var sommeUniteDeTemps = jours.length * heures.length * quartHeures.length;

    // Définition de l'objet unité de temps
    var uniteDeTemps = {
        
        // initialise l'unité de temps
        init: function (joursConcerne, heuresConcerne, quartHeuresConcerne) {
            this.joursConcerne = joursConcerne;
            this.heuresConcerne = heuresConcerne;
            this.quartHeuresConcerne = quartHeuresConcerne;
        },
        
        // décrit l'unité de temps
        decrire: function () {
        return "Jours concernés : " + this.joursConcerne + ", heures concernées : " + this.heuresConcerne + ", quart d'heures concernées : " + this.quartHeuresConcerne;
        },
    };

    // Définition du tableau planning à remplir par les unités de temps
    var planning = [];

    var j = 0;
    var h = 0;
    var q = 0;    
    
    // Boucle de création de chaques unités de temps nécessaire (j x h x q) pour alimenter le planning
    for (var i2 = 0; i2 < sommeUniteDeTemps; i2++) {

        var joursConcerne = jours[j];
        var heuresConcerne = heures[h];
        var quartHeuresConcerne = quartHeures[q];
        var uniteDeTemps = Object.create(uniteDeTemps);
        uniteDeTemps.init(joursConcerne, heuresConcerne, quartHeuresConcerne)
        planning.push(uniteDeTemps); // Intégration de l'unité de temps dans le planning
        
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
    
    // Affichage du planning pour test -> A supprimer après la mise en production
    console.log("Bilan Planning")
        for (var p = 0; p < planning.length; p++) {
            console.log(planning[p].decrire());
        }

    // Définition de l'objet unité de temps par collaborateurs
    var uniteCollaborateur = {
        
        // initialise l'objet
        init: function (nom, prenom, joursConcerne, heuresConcerne, quartHeuresConcerne, type){
            this.nom = nom;
            this.prenom = prenom;
            this.joursConcerne = joursConcerne;
            this.heuresConcerne = heuresConcerne;
            this.quartHeuresConcerne = quartHeuresConcerne;
            this.type = typeConcerne;
        },
        
        // décrit l'objet
        decrire: function () {
        return "Nom : " + this.nom + ", prénom : " + this.prenom + " , Jours concernés : " + this.joursConcerne + ", heures concernées : " + this.heuresConcerne + ", quart d'heures concernées : " + this.quartHeuresConcerne + " , type : " + this.type;
        },
    }
    
    
    // Définition du tableau planning à remplir par les unités de temps par collaborateurs
    var planningDetaille = [];
    
    
    // Boucle de création de chaques unités de temps collaborateurs nécessaires (j x h x q x collaborateurs de l'équipe) pour alimenter le planning détaillé
    for (var i3 = 0; i3 < planning.length; i3++) {
        
        // Boucle de création de chaques unités de temps collaborateurs par collaborateurs présents dans le tableau équipe
        for (var i4 = 0; i4 < equipe.length; i4++) { 
            
            // Condition de création si le réservoir est non vide
            if (equipe[i4].quartHeureReservoir > 0) {
                equipe[i4].quartHeureReservoir = equipe[i4].quartHeureReservoir - 1;
                var nom = equipe[i4].nom;
                var prenom = equipe[i4].prenom;
                var joursConcerne = planning[i3].joursConcerne;
                var heuresConcerne = planning[i3].heuresConcerne;
                var quartHeuresConcerne = planning[i3].quartHeuresConcerne;
                var typeConcerne = equipe[i4].typeConcerne;
                var uniteCollaborateur = Object.create(uniteCollaborateur);
                uniteCollaborateur.init(nom, prenom, joursConcerne, heuresConcerne, quartHeuresConcerne, typeConcerne)
                planningDetaille.push(uniteCollaborateur); // intégration de l'unité de temps collab dans le planning détaillé
                
                var rajout = document.createElement("td"); // création d'un élément span
                rajout.textContent = prenom + " " + nom + " (" + typeConcerne + ") "; // Définition de son contenu textuel
                document.getElementById(joursConcerne + heuresConcerne + quartHeuresConcerne).appendChild(rajout); // Intégration de l'élément dans le tableau
            }
        }
    }
    
    // Affichage du planning détaillé pour test -> à supprimer après la mise en production
    console.log("Bilan Planning Détaillée")
        for (var p2 = 0; p2 < planningDetaille.length; p2++) {
            console.log(planningDetaille[p2].decrire());
        }
}    
    
// Lancement de la génération du planning
document.getElementById("genererPlanning").addEventListener("click",creerPlanning);

// Verification avant envoi du formulaire -> test valable si les champs method="post" action="traitement.php" sont supprimés -> NE FONCTIONNE PAS
form.addEventListener("submit", function (e) {
    console.log("test d'annulation d'envoie");
    e.preventDefault(); // Annulation de l'envoi des données

});
