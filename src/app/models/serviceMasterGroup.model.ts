import { ServiceMaster } from "./serviceMaster.model";
export interface ServiceMasterGroup {
    name: string;
    services: ServiceMaster[];
}