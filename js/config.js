import { c, d } from "https://francisco-pixel.github.io/modulos/js/data.js";
import { conexionInternet } from "https://francisco-pixel.github.io/modulos/js/conexionInternet.js";
import { tiempo } from "https://francisco-pixel.github.io/modulos/js/fecha.js";
import { crearNodo } from "https://francisco-pixel.github.io/modulos/js/crearNodo.js";
import { loaderStyle } from "https://francisco-pixel.github.io/modulos/js/loader.js";
import { padreHijo } from "https://francisco-pixel.github.io/modulos/js/padreHijo.js";
import { setText } from "https://francisco-pixel.github.io/modulos/js/setText.js";
import { btnUp, btnUpStyle } from "https://francisco-pixel.github.io/modulos/js/botonSubir.js";
import { copiarText } from "https://francisco-pixel.github.io/modulos/js/copiarText.js";
conexionInternet()
btnUp()
tiempo()
copiarText()
btnUpStyle({
	"element": ".btn-subir",
	"bg": "hsl(100,70%,40%)",
	"wh": "50px"
})
function calendar(e) {

	let date = new Date(parseInt(e.target.value) || new Date().getFullYear(), 0),
		dias = "Do Lu Ma Mi Ju Vi Sá".split(" "),
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

	d.querySelectorAll(".calendarios").forEach(calendario => {
		let { dia_uno } = calendario.dataset,
			dias_formateados = dia_uno == 0 ? dia_uno = 7 : dia_uno;
		calendario.querySelector(".num_dias").style.gridColumnStart = dias_formateados;
	})
	let calendario = d.querySelectorAll(".calendarios")[new Date().getMonth()];
	calendario.querySelectorAll(".dia")[new Date().getDay()].style.color = "red";
	calendario.querySelectorAll(".num_dias")[new Date().getDate() - 1].style.color = "red";

}

d.addEventListener("keyup", calendar);
d.addEventListener("DOMContentLoaded", calendar);

d.addEventListener("keyup", e => {
	if (e.target.matches(".buscar")) {
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
	if (e.target.matches(".year")) {
		if (e.key == "Escape" || e.key == "Enter") e.target.value = "";
	}
});
