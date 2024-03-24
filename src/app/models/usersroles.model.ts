import { User } from "./auth/user.model";
import { EmployeeType } from "./employeeType.model";
export interface UsersRoles {
    id: number;
    userId: number;
    employeeTypeId: number;
    createdAt: Date;
    user?: User;
    employeeType?: EmployeeType;
}