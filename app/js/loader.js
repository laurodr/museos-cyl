/* 
	loader.js
    Copyright (C) 2018  Laura Rodríguez Martín

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see https://www.gnu.org/licenses/.	
*/

$(document).ready(function(){
	$(document).ajaxStart(function(){
		$("#wait").css("display", "block");
		$("#contenidoTabla").css("display", "none");
		$("#contenidoMapa").css("display", "none");
    });
	$(document).ajaxComplete(function(){
		$("#wait").css("display", "none");
		$("#contenidoTabla").css("display", "block");
		//$("#contenidoMapa").css("display", "block");
    });
    var image = new Array ();
	var caption = new Array ();
	image[0] = "https://upload.wikimedia.org/wikipedia/commons/d/d7/Villa_Romana_de_La_Olmeda_Mosaicos_romanos_004.jpg";
	caption[0] = '<a href="https://es.wikipedia.org/wiki/Archivo:Villa_Romana_de_La_Olmeda_Mosaicos_romanos_004.jpg">Villa Romana de La Olmeda, Palencia</a> por <a href="https://commons.wikimedia.org/wiki/User:Valdavia">Valdavia</a>, bajo la licencia <a href="https://globaldigitalcitizen.org/search-attribute-creative-commons-photos">CC BY-SA 3.0</a>';
	image[1] = "https://upload.wikimedia.org/wikipedia/commons/c/c7/Soria_Museo_Numantino.JPG";
	caption[1] = '<a href="https://commons.wikimedia.org/wiki/File:Soria_Museo_Numantino.JPG">Museo Numantino, Soria</a>';
	image[2] = "https://upload.wikimedia.org/wikipedia/commons/7/76/Zamora_-_Catedral%2C_exteriores_35.jpg";
	caption[2] = '<a href="https://commons.wikimedia.org/wiki/File:Zamora_-_Catedral,_exteriores_35.jpg">Catedral de Zamora</a> por <a href="https://commons.wikimedia.org/wiki/User:Zarateman">Zarateman</a>, bajo la licencia <a href="https://creativecommons.org/publicdomain/zero/1.0/deed.en">CC0 1.0</a>';
	image[3] = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Casacervantes_academia_artes01_lou.jpg";
	caption[3] = '<a href="https://commons.wikimedia.org/wiki/File:Casacervantes_academia_artes01_lou.jpg">Museo Casa Cervantes, Valladolid</a> por Lourdes Cardenal, bajo la licencia <a href="https://globaldigitalcitizen.org/search-attribute-creative-commons-photos">CC BY-SA 3.0</a>';
	image[4] = "https://upload.wikimedia.org/wikipedia/commons/9/96/MEH_Frontal.JPG";
	caption[4] = '<a href="https://commons.wikimedia.org/wiki/File:MEH_Frontal.JPG">Museo de la Evolución Humana, Burgos</a>';
	image[5] = "https://upload.wikimedia.org/wikipedia/commons/4/4e/Casa_de_los_Abarca.jpg";
	caption[5] = '<a href="https://commons.wikimedia.org/wiki/File:Casa_de_los_Abarca.jpg" >Museo de Salamanca</a> por Alberto Sánchez García, bajo la licencia <a href="https://creativecommons.org/licenses/by-sa/3.0/es/deed.en">CC BY-SA 3.0 ES</a>';
	image[6] = "https://upload.wikimedia.org/wikipedia/commons/e/e5/Segovia_-_Alc%C3%A1zar_de_Segovia_22_2017-10-24.jpg";
	caption[6] = '<a href="https://commons.wikimedia.org/wiki/File:Segovia_-_Alc%C3%A1zar_de_Segovia_22_2017-10-24.jpg">Alcázar de Segovia</a> por <a href="https://commons.wikimedia.org/wiki/User:Rafesmar">Rafa Esteve</a>, bajo la licencia <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.en">CC BY-SA 4.0</a>';
	image[7] = "https://upload.wikimedia.org/wikipedia/commons/e/e3/Avila_82_Casa_Deanes_by-dpc.jpg";
	caption[7] = '<a href="https://commons.wikimedia.org/wiki/File:Avila_82_Casa_Deanes_by-dpc.jpg">Casa de los Deanes, sede del Museo de Ávila</a> por <a href="https://commons.wikimedia.org/wiki/User:David_Perez">David Perez</a>, bajo la licencia <a href="https://creativecommons.org/licenses/by/3.0/deed.en">CC BY 3.0</a>';
	image[8] = "https://upload.wikimedia.org/wikipedia/commons/b/b0/Le%C3%B3n_-_MUSAC_02.JPG";
	caption[8] = '<a href="https://commons.wikimedia.org/wiki/File:Le%C3%B3n_-_MUSAC_02.JPG">Museo de Arte Contemporáneo, León</a> por <a href="https://commons.wikimedia.org/wiki/User:Zarateman">Zarateman</a>, bajo la licencia <a href="https://creativecommons.org/publicdomain/zero/1.0/deed.en">CC0 1.0</a>';
	var size = image.length
	var x = Math.floor(size*Math.random())

	$('#randomImages').attr('src',image[x]);
	$('#imgCaption').html(caption[x]);
});