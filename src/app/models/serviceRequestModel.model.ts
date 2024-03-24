export interface ServiceRequestModel {
    startDate: Date;
    endDate: Date;
    sampleNo?: number | null;
    sampleUlid?: number | null;
    sampleStatusId?: number | null;
    stageId?: number | null;
    sampleServiceId?: number | null;
    sampleHistoNo?: number | null;
}