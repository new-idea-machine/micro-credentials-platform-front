/**
 * Classes that represent MongoDB schemas.
 *
 * This file defines all classes that represent the MongoDB schemas used throughout the
 * application, including {@link User}, {@link Course}, {@link Module}, {@link Assessment}, and
 * {@link Question}.
 *
 * The constructors for these classes can take either ordinary JavaScript objects (such as may be
 * received from the backend) or objects of the same class (in which case a clone is constructed)
 * as arguments.
 *
 * Detailed documentation about the database schema design can be found in the *Backend DB Schema*
 * document.
 *
 * @module databaseSchemas
 */

// ===============================================================================================
// CLASS DEFINITIONS
// ===============================================================================================

/**
 * Represents learner data associated with a user.
 */
class LearnerData {
  /**
   * @param {Object} learnerData - Learner data
   * @param {Array<string>} learnerData.courses - Array of {@link Course} objects that the learner
   * is enrolled in
   */
  constructor({ courses }) {
    this.courses = courses;
  }
}

/**
 * Represents instructor data associated with an instructor user.
 */
class InstructorData {
  /**
   * @param {Object} instructorData - Instructor data
   * @param {Array<string>} instructorData.courses - Array of {@link Course} objects that the
   * instructor user has created
   */
  constructor({ courses }) {
    this.courses = courses;
  }
}

/**
 * Represents a user in the system.
 */
class User {
  /**
   * @param {Object} userData - User data
   * @param {string} [userData._id] - MongoDB ObjectId (auto-generated)
   * @param {string} userData.name - The user's full name
   * @param {string} userData.email - The user's email address (is a unique identifier)
   * @param {Object} userData.learnerData - The courses that the user has enrolled in.
   * @param {null|Object} userData.instructorData - The courses that the user has created, if
   * applicable (non-`null` indicates that the user is an instructor)
   */
  constructor({ _id = null, name, email, learnerData, instructorData = null }) {
    this._id = _id;
    this.name = name;
    this.email = email;

    /*
    Ensure that the ".learnerData" and ".instructorData" members are objects of their respective
    classes instead of just ordinary JavaScript objects.
    */

    this.learnerData =
      learnerData instanceof LearnerData ? learnerData : new LearnerData(learnerData);

    if (instructorData) {
      this.instructorData =
        instructorData instanceof InstructorData
          ? instructorData
          : new InstructorData(instructorData);
    } else {
      this.instructorData = null;
    }
  }

  /**
   * Is user is an instructor?
   *
   * @returns {boolean} `true` if the user is an instructor, `false` if not
   */
  isInstructor() {
    return this.instructorData !== null;
  }
}

/**
 * Represents a learning module file in a course.
 */
class Module {
  /**
   * @param {Object} moduleData - Module data
   * @param {string} moduleData.title - The title of the module
   * @param {string} moduleData.description - A description of the module
   * @param {string} moduleData.type - The module file's type -- Audio, Video, or Markdown
   * @param {Array<Object>} [moduleData.chapters] - Chapters for Audio/Video modules
   * @param {string} moduleData.url - Link to the module file's location
   * @param {Object} [moduleData.urlAuthentication] - Object that contains authentication
   * information for the accessing the module file (if required)
   * @param {boolean} [moduleData.completed] - Has the module been completed (applicable only for
   * learners)
   * @param {Date} [moduleData.creationTime] - Creation timestamp
   * @param {Date} [moduleData.updateTime] - Last update timestamp
   */
  constructor({
    title,
    description,
    type,
    chapters = null,
    url,
    urlAuthentication = null,
    completed = null,
    creationTime = null,
    updateTime = null
  }) {
    this.title = title;
    this.description = description;
    this.type = type;
    this.chapters = chapters;
    this.url = url;
    this.urlAuthentication = urlAuthentication;
    this.completed = completed;
    this.creationTime = creationTime;
    this.updateTime = updateTime;
  }

  /**
   * Is the module file an audio file?
   *
   * @returns {boolean} `true` if the module is Audio, `false` if not
   */
  isAudio() {
    return this.type === "Audio";
  }

  /**
   * Is the module file a video file?
   *
   * @returns {boolean} `true` if the module is Video, `false` if not
   */
  isVideo() {
    return this.type === "Video";
  }

  /**
   * Is the module file a Markdown file?
   *
   * @returns {boolean} `true` if the module is Markdown, `false` if not
   */
  isMarkdown() {
    return this.type === "Markdown";
  }

  /**
   * Does the module have chapters?
   *
   * @returns {boolean} `true` if the module has chapters, `false` if it doesn't
   */
  hasChapters() {
    return this.chapters && this.chapters.length > 0;
  }
}

/**
 * Represents a question in an assessment
 */
class Question {
  /**
   * @param {Object} questionData - Question data
   * @param {string} questionData.question - The question's text
   * @param {Array<string>} questionData.options - Possible answers
   * @param {number} [questionData.answer] - Index in `options` of the learner's answer
   * @param {number} questionData.correctOption - Index of the correct option
   * @param {string} questionData.explanation - An explanation of why the answer is correct
   * @param {Date} [questionData.creationTime] - Creation timestamp
   * @param {Date} [questionData.updateTime] - Last update timestamp
   */
  constructor({
    question,
    options,
    answer = null,
    correctOption,
    explanation,
    creationTime = new Date(),
    updateTime = new Date()
  }) {
    this.question = question;
    this.options = options;
    this.answer = answer;
    this.correctOption = correctOption;
    this.explanation = explanation;
    this.creationTime = creationTime;
    this.updateTime = updateTime;
  }

