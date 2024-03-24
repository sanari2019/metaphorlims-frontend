export class User {
    id: number;
    username: string;
    createdAt: Date;
    locum_Type: string;
    phone_Number: string;
    first_Name: string;
    department_id: number;
    last_Name: string;
    email: string;
    password: string;
    bank_Name: string;
    holders_Name: string;
    account_Number: string;
    sort_Code?: string | null;
    active: boolean;
    agree_Terms: boolean;

    constructor() {
        this.id = 0;
        this.username = "";
        this.locum_Type = "";
        this.phone_Number = "";
        this.first_Name = "";
        this.department_id = 0;
        this.last_Name = "";
        this.email = "";
        this.password = "";
        this.bank_Name = "";
        this.holders_Name = "";
        this.account_Number = "";
        this.sort_Code = " ";
        this.active = false;
        this.agree_Terms = false;
        this.createdAt = new Date;

    }
}
