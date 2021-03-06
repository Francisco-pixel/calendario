import { c, d } from "https://francisco-pixel.github.io/modulos/js/data.js";
import { conexionInternet } from "https://francisco-pixel.github.io/modulos/js/conexionInternet.js";
import { tiempo } from "https://francisco-pixel.github.io/modulos/js/fecha.js";
import { crearNodo } from "https://francisco-pixel.github.io/modulos/js/crearNodo.js";
import { loaderStyle } from "https://francisco-pixel.github.io/modulos/js/loader.js";
import { padreHijo } from "https://francisco-pixel.github.io/modulos/js/padreHijo.js";
import { setText } from "https://francisco-pixel.github.io/modulos/js/setText.js";
import { btnUp, btnUpStyle } from "https://francisco-pixel.github.io/modulos/js/botonSubir.js";
import { copiarText } from "https://francisco-pixel.github.io/modulos/js/copiarText.js";
import { registrar_meta_link } from "https://francisco-pixel.github.io/modulos/js/registrar_meta_link.js";
import { registrar_service_worker } from "https://francisco-pixel.github.io/modulos/js/registrar_service_worker.js";
conexionInternet()
btnUp()
tiempo()
copiarText()
registrar_meta_link("./img/calendario.png","#d98026")
registrar_service_worker()
btnUpStyle({
	"element": ".btn-subir",
	"bg": "hsl(30,70%,50%)",
	"wh": "50px"
})
function calendar(e) {
		//let validar=/^[0-9]+$/.test(e.target.value)?e.target.value:e.target.value="";
		
	let date = new Date(parseInt(e.target.value) || new Date().getFullYear(), 0),
		dias = "Do Lu Ma Mi Ju Vi Sá".split(" "),
		feriados={
			0:{
				1:"Año nuevo",
				6:"Día de los Santos Reyes",
				21:"Día de la Altagracia",
				26:"Día de Duarte"
			},
			1:{
				27:"Día de la Independencia"
			},    
			2:{
				1:"Sin feriados"
			},
			3:{
				15:"Viernes Santo"
			},
			4:{
				1:"Día del Trabajo"
			},
			5:{
				16:"Corpus Christi"
			},
			6:{
				1:"Sin feriados"
			},
			7:{
				16:"Día de la Restauración"
			},
			8:{
				24:"Día de las Mercedes"
			},
			9:{
				1:"Sin feriados"
			},
			10:{
				6:"Día de la Constitución"
			},
			11:{
				24:"Nochebuena",
				25:"Navidad",
				31:"Fin de año"
			}
		},
		meses = "enero febrero marzo abril mayo junio julio agosto septiembre octubre noviembre diciembre".split(" ");
	d.querySelector(".mostrar").innerHTML = "";
	meses.forEach((mes, i) => {
		let ultimo_dia = new Date(date.getFullYear(), i + 1, 0).getDate(),
			dia_uno = new Date(date.getFullYear(), i, 2).getDay();
		d.querySelector(".mostrar").innerHTML += `
		<div class="calendarios" data-dia_uno="${dia_uno}">
			<div class="header">
			 	<h2 class="header__mes">${mes}</h2>
			 	<p class="header__fecha">${date.getFullYear()}</p>
			</div>
			<ul class="dias_semana">${dias_semanas()}</ul>
			<ul class="dias_del_mes">${dias_del_mes(ultimo_dia)}</ul>
		</div>
	`;
	})

	function dias_semanas() {
		let mostrar = "";
		dias.forEach(dia => {
			mostrar += `<li class="dia">${dia}</li>`;
		})
		return mostrar;
	}

	function dias_del_mes(ultimo_dia) {
		let mostrar = "";
		for (let dia = 1; dia <= ultimo_dia; dia++) {
			mostrar += `<li class="num_dias">${dia}</li>`;
		}
		return mostrar;
	}

	d.querySelectorAll(".calendarios").forEach((calendario,i) => {
		let { dia_uno } = calendario.dataset,
		todosLosNumDelMes=calendario.querySelectorAll(".num_dias"),
		dias_formateados = dia_uno == 0 ? dia_uno = 7 : dia_uno;
		calendario.querySelector(".num_dias").style.gridColumnStart = dias_formateados;

		Object.keys(feriados[i]).forEach(item=>{
			let resaltarFeriados=d.createElement("span");
			resaltarFeriados.classList.add("descDia");
			resaltarFeriados.innerText=feriados[i][item];
			todosLosNumDelMes[item-1].appendChild(resaltarFeriados)
			todosLosNumDelMes[item-1].style.color="#2583c5";
			todosLosNumDelMes[item-1].style.background="#ddd";
			todosLosNumDelMes[item-1].style.cursor="pointer";
		})
	})
	let calendario = d.querySelectorAll(".calendarios")[new Date().getMonth()];
	calendario.querySelectorAll(".dia")[new Date().getDay()].style.color = "red";
	calendario.querySelectorAll(".num_dias")[new Date().getDate() - 1].style.color = "red";
	if(e.target.value){
		if(e.target.matches(".buscar")){
			let validar=/^[a-z]+$/i.test(e.target.value)?e.target.value:e.target.value="";
			if (e.key == "Escape" || e.key == "Enter") e.target.value = "";
			let regExp = new RegExp(e.target.value, "i");
			d.querySelectorAll(".calendarios").forEach(calendario => {
				if (calendario.innerText.match(regExp)) {
					calendario.classList.remove("activo")
				} else {
					calendario.classList.add("activo")
				}
			})
		}
	}
	if(e.target.value){
		if(e.target.matches(".year")){
			let validar=/^[0-9]+$/.test(e.target.value)?e.target.value:e.target.value="";
			if(e.target.value.length>4)e.target.value="";
			if (e.key == "Escape" || e.key == "Enter") e.target.value = "";
		}
	}

}

d.addEventListener("keyup", calendar);
d.addEventListener("DOMContentLoaded", calendar);