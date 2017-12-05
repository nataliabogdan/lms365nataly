export interface UserInfo {
    loginName: string;
    password: string;
    name?: string;
    role: UserRole;
}

export enum UserRole {
    Learner,
    LMSAdmin,
    Teacher
}

export interface CourseInfo {
    category: string;
    description?: string;
    title: string;
    url?: string;
    learners?: string;
    courseadmin?: string;
    // numberContentPackages?: number;
    // numberQuizzes?: number;
    selectContentPackage?: string;
    selectQuizz?: string;
    addLearningModule?: string;
}
export interface CourseSessionInfo {
    room?: string;
    learners?: string;
    attendees?: string;
    meetingUrl?: string
}

export interface TrainingPlanInfo {
    category: string;
    description: string;
    title: string;
    url?: string;
    numberCourses?: number;
}

export interface ScormInfo {
    title: string;
    description?: string;
    maxAttempts?: number;
    timeOut?: number;
    openInNewWindow?: boolean;
    showNavigation?: boolean;
    showToc?: boolean;
}

export interface AICCInfo {
    title: string;
    description?: string;
    maxAttempts?: number;
    timeOut?: number;
    openInNewWindow?: boolean;
    showSubmit?: boolean;
    showTitle?: boolean;
    autoClosePlayer?: boolean;
}

export interface LearningPathInfo {
    title: string;
    description?: string;
    published?: boolean;
    items: LearningPathItem[];
}


export interface LearningPathItem {
    title?: string;
    type: LearningItemType;
    fileName?: string;
}

export enum LearningItemType{
    Youtube,
    ExternalLink,
    EmbeddeCode,
    OfficeMix,
    Confirmation,
    Content,
    LinkToDocument,
    Quiz,
    Scorm,
    File
}

export interface AssignmentFields {
    title: string;
    description?: string;
    grade_skale?: string; 
    tag?: string;
    open_date?: Date;
    due_date?: Date;
    close_date?: Date; 
    upload_file?: string;
    uploads_to_description?: Uploads[];   
}
export interface QuizFields {
    title?: string;
    description?: string;
    quiz_passing_score?: number; 
    max_attempts?: number; 
    allow_review?: boolean;
    show_correct_answers?: boolean;
    publishing?: boolean;
    start_date?: Date;
    end_date?: Date;
    randomize_questions?: boolean;
    timer?: boolean; 
    questions?: QuizQuestionFields[];
}

export interface QuizQuestionFields {
    question_type: QuetionType;
    question_name: string;
    question: string;
    answer?: string;
    points_awarded?:number;
    tags?: string;
    matching_image?: string;
    uploads_to_question?: Uploads[];
}

export enum QuetionType {
    multipleChoise,
    multipleAnswers,
    trueOrFalse,
    ordering,
    matching,
    hotSpot,
    shortAnswer,
    freeAnswer,
    fillGap,
}

export interface Uploads {
    uploadType: UploadType;
    file_path: string;
    Width?: number;
    Height?: number;
}

export enum UploadType {
    YouTube,
    video,
    audio,
    image,
    file,    
}