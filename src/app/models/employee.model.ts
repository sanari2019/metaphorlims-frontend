export class Employee {
    id: number = 0;
    laboratoryLocationId: number = 0;
    employeeNo: string = '';
    employeeTypeId: number = 0;
    titleId: number = 0;
    firstName: string = '';
    middleName: string = '';
    lastName: string = '';
    gender: string = '';
    dateOfBirth: Date = new Date();
    age: number = 0;
    address1: string = '';
    address2: string = '';
    cityID: number = 0;
    stateId: number = 0;
    countryId: number = 0;
    pinCode: string = '';
    phoneHome: string = '';
    phoneWork: string = '';
    mobile: string = '';
    email: string = '';
    joiningDate: Date = new Date();
    leavingDate: Date = new Date();
    departmentId: number = 0;
    active: boolean = false;
    encodedBy: number = 0;
    encodedDate: Date = new Date();
    lastChangedBy: number = 0;
    lastChangedDate: Date = new Date();
    designation: string = '';
    isAccessAllResource: boolean = false;
    isSuperAdmin: boolean = false;
    isPhlebotomist: boolean = false;
    isScientist: boolean = false;
    isDoctor: boolean = false;
    facilityId: number = 0;
    userName: string = '';
    password: string = '';
    employeeDisplayName: string = '';

    constructor() {

    }
}
