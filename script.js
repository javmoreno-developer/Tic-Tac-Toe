var endGame=false;
var pick=true;
var correctChoose=true;

//arrays del user
let filasUserArray=[];
let columnasUserArray=[];
let diagonalUser=[];
//arrays de la maquina
let filasMachArray=[];
let columnasMachArray=[];
let diagonalMach=[];

if(endGame==false) {
	
	//pulsacion de celda
	$( ".cell" ).each(function(index) {
	    $(this).on("click", function() {
	    	//turno usuario
	    	if(pick==true) {
	    		if($(this).attr("class") == "cell") {
			        $(this).addClass("choose");

			        
			        let filaLocal=Math.ceil($(this).attr("id").split("_")[1]);
			        let columnaLocal=Math.ceil($(this).attr("id").split("_")[2]);
			        let diagonalLocal=Math.ceil($(this).attr("data-total"));
			        filasUserArray.push(filaLocal);
			        columnasUserArray.push(columnaLocal);
			        diagonalUser.push(diagonalLocal);
			       	correctChoose=true;
			        comprobacion(filasUserArray,columnasUserArray,diagonalUser,"usuario");
		   	   } else {
		   	   	 
		   	   	 correctChoose=false;
		   	   }
		    }
	       
	       	if(filasUserArray.length>=5) {
		       	
	       		comprobacion(filasUserArray,columnasUserArray,diagonalUser,"usuario");

		       	
		       	correctChoose=false;
	       		if(endGame==false) {
		       		swal({
					  title: "Game over",
					  text: "No hay mas casillas",
					  type: "info",
					  confirmButtonColor: "#DD6B55",
					  confirmButtonText: "Reiniciar juego",
					  closeOnConfirm: false
					},
					function(){
					  window.location.reload();
					});
		       	}
				endGame=true;
			}

	         //turno ordenador
	        pick=false;
	        if(endGame==false) {
	        	if(correctChoose==true) {
			        setTimeout(function() {
			        	let x,y=0;
			        	let repe=false;
			        	do {
			        		repe=false;
			        		x=Math.round(Math.random()*2+1);
			        		y=Math.round(Math.random()*2+1);
			        		//comprobamos si hay repeticiones
			        		for(let z=0;z<filasUserArray.length;z++) {
			        			if(filasUserArray[z] == x && columnasUserArray[z] == y) {
			        				repe=true;
			        			}
			        		}
			        	
			        		

			        		for(let z=0;z<filasMachArray.length;z++) {
			        			if(filasMachArray[z] == x && columnasMachArray[z] == y) {
			        				repe=true;
			        			}
			        		}

			      			if(repe==false) {
			      				filasMachArray.push(x);
			        			columnasMachArray.push(y);
			      			}
			        	} while(repe==true);
			        	$("#cell_"+x+"_"+y).addClass("choosePc");
			        	diagonalMach.push(Math.ceil($("#cell_"+x+"_"+y).attr("data-total")));
			        	comprobacion(filasMachArray,columnasMachArray,diagonalMach,"maquina");
			        	pick=true;
			        },1000);
		    	} else {
		    		pick=true;
		    	}
	    	}
	    	
	    });
	    
	});


function comprobacion(filas,columnas,diagonales,persona) {
	//comprobacion de filas
	let filaContador=0;
	let conversion=false;

	for(let i=0;i<filas.length;i++) {
		

		filaContador=0;

		for(let j=0;j<i;j++) {
			if(filas[j]==filas[i]) {
				filaContador++;
			}
		}

		if(filaContador==3) {
			endGame=true;
		}

		
	}

	if(filaContador>=2) {
		endGame=true;
	} 
	
	
	//comprobacion de columnas
	let columnaContador=0;
	conversion=false;

	for(let i=0;i<columnas.length;i++) {
		columnaContador=0;
		for(let j=0;j<i;j++) {
			if(columnas[j]==columnas[i]) {
				columnaContador++;
			}
		}

		if(columnaContador==3) {
			endGame=true;
		}
	}

	if(columnaContador>=2) {
		endGame=true;
	} 
	

	//diagonal izq
	
	if(diagonales.includes(1) && diagonales.includes(5) && diagonales.includes(9)) {
		endGame=true;
	}	

	//diagonal der

	if(diagonales.includes(3) && diagonales.includes(5) && diagonales.includes(7)) {
		endGame=true;
	}

	//final del juego
	if(endGame && filas.length>=3) {
		//alert("juego terminado ganador: "+persona);
		if(persona=="maquina") {
			swal({
			  title: "Game over",
			  text: "La maquina ha ganado",
			  type: "error",
			  confirmButtonColor: "#DD6B55",
			  confirmButtonText: "Reiniciar juego",
			  closeOnConfirm: false
			},
			function(){
			  window.location.reload();
			});
		} else {
			swal({
			  title: "Game over",
			  text: "Has ganado",
			  type: "success",
			  confirmButtonColor: "#DD6B55",
			  confirmButtonText: "Reiniciar juego",
			  closeOnConfirm: false
			},
			function(){
			  window.location.reload();
			});
		}
	}
}
} 