import {ScreenerBucket} from '../entities/screenerBucket';
import {QuestionScore} from '../entities/questionScore';


export const SCREENERBUCKETS: ScreenerBucket[] = [
    {
        bucketName: 'OOP',
        questionScores: [ 
            {qSID: 1, questionID: 15, screeningID: 5555, score: 3, commentary: "", beginTime: new Date(2018, 2, 22, 13)},
            {qSID: 2, questionID: 13, screeningID: 5555, score: 5, commentary: "Great!", beginTime: new Date(2018, 2, 22, 13)},
            {qSID: 3, questionID: 22, screeningID: 5555, score: 4, commentary: "", beginTime: new Date(2018, 2, 22, 13)},
            {qSID: 4, questionID: 31, screeningID: 5555, score: 4, commentary: "", beginTime: new Date(2018, 2, 22, 13)},
        ]
    },
    {
        bucketName: 'Basic Java',
        questionScores: [ 
            {qSID: 5, questionID: 44, screeningID: 5555, score: 1, commentary: "No idea", beginTime: new Date(2018, 2, 22, 13)},
            {qSID: 6, questionID: 45, screeningID: 5555, score: 2, commentary: "", beginTime: new Date(2018, 2, 22, 13)},
            {qSID: 7, questionID: 46, screeningID: 5555, score: 2, commentary: "", beginTime: new Date(2018, 2, 22, 13)},
            {qSID: 8, questionID: 47, screeningID: 5555, score: 1, commentary: "I am lost", beginTime: new Date(2018, 2, 22, 13)},
            {qSID: 9, questionID: 50, screeningID: 5555, score: 2, commentary: "", beginTime: new Date(2018, 2, 22, 13)},
        ]
    },
    {
        bucketName: 'Advanced Java',
        questionScores: [ 
            {qSID: 10, questionID: 63, screeningID: 5555, score: 5, commentary: "Incredible!", beginTime: new Date(2018, 2, 22, 13)},
            {qSID: 11, questionID: 69, screeningID: 5555, score: 4, commentary: "", beginTime: new Date(2018, 2, 22, 13)},
            {qSID: 12, questionID: 58, screeningID: 5555, score: 4, commentary: "I am still lost", beginTime: new Date(2018, 2, 22, 13)},
        ]
    },
    {
        bucketName: 'SQL',
        questionScores: [ 
            {qSID: 13, questionID: 77, screeningID: 5555, score: 5, commentary: "", beginTime: new Date(2018, 2, 22, 13)},
            {qSID: 14, questionID: 78, screeningID: 5555, score: 3, commentary: "", beginTime: new Date(2018, 2, 22, 13)},
        ]
    },
    {
        bucketName: 'Web',
        questionScores: [ 
            {qSID: 15, questionID: 83, screeningID: 5555, score: 2, commentary: "", beginTime: new Date(2018, 2, 22, 13)},
        ]
    },
   
];

