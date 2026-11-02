# AI MYSTERY ROOM – PROJECT SPECIFICATION

## 1. Project Overview
AI Mystery Room is an AI-powered mystery investigation website. Users provide a short scenario or story, based on which the AI generates a complete fictional mystery challenge.

The AI creates an investigation containing multiple suspects, one actual culprit, and supporting evidence such as WhatsApp messages, images, CCTV recordings, and other clues.

Users investigate the available evidence, analyze the suspects, and select the culprit they believe is responsible. After submitting their selection, the system reveals whether their answer is correct and displays the complete mystery solution.

## 2. Technology Stack
- **Frontend:** React.js
- **Backend:** Node.js and Express.js
- **Database:** MongoDB
- **AI Integration:** Google Gemini API
- **Architecture:** MERN Stack (Client–Server Architecture)

## 3. System Architecture

The application follows a client-server architecture. The React frontend communicates with the Node.js and Express.js backend through REST APIs. The backend manages AI requests, mystery generation, evidence processing, and database operations.

### 3.1 Architecture Components

**1. Frontend – React.js**
- Provides the user interface.
- Accepts the user's mystery scenario.
- Displays generated suspects and evidence.
- Allows users to investigate clues.
- Provides culprit selection and result screens.
- Communicates with the backend through REST APIs.

**2. Backend – Node.js and Express.js**
- Handles incoming requests from the frontend.
- Validates user input.
- Communicates with the Gemini API.
- Processes AI-generated mystery data.
- Manages evidence and mystery information.
- Validates the user's selected culprit.
- Sends responses to the frontend.

**3. AI Engine – Google Gemini API**
- Analyzes the user's scenario.
- Generates the mystery storyline.
- Creates suspects, motives, and relationships.
- Determines the actual culprit.
- Generates supporting evidence content.
- Ensures clues are consistent with the mystery.
- Generates the final mystery explanation.

**4. Database – MongoDB**
Stores:
- Mystery scenarios and storylines.
- Suspect information.
- Actual culprit and solution.
- Generated evidence and media references.
- User investigation progress.
- User-selected answers and results.

**5. AI Media Generation**
- Generates fictional images and visual evidence using an appropriate AI image-generation service.
- Creates simulated CCTV footage using an appropriate video-generation service, if integrated.
- Stores generated media files in file or cloud storage.
- MongoDB stores the corresponding media references and metadata.

### 3.2 System Architecture Diagram

User → React Frontend → Node.js / Express Backend

The backend communicates with:

- **Gemini API:** Mystery, suspects, clues, and solution generation.
- **MongoDB:** Mystery data, evidence metadata, and user progress.
- **Media Generation Services:** AI-generated images and simulated video.
- **File Storage:** Stores generated media files.

The backend returns the generated mystery and evidence information to React, which displays the investigation interface to the user.

### 3.3 Application Data Flow

1. User enters a scenario in the React frontend.
2. React sends the scenario to the Express backend through a REST API.
3. Backend validates the input and sends it to Gemini.
4. Gemini generates the mystery storyline, suspects, actual culprit, and evidence plan.
5. Backend processes the AI response and requests any required AI-generated media.
6. Generated media is stored, and its references are saved in MongoDB.
7. The mystery information is saved in MongoDB, with the actual solution kept separate from public investigation data.
8. Backend sends the mystery details and evidence to the frontend without revealing the culprit.
9. User investigates the clues and selects a suspect.
10. React sends the selected suspect ID to the backend.
11. Backend compares the selection with the stored actual culprit.
12. The result and complete explanation are returned to the frontend.

## 4. Core Features

### 4.1 Scenario Input
- Users can enter a short story or scenario.
- Users submit the scenario to generate a mystery challenge.

### 4.2 AI Mystery Generation
- Gemini AI processes the user's input.
- Generates a fictional mystery investigation.
- Creates multiple suspects with individual backgrounds and motives.
- Determines exactly one actual culprit.
- Generates a complete storyline with interconnected clues.

### 4.3 AI Evidence Generation
The AI generates fictional investigation evidence, including:

- **WhatsApp Messages:** Conversations between suspects.
- **Images:** Photographs related to the mystery.
- **CCTV Recordings:** Simulated surveillance footage.
- **Additional Clues:** Documents, notes, timelines, and other relevant evidence.

All generated evidence must be connected to the storyline and help users investigate the mystery.

### 4.4 Investigation Interface
- Displays the mystery scenario.
- Shows all suspects and their details.
- Provides access to all generated evidence.
- Allows users to examine individual clues.
- Organizes the evidence in an interactive investigation interface.

### 4.5 Culprit Selection
- Users must select one suspect as the culprit after investigating the evidence.
- Users submit their selected suspect as their final answer.
- The backend compares the selection with the actual culprit stored in the database.

### 4.6 Results and Solution
- Displays whether the user's selection is correct or incorrect.
- Reveals the actual culprit.
- Provides the complete explanation of the mystery.
- Explains how the evidence connects to the culprit.

## 5. Functional Requirements
- Accept user-provided scenarios.
- Generate mystery challenges using Gemini AI.
- Create multiple suspects and exactly one actual culprit per mystery.
- Generate different types of supporting evidence.
- Maintain consistency between the storyline, suspects, culprit, and evidence.
- Allow users to explore all investigation materials.
- Allow users to select and submit a culprit.
- Validate the selected culprit on the backend.
- Reveal the actual culprit and complete explanation only after answer submission.

## 6. Non-Functional Requirements
- Simple and user-friendly interface.
- Responsive design for desktop and mobile devices.
- Proper handling of AI generation errors.
- Secure storage of mystery data.
- Reasonable loading time for generated evidence.
- Consistent and reliable AI-generated storylines.
- Gemini API keys must be stored securely on the backend.
- The actual culprit and solution must never be exposed through public frontend API responses.

## 7. Expected Outcome
The final application should provide an interactive AI-powered mystery investigation experience where users can turn their own stories into fictional mystery challenges, investigate AI-generated evidence, identify suspects, and select the actual culprit to solve the case.

## 8. Important AI Logic and Constraints
- Determine the actual culprit and complete solution before generating evidence.
- Keep the culprit's identity hidden until the user submits their answer.
- All evidence must follow the same storyline.
- Evidence should contain meaningful clues that help users identify the culprit.
- The final explanation must connect the clues to the actual culprit.
- AI-generated content should follow a structured JSON format for reliable backend processing.
- The backend must validate AI-generated responses before saving them.