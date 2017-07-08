var http_request = false;
var gcatalogo = [];
var gmenu = [];

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
            //datos JSON los almacena en un arreglo
            for(var x in data){
              gcatalogo.push(data[x]);
              //console.log(gcatalogo);
            }
            //invoca la funcion catalogo para escribir el contenido en catalogo.html
            console.log(gcatalogo);
            menucategorias(gcatalogo);
            catalogo(gcatalogo);
            //filtrar(gcatalogo);
        } else {
            alert('Hubo problemas con la peticion.');
        }
    }
}

//crea el menu de categoria de prendas (para filtrar)
function menucategorias(arreglo){
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
      console.log(arreglo[i]);
      avinculo.textContent = arreglo[i];
      licategoria.appendChild(avinculo);
      agregarcategorias.appendChild(licategoria);
      //evento filtrar
  }
}

//funcion para escribir la galeria en pantalla
function catalogo(arreglo){
  var agregarItems = document.getElementById('galeriaColeccion');
  for (i = 0; i < arreglo.length; i++) {
    //llenados de imagen
    var divImagen = document.createElement('div');
    divImagen.setAttribute("class", arreglo[i]['categoria'] + " col-lg-4 col-md-4 col-xs-6 thumb");
    agregarItems.appendChild(divImagen);

    var a = document.createElement('a');
    a.setAttribute("class","thumbnail");
    a.setAttribute("href","compras.html?producto_id="+arreglo[i]['codigo']);
    divImagen.appendChild(a);

    var figure = document.createElement('figure');
    var img = document.createElement('img');
    img.setAttribute("class","imageGaleria img-responsive gallerythumb");
    img.setAttribute("src",arreglo[i]['srcImagen']);
    figure.appendChild(img);
    a.appendChild(figure);

    //llenado de los datos
    var divDatos = document.createElement('div');
    divDatos.setAttribute("class","datosgaleria");
    divImagen.appendChild(divDatos);

    var ul = document.createElement('ul');
    divDatos.appendChild(ul);
    var lidesc = document.createElement('li');
    var licosto = document.createElement('li');
    licosto.setAttribute("class","costo");
    lidesc.textContent = arreglo[i]['descripcion'];
    licosto.textContent = "$ "+arreglo[i]['precio'];

    ul.appendChild(lidesc);
    ul.appendChild(licosto);
  }
}


window.onload = function() {
    makeRequest("../data/catalogo.json");

    //var link = document.querySelectorAll('#despliegeMarcas');
    //console.log(link.childNodes);
    /*link.addEventListener("click", function(evt){
      console.log(link);
      alert("onclick Event detected!   qqqqq");
    });*/

}
