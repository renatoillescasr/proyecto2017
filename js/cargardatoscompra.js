var http_request = false,
 gcatalogo =[],
 gcompra = [],
 url;
// gmenu = [];

//------------------ AJAX -----------------------
function makeRequest(url) {
    http_request = false;
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/plain');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    if (!http_request) {
        alert('Falla :( No es posible crear una instancia XMLHTTP');
        return false;
    }
    http_request.onreadystatechange = alertContents;
    http_request.open('GET', url, true);
    http_request.send(null);
}

function alertContents() {
    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
            var data = JSON.parse(http_request.responseText);
            console.log(data);
            var valores = getDeUrl();
            //datos JSON los almacena en un arreglo
            data.catalogo.forEach(function(item){
              console.log(item.marca);
              var datacodigo = parseInt(item.codigo);
              console.log(item.codigo);
              var codigoproducto = parseInt(valores.producto_id);
              if(datacodigo == codigoproducto){
                console.log("valores iguales");
                console.log(typeof datacodigo);
                console.log(typeof codigoproducto);
                gcompra.push(item);
                console.log(gcompra);
              }
            })
            //menucategorias(data);
            compraCatalogo(gcompra);
          } else {
            alert('Hubo problemas con la peticion.');
        }
    }
}

function getDeUrl(){
  // capturamos la url
  var loc = document.location.href;
  // si existe el interrogante
  if(loc.indexOf('?')>0){
    // cogemos la parte de la url que hay despues del interrogante
    var getString = loc.split('?')[1];
    //console.log("extrae " + getString);
    // obtenemos un array con cada clave=valor
    var GET = getString.split('&');
    //console.log(GET);
    var get = {};

    // recorremos todo el array de valores
    for(var i = 0, l = GET.length; i < l; i++){
      var tmp = GET[i].split('=');
      get[tmp[0]] = unescape(decodeURI(tmp[1]));
    }
    //console.log(get);
    //console.log(get['marca']);
    //console.log(get['producto_id']);
    return get;
  }
}

