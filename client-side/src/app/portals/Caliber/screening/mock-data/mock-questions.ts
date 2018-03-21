import { Question } from '../entities/question';

export const QUESTIONS: Question[] = [
  { questionID: 11,
    questionText: 'What is Inheritance?',
    sampleAnswer1: 'Money from dead relatives',
    sampleAnswer2: 'Genes I got from my parents',
    sampleAnswer3: 'A Bear can inherit from an Animal',
    sampleAnswer4: 'Inheritance is a way to reuse code',
    sampleAnswer5: 'The class which is inherited from, is called the base class, and the class which inherits the code from the base class is called a derived class.',
    isActive: true,
    bucketId: 1
  },
  { questionID: 12,
    questionText: 'What is Polymorphism?',
    sampleAnswer1: 'Many forms',
    sampleAnswer2: 'Overloading and Overriding',
    sampleAnswer3: 'A child can be casted as a parent',
    sampleAnswer4: 'A parent object can be a child at runtime',
    sampleAnswer5: 'It is a feature, which lets us create functions with same name but different arguments, which will perform differently',
    isActive: true,
    bucketId: 1
  },
  { questionID: 13,
    questionText: 'What is Abstraction?',
    sampleAnswer1: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, voluptatem.',
    sampleAnswer2: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, voluptatem.',
    sampleAnswer3: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, voluptatem.',
    sampleAnswer4: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, voluptatem.',
    sampleAnswer5: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, voluptatem.',
    isActive: true,
    bucketId: 2
  },
];