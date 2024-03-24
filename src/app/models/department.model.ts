export class Department {
    id: number;
    name: string;
    created_at: Date;

    constructor() {
        this.id = 0;
        this.name = '';
        this.created_at = new Date();
    }
}
