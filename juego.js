


// variables
let usuario = prompt("Ingrese su nombre");
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 45;
let timerInicial = 45;
let tiempoRegresivo = null;
// apuntando a documento html

let mostarMovimientos = document.getElementById('movimientos')
let mostarAciertos = document.getElementById('aciertos')
let mostrarTiempo = document.getElementById('tiempo')
;
let mostrarUsuario = document.getElementById('nombreUsuario');
//arreglo para numeros aleatorios
let numeros=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random() -0.5});
//numeros.sort ordena el arreglo
//math.random genera numeros aleatorios para desordenar el arreglo
//se le resta -0.5 para tener numeros aleatorios desde -0.5 hasta el 0.5
console.log(usuario);
console.log(numeros);

mostrarUsuario.innerHTML =`Bienvenido: ${usuario}`; 



function contarTiempo(){
    tiempoRegresivo = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiempoRegresivo);
            bloquerTarjetas();
        }
    },1000);
}

// funcion para bloquear las tarjetas en caso que se acabe el tiempo y muestra la ubicacion de cada una
function bloquerTarjetas(){
    for(let i=0;i<=15;i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.disabled = true;
    }
}
//funcion principal
function destapar(id){
    
    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas==1){
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id] 
        tarjeta1.innerHTML = primerResultado;
        //deshabilitar el primer boton
        tarjeta1.disabled = true;  
    }else if(tarjetasDestapadas ==2){
        //Mostrar 2do numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id]
        tarjeta2.innerHTML = segundoResultado;

        //deshabilitar segundo boton
        tarjeta2.disabled = true;

        //incremetar movimientos
        movimientos ++;
        mostarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(primerResultado == segundoResultado){
            tarjetasDestapadas = 0;

            //aumentar aciertos
            aciertos ++;
            mostarAciertos.innerHTML = `Aciertos: ${aciertos} ​`;

            if(aciertos == 8){
                clearInterval(tiempoRegresivo);
                mostarAciertos.innerHTML = `Aciertos: ${aciertos} 🙌​`;
                mostrarTiempo.innerHTML = `Genial 😎​ solo demoraste ${ timerInicial - timer} segundos`;
                mostarMovimientos.innerHTML = `Movimientos: ${movimientos}👍​🎉`
            }
        }else{
            //mostrar temporalmente valores y volver a tapar
            setTimeout(()=>{
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },800);
        }
    }
}