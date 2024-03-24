export class Patient {
    id: number;
    ulid: number;
    title: string;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    company: string;
    dob: Date;
    fullAddress: string;
    phoneNumber: string;
    email: string;
    emergencyContactFullName: string;
    emergencyContactPhoneNumber: string;
    referralType: string;
    referredBy: string;
    bill: string;
    result: string;
    encodedBy: number;
    encodedDate: Date;
    lastChangedBy: number;
    lastChangedDate: Date;


    constructor() {
        this.id = 0;
        this.ulid = 0;
        this.title = '';
        this.firstName = '';
        this.middleName = '';
        this.lastName = '';
        this.gender = '';
        this.company = '';
        this.dob = new Date();
        this.fullAddress = '';
        this.phoneNumber = '';
        this.email = '';
        this.emergencyContactFullName = '';
        this.emergencyContactPhoneNumber = '';
        this.referralType = '';
        this.referredBy = '';
        this.bill = '';
        this.result = '';
        this.encodedBy = 0;
        this.encodedDate = new Date();
        this.lastChangedBy = 0;
        this.lastChangedDate = new Date()
    }
}
