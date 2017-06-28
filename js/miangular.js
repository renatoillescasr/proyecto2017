$(document).ready(function(){
  //obtener hash
  var hash = window.location.hash;
  // comprobamos si existe un hash valido
  console.log(hash);
  console.log(typeof hash);

  $("#iniciosesion").click(function() {
    $.ajax({
      context: this,
      dataType: "html",
      url: "iniciosesion.html",
      success: function(results) {
        $('#prueba').html(results);
        alert('iniciosesion');
      }
    });
  });
  $("#registro").click(function(){
    $.ajax({
      context: this,
      dataType: "html",
      url: "registro.html",
      success: function(results){
        $('#prueba').html(results);
        alert('registro');
      }
    });
  });
  $("#carrito").click(function(){
  });

});
/*
function getGET()
  {
      // capturamos la url
      var loc = document.location.href;
      // si existe el interrogante
      if(loc.indexOf('?')>0)
      {
          // cogemos la parte de la url que hay despues del interrogante
          var getString = loc.split('?')[1];
          // obtenemos un array con cada clave=valor
          var GET = getString.split('&');
          var get = {};

          // recorremos todo el array de valores
          for(var i = 0, l = GET.length; i < l; i++){
              var tmp = GET[i].split('=');
              get[tmp[0]] = unescape(decodeURI(tmp[1]));
          }
          return get;
      }
  }

window.onload = function()
{
    // Cogemos los valores pasados por get
    var valores=getGET();
    if(valores)
    {
        // hacemos un bucle para pasar por cada indice del array de valores
        for(var index in valores)
        {
            console.log("clave: "+index+" - valor: "+valores[index]);
        }
    }else{
        // no se ha recibido ningun parametro por GET
          console.log(">No se ha recibido ningún parámetro");
    }
}
*/
