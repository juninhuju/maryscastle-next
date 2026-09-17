import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container-fluid footer-inner">
        <div className="footer-identity">
          <strong>O Castelo das Marias</strong>
          <span>Um romance sobrenatural e fantasia gótica</span>
        </div>

        <nav className="footer-links" aria-label="Navegação secundária">
          <Link href="/" className="footer-link">Início</Link>
          <Link href="/livro" className="footer-link">Capítulo</Link>
          <Link href="/quiz" className="footer-link">Quiz</Link>
          <Link href="/downloads" className="footer-link">Materiais</Link>
          <Link href="/galeria" className="footer-link">Imagens</Link>
          <Link href="/autor" className="footer-link">Autor</Link>
          <Link href="/reinos" className="footer-link">Reinos</Link>
        </nav>

        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} O Castelo das Marias. Todos os direitos reservados.
          </p>
          <span className="footer-credit">Desenvolvido com Next.js</span>
        </div>
      </div>
    </footer>
  );
}