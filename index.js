const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

const app = express()

const hbs = exphbs.create({
  // шаблон по умолчанию
  defaultLayout: 'main',
  // расширение
  extname: 'hbs',
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')


app.get('/', (req, res, next) => {
  res.render('index')
})

app.get('/about', (req, res) => {
  
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
}) 