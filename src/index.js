const express = require('express');

const app = express();

app.use(express.json());

const courses = [];

app.get('/courses', (req, res) => {
  return res.json(courses);
});

app.post('/courses', (req, res) => {
  const id = courses.length;
  const { name } = req.body;

  if (name) {
    courses.push({ 
      id: id,
      name: name 
    });
  } else {
    return res.send(204);
  }
  
  return res.json(courses[id]);
});

app.put('/courses/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const course = courses.find((item) => item.id == id);
  if (course != -1) {
    if (name) {
      courses[course.id]['name'] = name; 
    }
  } else {
    return res.status(404).json({ error: "Resource not found"});
  }

  return res.json(courses[course.id]);
});

app.delete('/courses/:id', (req, res) => {
  const { id } = req.params;

  const courseIndex = courses.findIndex((item) => item.id == id);
  if (courseIndex != -1) {
    courses.splice(courseIndex, 1);
  } else {
    return res.status(404).json({ error: "Resource not found"});
  }

  return res.status(200).json({
    message: "Resource has been deleted successfully!"
  });
});

app.listen(3333);