import { faker } from "@faker-js/faker";
// import { createAvatar } from "@dicebear/core";
// import { avataaars } from "@dicebear/collection";
import {
  User,
  Tag,
  UserTag,
  Question,
  QuestionTag,
  Answer,
  Comment,
  Vote,
  Challenge,
  ChallengeTag,
  ChallengeAnswer,
} from "../models/index.js";
import { hashPassword, createColorsFromTagName } from "../utils/index.js";
import { nanoid } from "nanoid";

const seeds = async (req, res, next) => {
  try {
    const getRandom = (arr = []) => {
      return arr[Math.floor(Math.random() * arr.length)];
    };

    const usersData = [];
    const usersLength = 10;
    for (let i = 0; i < usersLength; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const email = faker.internet.email(firstName, lastName).toLowerCase();
      const password = "password";
      const passwordHashed = hashPassword(password);
      const gender = getRandom(["male", "female"]);
      const matricula = faker.datatype.number();
      const role = getRandom(["student", "teacher"]);
      const level = getRandom(["L1", "L2", "L3", "M1", "M2"]);
      const channelId = nanoid();
      // const imageUrl = createAvatar(avataaars, {}).toDataUriSync();
      const imageUrl = null;

      usersData.push({
        firstName,
        lastName,
        matricula,
        gender,
        email,
        password: passwordHashed,
        role,
        level,
        channelId,
        imageUrl,
      });
    }

    const users = await User.bulkCreate(usersData);
    const usersIds = [];
    await Promise.all(
      users.map(async (user) => {
        await user.reload();
        usersIds.push(user.id);
      })
    );

    const tagsData = [
      "BEAUTIFULSOUP",
      "VANILLA-TILT",
      "RESTFUL APIS",
      "GIT",
      "CONTINUOUS DEPLOYMENT",
      "PHASER",
      "LRU CACHE",
      "VUE.JS",
      "PERFORMANCE TESTING",
      "BEHAVIOR DRIVEN DEVELOPMENT",
      "REQUESTS",
      "GARBAGE COLLECTION",
      "SCIPY",
      "AWS-SDK",
      "PARALLELISM",
      "NUMERAL.JS",
      "GRADLE",
      "JODA-CONVERT",
      "GO",
      "REGULAR EXPRESSIONS",
      "GUI TOOLKITS",
      "GENERATORS",
      "DAY.JS",
      "SPACY",
      "ARRAY",
      "BINARY TREE",
      "NUMPY",
      "FRAMEWORK",
      "KUBERNETES",
      "BOOTSTRAP",
      "DEVOPS",
      "ELECTRON",
      "CODE REVIEW",
      "PIXI.JS",
      "PYTORCH",
      "CONTINUOUS INTEGRATION",
      "JAVAMAIL",
      "AWS",
      "FLASK",
      "NODE.JS",
      "POINTERS",
      "REACT-NATIVE",
      "SQLALCHEMY",
      "LIBRARY",
      "ERROR HANDLING",
      "UNIT TESTING",
      "ALEMBIC",
      "RECHARTS",
      "DATA STRUCTURE",
      "PROTOBUF",
      "ASYNC/AWAIT",
      "MODULES",
      "ALGORITHM",
      "FASTAPI",
      "MAVEN",
      "CONDITIONALS",
      "CLOSURES",
      "SPLAY TREE",
      "ELASTICSEARCH",
      "ENCAPSULATION",
      "AMCHARTS",
      "EVENT DRIVEN PROGRAMMING",
      "GLOG",
      "BOOST-SERIALIZATION",
      "INHERITANCE",
      "INTERPRETER",
      "LIBUV",
      "LEXING",
      "IOS",
      "PYQT",
      "CELERY",
      "DEPENDENCY MANAGEMENT",
      "DEQUE",
      "UNIT TESTING FRAMEWORKS",
      "REACT",
      "FIREBASE",
      "AVL TREE",
      "SEMAPHORES",
      "PACKAGES",
      "JUST-IN-TIME COMPILATION",
      "INTERPRETATION",
      "LAMBDAS",
      "PYGAME",
      "REDIS",
      "BOOST-PROCESS",
      "INTERFACE",
      "BOOST-ASSIGN",
      "MACROS",
      "PROFILERS",
      "GITHUB",
      "ROOT",
      "DJANGO",
      "TEMPLATES",
      "LUXON",
      "SEABORN",
      "ZEROMQ",
      "LUCENE",
      "NAMESPACES",
      "KERAS",
      "LOOPS",
      "BOOST-ALGORITHM",
      "NLTK",
      "PRETTIER",
      "LIBEVENT",
      "ARRAYS",
      "DISJOINT SET",
      "REACT-ROUTER",
      "DEBUGGERS",
      "SECURITY TESTING",
      "PRIORITY QUEUE",
      "GREENSOCK",
      "MEMORY MANAGEMENT",
      "REFERENCES",
      "ABSTRACTION",
      "DOCKER",
      "BOOST-UUID",
      "TENSORFLOW",
      "LOAD TESTING",
      "ANT DESIGN",
      "BITBUCKET",
      "HDF5",
      "SEGMENT TREE",
      "SOURCE CODE",
      "ACE",
      "FENWICK TREE",
      "C++",
      "COMPILATION",
      "GOOGLE-GTEST",
      "LFU CACHE",
      "PYTHON",
      "JASYPT",
      "ESLINT",
      "PANDAS",
      "OPERATORS",
      "SKLEARN",
      "PARSING",
      "COMMENTS",
      "CORDOVA",
      "PROTOTYPE-BASED PROGRAMMING",
      "MULTIPROCESSING",
      "POLYMORPHISM",
      "LFU-CACHE WITH LRU",
      "BOOST-ASIO",
      "MESSAGE PASSING",
      "DATA TYPES",
      "GSON",
      "MYSQL",
      "THREADS",
      "HEAP",
      "METHOD",
      "SEGREGATED FREE LIST",
      "HUSKY",
      "BOOST-TEST",
      "PHP",
      "COROUTINES",
      "SCOPE",
      "ARROW",
      "ANDROID",
      "JUNIT",
      "FUNCTIONAL PROGRAMMING",
      "SWING",
      "JAVA.FX",
      "PILLOW",
      "OCTREE",
      "STACK",
      "TEST DRIVEN DEVELOPMENT",
      "HIGHCHARTS",
      "SYNTAX",
      "LOG4J",
      "TRIE",
      "THEANO",
      "BINARY SEARCH TREE",
      "MATPLOTLIB",
      "NETTY",
      "FUNCTIONS",
      "MONITORS",
      "BOOST-LAMBDA",
      "SYNCHRONIZATION",
      "ATOMIC OPERATIONS",
      "PYGTK",
      "BOOST-INTERPROCESS",
      "B-TREE",
      "PANDAS-PROFILING",
      "LOCKS",
      "PROGRAMMING LANGUAGE",
      "SPRING-DATA",
      "MOCKITO",
      "WEBSOCKETS",
      "SOCKET.IO",
      "ASSERTIONS",
      "BOOST-PROPERTY-TREE",
      "MOMENT.JS",
      "PYTHON-DATEUTIL",
      "GUAVA",
      "DATETIME",
      "CONCURRENCY",
      "OBJECT-ORIENTED PROGRAMMING",
      "JERSEY",
      "QUEUE",
      "VARIABLE",
      "SPARK",
      "SKIP LIST",
      "PYPLOT",
      "PYTHON-CALENDAR",
      "SPRING-BOOT",
      "RED-BLACK TREE",
      "CASSANDRA",
      "NEXT.JS",
      "PYCARET",
      "JACKSON",
      "VERSION CONTROL",
      "RESTBED",
      "JEST",
      "BLOOM FILTER",
      "INTEGRATION TESTING",
      "MONGODB",
      "SPRING",
      "CHART.JS",
      "OBJECT",
      "SEARCH ENGINE OPTIMIZATION",
      "JPA",
      "C#",
      "CLASS",
      "JAX-WS",
      "FLUX",
      "USER ACCEPTANCE TESTING",
      "COMPILER",
      "BOOST-STRING-ALGO",
      "QUADTREE",
      "BOOST-ALIGN",
      "LINKER",
      "BOOST-PROGRAM-OPTIONS",
      "BOOST-ITERATOR",
      "JDBC",
      "BOOST-XPRESSIVE",
      "JAX-B",
      "JAX-RS",
      "DOMAIN NAME SYSTEM",
      "REDUX",
      "BOOST-PHOENIX",
      "JOOQ",
      "PYWIN32",
      "RUBY",
      "FUNCTION",
      "DEBUGGING",
      "SCIKIT-OPTIMIZE",
      "HTTP",
      "JODA-TIME",
      "RAMDA",
      "APACHE-COMMONS",
      "POSTGRESQL",
      "TESTNG",
      "MOBX",
      "GRAPH",
      "SPRING-MVC",
      "REGRESSION TESTING",
      "BOOST-FUSION",
      "VARIABLE TYPES",
      "HIBERNATE",
      "EXCEPTION",
      "JETTY",
      "BOOST-TYPE-TRAIT",
      "JQUERY",
      "COCOON",
      "BINARY CODE",
      "CYPRESS",
      "DYNAMICTABLE",
      "SCIKIT-IMAGE",
      "ANGULAR",
      "TCP/IP",
      "END-TO-END TESTING",
      "SWIFT",
      "DICTIONARIES",
      "SLF4J",
      "STYLED-COMPONENTS",
      "RADIX TREE",
      "PYRO",
      "D3.JS",
      "PYTHON-DECIMAL",
      "CIRCULAR BUFFER",
      "PYSIDE",
      "GFLAGS",
      "BOOST-FILESYSTEM",
      "WEBPACK",
      "HASH TABLE",
      "MATERIAL-UI",
      "CPPUNIT",
      "BOOST-RANGE",
      "THREE.JS",
      "POCO",
      "BABEL",
      "SERVER-SIDE RENDERING",
      "TOMCAT",
      "BOOST-MPL",
      "LOCALE.JS",
      "GATSBY",
      "WATERFALL",
      "FFTW",
      "AJAX",
      "ANT",
      "ASPECTJ",
      "KD-TREE",
      "LODASH",
      "THRIFT",
      "GRAPHQL",
      "PAIR PROGRAMMING",
      "HADOOP",
      "AZURE",
      "SCIKIT-LEARN",
      "JAVA",
      "LINKED LIST",
      "MOCHA",
      "SEMANTICS",
      "IMMUTABLE.JS",
      "BLUEBIRD",
      "RXJS",
      "SCRUM",
      "AGILE",
      "JAVASCRIPT",
      "WEB DEVELOPMENT",
      "LOAD BALANCING",
      "CLIENT-SIDE RENDERING",
      "SSL/TLS",
      "AXIOS",
      "EXPRESS",
      "CACHING",
      "CONTENT DELIVERY NETWORKS",
      "GCP",
    ];

    // const tagsUnique = [...new Set(tags)];

    // console.log(usersData);

    const tags = await Tag.bulkCreate(
      tagsData.map((name) => ({
        name,
        ...createColorsFromTagName(name),
      }))
    );
    const tagsIds = [];
    await Promise.all(
      tags.map(async (tag) => {
        await tag.reload();
        tagsIds.push(tag.id);
      })
    );

    const userTagsData = usersIds.flatMap((userId) => {
      const tagsLength = faker.datatype.number({
        min: 1,
        max: 5,
      });

      const result = [];

      for (let i = 0; i < tagsLength; i++) {
        result.push({
          userId,
          tagId: getRandom(tagsIds),
          questionScore: faker.datatype.number({
            min: 0,
            max: 520,
          }),
          challengeScore: faker.datatype.number({
            min: 0,
            max: 520,
          }),
        });
      }

      return result;
    });
    await UserTag.bulkCreate(userTagsData);

    const questionsDataLength = 20;
    const questionsData = [];
    for (let i = 0; i < questionsDataLength; i++) {
      questionsData.push({
        userId: getRandom(usersIds),
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(
          faker.datatype.number({
            min: 1,
            max: 5,
          })
        ),
      });
    }

    const questions = await Question.bulkCreate(questionsData);
    const questionsIds = [];
    await Promise.all(
      questions.map(async (question) => {
        await question.reload();
        questionsIds.push(question.id);
      })
    );

    const questionTagsData = questionsIds.flatMap((questionId) => {
      const tagsLength = faker.datatype.number({
        min: 1,
        max: 5,
      });

      const result = [];
      for (let i = 0; i < tagsLength; i++) {
        result.push({
          questionId,
          tagId: getRandom(tagsIds),
        });
      }

      return result;
    });
    await QuestionTag.bulkCreate(questionTagsData);

    // const answersLength = 40;
    const answersData = questionsIds.flatMap((questionId) => {
      const responseLength = faker.datatype.number({
        min: 2,
        max: 7,
      });

      const result = [];

      for (let i = 0; i < responseLength; i++) {
        result.push({
          userId: getRandom(usersIds),
          questionId,
          content: faker.lorem.paragraphs(
            faker.datatype.number({
              min: 1,
              max: 3,
            })
          ),
        });
      }

      return result;
    });
    const answers = await Answer.bulkCreate(answersData);
    const answersIds = [];
    await Promise.all(
      answers.map(async (answer) => {
        await answer.reload();
        answersIds.push(answer.id);
      })
    );

    const answersIdsToComment = answersIds
      .sort(() => Math.random() - 0.5)
      .slice(Math.floor(answersIds.length / 2));

    const commentsData = answersIdsToComment.flatMap((answerId) => {
      const commentLength = faker.datatype.number({ min: 1, max: 5 });

      const result = [];

      for (let i = 0; i < commentLength; i++) {
        result.push({
          userId: getRandom(usersIds),
          answerId,
          content: faker.lorem.paragraphs({
            min: 1,
            max: 5,
          }),
        });
      }

      return result;
    });

    await Comment.bulkCreate(commentsData);

    const votesData = answersIds.flatMap((answerId) => {
      const voteLength = faker.datatype.number({
        min: 0,
        max: 7,
      });

      const result = [];

      for (let i = 0; i < voteLength; i++) {
        result.push({
          userId: getRandom(usersIds),
          answerId,
          type: "up",
        });
      }

      return result;
    });
    const votes = await Vote.bulkCreate(votesData);
    await Promise.all(
      votes.map(async (vote) => {
        await vote.reload();
      })
    );

    const challengeLength = 30;
    const challengesData = [];
    for (let i = 0; i < challengeLength; i++) {
      challengesData.push({
        userId: getRandom(usersIds),
        title: faker.lorem.sentence(),
        question: faker.lorem.paragraphs(
          faker.datatype.number({
            min: 1,
            max: 3,
          })
        ),
        answer: faker.lorem.paragraphs(
          faker.datatype.number({
            min: 2,
            max: 5,
          })
        ),
        difficulty: getRandom(["easy", "medium", "difficult"]),
        endAt: getRandom([
          faker.date.future(),
          faker.date.recent(),
          faker.date.recent(),
          faker.date.past(),
        ]),
      });
    }
    const challenges = await Challenge.bulkCreate(challengesData);
    const challengesIds = [];
    await Promise.all(
      challenges.map(async (challenge) => {
        await challenge.reload();
        challengesIds.push(challenge.id);
      })
    );

    const challengeTagsData = challengesIds.flatMap((challengeId) => {
      const challengeTagLength = faker.datatype.number({
        min: 3,
        max: 10,
      });

      const result = [];

      for (let i = 0; i < challengeTagLength; i++) {
        result.push({
          challengeId,
          tagId: getRandom(tagsIds),
        });
      }

      return result;
    });
    await ChallengeTag.bulkCreate(challengeTagsData);

    const challengeAnswerData = challengesIds.flatMap((challengeId) => {
      const challengeAnswerLength = faker.datatype.number({
        min: 3,
        max: 10,
      });

      const result = [];

      for (let i = 0; i < challengeAnswerLength; i++) {
        result.push({
          userId: getRandom(usersIds),
          challengeId,
          content: faker.lorem.paragraphs(
            faker.datatype.number({
              min: 3,
              max: 5,
            })
          ),
          status: getRandom(["success", "failure", "pending"]),
        });
      }

      return result;
    });
    await ChallengeAnswer.bulkCreate(challengeAnswerData);

    res.sendStatus(209);
  } catch (error) {
    next(error);
  }
};

export { seeds };
