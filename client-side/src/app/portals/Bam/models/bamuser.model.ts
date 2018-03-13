import { Batch } from './batch.model';

export class BamUser {
    userId: number;
    fName: string;
    mName: string;
    lName: string;
    email: string;
    pwd: string;
    role: number;
    batch: Batch;
    phone: string;
    phone2: string;
    skype: string;
    pwd2: string;
    minervaID: number;

    constructor(userId: number,
        fName: string,
        mName: string,
        lName: string,
        email: string,
        pwd: string,
        role: number,
        batch: Batch,
        phone: string,
        phone2: string,
        skype: string,
        pwd2: string,
        minervaID: number) {
            this.userId = userId;
            this.fName = fName;
            this.mName = mName;
            this.lName = lName;
            this.email = email;
            this.pwd = pwd;
            this.role = role;
            this.batch = batch;
            this.phone = phone;
            this.phone2 = phone2;
            this.skype = skype;
            this.pwd2 = pwd2;
            this.minervaID = minervaID;
    }
}
