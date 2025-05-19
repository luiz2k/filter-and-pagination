import {
  TableBody,
  TableCell,
  TableRow,
  Table as TableUI,
} from "@/components/ui/table";
import { taskStatusTranslate } from "@/constants/task-status-translate";
import { Task } from "@/generated/prisma";
import { dateFormatter } from "@/lib/formatters";
import { TableHeader } from "./components/table-header/table-header";

type TableProps = {
  tasks?: Task[];
};

export async function Table({ tasks }: TableProps) {
  return (
    <div className="max-h-[25.59375rem] overflow-auto">
      <TableUI>
        <TableHeader />

        <TableBody>
          {tasks ? (
            <>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.id}</TableCell>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{taskStatusTranslate[task.status]}</TableCell>
                  <TableCell>
                    {dateFormatter.format(new Date(task.createdAt))}
                  </TableCell>
                  <TableCell>
                    {dateFormatter.format(new Date(task.updatedAt))}
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            <TableRow className="h-[23.09375rem] text-center">
              <TableCell colSpan={6} className="text-muted-foreground">
                Nenhuma tarefa foi encontrada
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableUI>
    </div>
  );
}
