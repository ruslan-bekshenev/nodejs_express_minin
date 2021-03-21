const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const cartRouter = require('./routes/card')

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

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
  extended: true
}))
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cartRouter)


const PORT = process.env.PORT || 3000

async function start() {
  try {
    const url = 'mongodb+srv://ruslan:steeki2323@cluster0.zczmu.mongodb.net/shop'
    await mongoose.connect(url, {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
   
}

start()