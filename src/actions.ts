import { Prisma } from '@prisma/client'
import prisma from './client'

export const getTasks = async () => {
  const tasks = await prisma.task.findMany()
  if (!tasks.length) throw new Error('There are no tasks!')
  return tasks
}

export const getTaskById = async (id: number) => {
  const task = await prisma.task.findUnique({ where: { id } })
  if (!task) throw new Error(`No task found for id "${id}"`)
  return task
}

export const createTask = async (params: Prisma.TaskCreateInput) => {
  const task = await prisma.task.create({
    data: {
      ...params,
    },
  })
  return task
}

export const addAssignee = async (taskId: number, id: number) => {
  const task = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      assignee: { connect: { id } },
    },
  })
  return task
}

export const completeTask = async (id: number) => {
  const task = await prisma.task.update({
    where: { id },
    data: { completed: true },
  })
  return task
}

export const deleteTask = async (id: number) => {
  return prisma.task.delete({ where: { id } })
}
