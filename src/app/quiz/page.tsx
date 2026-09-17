import type { Metadata } from "next";
import QuizContainer from "@/components/QuizContainer";

export const metadata: Metadata = {
  title: "Quiz dos Reinos | Descubra Sua Afinidade",
  description:
    "Faça o quiz e descubra com qual dos quatro reinos de O Castelo das Marias sua alma ressoa: Lira, Natural, Cemitério ou Encruzilhada.",
  openGraph: {
    title: "Quiz dos Reinos | O Castelo das Marias",
    description:
      "Descubra com qual reino sua alma ressoa: Lira, Natural, Cemitério ou Encruzilhada.",
    images: [
      {
        url: "/guardiao-sete.webp",
        width: 800,
        height: 800,
        alt: "Quiz O Castelo das Marias",
      },
    ],
  },
};

export default function QuizPage() {
  return (
    <div className="container-fluid" quiz-page>
      <QuizContainer />
    </div>
  );
}
