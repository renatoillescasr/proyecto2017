var http_request = false;
var gcatalogo = [];

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
            /*datos JSON los almacena en un arreglo
            for(var x in data){
              gcatalogo.push(data[x]);
              console.log(gcatalogo);
            }*/
            //invoca la funcion catalogo para escribir el contenido en catalogo.html
            catalogo(data);
        } else {
            alert('Hubo problemas con la petición.');
        }
    }
}

function catalogo(json){
  var agregarItems = document.getElementById('galeriaColeccion');
  for (i = 0; i < json.length; i++) {
    //llenados de imagen
    var divImagen = document.createElement('div');
    divImagen.setAttribute("class","col-lg-4 col-md-4 col-xs-6 thumb");
    agregarItems.appendChild(divImagen);

    var a = document.createElement('a');
    a.setAttribute("class","thumbnail");
    a.setAttribute("href","compras.html?producto_id="+json[i]['codigo']);
    divImagen.appendChild(a);

    var figure = document.createElement('figure');
    var img = document.createElement('img');
    img.setAttribute("class","imageGaleria img-responsive gallerythumb");
    img.setAttribute("src",json[i]['srcImagen']);
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
    lidesc.textContent = json[i]['descripcion'];
    licosto.textContent = "$ "+json[i]['precio'];

    ul.appendChild(lidesc);
    ul.appendChild(licosto);

  }
}

window.onload = function() {
    makeRequest("../data/catalogo.json");
}
