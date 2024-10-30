import { IsEnum, IsNotEmpty } from "class-validator";
import { TaskPriority } from "src/constants/enums";

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsEnum(TaskPriority)
    priority: TaskPriority;

    @IsNotEmpty()
    duedate: Date;
}