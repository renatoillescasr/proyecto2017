
function loadDoc(pagina) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('variante').innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET",pagina, true);
  xhttp.send();
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
