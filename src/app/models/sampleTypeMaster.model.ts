export class SampleTypeMaster {
    id: number;
    name: string;
    active: boolean;
    encodedBy: number;
    encodedDate: Date;

    constructor() {
        this.id = 0;
        this.name = '';
        this.active = false;
        this.encodedBy = 0;
        this.encodedDate = new Date();
    }
}
