var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./config/database')
const cors = require('cors')

var routers = require('./router');
var index = require('./routes/index');

var app = express();
app.use(cors())

// Tabelas
const {Orcamento, ProdutoOrcamento} = require('./models/orcamentos');
const Empresa = require('./models/empresa')
const Vendedor = require('./models/vendedor')
const Cliente = require('./models/cliente')

// Função de sincronização modelos e tabelas
// db.sync({ force: true }) // `force: false` garante que não irá apagar tabelas existentes, `true` faz isso.
// .then(() => {
//   console.log('Tabelas sincronizadas com sucesso!');
// })
// .catch((error) => {
//   console.error('Erro ao sincronizar tabelas:', error);
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routers);


// Configurar o diretório para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
