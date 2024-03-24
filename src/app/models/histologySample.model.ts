import { ServiceMaster } from './serviceMaster.model';
import { SampleDetail } from './sampleDetail.model';
import { StageMaster } from './stageMaster.model';
import { Employee } from './employee.model';
import { SamplePerService } from './samplePerService.model';

export class HistologySample {
    id: number;
    histoNo: number;
    serviceId: number;
    sampleNo: number;
    stageId: number;
    requisitionType: string;
    specimenType: string;
    specimenSite: string;
    previousBiopsy: boolean;
    sutureTag: string;
    clinicalDetails: string;
    operativeFindings: string;
    provisionalDiagnosis: string;
    investigationRequested: string;
    sampleGrossingPerformed: boolean;
    sampleGrossingPerformedBy: number;
    sampleGrossingPerformedDate: Date | null;
    tissueProcessingPerformed: boolean;
    tissueProcessingPerformedBy: number;
    tissueProcessingPerformedDate: Date | null;
    embeddingPerformed: boolean;
    embeddingPerformedBy: number;
    embeddingPerformedDate: Date | null;
    microtomyPerformed: boolean;
    microtomyPerformedBy: number;
    microtomyPerformedDate: Date | null;
    stainingPerformed: boolean;
    stainingPerformedBy: number;
    stainingPerformedDate: Date | null;


    userId: number;

    serviceMaster: ServiceMaster;
    sampleDetail: SampleDetail;
    stageMaster: StageMaster;
    gemployee: Employee;
    temployee: Employee;
    eemployee: Employee;
    memployee: Employee;
    semployee: Employee;
    samplePerService: SamplePerService;

    constructor() {
        // Initialize default values
        this.id = 0;
        this.histoNo = 0;
        this.serviceId = 0;
        this.sampleNo = 0;
        this.stageId = 0;
        this.requisitionType = '';
        this.specimenType = '';
        this.specimenSite = '';
        this.previousBiopsy = false;
        this.sutureTag = '';
        this.clinicalDetails = '';
        this.operativeFindings = '';
        this.provisionalDiagnosis = '';
        this.investigationRequested = '';
        this.sampleGrossingPerformed = false;
        this.sampleGrossingPerformedBy = 0;
        this.sampleGrossingPerformedDate = null;
        this.tissueProcessingPerformed = false;
        this.tissueProcessingPerformedBy = 0;
        this.tissueProcessingPerformedDate = null;
        this.embeddingPerformed = false;
        this.embeddingPerformedBy = 0;
        this.embeddingPerformedDate = null;
        this.microtomyPerformed = false;
        this.microtomyPerformedBy = 0;
        this.microtomyPerformedDate = null;
        this.stainingPerformed = false;
        this.stainingPerformedBy = 0;
        this.stainingPerformedDate = null;
        this.serviceMaster = new ServiceMaster();
        this.sampleDetail = new SampleDetail();
        this.stageMaster = new StageMaster();
        this.gemployee = new Employee();
        this.temployee = new Employee();
        this.eemployee = new Employee();
        this.memployee = new Employee();
        this.semployee = new Employee();

        this.userId = 0;
        this.samplePerService = new SamplePerService();



    }
}
