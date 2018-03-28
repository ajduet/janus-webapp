import { QuestionScore } from '../entities/questionScore';
import { SkillTypeBucketLookUp } from '../entities/skillTypeBucketLookup';

export class ScoresToBucketsUtil {


    getFinalBreakdown(questionScores: QuestionScore[], bucketsByWeight: SkillTypeBucketLookUp): string[] {
        let bucketNames: string[] = [];
        let totals: number[] = [];
        let scores: number[] = [];
        let bucketIndex = 0;
        let questionsAsked;
        let totalWeights = 0;
        let totalBuckets = 0;
        bucketsByWeight.buckets.forEach(thisBucket => {
            questionsAsked = 0;
            totals[bucketIndex] = 0;
            scores[bucketIndex] = 0;
            if(thisBucket.questions != null) {
                thisBucket.questions.forEach(thisQuestion => {
                    let matchingQuestion = questionScores.find(function(element) {
                        return element.questionID == thisQuestion.questionId;
                    });
                    if (matchingQuestion) {
                        questionsAsked++;
                        totals[bucketIndex] += 5;
                        scores[bucketIndex] += matchingQuestion.score;
                    }
                });
            }
            if (questionsAsked > 0) {
                bucketNames[bucketIndex] = thisBucket.bucketCategory;
                totalWeights += bucketsByWeight.weights[bucketIndex];
                totalBuckets++;
            } else {
                bucketNames[bucketIndex] = "skip";
            }
            bucketIndex++;
        });
        let normalizeWeight = 0;
        if (totalWeights < 100) {
            normalizeWeight = (100 - totalWeights) / totalBuckets;
        }
        let breakdowns: string[] = [];
        let breakdownIndex = 0;
        let weightedTotal = 0;
        bucketNames.forEach(thisSummary => {
            if (bucketNames[breakdownIndex] != "skip") {
                let weightedbucket = (bucketsByWeight.weights[breakdownIndex] + normalizeWeight);
                let weightedscore = scores[breakdownIndex]/totals[breakdownIndex] * weightedbucket;

                //breakdowns.push(scores[breakdownIndex] + "/" + totals[breakdownIndex] + " " + bucketNames[breakdownIndex]);
                breakdowns.push(Number(weightedscore).toFixed(0) + "/" + Number(weightedbucket).toFixed(0)    + " " + bucketNames[breakdownIndex]);
                weightedTotal += (scores[breakdownIndex]/totals[breakdownIndex]) * (bucketsByWeight.weights[breakdownIndex] + normalizeWeight);
            }
            breakdownIndex++;
        });
        breakdowns.push("Overall: " + Number(weightedTotal).toFixed(1) + "%");
        breakdowns.push(weightedTotal.toString());
        return breakdowns;
    }
}