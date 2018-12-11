/* 
	museos-cyl.js
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

var mapOptions;
var map;
var detalleMapa;
var layer;
var marker;
var markerGroup = null;
var markerGroupMap = null;
var json_file;
$(function() {
	// Setup - add a text input to each footer cell
    $('#example tfoot th').each( function () {
        var title = $(this).text();
        if((title != "Nombre del museo") && (title != "Más info")){
	    	$(this).html( '<input type="text" class="form-control form-control-sm" style="width: 100%"/>' );  
        }else{
	       	$(this).html( '' ); 
        }   
    } );
    
	var table = $("#example").DataTable({
        "language": {
	        "search": "Buscar",
            "lengthMenu": "Mostrar _MENU_ resultados por página",
            "zeroRecords": "No se han encontrado resultados",
            "info": "Mostrando página _PAGE_ de _PAGES_",
            "infoEmpty": "No hay datos en la tabla",
            "infoFiltered": "(filtro de un total de _MAX_ registros)",
            "paginate": {
				"previous": "<",
				"next": ">"
    		}
        }
    });
    // Apply the search
    table.columns().every( function () {
        var that = this;
 
        $( 'input', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        } );
    } );
    
	var testDataUrl = "https://analisis.datosabiertos.jcyl.es/resource/raji-uqfx.json";
	$('#map').on( 'click', 'button', function () {
		var id_museo = $(this).attr('id');
		var html_content = "<hr>";
		json_file.forEach(function(item){
  			if(item.identificador == id_museo){
	  			html_content = html_content + "<h2>" + item.nombre_del_organismo + "</h2><p>";
  				if(item.direcci_n == null){
	  				html_content = html_content + "<b><i class='fas fa-map-marker-alt'></i> Dirección </b>" + item.calle + " " + item.codigopostal + " " + item.localidad + " (" + item.directorio_superior + ")<br>";
  				}else{
	  				html_content = html_content + "<b><i class='fas fa-map-marker-alt'></i> Dirección </b>" + item.direcci_n + "<br>";	
  				}
  				if(item.tel_fono == null){
	  				html_content = html_content + "<b><i class='fas fa-phone'></i> Teléfono </b>No disponible<br>";	
  				}else{
	  				html_content = html_content + "<b><i class='fas fa-phone'></i> Teléfono </b>" + item.tel_fono + "<br>";
  				}
  				if(item.telefax_oficial == null){
	  				html_content = html_content + "<b><i class='fas fa-fax'></i> Telefax </b>No disponible<br>";
  				}else{
	  				html_content = html_content + "<b><i class='fas fa-fax'></i> Telefax </b>" + item.telefax_oficial + "<br>";
  				}
  				if(item.fax == null){
	  				html_content = html_content + "<b><i class='fas fa-fax'></i> Fax </b>No disponible<br>";
  				}else{
	  				html_content = html_content + "<b><i class='fas fa-fax'></i> Fax </b>" + item.fax + "<br>";
  				}
  				if(item.p_ginas_de_internet == null){
	  				html_content = html_content + "<b><i class='fas fa-globe'></i> Página Web </b> No disponible<br>";
  				}else{
  					html_content = html_content + "<b><i class='fas fa-globe'></i> Página Web </b><a href='" + item.p_ginas_de_internet + "' target='_blank'>Acceder</a>" + "<br>";	  							
  				} 
  				if(item.fax == null){
	  				html_content = html_content + "<b><i class='far fa-envelope'></i> Email </b>No disponible<br>";
  				}else{
	  				html_content = html_content + "<b><i class='far fa-envelope'></i> Email </b>" + item.e_mail + "<br>";
  				} 
  				html_content = html_content + "<b><i class='fas fa-map-marked-alt'></i> Google Maps </b><a href='http://www.google.com/maps/place/"+item.posicion.coordinates[1]+","+item.posicion.coordinates[0]+"' target='_blank'> Abrir</a>";
  				if(item.descripci_n != null){
	  				html_content = html_content + item.descripci_n;
  				}else{
	  				if(item.informaci_n_adicional != null){
		  				html_content = html_content + item.informaci_n_adicional;
	  				}
  				}   														  							 	  
  				html_content = html_content + "</p>";	
  				$( "#detalleMuseoMapa" ).html(html_content);
  				$("html, body").animate({ scrollTop: $(document).height() }, 1000);	
		 	}
		}); 					
	});
	$('#example tbody').on( 'click', 'button', function () {									
		var id_museo = $(this).attr('id');
		var html_content = "<hr>";
		console.log("button clicked: " + id_museo);
		json_file.forEach(function(item){
  			if(item.identificador == id_museo){
	  			html_content = html_content + "<h2>" + item.nombre_del_organismo + "</h2><p>";
  				if(item.direcci_n == null){
	  				html_content = html_content + "<b><i class='fas fa-map-marker-alt'></i> Dirección </b>" + item.calle + " " + item.codigopostal + " " + item.localidad + " (" + item.directorio_superior + ")<br>";
  				}else{
	  				html_content = html_content + "<b><i class='fas fa-map-marker-alt'></i> Dirección </b>" + item.direcci_n + "<br>";	
  				}
  				if(item.tel_fono == null){
	  				html_content = html_content + "<b><i class='fas fa-phone'></i> Teléfono </b>No disponible<br>";	
  				}else{
	  				html_content = html_content + "<b><i class='fas fa-phone'></i> Teléfono </b>" + item.tel_fono + "<br>";
  				}
  				if(item.telefax_oficial == null){
	  				html_content = html_content + "<b><i class='fas fa-fax'></i> Telefax </b>No disponible<br>";
  				}else{
	  				html_content = html_content + "<b><i class='fas fa-fax'></i> Telefax </b>" + item.telefax_oficial + "<br>";
  				}
  				if(item.fax == null){
	  				html_content = html_content + "<b><i class='fas fa-fax'></i> Fax </b>No disponible<br>";
  				}else{
	  				html_content = html_content + "<b><i class='fas fa-fax'></i> Fax </b>" + item.fax + "<br>";
  				}
  				if(item.p_ginas_de_internet == null){
	  				html_content = html_content + "<b><i class='fas fa-globe'></i> Página Web </b> No disponible<br>";
  				}else{
  					html_content = html_content + "<b><i class='fas fa-globe'></i> Página Web </b><a href='" + item.p_ginas_de_internet + "' target='_blank'>Acceder</a>" + "<br>";	  							
  				} 
  				if(item.fax == null){
	  				html_content = html_content + "<b><i class='far fa-envelope'></i> Email </b>No disponible<br>";
  				}else{
	  				html_content = html_content + "<b><i class='far fa-envelope'></i> Email </b>" + item.e_mail + "<br>";
  				} 
  				html_content = html_content + "<b><i class='fas fa-map-marked-alt'></i> Google Maps </b><a href='http://www.google.com/maps/place/"+item.posicion.coordinates[1]+","+item.posicion.coordinates[0]+"' target='_blank'> Abrir</a><br>";  				
  				if(item.descripci_n != null){
	  				html_content = html_content + item.descripci_n;
  				}else{
	  				if(item.informaci_n_adicional != null){
		  				html_content = html_content + item.informaci_n_adicional;
	  				}
  				}   														  							 	
  				html_content = html_content + "</p>";
  				$( "#detalleMuseoTabla" ).html(html_content);
  							
  				if(detalleMapa == null){
  					// Creating map options
  					mapOptions = {
  						center: [parseFloat(item.posicion.coordinates[1]), parseFloat(item.posicion.coordinates[0])],
  						zoom: 15
         			}
		 			// Creating a map object
		 			detalleMapa = new L.map('detalleMapa', mapOptions);
	  			}else{
		  			detalleMapa.panTo(new L.LatLng(parseFloat(item.posicion.coordinates[1]), parseFloat(item.posicion.coordinates[0])));		  						
	  			}
	  			// Creating a Layer object
	  			layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		  			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'});
	  			// Adding layer to the map
	  			detalleMapa.addLayer(layer);
	  			if(markerGroup != null){
	  				detalleMapa.removeLayer(markerGroup);  
	   			}
	   			markerGroup = L.layerGroup().addTo(detalleMapa);
	  			//Adding marker to the map
	  			marker = L.marker([parseFloat(item.posicion.coordinates[1]), parseFloat(item.posicion.coordinates[0])]).addTo(markerGroup);	
		 	}
		}); 
		$("html, body").animate({ scrollTop: $(document).height() }, 1000);
    });
	$("#loadDataTable").click(function() {
		$("#contenidoMapa").css("display", "none");
		$("#contenidoInicio").css("display", "none");
		$("#loadDataTable").addClass("btn-active");
		$("#loadDataMap").removeClass("btn-active");

		loadDataTable();
  	});				  				
  	$("#loadDataMap").click(function() {
	  	$("#contenidoTabla").css("display", "none");
	  	$("#contenidoInicio").css("display", "none");
	  	$("#contenidoMapa").css("display", "block");
	  	$("#loadDataTable").removeClass("btn-active");
		$("#loadDataMap").addClass("btn-active");
	  	if(map == null){
	  		// Creating map options
	  		mapOptions = {
  				center: [41.653084, -4.725739],
  				zoom: 7
         	}
		 	// Creating a map object
		 	map = new L.map('map', mapOptions);
	  	}
		// Creating a Layer object
		layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'});
		// Adding layer to the map
		map.addLayer(layer);		
		json_file = (function() {
		 	var json = null;
		 	$.ajax({
		 		'async': false,
		 		'global': false,
		 		'url': testDataUrl,
		 		'dataType': "json",
		 		'success': function (data) {
		 			json = data;
            	}
        	});
			return json;
    	})();
  	});
  	$('#buscar_mapa').on('click', function(){
  		console.log("buscar mapa clicked"); 
  		loadMarkers(); 
    });
    function loadMarkers(){
	    var selected_value = $("#filtro_provincia").val();
	    var filtro_result = filtrarProvincia(selected_value);
		console.log("Filtro provincia OK"); 
		if(markerGroupMap != null){
	  		map.removeLayer(markerGroupMap);  
	   	}
	   	markerGroupMap = L.layerGroup().addTo(map);
		filtro_result.forEach(function(item){
			//Adding marker to the map
			L.marker([parseFloat(item.posicion.coordinates[1]), parseFloat(item.posicion.coordinates[0])]).addTo(markerGroupMap).bindPopup("<b>" + item.nombre_del_organismo + "</b><br><br><center><button id='"+item.identificador+"'>Ver info</button></center>");
		});										
    }	
    function filtrarProvincia(selected_value){
	    var aux = [];
	    if(selected_value == "Todas"){
			return json_file;		
		}else{
	    	json_file.forEach(function(item){
				if(item.directorio_superior == selected_value){
					aux.push(item);
				}
			});
			return aux;			    		
		}
    }
  	function loadDataTable() {
  		$.ajax({
  			type: 'GET',
  			url: testDataUrl,
  			contentType: "text/plain",
  			dataType: 'json',
  			success: function (data) {
  				myJsonData = data;
  				json_file = myJsonData;
  				populateDataTable(myJsonData);
      		},
	  		error: function (e) {
	  			console.log("Ha habido un error con la petición...");
	  			console.log("error: " + JSON.stringify(e));
      		}
    	});
  	}
  	// populate the data table with JSON data
  	function populateDataTable(data) {
  		console.log("populating data table...");
  		// clear the table before populating it with more data
  		$("#example").DataTable().clear();
  		data.forEach(function(item){
  			//console.log(item.denominaci_n_gen_rica);
  			$('#example').dataTable().fnAddData( [
  				item.nombre_del_organismo,
  				item.localidad,
  				item.directorio_superior,
  				'<center><button id="'+item.identificador+'" class="btn btn-primary">Ver</button></center>'
  			]);
  		});
  	}
  				
});