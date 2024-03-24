// sample-detail.model.ts

import { Employee } from "./employee.model";

export class SampleDetail {
    id: number;
    sampleNo: number;
    sampleCollected: boolean;
    collectedBy: number;
    collectedDate: Date;
    sampleAcknowledged: boolean;
    acknowledgedBy: number;
    acknowledgedDate: Date;
    sampleDispatched: boolean;
    dispatchedBy: number;
    dispatchDate: Date;
    cancelled: boolean;
    cancelledBy: number;
    cancellationReason: string;
    remarks: string;
    active: boolean;
    encodedBy: number;
    cemployee: Employee;
    aemployee: Employee;
    demployee: Employee;

    constructor() {
        this.id = 0;
        this.sampleNo = 0;
        this.sampleCollected = false;
        this.collectedBy = 0;
        this.collectedDate = new Date();
        this.sampleAcknowledged = false;
        this.acknowledgedBy = 0;
        this.acknowledgedDate = new Date();
        this.sampleDispatched = false;
        this.dispatchedBy = 0;
        this.dispatchDate = new Date();
        this.cancelled = false;
        this.cancelledBy = 0;
        this.cancellationReason = '';
        this.remarks = '';
        this.active = false;
        this.encodedBy = 0;
        this.cemployee = new Employee();
        this.aemployee = new Employee();
        this.demployee = new Employee();
    }
}
