import { TaskStatus } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

type Filter = {
  title?: {
    startsWith: string;
  };
  status?: TaskStatus;
};

type Pagination = {
  page: number;
  limit: number;
  skip: () => number;
};

type Ordination = {
  orderBy?: string;
  order?: Order;
};

const isNumber = (number: unknown) => {
  if (!isNaN(Number(number))) {
    return Number(number);
  }

  return false;
};

const isTaskStatus = (status: string): status is TaskStatus => {
  return Object.values(TaskStatus).includes(status as TaskStatus);
};

const ORDER_BY_VALUES = [
  "title",
  "description",
  "status",
  "createdAt",
  "updatedAt",
] as const;
type OrderBy = (typeof ORDER_BY_VALUES)[number];

const isOrderBy = (orderBy: string): orderBy is OrderBy => {
  return ORDER_BY_VALUES.includes(orderBy as OrderBy);
};

const ORDER_VALUES = ["asc", "desc"] as const;
type Order = (typeof ORDER_VALUES)[number];

const isOrder = (order: string): order is Order => {
  return ORDER_VALUES.includes(order as Order);
};

type SearchParams = {
  title?: string;
  status?: string;
  page?: string;
  limit?: string;
  orderBy?: string;
  order?: string;
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(
      request.nextUrl.searchParams,
    ) as SearchParams;

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

    const tasksCount = await prisma.task.count();

    const tasks = await prisma.task.findMany({
      where: filter,
      skip: pagination.skip(),
      take: pagination.limit,
    });

    const totalPages = Math.ceil(tasksCount / pagination.limit);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Tarefas listadas com sucesso",
        data: tasks,
        metadata: {
          totalItems: tasksCount, // Total de itens registrados no banco
          itemsFound: tasks.length, // Total de itens encontrados na página atual
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
