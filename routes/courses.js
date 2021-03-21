const { Router } = require('express')
const Course = require('../models/course')

const router = Router()

router.get('/', async (req, res) => {
  const courses = await Course.find().lean()
  res.render('courses', {
    title: 'Курсы',
    isCourses: true,
    courses 
  })
})

router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id).lean()
  res.render('course', {
    layout: 'empty',
    title: `Курс ${course.title}`,
    course    
  })
})

router.get('/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/')
  }

  const course = await Course.findById(req.params.id).lean()

  res.render('course-edit', {
    title: `Редактировать ${course.title}`,
    course
  })
})

router.post('/edit', async (req, res) => {
  const { _id } = req.body
  console.log('req.body', _id, req.body)
  delete req.body._id
  await Course.findByIdAndUpdate(_id, req.body)
  res.redirect('/courses')
})

module.exports = router