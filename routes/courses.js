const express = require('express');
const router = express.Router();



const courses = [
    {id: 1, name: "Course one"},
    {id: 2, name: "Course two"},
    {id: 3, name: "Course three"},
    {id: 4, name: "Course four"}
];




router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('the  course not find')
    res.send(course)

});



function validateCourseName(courseName){
    const schema = {
        name: Joi.string().min(3).max(30).required()
    };
    return Joi.validate(courseName, schema);
}



router.post('/', (req, res) => {

    const result =  validateCourseName(req.body)

    if (result.error){
        res.status(400).send(result.error.details[0].message);
        return
    }


    const course ={
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(courses)
    res.save()
});

router.put('/:id', (req, res)  => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('the  course not find')


    const result =  validateCourseName(req.body)

    if (result.error){
        res.status(400).send(result.error.details[0].message);
        return
    }


    course.name = req.body.name
    res.send(course)

});


router.delete('/:id', (req,res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('the  course not find')

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(courses)

})


module.exports = router;