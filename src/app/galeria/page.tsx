import type { Metadata } from "next";
import ImageCarousel from "@/components/ImageCarousel";

export const metadata: Metadata = {
  title: "Galeria de Imagens | Personagens e Cenários",
  description:
    "Explore as artes oficiais, ilustrações conceituais e cenários que compõem o universo do romance O Castelo das Marias.",
  openGraph: {
    title: "Galeria de Imagens | O Castelo das Marias",
    description:
      "Veja imagens exclusivas dos personagens e cenários do universo sombrio da obra.",
    images: [
      {
        url: "/carrossel/1.webp",
        width: 600,
        height: 600,
        alt: "Arte oficial de O Castelo das Marias",
      },
    ],
  },
};

export default function GaleriaPage() {
  return (
    <div className="container-fluid page-galeria">
      <h1>Galeria</h1>
      <p className="lead">
        Explore as imagens do universo de O Castelo das Marias.
      </p>
      <ImageCarousel />
    </div>
  );
}
