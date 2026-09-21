export const questions = [
  {
    id: 1,
    text: "How often do you experience persistent headaches?",
    type: "single",
    options: [
      { text: "Never", points: 0 },
      { text: "Rarely", points: 1 },
      { text: "Often", points: 2 },
      { text: "Daily or severe", points: 3 },
    ],
  },

  {
    id: 2,
    text: "Have you experienced seizures or sudden fits recently?",
    type: "single",
    options: [
      { text: "Never", points: 0 },
      { text: "Once", points: 1 },
      { text: "A few times", points: 2 },
      { text: "Frequently", points: 3 },
    ],
  },

  {
    id: 3,
    text: "Do you often feel nausea or vomiting without a clear reason?",
    type: "single",
    options: [
      { text: "Never", points: 0 },
      { text: "Occasionally", points: 1 },
      { text: "Frequently", points: 2 },
      { text: "Almost every day", points: 3 },
    ],
  },

  {
    id: 4,
    text: "Have you noticed blurred vision, double vision, or loss of vision?",
    type: "single",
    options: [
      { text: "No", points: 0 },
      { text: "Mild symptoms", points: 1 },
      { text: "Moderate symptoms", points: 2 },
      { text: "Severe vision problems", points: 3 },
    ],
  },

  {
    id: 5,
    text: "Do you experience weakness or numbness in any part of your body?",
    type: "single",
    options: [
      { text: "Never", points: 0 },
      { text: "Sometimes", points: 1 },
      { text: "Often", points: 2 },
      { text: "Severe or constant", points: 3 },
    ],
  },

  {
    id: 6,
    text: "Have you had difficulty speaking or understanding conversations?",
    type: "single",
    options: [
      { text: "Never", points: 0 },
      { text: "Rarely", points: 1 },
      { text: "Often", points: 2 },
      { text: "Almost always", points: 3 },
    ],
  },

  {
    id: 7,
    text: "Do you frequently experience balance or coordination problems?",
    type: "single",
    options: [
      { text: "Never", points: 0 },
      { text: "Occasionally", points: 1 },
      { text: "Frequently", points: 2 },
      { text: "Severe difficulty walking", points: 3 },
    ],
  },

  {
    id: 8,
    text: "Have you noticed sudden memory problems or confusion?",
    type: "single",
    options: [
      { text: "No", points: 0 },
      { text: "Mild", points: 1 },
      { text: "Moderate", points: 2 },
      { text: "Severe", points: 3 },
    ],
  },

  {
    id: 9,
    text: "Have you experienced unusual personality or behavior changes?",
    type: "single",
    options: [
      { text: "No changes", points: 0 },
      { text: "Minor changes", points: 1 },
      { text: "Noticeable changes", points: 2 },
      { text: "Major changes", points: 3 },
    ],
  },

  {
    id: 10,
    text: "Select any symptoms you are currently experiencing:",
    type: "multi",
    options: [
      { text: "Persistent fatigue", points: 1 },
      { text: "Hearing problems", points: 1 },
      { text: "Difficulty concentrating", points: 1 },
      { text: "Frequent dizziness", points: 1 },
      { text: "None of these", points: 0, exclusive: true },
    ],
  },
];