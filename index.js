console.log("API de la NASA")
//import fetch from "node-fetch"
const llave = "qY4WFuImu9bPmbsgR9QRj3NPs0FjvA4Z2xVjBRCe"
var urlapi = `https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-09&api_key=${llave}`

async function ejemploMeteoritos(url){
	try{
    const respuestaapi =await fetch(url)
    const respuestajson = await respuestaapi.json()

    var meteoritos = respuestajson.near_earth_objects
    //meteoritos["2015-09-11"] //HARDCODEADO
    //De esta manera recorremos las llaves (fechas) de manera automatica 
    Object.keys(meteoritos).forEach((elemento,indice,arreglo)=>{
        var listaxDia=meteoritos[elemento]
        /*for(let i=0;i <listaxDia.length;i++){
           if(listaxDia[i].is_potentially_hazardous_asteroid){
             console.log(`El meteorito ${listaxDia[i].name} es potencialmente peligroso`)
           }
           else{
            console.log(`El meteorito ${listaxDia[i].name} NOO es potencialmente peligroso`)
           }
        }*/
        // mismo codigo pero con for each
        listaxDia.forEach((elemento,indice,arreglo)=>{
            if(elemento.is_potentially_hazardous_asteroid){
                console.log(`El meteorito ${elemento.name} es potencialmente peligroso`)
            }else{
                console.log(`El meteorito ${elemento.name} NOO es potencialmente peligroso`)
            }
        })


    })
}catch(error){console.log(error)}

}


//console.log(ejemploMeteoritos(urlapi))

//FOTOS DE MARTE
//Variables globales 
var rover = "curiosity"
var contadorpag =1
var urlMarte = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&page=${contadorpag}&api_key=${llave}`
async function fotosMarte(contadorp){
    //Actualizo urlMarte con el contadorp para paginacion
    urlMarte = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&page=${contadorp}&api_key=${llave}`
    //Hacemos la consulta con fetch a la urlMarte y transformamos respuesta a Json
    var respuestaApi = await fetch(urlMarte)
    var respuestaApiJson = await respuestaApi.json()
    //Accedo a llave photos que contiene la lista de fotos y guardo en variable listaFotos
    var listaFotos =respuestaApiJson.photos
    //LOGICA PARA ACTIVAR BOTON DE "Siguiente" en el HTML
    //Selecciono boton Siguiente por id "pagsisg" (html)
    var botonsiguiente = document.getElementById("pagsig")
    //Selecciono boton Anterior por id 
    var botonanterior = document.getElementById("pagant")
    //Condicion para saber si estamos en la pagina >=2
    if(contadorp>=2){
        botonanterior.classList.remove("escondido")
    }else{
        botonanterior.classList.add("escondido")

    }
    //Condicion para ver si lista fotos tiene 25 o mas fotos
    if (listaFotos.length>=25 ){
        //contadorpag++
        
        // En caso de que tenga >= 25 remueve la clase escondido que tiene display none y el boton aparece
        botonsiguiente.classList.remove("escondido")
    }

    //LOGICA PARA RENDERIZAR TARJETA DE IMAGEN DE MARTE
    //Seleccionamos div que rellenaremos con tarjetas
    var contenedor = document.getElementById("contenedorCartas")
    //metemos html por cada tarjeta a div contenedor
    contenedor.innerHTML = ""
    listaFotos.forEach((elemento,indice,arreglo)=>{
        contenedor.innerHTML += `<div class="card mb-2 col-sm-12 col-md-6 col-lg-4" style="width: 18rem;">
        <img src=${elemento.img_src} class="card-img-top" style="height: 100%; alt=${elemento.id}>
        <div class="card-body">
          <h5 class="card-title">${elemento.camera.full_name}</h5>
          <p class="card-text">${elemento.earth_date}</p>
          
        </div>
            </div> 
        `

    })
    //console.log(respuestaApiJson.photos[0].camera)
    //console.log(respuestaApiJson.photos[0].rover)
}

//funcion que se ejecuta cuando damos click al boton siguiente
async function siguientepag(){
    var selectrover =document.getElementById("robot")
    //incrementamos en uno el contador para hacer FETCH a la siguiente pagina
    contadorpag = contadorpag +1
    rover  =selectrover.value
    //invocamos funcion fotosMarte que hace fetch y renderiza tarjetas
    fotosMarte(contadorpag)
}
async function anterior(){
    var selectrover =document.getElementById("robot")
    rover  =selectrover.value
    contadorpag = contadorpag -1
    //invocamos funcion fotosMarte que hace fetch y renderiza tarjetas
    fotosMarte(contadorpag)
}
//funcion que se ejecuta cuando damos click en el boton buscar
var buscar = async ()=>{
    var selectrover =document.getElementById("robot")
    rover  =selectrover.value
    fotosMarte(contadorpag)
}



//fotosMarte(urlMarte)