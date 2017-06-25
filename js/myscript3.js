
$(document).ready(function () {
    $('label.marcas').click(function () {
        $(this).parent().children('ul.despliegeMarcas').toggle(800);
    });
});
