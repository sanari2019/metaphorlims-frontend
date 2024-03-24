export class StatusMaster {
    id: number;
    statusType: string;
    status: string;
    statusColor?: string;
    colorName?: string;
    code: string;
    active: boolean;


    constructor() {
        this.id = 0;
        this.statusType = '';
        this.status = '';
        this.statusColor = '';
        this.colorName = '';
        this.code = '';
        this.active = false;
    }
}
