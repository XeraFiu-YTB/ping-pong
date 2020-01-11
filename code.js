/////////////////////////////////////////
///// variables globales éventuelles/////
////////////////////////////////////////
var souris= 0 // x
var paletCoords = [0,0] //x1 à x2
var coordsBall = [500,400] //x et y
var velocity = 1
var pause = false
var choqueRaquette = false
var haut = false
var colision = false
var colisionCote = false
var gauche = false
var animer
var nombreWin = 0
var nombreLose = 0


/////////////////////////////////////////
///// abonnements///////////////////////
////////////////////////////////////////


function demarrer () { 
	var canvas = document.getElementById('canvas')
	var ctx = canvas.getContext('2d')
	canvas.width = 800;
	canvas.height = 800;
	document.getElementById('canvas').addEventListener("mousemove", calcul); 
	document.getElementById('canvas').addEventListener("mouseout", exit);
	dessiner()
}

////////////////////////////////////////
//////////////fonctions/////////////////
////////////////////////////////////////

function calcul() {
	//Relancer l'animation au survol du canvas
	if(pause == true) {animer = window.requestAnimationFrame(dessiner), pause = false}
	souris = event.pageX-getOffsetLeft(this)
	paletCoords[0] = souris - 50
	paletCoords[1] = souris + 50
	console.log(`souris x:${souris}`)
	console.log(`Palet : ${paletCoords[0]} à ${paletCoords[1] }`)
	console.log(`Balle : [${coordsBall[0]},${coordsBall[1]}]`)
}
function calculBall() {
	colisionAvecUnContour()
	console.log(`Gauche:${gauche} & Haut:${haut}`)
	if(haut == true && gauche == false) {
		coordsBall[0] = coordsBall[0] + 2
		coordsBall[1] = coordsBall[1] + 4
	}
	if(haut == true && gauche == true) {
		coordsBall[0] = coordsBall[0] - 2
		coordsBall[1] = coordsBall[1] + 4
	}
	if(haut == false && gauche == false) {
		coordsBall[0] = coordsBall[0] + 2
		coordsBall[1] = coordsBall[1] - 4
	}
	if(haut == false && gauche == true) {
		coordsBall[0] = coordsBall[0] - 2
		coordsBall[1] = coordsBall[1] - 4
	}
	console.log(`Balle : [${coordsBall[0]},${coordsBall[1]}]`)
	console.log(`Palet : ${paletCoords[0]} à ${paletCoords[1] }`)
}
function dessiner() {
	var canvas = document.getElementById('canvas')
	var ctx = canvas.getContext('2d')
	with (ctx) {
		//On efface le canvas avant de dessiner
		clearRect(0, 0, canvas.width, canvas.height);
		//Dessin du palais
		strokeStyle = "rgb(196,24,67)"
		lineWidth = 1;
		beginPath(); 
		fillStyle = "rgb(24,101,196)";
		rect(paletCoords[0],780,100,20); //x,y,largeur,hauteur
		closePath();
		stroke();
		fill();
		//Dessin de la balle
		beginPath(); 
		fillStyle = "rgb(54,240,16)";
		arc(coordsBall[0],coordsBall[1],30,0,2*Math.PI); //x,y,radius
		closePath();
		stroke();
		fill();
	}
calculBall()
console.log('refresh')
animer = window.requestAnimationFrame(dessiner);	
}


function colisionAvecUnContour() {
	console.log('Cherche Colision')
	//Si xBall est sur le palais et yBall sur le palet (800-20)
	if((paletCoords[0] <= coordsBall[0] && paletCoords[1] >= coordsBall[0]) && (coordsBall[1]+30) >= 780) {
		console.log('Balle rattrapé')
		choqueRaquette = true
		nombreWin++
		document.getElementById('win').innerHTML = `Win : ${nombreWin}`
		if(haut == true) {haut = false} else {haut = true}
	}
	if((coordsBall[1] <= 0 || coordsBall[1] >= 800) /*&& choqueRaquette == false*/) {
		console.log('Colision en haut ou en bas')
		if(coordsBall[1]>=800) {
			nombreLose++
			document.getElementById('lose').innerHTML = `Lose : ${nombreLose}`
		}
		colision = true
		if(haut == true) {haut = false} else {haut = true}
	}
if((coordsBall[0] <= 0 || coordsBall[0] >= 800) /*&& choqueRaquette == false*/) {
	console.log('Colision à gauche ou droite')
		colisionCote = true
		if(gauche == true) {gauche = false} else {gauche = true}
	}
	//
	choqueRaquette = false
	colision = false
	colisionCote = false
}

function exit() {
	console.log('Pause')
	pause = true
	window.cancelAnimationFrame(animer);
}

var getOffsetLeft = function(elt) {
    var result = 0;
    if (elt.offsetParent) {
	result = result + getOffsetLeft(elt.offsetParent);
    }
    return result + elt.offsetLeft;
} 


////////////////////////////////////////
//////////////CORPS/////////////////////
////////////////////////////////////////
window.addEventListener("load", demarrer); // attends le chargement complet pour démarrer
