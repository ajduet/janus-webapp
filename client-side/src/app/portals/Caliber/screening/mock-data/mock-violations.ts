import { SoftSkillViolation } from '../entities/softSkillViolation';
import { Screening } from '../entities/screening';

export const MOCK_VIOLATIONS: SoftSkillViolation[] = [
  { violationID: 11, 
    screeningID: 1, 
    violationType: {
      violationID: 1, 
      violationType: "Profanity"
    },
    Time: new Date(),
    Comment: "Cursed."
  },
  { violationID: 12, 
    screeningID: 1, 
    violationType: {
      violationID: 2, 
      violationType: "Dress"
    },
    Time: new Date(), 
    Comment: "Wearing white after labor day. Ghastly.
  },
  { violationID: 13, 
    screeningID: 1, 
    violationType: {
      violationID: 3, 
      violationType: "Speech"
    },
    Time: new Date(), 
    Comment: "Mumbled incoherently"

  },
  { violationID: 14, 
    screeningID: 1, 
    violationType: {
      violationID: 4, 
      violationType: "Misc"
    },
    Time: new Date(), 
    Comment: "Children constantly interrupted the screening."
  }
];