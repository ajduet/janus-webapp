import { environment } from '../../../../environments/environment';


const context = environment.context;

export const urls = {

    assessment: {
        fetchByBatchIdByWeek: (batchId: number, week: number) => `${context}trainer/assessment/${batchId}/${week}`,
        save: () => `${context}trainer/assessment/create`,
        update: () => `${context}trainer/assessment/update`,
        delete: (assessmentId: number) => `${context}trainer/assessment/delete/${assessmentId}`,
    },

    batch: {
        fetchAllByTrainer: () => `${context}batch/batch`,
        fetchAll: () => `${context}vp/batch/all`,
        save: () => `${context}all/batch/create`,
        update: () => `${context}all/batch/update`,
        delete: (batchId) => `${context}all/batch/delete/${batchId}`,
    },

    skills: {
        fetchAll: () => `${context}skills/vp/skill`,
        fetchAllActive: () => `${context}skills/skill/all`,
        fetchById: (id: number) => `${context}skills/skill/${id}`,
        save: () => `${context}skills/vp/skill`,
        update: () => `${context}skills/vp/skill/update`,
    },

    location: {
        fetchAll: () => `${context}address/all/location/all`,
        save: () => `${context}address/vp/location/create`,
        update: () => `${context}address/vp/location/update`,
    },

    note: {
        fetchQcBatchNotesByBatchIdByWeek: (batchId: number, week: number) => `${context}qc/note/batch/${batchId}/${week}`,
        fetchQcTraineeNotesByBatchIdByWeek: (batchId: number, week: number) => `${context}qc/note/trainee/${batchId}/${week}`,
        fetchBatchNotesByBatchIdByWeek: (batchId: number, week: number) => `${context}trainer/note/batch/${batchId}/${week}`,
        fetchTraineeNotesByBatchIdByWeek: (batchId: number, week: number) => `${context}trainer/note/trainee/${batchId}/${week}`,
        fetchTrainingNotesByTrainee: (traineeId: number) => `${context}all/notes/trainee/${traineeId}`,
        fetchQcNotesByTrainee: (traineeId: number) => `${context}qc/note/trainee/${traineeId}`,
        update: () => `${context}note/update`,
        save: () => `${context}note/create`,
        getAllQCTraineeNotes: (batchId: number, week: number) => `${context}qc/note/trainee/${batchId}/${week}`,
        findQCBatchNotes: (batchId: number, week: number) => `${context}qc/note/batch/${batchId}/${week}`,
    },

    panel: {
        fetchAll: () => `${context}panel/all`,
        fetchAllByTrainee: (traineeId) => `${context}panel/trainee/${traineeId}`,
        save: () => `${context}panel/create`,
        update: () => `${context}panel/update`,
        delete: (panelId: number) => `${context}panel/delete/${panelId}`,
    },

    grade: {
        fetchByBatchIdByWeek: (batchId, week) => `${context}all/grades/batch/${batchId}/week/${week}`,
        save: () => `${context}trainer/grade/create`,
        update: () => `${context}trainer/grade/update`,
    },

    qcStatus: {
        fetchAll: () => `${context}types/qcstatus/all`,
    },

    skill: {
        fetchAll: () => `${context}types/skill/all`,
    },

    trainee: {
        fetchAllByBatch: (batchId: number) => `${context}all/trainee?batch=${batchId}`,
        fetchDroppedByBatch: (batchId: number) => `${context}all/trainee/dropped?batch=${batchId}`,
        save: () => `${context}all/trainee/create`,
        update: () => `${context}all/trainee/update`,
        delete: (traineeId: number) => `${context}all/trainee/delete/${traineeId}`,
    },

    trainer: {
        fetchByEmail: (email: string) => `${context}training/trainer/byemail/${email}`,
        fetchAll: () => `${context}all/trainer/all`,
        save: () => `${context}vp/trainer/create`,
        update: () => `${context}vp/trainer/update`,
        getTitles: () => `${context}vp/trainer/titles`,
        getTiers: () => `${context}types/trainer/role/all`,
    },

    trainingType: {
        fetchAll: () => `${context}types/training/all`,
    },

    traineeStatus: {
        fetchAll: () => `${context}types/trainingstatus/all`,
    },

    // API calls for the VP functionality group
    getAllCategories: context + 'vp/category',
    addNewCategory: context + 'vp/category',
    editCurrentCategory: context + 'vp/category/update',

    // Location API calls
    getAllLocations: context + 'all/location/all',
    editLocation: context + 'vp/location/update',
    deleteLocation: context + 'vp/location/update',
    reactivateLocation: context + 'vp/location/reactivate',
    addLocation: context + 'vp/location/create',

    // Trainer API calls
    getAllTitles: context + 'vp/trainer/titles',
    getAllTiers: context + 'types/trainer/role/all',
    getAllTrainers: context + 'all/trainer/all',
    addNewTrainer: context + 'vp/trainer/create',
    deleteTrainer: context + 'vp/trainer/update',
    editTrainer: context + 'vp/trainer/update',

    // Reports Service API endpoints
    reportsStackedBarCurrentWeek: context + 'all/reports/batch/week/stacked-bar-current-week',
    reportsDashBoard: context + 'all/reports/dashboard',
    reportsBiWeeklyPanel: context + 'all/reports/biweeklyPanelResults',

    /* Reporting service API endpoints */
    apiBatchComparisonAvgEndpoint: (skill: string, training: string, startDate) =>
        context + `/all/reports/compare/skill/${skill}/training/${training}/date/${startDate}`,

    apifetchBatchWeekPieChart: (batchId: Number, weekId: Number) =>
        context + `all/reports/batch/${batchId}/week/${weekId}/pie`,

    apiPieChartCurrentWeekQCStatus: (batchId: Number) =>
        context + `all/reports/batch/${batchId}/pie`,

    apiAllBatchesCurrentWeekQCStackedBarChart: (batchId: Number, week: Number) =>
        context + `all/reports/batch/${batchId}/week/${week}/bar-batch-week-avg`,

    apiBatchWeekAvgBarChart: (batchId: Number, week: Number) =>
        context + `all/reports/batch/${batchId}/week/${week}/bar-batch-week-avg`,

    apiBatchWeekSortedBarChart: (batchId: Number, week: Number) =>
        context + `all/reports/batch/${batchId}/week/${week}/bar-batch-weekly-sorted`,

    apiBatchOverallTraineeBarChart: (batchId: Number, traineeId: Number) =>
        context + `all/reports/batch/${batchId}/overall/trainee/${traineeId}/bar-batch-overall-trainee`,

    apiBatchOverallBarChart: (batchId: Number) =>
        context + `all/reports/batch/${batchId}/overall/bar-batch-overall`,

    apiBatchWeekTraineeBarChart: (batchId: Number, weekId: Number, traineeId: Number) =>
        context + `all/reports/batch/${batchId}/week/${weekId}/trainee/${traineeId}/bar-batch-week-trainee`,

    apiTraineeUpToWeekLineChart: (batchId: Number, weekId: Number, traineeId: Number) =>
        context + `all/reports/batch/${batchId}/week/${weekId}/trainee/${traineeId}/line-trainee-up-to-week`,

    apiTraineeOverallLineChart: (batchId: Number, traineeId: Number) =>
        context + `all/reports/batch/${batchId}/overall/trainee/${traineeId}/line-trainee-overall`,

    apiBatchOverallLineChart: (batchId: Number) =>
        context + `all/reports/batch/${batchId}/overall/line-batch-overall`,

    apiCurrentBatchesLineChart: this.context + 'all/reports/dashboard',
    apiCurrentPanelsLineChart: this.context + 'all/reports/biweeklyPanelResults',

    apiTraineeUpToWeekRadarChart: (week: Number, traineeId: Number) =>
        context + `all/reports/week/${week}/trainee/${traineeId}/radar-trainee-up-to-week`,

    apiTraineeOverallRadarChart: (traineeId: Number) =>
        context + `all/reports/trainee/${traineeId}/radar-trainee-overall`,

    apiBatchOverallRadarChart: (batchId: Number) =>
        context + `all/reports/batch/${batchId}/overall/radar-batch-overall`,

    apiBatchAllTraineesRadarChart: (batchId: Number) =>
        context + `all/reports/batch/${batchId}/radar-batch-all-trainees`,

    apiBatchWeekAverageValue: (batchId: Number, weekId: Number) =>
        context + `all/assessments/average/${batchId}/${weekId}`,

    apiTechnologiesForTheWeek: (batchId: Number, weekId: Number) =>
        context + `all/assessments/categories/batch/${batchId}/week/${weekId}`,

    apiPanelBatchAllTrainees: (batchId: Number) =>
        context + `all/reports/batch/${batchId}/panel-batch-all-trainees`,

    /* Evaluation service API endpoints */
    apiFetchAllQCTraineeNotes: (batchId: Number, weekId: Number) =>
        context + `qc/note/trainee/${batchId}/${weekId}`,

    apiFetchAllQCBatchNotes: (batchId: Number, weekId: Number) =>
        context + `qc/note/batch/${batchId}/${weekId}`,
};
