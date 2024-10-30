import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { TaskPriority, TaskStatus } from "src/constants/enums";

export class GetTasksFilterDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;
    
    @IsOptional()
    @IsEnum(TaskPriority)
    priority?: TaskPriority;

    @IsOptional()
    @IsNotEmpty()
    search?: string;
}