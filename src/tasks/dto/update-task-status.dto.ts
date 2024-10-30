import { IsEnum } from "class-validator";
import { TaskStatus } from "src/constants/enums";

export class UpdateTaskStatusDto {
    @IsEnum(TaskStatus)
    status: TaskStatus;
}