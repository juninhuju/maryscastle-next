'use client';

import { startTransition, useEffect, useState, FormEvent } from 'react';
import axios from '@/services/axios';

interface ComentarioItem {
  objectId?: string;
  createdAt: string;
  nome: string;
  texto: string;
}

const API_URL = '/classes/Comentario';

export default function Comentario() {
  const [apiConfigured, setApiConfigured] = useState<boolean>(false);
  const [comentarios, setComentarios] = useState<ComentarioItem[]>([]);
  const [mostrarTodos, setMostrarTodos] = useState<boolean>(false);
  const [novoComentario, setNovoComentario] = useState({ nome: '', texto: '' });
  const [enviando, setEnviando] = useState<boolean>(false);
  const [erro, setErro] = useState<string>('');

  useEffect(() => {
    const isConfigured = Boolean(
      process.env.NEXT_PUBLIC_PARSE_APP_ID &&
      process.env.NEXT_PUBLIC_PARSE_JS_KEY
    );
    setApiConfigured(isConfigured);

    if (!isConfigured) {
      setErro('Os comentários estarão disponíveis quando a API for configurada.');
      return;
    }

    carregarComentarios();
  }, []);

  const carregarComentarios = async () => {
    try {
      const { data } = await axios.get(API_URL);
      const ordenados = [...(data.results || [])].sort(
        (a: ComentarioItem, b: ComentarioItem) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      startTransition(() => {
        setComentarios(ordenados);
        setErro('');
      });
    } catch (error) {
      console.error('Erro ao carregar comentários:', error);
      startTransition(() => {
        setComentarios([]);
        setErro('Não foi possível carregar os comentários agora.');
      });
    }
  };

  const comentariosVisiveis = mostrarTodos
    ? comentarios
    : comentarios.slice(0, 6);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nome = novoComentario.nome.trim();
    const texto = novoComentario.texto.trim();

    if (!nome || !texto) {
      setErro('Preencha seu nome e escreva um comentário antes de enviar.');
      return;
    }

    setEnviando(true);
    setErro('');
    try {
      await axios.post(API_URL, { nome, texto });
      setNovoComentario({ nome: '', texto: '' });
      await carregarComentarios();
      setErro('Comentário adicionado com sucesso.');
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
      setErro('Não foi possível adicionar o comentário agora.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section
      className="comentarios-section"
      aria-labelledby="comentarios-title"
    >
      <div className="comentarios-heading">
        <div>
          <p className="section-kicker">Vozes dos leitores</p>
          <h2 id="comentarios-title">Comentários</h2>
        </div>
        <span className="comentarios-count">
          {comentarios.length}{' '}
          {comentarios.length === 1 ? 'comentário' : 'comentários'}
        </span>
      </div>

      {erro && (
        <p className="comment-status" role="status">
          {erro}
        </p>
      )}

      {apiConfigured && (
        <>
          <form className="comentario-form" onSubmit={handleSubmit}>
            <div className="comment-form-fields">
              <label htmlFor="comentario-nome">
                Seu nome
                <input
                  id="comentario-nome"
                  type="text"
                  placeholder="Como podemos chamar você?"
                  maxLength={80}
                  required
                  value={novoComentario.nome}
                  onChange={(event) =>
                    setNovoComentario((prev) => ({
                      ...prev,
                      nome: event.target.value,
                    }))
                  }
                />
              </label>
              <label htmlFor="comentario-texto">
                Seu comentário
                <textarea
                  id="comentario-texto"
                  rows={4}
                  placeholder="Compartilhe sua impressão sobre a história..."
                  maxLength={1000}
                  required
                  value={novoComentario.texto}
                  onChange={(event) =>
                    setNovoComentario((prev) => ({
                      ...prev,
                      texto: event.target.value,
                    }))
                  }
                />
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={enviando}
            >
              {enviando ? 'Enviando...' : 'Publicar comentário'}
            </button>
          </form>

          <div className="comentarios-list">
            {comentariosVisiveis.length > 0 ? (
              comentariosVisiveis.map((comentario) => (
                <article
                  key={comentario.objectId || comentario.createdAt}
                  className="comentario-item"
                >
                  <div className="comment-author">
                    <span className="comment-avatar" aria-hidden="true">
                      {(comentario.nome || 'L').charAt(0).toUpperCase()}
                    </span>
                    <h4>{comentario.nome}</h4>
                  </div>
                  <p>{comentario.texto}</p>
                </article>
              ))
            ) : (
              <p className="comments-empty">
                Ainda não há comentários. Seja o primeiro a compartilhar uma
                impressão.
              </p>
            )}
          </div>

          {comentarios.length > 6 && (
            <div className="comments-actions">
              <button
                type="button"
                className="comments-toggle"
                onClick={() => setMostrarTodos((val) => !val)}
                aria-expanded={mostrarTodos}
              >
                <span>{mostrarTodos ? 'Ver menos' : 'Ver todos'}</span>
                <span aria-hidden="true">{mostrarTodos ? '↑' : '↓'}</span>
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}