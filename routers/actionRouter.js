const express = require('express');

const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');

const router = express.Router()

router.post('/', (req, res) => {
  req.body.project_id = req.params.id
  console.log(req.body)
  Actions.insert(req.body)
    .then(action => {
      res.status(201).json(action)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "error adding action, please try again while whispering sweet nothings to the computer"
      })
    })
})

// router.get('/', (req, res) => {
//   Projects.get()
//     .then(projects => {
//       res.status(200).json(projects);
//     })
//     .catch(error => {
//       console.log(error);
//       res.status(500).json({
//         message: "error retrieving projects, please contact someone important"
//       });
//     });
// });

router.get('/', (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: "action not found"})
    });
});

// router.delete('/:id', (req, res) => {
//   Projects.remove(req.params.id)
//   .then(count => {
//     if (count > 0) {
//       res.status(200).json({ message: "the project been erased from history"})
//     } else {
//       res.status(404).json({message: "the project couldn't be found"})
//     }
//   })
//   .catch(error => {
//     console.log(error)
//     res.status(500).json({
//       message: "error removing project"
//     })
//   })
// })

// router.put('/:id', (req, res) => {
//   Projects.update(req.params.id, req.body)
//   .then(project => {
//       res.status(200).json(project)
//   })
//   .catch(error => {
//     console.log(error)
//     res.status(500).json({
//       message: "error updating project"
//     })
//   })
// });

module.exports = router;