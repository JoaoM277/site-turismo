import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { buscarPacotePorId, criarReserva } from '../../services/api';
import useFetch from '../../hooks/useFetch';
import Botao from '../../components/Botao/Botao';
import Loader from '../../components/Loader/Loader';
import './Reserva.css';

// Valores iniciais do formulário de reserva.
const ESTADO_INICIAL = {
  nome: '',
  email: '',
  quantidadePessoas: 1,
  dataViagem: '',
  observacoes: '',
};

// Página de reserva de um pacote específico (id vindo da URL).
export default function Reserva() {
  const { pacoteId } = useParams();
  const { dados: pacote, carregando } = useFetch(() => buscarPacotePorId(pacoteId), [pacoteId]);

  const [formulario, setFormulario] = useState(ESTADO_INICIAL);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(null);
  const [reservaConfirmada, setReservaConfirmada] = useState(null);

  const atualizarCampo = (evento) => {
    const { name, value } = evento.target;
    setFormulario((estadoAnterior) => ({ ...estadoAnterior, [name]: value }));
  };

  const aoSubmeter = async (evento) => {
    evento.preventDefault();
    setErro(null);
    setEnviando(true);

    try {
      const resultado = await criarReserva({ ...formulario, pacoteId });
      setReservaConfirmada(resultado);
    } catch (err) {
      setErro(err.response?.data?.mensagem || 'Não foi possível concluir a reserva.');
    } finally {
      setEnviando(false);
    }
  };

  if (carregando) return <Loader mensagem="Carregando pacote..." />;

  if (!pacote) {
    return (
      <div className="container">
        <p className="mensagem-erro">Pacote não encontrado.</p>
        <Link to="/pacotes">← Voltar para pacotes</Link>
      </div>
    );
  }

  // Após a confirmação, mostra uma mensagem de sucesso com o resumo.
  if (reservaConfirmada) {
    return (
      <section className="container pagina-reserva">
        <div className="mensagem-sucesso">
          <h2>Reserva confirmada! 🎉</h2>
          <p>
            Obrigado, {reservaConfirmada.nome}! Sua reserva para{' '}
            <strong>{pacote.titulo}</strong> foi recebida.
          </p>
          <p>
            Total: <strong>R$ {reservaConfirmada.precoTotal.toLocaleString('pt-BR')}</strong>
          </p>
        </div>
        <Link to="/pacotes">← Ver outros pacotes</Link>
      </section>
    );
  }

  return (
    <section className="container pagina-reserva">
      <h1>Reservar: {pacote.titulo}</h1>
      <p className="pagina-reserva__preco">
        Preço por pessoa: <strong>R$ {pacote.preco.toLocaleString('pt-BR')}</strong>
      </p>

      <form className="formulario" onSubmit={aoSubmeter}>
        <label>
          Nome completo
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
          Quantidade de pessoas
          <input
            type="number"
            name="quantidadePessoas"
            min="1"
            required
            value={formulario.quantidadePessoas}
            onChange={atualizarCampo}
          />
        </label>

        <label>
          Data da viagem
          <input
            type="date"
            name="dataViagem"
            required
            value={formulario.dataViagem}
            onChange={atualizarCampo}
          />
        </label>

        <label>
          Observações (opcional)
          <textarea
            name="observacoes"
            rows="3"
            value={formulario.observacoes}
            onChange={atualizarCampo}
          />
        </label>

        {erro && <p className="mensagem-erro">{erro}</p>}

        <Botao tipo="submit" disabled={enviando}>
          {enviando ? 'Enviando...' : 'Confirmar reserva'}
        </Botao>
      </form>
    </section>
  );
}
