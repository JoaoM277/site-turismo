import React, { useState } from 'react';

import { enviarContato } from '../../services/api';
import Botao from '../../components/Botao/Botao';
import './Contato.css';

const ESTADO_INICIAL = { nome: '', email: '', mensagem: '' };

// Página de contato com formulário simples enviado para POST /api/contato.
export default function Contato() {
  const [formulario, setFormulario] = useState(ESTADO_INICIAL);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(null);

  const atualizarCampo = (evento) => {
    const { name, value } = evento.target;
    setFormulario((estadoAnterior) => ({ ...estadoAnterior, [name]: value }));
  };

  const aoSubmeter = async (evento) => {
    evento.preventDefault();
    setErro(null);
    setEnviando(true);

    try {
      const resposta = await enviarContato(formulario);
      setSucesso(resposta.mensagem);
      setFormulario(ESTADO_INICIAL);
    } catch (err) {
      setErro(err.response?.data?.mensagem || 'Não foi possível enviar sua mensagem.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="container pagina-contato">
      <h1>Fale conosco</h1>
      <p className="pagina-contato__subtitulo">
        Dúvidas, sugestões ou quer montar uma viagem sob medida? Envie uma mensagem.
      </p>

      <form className="formulario" onSubmit={aoSubmeter}>
        <label>
          Nome
          <input
            type="text"
            name="nome"
            required
            value={formulario.nome}
            onChange={atualizarCampo}
          />
        </label>

        <label>
          E-mail
          <input
            type="email"
            name="email"
            required
            value={formulario.email}
            onChange={atualizarCampo}
          />
        </label>

        <label>
          Mensagem
          <textarea
            name="mensagem"
            rows="4"
            required
            value={formulario.mensagem}
            onChange={atualizarCampo}
          />
        </label>

        {erro && <p className="mensagem-erro">{erro}</p>}
        {sucesso && <p className="mensagem-sucesso">{sucesso}</p>}

        <Botao tipo="submit" disabled={enviando}>
          {enviando ? 'Enviando...' : 'Enviar mensagem'}
        </Botao>
      </form>
    </section>
  );
}
