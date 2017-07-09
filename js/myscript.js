var http_request = false;

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
            menucategorias(gcatalogo);
            catalogo(gcatalogo);
        } else {
            alert('Hubo problemas con la peticiÃ³n.');
        }
    }
}

window.onload = function() {
    makeRequest("../data/catalogo.json");

    var link = document.querySelectorAll('#despliegeMarcas');
    //console.log(link.childNodes);
    /*link.addEventListener("click", function(evt){
      console.log(link);
      alert("onclick Event detected!   qqqqq");
    });*/

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
}

window.onload = function() {
  prueba();
}