function compraCatalogo(arreglo){
  var agregarCompra = document.getElementById('compras');

  //se escribe el div que contendra la imagen clickeada
  var agregarContenedorImagen =  document.createElement('div');
  agregarContenedorImagen.setAttribute("class","col-xs-12 col-sm-12 col-md-8 col-lg-8");
  agregarCompra.appendChild(agregarContenedorImagen);
  agregarFigure = document.createElement('figure');
  agregarImg = document.createElement('img');
  agregarImg.setAttribute("class","imagenVestido");
  agregarImg.setAttribute("src",arreglo[0]['srcImagen']);
  agregarFigure.appendChild(agregarImg);
  agregarContenedorImagen.appendChild(agregarFigure);

  //se escribe el div que contendra los datos del vestido clickeada
  var agregarDatosVestido =  document.createElement('div');
  agregarCompra.appendChild(agregarDatosVestido);
  agregarDatosVestido.setAttribute("class","col-xs-12 col-sm-12 col-md-4 col-lg-4");
  var contendorAuxImagen = document.createElement('div');
  contendorAuxImagen.setAttribute("class","datosVestido col-xs-10 col-sm-8 col-md-12");
  agregarDatosVestido.appendChild(contendorAuxImagen);
  var agregarh3 = document.createElement('h3');
  agregarh3.textContent = arreglo[0]['nombre'];
  contendorAuxImagen.appendChild(agregarh3);
  var agregarpcosto = document.createElement('p');
  agregarpcosto.setAttribute("class","costo");
  agregarpcosto.textContent = "$ "+arreglo[0]['precio'];
  contendorAuxImagen.appendChild(agregarpcosto);
  var agregarpdescripcion =document.createElement('p');
  agregarpdescripcion.textContent = arreglo[0]['descripcion'];
  contendorAuxImagen.appendChild(agregarpdescripcion);
  var divDatos = document.createElement('div');
  //divDatos.setAttribute("class","row");
  contendorAuxImagen.appendChild(divDatos);

  var agregarform = document.createElement('form');
  agregarform.setAttribute("action","#");
  agregarform.setAttribute("method","get");
  divDatos.appendChild(agregarform);

  var labeltalla = document.createElement('label');
  labeltalla.setAttribute("class","col-xs-12 col-sm-4 col-md-4 col-lg-3");
  labeltalla.setAttribute("for","producto");
  labeltalla.textContent = "Talla";
  agregarform.appendChild(labeltalla);
  var inputtalla = document.createElement('input');
  var divinputtalla = document.createElement("div");
  divinputtalla.setAttribute("class","col-xs-12 col-sm-5 col-md-6 col-lg-5");
  divinputtalla.appendChild(inputtalla);
  inputtalla.setAttribute("class","form-control");
  inputtalla.setAttribute("id","producto");
  inputtalla.setAttribute("list","tallas");
  inputtalla.setAttribute("name","producto_id");
  inputtalla.setAttribute("placeholder","elegir");
  inputtalla.setAttribute("size","8");
  agregarform.appendChild(divinputtalla);
  var br = document.createElement('br');
  var br1 = document.createElement('br');
  agregarform.appendChild(br);
  agregarform.appendChild(br1);

  var agregarDatalist = document.createElement('datalist');
  agregarDatalist.setAttribute("id","tallas");
  inputtalla.appendChild(agregarDatalist);

  var agregaroptionXL = document.createElement('option');
  agregaroptionXL.setAttribute("value","XL");
  agregaroptionXL.textContent = "XL";
  agregarDatalist.appendChild(agregaroptionXL);

  var agregaroptionL = document.createElement('option');
  agregaroptionL.setAttribute("value","L");
  agregaroptionL.textContent = "L";
  agregarDatalist.appendChild(agregaroptionL);

  var agregaroptionM = document.createElement('option');
  agregaroptionM.setAttribute("value","M");
  agregaroptionM.textContent = "M";
  agregarDatalist.appendChild(agregaroptionM);

  var agregaroptionS = document.createElement('option');
  agregaroptionS.setAttribute("value","S");
  agregaroptionS.textContent = "S";
  agregarDatalist.appendChild(agregaroptionS);

  var agregarCantidad = document.createElement('label');
  agregarCantidad.setAttribute("class","col-xs-12 col-sm-4 col-md-4 col-lg-3");
  agregarCantidad.setAttribute("for","cantidad");
  agregarCantidad.textContent = "Cantidad";
  agregarform.appendChild(agregarCantidad);

  var inputcantidad = document.createElement('input');
  var divinputcantidad = document.createElement('div');
  divinputcantidad.setAttribute("class","col-xs-12 col-sm-5 col-md-6 col-lg-5");
  divinputcantidad.appendChild(inputcantidad);
  inputcantidad.setAttribute("class","form-control ");
  inputcantidad.setAttribute("type","number");
  inputcantidad.setAttribute("size","2");
  inputcantidad.setAttribute("value","1");
  inputcantidad.setAttribute("min","1");
  inputcantidad.setAttribute("step","1");
  inputcantidad.setAttribute("max","100");
  inputcantidad.setAttribute("id","cantidad");
  agregarform.appendChild(divinputcantidad);
  var br2 = document.createElement('br');
  var br3 = document.createElement('br');
  agregarform.appendChild(br2);
  agregarform.appendChild(br3);

  var agregarboton = document.createElement('input');
  agregarboton.setAttribute("type","submit");
  agregarboton.setAttribute("class","botoncomprar btn btn-danger col-xs-12 col-sm-12 col-md-12 col-lg-12");
  agregarboton.setAttribute("value","Anadir al carrito");
  agregarboton.setAttribute("onclick","comprobar()");
  agregarform.appendChild(agregarboton);
}
/*
//crea el menu de categoria de prendas (para filtrar)
function menucategorias(arreglo){
  var agregarcategorias = document.getElementById('despliegeMarcas');
  gmenu.push(arreglo[0]['categoria']);
  for (var i = 0; i < arreglo.length; i++) {
    var encontro=0;
    for(var j = 0; j < gmenu.length ; j++) {
      if((arreglo[i]['categoria'])==(gmenu[j])){
        encontro=1;
      }
    }
    if(encontro==0){
      gmenu.push(arreglo[i]['categoria']);
      console.log(gmenu);
    }
  }
  escribirMenu(gmenu);
}
//escribir menu de categorias por pantalla
function escribirMenu(arreglo){
  var agregarcategorias = document.getElementById('despliegeMarcas');
  for (i = 0; i < arreglo.length; i++) {
      console.log(arreglo.length);
      //llenado submenu por categoria
      var licategoria = document.createElement('li');
      var avinculo = document.createElement('a');
      avinculo.setAttribute("href","#");
      avinculo.textContent = arreglo[i];
      licategoria.appendChild(avinculo);
      agregarcategorias.appendChild(licategoria);
  }
}
*/
window.onload = function(){
  var valores = getDeUrl();
  console.log(typeof valores['marca']);
  if(valores['marca']=="MARCA1"){
    url = "../data/catalogo.json";
    console.log(url);
  }else{
    url = "../data/marca2.json";
    console.log(url);
  }
  makeRequest(url);
}

/*
function comprobar(){
  var text = document.getElementById("producto"),
      element = document.getElementById("tallas");

  if(element.querySelector("option[value='"+text.value+"']"))
    alert(option[value='"+text.value+"']);
  else
    alert("Mal");
}

function prueba(){
  let pagina;
  var ejer = document.querySelectorAll('.haber>a');
  for(var i=0 ; i < ejer.length ; i++){
    let titulo = ejer[i].innerHTML;

    ejer[i].addEventListener("click", function(){
      if(titulo=="Registro"){
        pagina="registro.html";
      }
    });
    console.log(pagina);
  }
}*/
