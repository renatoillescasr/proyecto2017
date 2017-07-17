var express = require('express');
var router = express.Router();

router.get('/action', function(req, res, next) {
  email = req.query.correo;
  password = req.query.clave;

  var user = { email: email, password: password }
  console.log(user);
  res.render('response', { title: 'Metodo GET', user: user, method: 'get' });
});

router.post('/action', function(req, res, next) {

    email = req.body.correo;
    password = req.body.clave;

    var user = {email: email, password: password}
    res.render('response', { title: 'Metodo Post', user: user, method: 'post' });
});


router.get('/:method', function(req, res, next) {
  console.log(req.params.method);
  if (req.params.method == 'get') {
    res.render('login-get', { title: 'Pagina de Registro con GET' });
  } else if (req.params.method == 'post') {
    res.render('login-post', { title: 'Pagina de Registro con POST' });
  }
});

module.exports = router;
