// GeminiAIModal.js
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export const getInterviewQuestions = async (position, description, experience) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `Job Position: ${position}, Job Description: ${description}, Years of Experience: ${experience}.
Generate 5 interview questions with answers in JSON format. 
Respond ONLY with raw JSON. Do NOT include markdown syntax like \`\`\`json.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Just in case: strip markdown backticks if present
    const cleaned = text.replace(/```json/i, '').replace(/```/g, '').trim();

    const questions = JSON.parse(cleaned);
    return questions;
  } catch (error) {
    console.error('Error generating interview questions: ', error);
    throw error;
  }
};











// // GeminiAIModal.js

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// export const getInterviewQuestions = async (jobPosition, jobDesc, jobExperience) => {
//   const genAI = new GoogleGenerativeAI(API_KEY);

//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//   const prompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Based on this, generate 5 interview questions with answers in JSON format. Respond only in raw JSON.`;

//   const result = await model.generateContent({
//     contents: [{ role: "user", parts: [{ text: prompt }] }],
//   });

//   const response = await result.response;
//   const text = await response.text();

//   return text;
// };












// // To run this code you need to install the following dependencies:
// // npm install @google/genai mime
// // npm install -D @types/node

// import {
//     GoogleGenAI,
//   } from '@google/genai';
  
//   async function main() {
//     const ai = new GoogleGenAI({
//       apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
//     });
//     const config = {
//       responseMimeType: 'text/plain',
//     };
//     const model = 'gemini-1.5-flash';
//     const contents = [
//       {
//         role: 'user',
//         parts: [
//           {
//             text: `Job Position : Full Stack Developer, Job Description : React, Node.js, MySql, Years of Experience : 1, Depends on this information please give me 5 interview question with Answers in JSON format. Give Question and Answers as field in JSON`,
//           },
//         ],
//       },
//       {
//         role: 'model',
//         parts: [
//           {
//             text: `\`\`\`json
//   [
//     {
//       "Question": "Describe your experience with React.js, focusing on specific components or techniques you've utilized in projects.",
//       "Answer": "In my previous projects, I've extensively used React.js to build user interfaces. I'm proficient in utilizing functional components with hooks like useState and useEffect for managing state and side effects.  I have experience with JSX for rendering UI elements, and I'm familiar with concepts like props drilling and context API for managing data flow within the application. I have also worked with popular libraries like React Router for handling navigation and Redux or Context API for state management (specify which one you actually used and give a brief example)."
//     },
//     {
//       "Question": "Explain your understanding of Node.js and its role in a full-stack application.  Give an example of a Node.js project you worked on or a task you performed using it.",
//       "Answer": "Node.js is a JavaScript runtime environment that allows me to run JavaScript code on a server. It's crucial for building the backend of a full-stack application, handling requests, processing data, and interacting with databases.  For instance, in a previous project, I used Node.js with Express.js to create a RESTful API that handled user authentication, data retrieval from a MySQL database, and served dynamic content to the React frontend. I was responsible for [mention a specific task, e.g., writing API endpoints for user registration, implementing authentication middleware, or setting up database connections]."
//     },
//     {
//       "Question": "How would you handle a situation where a database query in your Node.js application is taking an unexpectedly long time?",
//       "Answer": "If a database query is slow, I would first use the database's query logging or profiling tools to identify the bottleneck. This could involve analyzing the query itself for inefficiencies, checking for missing indexes, or looking for potential issues with the database schema.  Then, I would optimize the query (e.g., adding indexes, rewriting the query to be more efficient), consider caching frequently accessed data, or look into database connection pooling to improve performance. If the problem persists after optimization, I would investigate the server-side performance and database server resources to rule out hardware limitations."
//     },
//     {
//       "Question": "How familiar are you with different database schema design principles? Explain how you would design a database schema for a simple blog application.",
//       "Answer": "I understand the importance of designing efficient and normalized database schemas. For a simple blog application, I would likely use a relational database like MySQL. The schema would include tables for users (with fields like user_id, username, email, password), posts (with post_id, user_id, title, content, creation_date), and possibly comments (with comment_id, post_id, user_id, comment_text, creation_date).  I would ensure proper use of primary and foreign keys to maintain referential integrity and relationships between tables.  Normalization would be applied to reduce data redundancy and improve data integrity."
//     },
//     {
//       "Question": "With only one year of experience, what are some areas you are actively working on improving your skills in, and how are you pursuing that improvement?",
//       "Answer": "While I have a solid foundation in React, Node.js, and MySQL, I'm continuously working on expanding my knowledge. I'm currently focusing on improving my skills in [mention specific areas, e.g., testing frameworks like Jest and Cypress, advanced state management techniques, or working with NoSQL databases like MongoDB].  I'm doing this through online courses (e.g., Coursera, Udemy), reading relevant documentation and blog posts, contributing to open source projects, and actively seeking opportunities to apply new skills in my work."
//     }
//   ]
//   \`\`\`
//   `,
//           },
//         ],
//       },
//       {
//         role: 'user',
//         parts: [
//           {
//             text: `INSERT_INPUT_HERE`,
//           },
//         ],
//       },
//     ];
  
//     const response = await ai.models.generateContentStream({
//       model,
//       config,
//       contents,
//     });
//     console.log('Response:', response);
//     for await (const chunk of response) {
//       console.log(chunk.text);
//     }
//   }
  
//   main();
  