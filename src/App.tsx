import { useState } from "react";
import data from "./questions.json";
import Result from "./Result.tsx";
import {Question, Status, Answers, Answer} from "./types.ts";

const questions: Question[] = data.questions;
let numberOfCorrect: number = 0;
let numberOfWrong: number = 0;

export default function App() {
    const [answers, setAnswers] = useState<Answers>({});
    const [status, setStatus] = useState<Status>("process");

    function handleTextAreaChanges(questionId: number, value: string): void {
        setAnswers( prevAnswers => {
            return (
                {
                    ...prevAnswers,
                    [questionId]: { answer: value, accuracy: "not-tested" }
                }
            );
        }
        );
    }

    function handleSubmit(e): void {
        e.preventDefault();
        setStatus("submitting");

        let i = 0;
        for (const answer in answers) {
            if (answers[answer].answer === questions[i].answer) {
                numberOfCorrect++;
                answers[answer].accuracy = "correct";
            } else {
                numberOfWrong++;
                answers[answer].accuracy = "wrong";
            }
            i++;
        }

        setStatus("completed");
    }

    return (
        <main className="p-10">
            <h1 className="text-3xl font-bold mb-2">Genel Kültür Testi</h1>
            <p className="text-sm mb-10">Test bittikten sonra sonuçlar testin altında, yanlış cevapladığınız soruların doğru cevapları soruların altında gösterilir.</p>
            <form className="flex flex-col gap-8">
                {
                    questions.map((question: Question, index: number) => {
                        return (
                            <fieldset key={index}>
                                <label 
                                className={`${(status === "completed" && answers[index].accuracy === "correct") && "text-green-500"}
                                            ${(status === "completed" && answers[index].accuracy === "wrong") && "text-red-500"}
                                            flex flex-col gap-3 items-start`}>
                                    {(index + 1) + ") " + question.question}
                                    <textarea
                                        className="disabled:opacity-30 disabled:bg-slate-100 w-full max-w-96 border border-black text-black rounded pl-1"
                                        value={answers[index] ? answers[index].answer : ""}
                                        onChange={(e) => handleTextAreaChanges(index, e.target.value)}
                                        disabled={status === "submitting"}/>
                                </label>
                                {(status === "completed" && answers[index].accuracy === "wrong") && <p className="text-blue-500">{`Doğru Cevap: ${questions[index].answer}`}</p>}
                            </fieldset>
                        );
                    })
                }
                <button 
                    disabled={status === "submitting"}
                    type="submit"
                    className="disabled:opacity-30 border-black bg-red-100 border p-1 rounded-lg"
                    onClick={e => handleSubmit(e)}>Gönder</button>
            </form>
            <Result 
                numberOfCorrect={numberOfCorrect} 
                numberOfWrong={numberOfWrong}
                status={status}/>
        </main>
    );
}