  /**
   * Validate that the question has at least 2 options and no more than 26
   *
   * @returns {boolean} `true` if this question is in a valid state, `false` if it isn't
   */
  isValid() {
    return this.options.length >= 2 && this.options.length <= 26;
  }

  /**
   * Has the user answered the question?
   *
   * @returns {boolean} `true` if the question has been answered, `false` if it hasn't
   */
  isAnswered() {
    return this.answer !== null && this.answer >= 0;
  }

  /**
   * Is the user's answer is correct?
   *
   * @returns {boolean} `true` if the answer is correct, `false` if not
   */
  isCorrect() {
    return this.isAnswered() && this.answer === this.correctOption;
  }
}

/**
 * Represents an assessment in a course
 */
class Assessment {
  /**
   * @param {Object} options - Assessment options
   * @param {string} options.title - Assessment title
   * @param {Array<Object>} options.questions - Array of questions
   * @param {number} [options.currentQuestion] - Index of current question for learner
   * @param {Date} [options.creationTime] - Creation timestamp
   * @param {Date} [options.updateTime] - Last update timestamp
   */
  constructor({
    title,
    questions,
    currentQuestion = null,
    creationTime = new Date(),
    updateTime = new Date()
  }) {
    this.title = title;
    this.questions = questions.map((question) =>
      question instanceof Question ? question : new Question(question)
    );
    this.currentQuestion = currentQuestion;
    this.creationTime = creationTime;
    this.updateTime = updateTime;
  }

  /**
   * Has the assessment has been completed?
   *
   * @returns {boolean} `true` if the assessment has been completed, `false` if it hasn't
   */
  isCompleted() {
    let completed = true;
    let i = 0;

    /*
    This loop goes through each question to see if it's been answered and stops if it finds one
    that hasn't been answered.
    */

    while (completed && i < this.questions.length) {
      completed = this.questions[i++].isAnswered();
    }

    return completed;
  }

  /**
   * Get the current question object
   *
   * @returns {Question|null} The current question (or `null` if completed)
   */
  getCurrentQuestion() {
    return this.isCompleted() ? null : this.questions[this.currentQuestion];
  }

  /**
   * Calculate the score as percentage of correct answers
   *
   * @returns {number} Score as percentage (integer from 0 to 100)
   */
  calculateScore() {
    if (this.questions.length === 0) return 0;

    const numCorrectAnswers = this.questions.reduce((count, question) => {
      return count + (question.isCorrect() ? 1 : 0);
    }, 0);

    return Math.round((numCorrectAnswers / this.questions.length) * 100);
  }
}

/**
 * Represents a course in the micro-credentials platform
 */
class Course {
  /**
   * @param {Object} courseData - Course data
   * @param {string} [courseData._id] - MongoDB ObjectId (auto-generated)
   * @param {string} courseData.title - The title of the course
   * @param {string} courseData.description - A description of the course
   * @param {Object} courseData.instructor - The instructor who created the course
   * @param {Array<Object>} courseData.components - Array of modules and assessments (not to be
   * confused with React components)
   * @param {number} [courseData.currentComponent] - Index (into `courseData`) of the component
   * that the learner is currently on
   * @param {boolean} [courseData.credentialEarned] - Whether the course's credential has been
   * earned (only applicable to learners)
   * @param {Date} [courseData.creationTime] - Creation timestamp
   * @param {Date} [courseData.updateTime] - Last update timestamp
   */
  constructor({
    _id = null,
    title,
    description,
    instructor,
    components,
    currentComponent = null,
    credentialEarned = null,
    creationTime = new Date(),
    updateTime = new Date()
  }) {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.instructor = instructor;

    /*
    If a component is a Module then it will have a ".question" member; if it's an Assessment then
    it won't.  This information is used to select which class to use when adding components to this
    instance.
    */

    this.components = components.map((component) => {
      return "questions" in component ? new Assessment(component) : new Module(component);
    });

    this.currentComponent = currentComponent;
    this.credentialEarned = credentialEarned;
    this.creationTime = creationTime;
    this.updateTime = updateTime;
  }

  /**
   * Has the course been completed?
   *
   * @returns {boolean} `true` if the course has been completed, `false` if it hasn't
   */
  isCompleted() {
    return this.currentComponent >= this.components.length;
  }

  /**
   * Get the current component object
   *
   * @returns {Module|Assessment|null} The current component (or `null` if the course has been
   * completed)
   */
  getCurrentComponent() {
    return this.isCompleted() ? null : this.components[this.currentComponent];
  }

  /**
   * Calculate the progress percentage through the course
   * @returns {number} Progress percentage (integer from 0 to 100)
   */
  calculateProgress() {
    if (this.components.length === 0) return 0;

    return Math.min(Math.round((this.currentComponent / this.components.length) * 100), 100);
  }
}

// ===============================================================================================
// EXPORTS
// ===============================================================================================

export { Assessment, Course, InstructorData, LearnerData, Module, Question, User };
