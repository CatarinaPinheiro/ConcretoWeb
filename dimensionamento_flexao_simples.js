var Es = 210000; // Módulo de elasticidade do aço
var epslon_c = 0.035 // Deformação do concreto
var Cc = 1.4; // Coeficiente de segurança do concreto
var Cs = 1.15; // Coeficiente de segurança do aço
var d1 = 40;


var Md = null;
var fck = null;
var fyk = null;
var base = null;
var altura = null;


function atualiza_tela(){

	var area = base*altura;

	// Resistência de cálculo do concreto
	var fcd = fck/Cc;

	// Resistência de cálculo do aço
	var fyd = fyk/Cs;

	// Deformação do aço
	var epslon_yd = fyd/Es;

	var d = altura-d1;

	// NBR 6118
	var a = 0.272;
	var b = -0.68*d;
	var c = Md/(base*fcd);

	var delta = b*b  - 4*a*c;
	var x1 = (-b - Math.sqrt(delta))/(2*a);
	var x2 = (-b + Math.sqrt(delta))/(2*a);



	if(x1 < 0)
		posicao_linha_neutra = x2;
	else if (x2 > d)
		posicao_linha_neutra = x1;
	else
		posicao_linha_neutra = x2;


	// Armadura
	var braco_alavanca = d-0.4*posicao_linha_neutra;
	area_armadura = Md/(fyd*braco_alavanca);

	if(Md && fck && fyk && base && altura)
		document.getElementById("resultado").innerHTML=area_armadura;
}




