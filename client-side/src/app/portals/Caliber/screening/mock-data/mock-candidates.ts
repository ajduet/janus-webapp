import { SimpleTrainee } from '../entities/simpleTrainee';

let temp: Date = new Date();
export const CANDIDATES: SimpleTrainee[] = [
    {
        traineeID: 1,
        firstname: 'Jimmy',
        lastname: 'John',
        trackId: 1,
        schedule: new Date(2018, 2, 22, 13)
    },
    {
        traineeID: 2,
        firstname: 'Isabella',
        lastname: 'Dougherty',
        trackId: 2,
        schedule: new Date(2018, 2, 22, 9)
    },
    {
        traineeID: 3,
        firstname: 'Clarissa',
        lastname: 'Gonzales',
        trackId: 3,
        schedule: new Date(2018, 2, 23, 10)
    },
    {
        traineeID: 5,
        firstname: 'Catherine',
        lastname: 'Malzareh',
        trackId: 2,
        schedule: new Date(2018, 2, 23, 14)
    },
    {
        traineeID: 6,
        firstname: 'Pietro',
        lastname: 'Vietre',
        trackId: 6,
        schedule: new Date(2018, 2, 26, 15)
    },
    {
        traineeID: 7,
        firstname: 'John',
        lastname: 'Doe',
        trackId: 5,
        schedule: new Date(2018, 2, 26, 12)
    },
    {
        traineeID: 8,
        firstname: 'Lana',
        lastname: 'Yea',
        trackId: 5,
        schedule: new Date(2018, 2, 15)
    },
    {
        traineeID: 9,
        firstname: 'Kevin',
        lastname: 'Brainer',
        trackId: 4,
        schedule: new Date(2018, 2, 17)
    },
    {
        traineeID: 10,
        firstname: 'Lucy',
        lastname: 'Sgod',
        trackId: 6,
        schedule: new Date(2018, 2, 16)
    }
];

function randomDate(): Date {
    let temp: Date = new Date();
    let numberOfDaysToAdd: number = Math.random();
    temp.setDate(temp.getDate() + numberOfDaysToAdd);
    return temp;
}