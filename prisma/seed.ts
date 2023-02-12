import { PrismaClient, Prisma, Difficulty } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Liz',
    email: 'liz@todo.io',
    tasks: {
      create: [
        {
          name: 'Clean Dishes',
          completed: false,
        },
        {
          name: 'Walk the Dog',
          completed: false,
        },
        {
          name: 'Find an apartment',
          completed: false,
          difficulty: Difficulty.HARD,
        },
      ],
    },
  },
  {
    name: 'Kiko',
    email: 'kiko@todo.io',
    tasks: {
      create: [
        {
          name: 'Training',
          completed: false,
        },
        {
          name: 'Eat Lunch',
          completed: true,
        },
        {
          name: 'Go to therapy',
          completed: false,
          difficulty: Difficulty.MEDIUM,
        },
      ],
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
