import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-fluid page-not-found">
      <p className="section-kicker">Erro 404</p>
      <h1>Página Não Encontrada</h1>
      <p>
        Parece que você se perdeu pelos corredores do Castelo. O caminho que você
        tentou acessar não existe ou foi engolido pelas sombras.
      </p>
      <Link href="/" className="btn btn-primary">
        Retornar ao Início
      </Link>
    </div>
  );
}