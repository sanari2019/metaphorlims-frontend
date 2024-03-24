export class ServiceMaster {
    id: number;
    departmentId: number;
    serviceName: string;
    active: boolean;

    constructor(id: number = 0, departmentId: number = 0, serviceName: string = '', active: boolean = false) {
        this.id = id;
        this.departmentId = departmentId;
        this.serviceName = serviceName;
        this.active = active;
    }
}
