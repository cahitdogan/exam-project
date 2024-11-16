export interface Question {
    question: string,
    answer: string
};

export type Status = "process" | "submitting" | "completed" | "error";

export interface Answers{
    [key: string]: Answer;
};

export interface Answer {
    answer: string;
    accuracy: "correct" | "wrong" | "not-tested";
}

export type ResultProps = {
    numberOfCorrect: number;
    numberOfWrong: number;
    status: string;
}