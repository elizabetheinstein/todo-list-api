import { Difficulty, Task } from '@prisma/client'
import * as actions from './actions'
import { prismaMock } from './singleton'

const tasks: Task[] = [
  {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Mock Task',
    completed: false,
    difficulty: Difficulty.EASY,
    details: 'This is a mock task',
    assigneeId: null,
  },
]

describe('Endpoint Testing', () => {
  describe('getTasks', () => {
    test('retrieves a list of tasks', async () => {
      expect.assertions(2)
      prismaMock.task.findMany.mockResolvedValue(tasks)
      const result = await actions.getTasks()

      expect(result.length).toEqual(tasks.length)
      expect(result[0]).toEqual(tasks[0])
    })
    test('throws an error if no tasks are found', async () => {
      expect.assertions(1)
      try {
        prismaMock.task.findMany.mockResolvedValue([])
        await actions.getTasks()
      } catch (error) {
        expect((error as Error).toString()).toContain(`There are no tasks!`)
      }
    })
  })
  describe('createTask', () => {
    test('creates a new task', async () => {
      expect.assertions(2)

      const newTask = {
        name: 'Mock Task 2',
        completed: false,
        difficulty: Difficulty.EASY,
        details: 'This is another mock task',
      }
      prismaMock.task.create.mockResolvedValue({
        ...newTask,
        id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        assigneeId: null,
      })
      const task = await actions.createTask(newTask)

      expect(task).toBeDefined()
      expect(task.name).toBe(newTask.name)
    })
  })
  describe('/put', () => {
    test('addAssignee', async () => {
      expect.assertions(1)
      const task = tasks[0]
      prismaMock.task.update.mockResolvedValue({ ...task, assigneeId: 1 })

      const updatedTask = await actions.addAssignee(task.id, 1)

      expect(updatedTask.assigneeId).toEqual(1)
    })
    test('marks a task as complete', async () => {
      expect.assertions(1)

      const task = tasks[0]
      prismaMock.task.update.mockResolvedValue({ ...task, completed: true })

      const updatedTask = await actions.completeTask(task.id)

      expect(updatedTask.completed).toEqual(true)
    })
  })
  describe('/delete', () => {
    test('deletes a single task', async () => {
      expect.assertions(1)

      const task = tasks[0]
      prismaMock.task.delete.mockResolvedValue(task)

      const updatedTask = await actions.deleteTask(task.id)

      expect(updatedTask).toEqual(task)
    })
  })
})
