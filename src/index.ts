import express from 'express'
import * as actions from './actions'

const app = express()

app.use(express.json())

// endpoints for app

app.get('/tasks', async (req, res) => {
  const tasks = await actions.getTasks()
  res.json(tasks)
})

app.get('/task:id', async (req, res) => {
  const { id } = req.params
  const task = await actions.getTaskById(Number(id))
  res.json(task)
})

app.post('/task', async (req, res) => {
  const { name, completed, difficulty, assignee } = req.body
  const task = await actions.createTask({
    name,
    completed,
    difficulty,
    assignee,
  })
  res.json(task)
})

app.put('/task/:id/assign', async (req, res) => {
  const { id } = req.params
  const { assigneeId } = req.body

  const task = await actions.addAssignee(Number(id), Number(assigneeId))
  res.json(task)
})

app.put('/task/:id/complete', async (req, res) => {
  const { id } = req.params

  const task = await actions.completeTask(Number(id))
  res.json(task)
})

app.delete('/task/:id', async (req, res) => {
  const { id } = req.params
  const task = await actions.deleteTask(Number(id))
  res.status(204).send(task)
})

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
)
