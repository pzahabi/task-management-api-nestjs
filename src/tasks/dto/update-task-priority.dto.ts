import { IsEnum } from "class-validator";
import { TaskPriority } from "src/constants/enums";

export class UpdateTaskPriorityDto {
    @IsEnum(TaskPriority)
    priority: TaskPriority;
}