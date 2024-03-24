export class StageMaster {
    id: number;
    stageType: string;
    stage: string;
    sequence: number;
    active: boolean;

    constructor() {
        // Initialize default values
        this.id = 0;
        this.stageType = '';
        this.stage = '';
        this.sequence = 0;
        this.active = true;

    }
}
