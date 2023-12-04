const mongoose = require("mongoose");
const MCQQuestion = require("../models/Questions_schema");
const connect = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
const exampleQuestions = [
  {
    topics: [
      {
        name: "aptitude",
        subtopics: [
          {
            name: "percentage",
            correctOptionIndices: [1, 2],
            questions: [
              {
                questionText:
                  "A batsman scored 110 runs which included 3 boundaries and 8 sixes. What percent of his total score did he make by running between the wickets?",
                options: ["45%", "500/11%", "600/11%", "55%"],
              },
              {
                questionText:
                  "Two students appeared at an examination. One of them secured 9 marks more than the other and his marks was 56% of the sum of their marks. The marks obtained by them are:",
                options: ["39,30", "41,32", "42,33", "43,34"],
              },
            ],
          },
          {
            name: "ratio",
            correctOptionIndices: [1, 2],
            questions: [
              {
                questionText:
                  "A and B together have Rs. 1210. If 4/15  of A's amount is equal to 2/5 of B's amount, how much amount does B have?",
                options: ["Rs. 460", "Rs. 484", "Rs. 550", "Rs. 664"],
              },
              {
                questionText:
                  "Two numbers are respectively 20% and 50% more than a third number. The ratio of the two numbers is:",
                options: ["2:5", "3:5", "4:5", "6:7"],
              },
            ],
          },
          {
            name: "work",
            correctOptionIndices: [3, 1],
            questions: [
              {
                questionText:
                  "A can do a work in 15 days and B in 20 days. If they work on it together for 4 days, then the fraction of the work that is left is :",
                options: ["1/4", "1/10", "7/15", "8/15"],
              },
              {
                questionText: `A, B and C can do a piece of work in 20, 30 and 60 days respectively. In how many days can A do the work if he is assisted by B and C on every third day?`,
                options: ["12", "15", "16", "18"],
              },
            ],
          },
          {
            name: "age",
            correctOptionIndices: [0, 0],
            questions: [
              {
                questionText: `Father is aged three times more than his son Ronit. After 8 years, he would be two and a half times of Ronit's age. After further 8 years, how many times would he be of Ronit's age?`,
                options: ["2 times", "5/2 times", "11/4 times", "3 times"],
              },
              {
                questionText:
                  "The sum of ages of 5 children born at the intervals of 3 years each is 50 years. What is the age of the youngest child?",
                options: ["4 Years", "8 Years", "10 years", "None of these"],
              },
            ],
          },
          {
            name: "distance",
            correctOptionIndices: [1, 3],
            questions: [
              {
                questionText: `A person crosses a 600 m long street in 5 minutes. What is his speed in km per hour?`,
                options: ["3.6", "7.2", "8.4", "10"],
              },
              {
                questionText:
                  "An aeroplane covers a certain distance at a speed of 240 kmph in 5 hours. To cover the same distance in 5/3 hours, it must travel at a speed of:",
                options: ["300 kmph", "360 kmph", "600 kmph", "720 kmph"],
              },
            ],
          },
        ],
      },
      {
        name: "reasoning",
        subtopics: [
          {
            name: "logical",
            correctOptionIndices: [1, 1],
            questions: [
              {
                questionText:
                  "Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?",
                options: ["1/3", "1/8", "2/8", "1/16"],
              },
              {
                questionText:
                  "Look at this series: 7, 10, 8, 11, 9, 12, ... What number should come next?",
                options: ["7", "10", "12", "13"],
              },
            ],
          },
          {
            name: "non-verbal",
            correctOptionIndices: [1, 2],
            questions: [
              {
                questionText: "mncdskjfsldkjf",
                options: ["a", "c", "b", "d"],
              },
              {
                questionText: "fsdfsdgfsdgd",
                options: ["g", "h", "f", "e"],
              },
            ],
          },
          {
            name: "verbal",
            correctOptionIndices: [2, 3],
            questions: [
              {
                questionText: `Arrange the words given below in a meaningful sequence. 1. Key	2. Door	3. Lock  4. Room	5. Switch on	 `,
                options: [
                  "5, 1, 2, 4, 3",
                  "4, 2, 1, 5, 3",
                  "1, 3, 2, 4, 5",
                  "1, 2, 3, 5, 4",
                ],
              },
              {
                questionText: `Arrange the words given below in a meaningful sequence. 1. Word	2. Paragraph	3. Sentence 4. Letters	5. Phrase	 `,
                options: [
                  "4, 1, 5, 2, 3",
                  "4, 1, 3, 5, 2",
                  "4, 2, 5, 1, 3",
                  "4, 1, 5, 3, 2",
                ],
              },
            ],
          },
        ],
      },
      {
        name: "verbal",
        subtopics: [
          {
            name: "language",
            correctOptionIndices: [0, 3, 2, 1],
            questions: [
              {
                questionText:
                  "Read each sentence to find out whether there is any grammatical error in it. The error, if any will be in one part of the sentence. The letter of that part is the answer. If there is no error, the answer is 'D'. (Ignore the errors of punctuation, if any).",
                options: [
                  "We discussed about the problem so thoroughly",
                  "on the eve of the examination",
                  "that I found it very easy to work it out",
                  "No error",
                ],
              },
              {
                questionText:
                  "In the following the questions choose the word which best expresses the meaning of the given word: CORPULENT",
                options: ["Lean", "Gaunt", "Emaciated", "Obese"],
              },
              {
                questionText: `Pick out the most effective word(s) from the given words to fill in the blank to make the sentence meaningfully complete: \n Fate smiles ...... those who untiringly grapple with stark realities of life`,
                options: ["with", "over", "on", "round"],
              },
              {
                questionText: `In each question below a sentence broken into five or six parts. Join these parts to make a meaningful sentence. The correct order of parts is the answer.\n 1.I	2.immediately	3.salary  4.my	5.want`,
                options: [43152, 15432, 25143, 42351, 45132],
              },
            ],
          },
        ],
      },
      {
        name: "technical",
        subtopics: [
          {
            name: "coding",
            correctOptionIndices: [2],
            questions: [
              {
                questionText:
                  "Which of the following statements should be used to obtain a remainder after dividing 3.14 by 2.1 ?",
                options: [
                  "rem = 3.14 % 2.1;",
                  "rem = modf(3.14, 2.1);",
                  "rem = fmod(3.14, 2.1);",
                  "Remainder cannot be obtain in floating point division",
                ],
              },
            ],
          },
          {
            name: "tech",
            correctOptionIndices: [2],
            questions: [
              {
                questionText: "How long is an IPv6 address?",
                options: ["32 bits", "64 bits", "128 bits", "128 bytes"],
              },
            ],
          },
        ],
      },
    ],
  },
];

// // Save the example data to the database
// MCQQuestion.create(exampleQuestions)
//   .then(() => {
//     console.log("Example questions inserted successfully.");
//   })
//   .catch((error) => {
//     console.error("Error inserting example questions:", error);
//   });
module.exports = connect;
