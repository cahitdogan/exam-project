import { ResultProps } from "./types.ts";

export default function Result({numberOfCorrect, numberOfWrong, status}: ResultProps) {
    if (status === "completed") {
        return (
            <section className="mt-20">
                <h2 className="text-xl mb-3 font-bold">SONUÇ</h2>
                <div className="flex gap-5">
                    <p>Doğru sayısı: {numberOfCorrect}</p>
                    <p>Yanlış sayısı: {numberOfWrong}</p>
                    <p>Doğru yüzdesi: %{Math.floor(numberOfCorrect / (numberOfCorrect + numberOfWrong) * 100)}</p>
                </div>
                
            </section>
        );
    } else {
        return null;
    }
    
}