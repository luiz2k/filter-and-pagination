import { PrismaClient, Task } from "../src/generated/prisma";
import tasks from "./tasks.json";

const prisma = new PrismaClient();

async function main() {
  await prisma.task.createMany({
    data: tasks as unknown as Omit<Task, "id">[],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
