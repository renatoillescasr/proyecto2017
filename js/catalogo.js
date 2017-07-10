var main = function(){
  var url  = "../data/catalogo1.json";
  var url2 = "../data/catalogo2.json";

	$("#despliegeMarcas a span").click(function(e) {
			e.preventDefault();
			$("#despliegeMarcas a span").removeClass("activo");
			$(this).addClass("activo");
			if ($(".activo").text()=="GraceKarin"){
				$("#marca1").show();
				$("#marca2").hide();
			}
			else if ($(".activo").text()=="Kate"){
				$("#marca1").hide();
        $("#marca2").show();
			}
	});

	$.getJSON(url, function(respuesta){
		console.log(respuesta);
		respuesta.catalogo.forEach(function(item){
      $("#marca1").show();
      $("#marca2").hide();

			var $divImagen = $("<div></div>");
      $divImagen.addClass("col-lg-4 col-md-4 col-xs-6 thumb");

			var $a = $("<a></a>");
      $a.addClass("thumbnail");
      $a.attr("href","compras.html?marca="+item.marca+"&producto_id="+item.codigo);
      $divImagen.append($a);

      var $figure = $("<figure></figure>");
      var $img = $("<img>");
      $img.addClass("imageGaleria img-responsive gallerythumb");
			$img.attr("src", item.srcImagen);
      $figure.append($img);
      $a.append($figure);

      var $divDatos = $("<div></div>");
      $divDatos.addClass("datosgaleria");
      $divImagen.append($divDatos);

      var $ul = $("<ul></ul>");
      $divDatos.append($ul);
      var $lidesc = $("<li></li>");
      $lidesc.text(item.descripcion);

      var $licosto = $("<li></li>");
      $licosto.addClass("costo");
      $licosto.text("$ "+item.precio);

      $ul.append($lidesc);
      $ul.append($licosto);

      $("#marca1").append($divImagen);
		})
	});

  $.getJSON(url2, function(respuesta){
		console.log(respuesta);
    respuesta.catalogo.forEach(function(item){
			$("#marca2").show();
      $("#marca1").hide();
			var $divImagen = $("<div></div>");
      $divImagen.addClass("col-lg-4 col-md-4 col-xs-6 thumb");

			var $a = $("<a></a>");
      $a.addClass("thumbnail");
			$a.attr("href","compras.html?marca="+item.marca+"&producto_id="+item.codigo);
      $divImagen.append($a);

      var $figure = $("<figure></figure>");
      var $img = $("<img>");
      $img.addClass("imageGaleria img-responsive gallerythumb");
			$img.attr("src", item.srcImagen);
      $figure.append($img);
      $a.append($figure);

      var $divDatos = $("<div></div>");
      $divDatos.addClass("datosgaleria");
      $divImagen.append($divDatos);

      var $ul = $("<ul></ul>");
      $divDatos.append($ul);
      var $lidesc = $("<li></li>");
      $lidesc.text(item.descripcion);

      var $licosto = $("<li></li>");
      $licosto.addClass("costo");
      $licosto.text("$ "+item.precio);

      $ul.append($lidesc);
      $ul.append($licosto);

      $("#marca2").append($divImagen);
		})
	});

}

$(document).ready(main);
