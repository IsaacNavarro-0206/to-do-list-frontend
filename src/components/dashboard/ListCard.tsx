import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ListCardProps {
  id: string;
  title: string;
  description?: string;
  tasksCompleted: number;
  totalTasks: number;
  lastUpdated: string;
}

const ListCard: React.FC<ListCardProps> = ({
  title,
  description,
  tasksCompleted,
  totalTasks,
  lastUpdated,
}) => {
  const progressPercentage =
    totalTasks > 0 ? (tasksCompleted / totalTasks) * 100 : 0;

  return (
    <Card className="h-full transition-all hover:shadow-md flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="space-y-2">
          <div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <p className="text-sm text-muted-foreground">
            {tasksCompleted} de {totalTasks} tareas completadas
          </p>
        </div>
      </CardContent>

      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Última actualización: {lastUpdated}
        </p>
      </CardFooter>
    </Card>
  );
};

export default ListCard;
