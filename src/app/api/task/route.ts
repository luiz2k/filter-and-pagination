import { TaskStatus } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { SearchParams } from "@/types/search-params";
import { NextRequest } from "next/server";
import { Filter } from "./types/filter";
import { Ordination } from "./types/ordination";
import { Pagination } from "./types/pagination";
import { isNumber } from "./utils/is-number";
import { isOrder } from "./utils/is-order";
import { isOrderBy } from "./utils/is-order-by";
import { isTaskStatus } from "./utils/is-task-status";

export async function GET(request: NextRequest) {
  try {
    const searchParams: SearchParams = Object.fromEntries(
      request.nextUrl.searchParams,
    );

    const { title, status, page, limit, orderBy, order } = searchParams;

    const filter: Filter = {};

    if (title) {
      filter.title = {
        startsWith: title,
      };
    }

    if (status) {
      if (!isTaskStatus(status)) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "Status inválido",
            available: Object.values(TaskStatus),
          }),
          {
            status: 400,
          },
        );
      }

      filter.status = status;
    }

    const pagination: Pagination = {
      page: 1,
      limit: 10,
      skip: () => (pagination.page - 1) * pagination.limit,
    };

    if (page) {
      const pageIsNumber = isNumber(page);

      if (!pageIsNumber) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "O valor do param `page` está inválido",
          }),
          {
            status: 400,
          },
        );
      }

      pagination.page = pageIsNumber;
    }

    if (limit) {
      const limitIsNumber = isNumber(limit);

      if (!limitIsNumber && typeof limitIsNumber !== "number") {
        return new Response(
          JSON.stringify({
            success: false,
            message: "O valor do param `limit` está inválido",
          }),
          {
            status: 400,
          },
        );
      }

      pagination.limit = limitIsNumber;
    }

    const ordination: Ordination = {
      orderBy: "createdAt",
      order: "desc",
    };

    if (orderBy && order) {
      if (!isOrderBy(orderBy)) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "O valor do param `orderBy` está inválido",
            available: [
              "title",
              "description",
              "status",
              "createdAt",
              "updatedAt",
            ],
          }),
          {
            status: 400,
          },
        );
      }

      ordination.orderBy = orderBy;

      if (!isOrder(order)) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "O valor do param `order` está inválido",
            available: ["asc", "desc"],
          }),
          {
            status: 400,
          },
        );
      }

      ordination.order = order;
    }

    const totalTasks = await prisma.task.count({ where: filter });
    const tasksFound = await prisma.task.count();

    const tasks = await prisma.task.findMany({
      where: filter,
      skip: pagination.skip(),
      take: pagination.limit,
    });

    const totalPages = Math.ceil(totalTasks / pagination.limit);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Tarefas listadas com sucesso",
        data: tasks,
        metadata: {
          totalItems: totalTasks, // Total de itens registrados no banco
          itemsFound: tasksFound, // Total de itens encontrados com os filtros
          totalPages: totalPages, // Total de páginas
          perPage: pagination.limit, // Limite de itens por página
          currentPage: pagination.page, // Página atual
          prevPage: pagination.page > 1 ? pagination.page - 1 : null, // Página anterior
          nextPage: pagination.page < totalPages ? pagination.page + 1 : null, // Próxima página
        },
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Ocorreu um erro ao listar as tarefas",
      }),
      {
        status: 500,
      },
    );
  }
}
