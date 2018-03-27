import { SimpleTrainee } from '../entities/simpleTrainee';

let temp: Date = new Date();
export const TRAINEES: SimpleTrainee[] = [
    {
        traineeID: 1,
        firstname: 'Jimmy',
        lastname: 'John',
        skillTypeID: 1,
        schedule: new Date(2018, 0, 21, 9)
    },
    {
        traineeID: 2,
        firstname: 'Isabella',
        lastname: 'Dougherty',
        skillTypeID: 2,
        schedule: new Date(2018, 0, 21, 11)
    },
    {
        traineeID: 3,
        firstname: 'Clarissa',
        lastname: 'Gonzales',
        skillTypeID: 3,
        schedule: new Date(2018, 0, 21, 13)
    },
    {
        traineeID: 5,
        firstname: 'Catherine',
        lastname: 'Mahzareh',
        skillTypeID: 2,
        schedule: new Date(2018, 0, 21, 14)
    },
    {
        traineeID: 6,
        firstname: 'Pietro',
        lastname: 'Vietre',
        skillTypeID: 6,
        schedule: new Date(2018, 0, 21, 16)
    },
    {
        traineeID: 7,
        firstname: 'John',
        lastname: 'Doe',
        skillTypeID: 5,
        schedule: new Date(2018, 0, 22, 7)
    },
    {
        traineeID: 8,
        firstname: 'Lana',
        lastname: 'Yea',
        skillTypeID: 5,
        schedule: new Date(2018, 0, 22, 8)
    },
    {
        traineeID: 9,
        firstname: 'Kevin',
        lastname: 'Brainer',
        skillTypeID: 4,
        schedule: new Date(2018, 0, 22, 9)
    },
    {
        traineeID: 10,
        firstname: 'Lucy',
        lastname: 'Sgod',
        skillTypeID: 6,
        schedule: new Date(2018, 0, 22, 11)
    },
    {
        traineeID: 11,
        firstname: 'Luis',
        lastname: 'Lana',
        skillTypeID: 4,
        schedule: new Date(2018, 0, 22, 13)
    },
    {
        traineeID: 12,
        firstname: 'Michael',
        lastname: 'Nevermore',
        skillTypeID: 6,
        schedule: new Date(2018, 0, 22, 15)
    },
    {
        traineeID: 13,
        firstname: 'Chad',
        lastname: 'Aldritch',
        skillTypeID: 1,
        schedule: new Date(2018, 0 ,22, 16)
    },

];

function randomDate(): Date {
    let temp: Date = new Date();
    let numberOfDaysToAdd: number = Math.random();
    temp.setDate(temp.getDate() + numberOfDaysToAdd);
    return temp;
}