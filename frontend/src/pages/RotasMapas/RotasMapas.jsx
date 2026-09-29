import React, { useState, useEffect, useRef } from 'react';
import { 
  Map as MapIcon, 
  MapPin, 
  Navigation, 
  Search, 
  Compass, 
  Building2, 
  Trees, 
  Star, 
  RotateCcw, 
  ExternalLink,
  ChevronDown,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { 
  CIDADE_ATUAL, 
  CIDADES_DISPONIVEIS, 
  PONTOS_BARRA_DO_CORDA 
} from './dadosBarraDoCorda';

// Criação de ícones dinâmicos via L.divIcon para total compatibilidade com Retina/Mobile
// sem dependência de imagens PNG locais e com badges visuais distintas.
const criarIconeMarcador = (tipo, categoria, isSelecionado = false) => {
  const isPublico = tipo === 'publico';
  const corBg = isPublico ? '#059669' : '#ea580c'; // Emerald-600 vs Orange-600
  const corBorda = isPublico ? '#a7f3d0' : '#fed7aa'; // Emerald-200 vs Orange-200
  
  let iconeSimbolo = '📍';
  if (isPublico) {
    iconeSimbolo = categoria.includes('Cachoeira') ? '🌊' : '🌴';
  } else {
    iconeSimbolo = categoria.includes('Hotel') ? '🏨' : '🍽️';
  }

  const tamanho = isSelecionado ? 46 : 38;
  const escala = isSelecionado ? 'transform: scale(1.18); z-index: 1000;' : '';

  const html = `
    <div style="position: relative; display: flex; flex-direction: column; align-items: center; ${escala} transition: all 0.2s ease;">
      <div style="
        width: ${tamanho}px; 
        height: ${tamanho}px; 
        background: ${corBg}; 
        color: white; 
        border-radius: 9999px; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-size: ${isSelecionado ? '20px' : '17px'}; 
        box-shadow: 0 4px 12px rgba(0,0,0,0.35); 
        border: 3px solid #ffffff;
        outline: 3px solid ${corBorda};
      ">
        <span>${iconeSimbolo}</span>
      </div>
      <div style="
        width: 0; 
        height: 0; 
        border-left: 7px solid transparent; 
        border-right: 7px solid transparent; 
        border-top: 9px solid ${corBg}; 
        margin-top: -2px;
      "></div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-div-marker',
    html: html,
    iconSize: [tamanho, tamanho + 8],
    iconAnchor: [tamanho / 2, tamanho + 8],
    popupAnchor: [0, -(tamanho + 4)],
  });
};

export default function RotasMapas() {
  const [cidadeSelecionada, setCidadeSelecionada] = useState(CIDADE_ATUAL.id);
  const [filtroTipo, setFiltroTipo] = useState('todos'); // 'todos', 'publico', 'cliente'
  const [busca, setBusca] = useState('');
  const [pontoAtivo, setPontoAtivo] = useState(null);
  const [menuCidadesAberto, setMenuCidadesAberto] = useState(false);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  // Filtragem dos pontos
  const pontosFiltrados = PONTOS_BARRA_DO_CORDA.filter((ponto) => {
    const matchTipo = filtroTipo === 'todos' || ponto.tipo === filtroTipo;
    const termo = busca.toLowerCase().trim();
    const matchBusca = 
      !termo ||
      ponto.nome.toLowerCase().includes(termo) ||
      ponto.categoria.toLowerCase().includes(termo) ||
      ponto.descricaoCurta.toLowerCase().includes(termo) ||
      (ponto.tags && ponto.tags.some(t => t.toLowerCase().includes(termo)));

    return matchTipo && matchBusca;
  });

  // Inicialização e configuração do Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Cria a instância do mapa focada estritamente em Barra do Corda
      const map = L.map(mapContainerRef.current, {
        center: CIDADE_ATUAL.coordenadasCentro,
        zoom: CIDADE_ATUAL.zoomPadrao,
        minZoom: CIDADE_ATUAL.zoomMinimo,
        maxZoom: CIDADE_ATUAL.zoomMaximo,
        maxBounds: CIDADE_ATUAL.limitesTerritorio, // Limita o mapa ao território de Barra do Corda
        maxBoundsViscosity: 1.0, // Impede o arrasto além dos limites
        zoomControl: false, // Reposicionaremos o zoom para não sobrepor botões mobile
      });

      // Adiciona camada de mapa OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Controle de Zoom posicionado no canto superior direito para ergonomia mobile
      L.control.zoom({ position: 'topright' }).addTo(map);

      mapInstanceRef.current = map;
    }

    // Invalida o tamanho após o primeiro render para evitar problemas visuais em telas menores
    const timer = setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 250);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Atualização dos Marcadores no Mapa com base no filtro e seleção
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Limpa marcadores anteriores
    Object.values(markersRef.current).forEach((marker) => {
      marker.remove();
    });
    markersRef.current = {};

    // Adiciona os novos marcadores filtrados
    pontosFiltrados.forEach((ponto) => {
      const isSelecionado = pontoAtivo?.id === ponto.id;
      const icone = criarIconeMarcador(ponto.tipo, ponto.categoria, isSelecionado);

      const marker = L.marker(ponto.coordenadas, { icon: icone }).addTo(map);

      // Conteúdo HTML do Popup customizado e responsivo
      const popupHtml = `
        <div style="min-width: 210px; max-width: 260px; font-family: system-ui, sans-serif;">
          <div style="position: relative; margin: -14px -14px 10px -14px; border-radius: 8px 8px 0 0; overflow: hidden; height: 110px;">
            <img 
              src="${ponto.imagem}" 
              alt="${ponto.nome}" 
              style="width: 100%; height: 100%; object-fit: cover;"
              onerror="this.src='https://placehold.co/400x250/e2e8f0/64748b?text=${encodeURIComponent(ponto.nome)}'"
            />
            <span style="
              position: absolute; 
              top: 8px; 
              left: 8px; 
              background: ${ponto.tipo === 'publico' ? '#059669' : '#ea580c'}; 
              color: white; 
              font-size: 10px; 
              font-weight: 700; 
              padding: 2px 7px; 
              border-radius: 9999px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            ">
              ${ponto.tipo === 'publico' ? '🌿 Destino Público' : '🏢 Cliente Parceiro'}
            </span>
          </div>

          <h3 style="margin: 0 0 4px 0; font-size: 15px; font-weight: 700; color: #0f172a; line-height: 1.2;">
            ${ponto.nome}
          </h3>

          <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; color: ${ponto.tipo === 'publico' ? '#059669' : '#ea580c'};">
            ${ponto.categoria}
          </p>

          <p style="margin: 0 0 8px 0; font-size: 11px; color: #64748b; display: flex; align-items: center; gap: 3px;">
            <span>📍 ${ponto.endereco}</span>
          </p>

          <p style="margin: 0 0 10px 0; font-size: 12px; color: #475569; line-height: 1.4;">
            ${ponto.descricaoCurta}
          </p>

          <div style="display: flex; gap: 6px;">
            <a 
              href="${ponto.mapsUrl}" 
              target="_blank" 
              rel="noopener noreferrer"
              style="
                display: flex; 
                align-items: center; 
                justify-content: center; 
                gap: 5px; 
                width: 100%; 
                background: #2563eb; 
                color: white; 
                text-decoration: none; 
                font-size: 12px; 
                font-weight: 600; 
                padding: 7px 10px; 
                border-radius: 6px;
                text-align: center;
              "
            >
              <span>🧭 Traçar Rota no Maps</span>
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        closeButton: true,
        className: 'custom-leaflet-popup',
        maxWidth: 280,
      });

      marker.on('click', () => {
        setPontoAtivo(ponto);
      });

      markersRef.current[ponto.id] = marker;
    });
  }, [pontosFiltrados, pontoAtivo]);

  // Função para voar até o ponto ao selecioná-lo
  const selecionarPonto = (ponto) => {
    setPontoAtivo(ponto);
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo(ponto.coordenadas, 15, {
        animate: true,
        duration: 0.9,
      });
      // Abre o popup do marcador
      const marker = markersRef.current[ponto.id];
      if (marker) {
        setTimeout(() => marker.openPopup(), 400);
      }
    }

    // No mobile, dá um scroll suave para o mapa
    if (window.innerWidth < 768 && mapContainerRef.current) {
      mapContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Recentralizar no território geral de Barra do Corda
  const recentralizarMapa = () => {
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo(CIDADE_ATUAL.coordenadasCentro, CIDADE_ATUAL.zoomPadrao, {
        animate: true,
        duration: 0.8,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-4 sm:py-8 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6">
        
        {/* ======================================================== */}
        {/* CABEÇALHO E SELETOR DE CIDADE (Preparado para expansão) */}
        {/* ======================================================== */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4 animate-spin-slow" />
              <span>Guia Geográfico & Rotas</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <MapIcon className="w-7 h-7 sm:w-8 h-8 text-blue-600 shrink-0" />
              Rotas e Destinos Interativos
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Explore o território de <strong className="text-slate-800">{CIDADE_ATUAL.titulo}</strong> com pontos públicos e estabelecimentos parceiros.
            </p>
          </div>

          {/* Dropdown de Cidade */}
          <div className="relative">
            <label className="text-xs font-medium text-slate-500 block mb-1">
              Cidade / Município Ativo:
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuCidadesAberto(!menuCidadesAberto)}
                className="w-full sm:w-64 flex items-center justify-between gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 transition-colors shadow-sm text-left"
              >
                <div className="flex items-center gap-2 truncate">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="truncate">Barra do Corda - MA</span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
              </button>

              {menuCidadesAberto && (
                <div className="absolute right-0 mt-1.5 w-full sm:w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30">
                  <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Selecione a Região
                  </div>
                  {CIDADES_DISPONIVEIS.map((cidade) => (
                    <button
                      key={cidade.id}
                      disabled={!cidade.ativa}
                      onClick={() => {
                        if (cidade.ativa) {
                          setCidadeSelecionada(cidade.id);
                          setMenuCidadesAberto(false);
                        }
                      }}
                      className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between transition-colors ${
                        cidade.ativa
                          ? 'text-blue-900 font-semibold hover:bg-blue-50 cursor-pointer'
                          : 'text-slate-400 cursor-not-allowed bg-slate-50/50'
                      }`}
                    >
                      <span>{cidade.nome}</span>
                      {cidade.ativa ? (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                          Disponível
                        </span>
                      ) : (
                        <span className="text-[10px] bg-slate-200 text-slate-600 font-medium px-2 py-0.5 rounded-full">
                          Em breve
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* BARRA DE FILTROS & BUSCA RÁPIDA (Otimizada para Mobile)  */}
        {/* ======================================================== */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            
            {/* Campo de Busca */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar por cachoeira, tambaqui, hotel, bisteca..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
              />
              {busca && (
                <button
                  onClick={() => setBusca('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-bold p-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Chips de Filtro por Categoria */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                type="button"
                onClick={() => setFiltroTipo('todos')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                  filtroTipo === 'todos'
                    ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-300'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>🌟 Todos</span>
                <span className="text-[11px] opacity-80 font-normal">({PONTOS_BARRA_DO_CORDA.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setFiltroTipo('publico')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                  filtroTipo === 'publico'
                    ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                <Trees className="w-3.5 h-3.5" />
                <span>Públicos</span>
                <span className="text-[11px] opacity-80 font-normal">
                  ({PONTOS_BARRA_DO_CORDA.filter(p => p.tipo === 'publico').length})
                </span>
              </button>

              <button
                type="button"
                onClick={() => setFiltroTipo('cliente')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                  filtroTipo === 'cliente'
                    ? 'bg-orange-600 text-white shadow-sm ring-2 ring-orange-300'
                    : 'bg-orange-50 text-orange-800 border border-orange-200 hover:bg-orange-100'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Clientes & Parceiros</span>
                <span className="text-[11px] opacity-80 font-normal">
                  ({PONTOS_BARRA_DO_CORDA.filter(p => p.tipo === 'cliente').length})
                </span>
              </button>
            </div>
          </div>

          {/* Legenda rápida e contagem */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100 gap-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                Destinos Públicos (Cachoeiras, Rios)
              </span>
              <span className="flex items-center gap-1.5 font-medium text-orange-700">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-600"></span>
                Clientes (Restaurantes, Hotéis)
              </span>
            </div>
            <div>
              Mostrando <strong className="text-slate-800">{pontosFiltrados.length}</strong> locais no território
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* CORPO PRINCIPAL: MAPA INTERATIVO + PAINEL DE PONTOS       */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* COLUNA DO MAPA (7 colunas no Desktop) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-3">
            <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[580px] bg-slate-200 rounded-2xl overflow-hidden shadow-md border-2 border-slate-300 z-10">
              
              {/* Container onde o Leaflet injeta a tela real do mapa */}
              <div ref={mapContainerRef} className="w-full h-full" />

              {/* Botão Flutuante: Recentralizar em Barra do Corda */}
              <button
                type="button"
                onClick={recentralizarMapa}
                title="Recentralizar em Barra do Corda"
                className="absolute bottom-4 right-4 z-[400] bg-white/95 hover:bg-white text-slate-700 hover:text-blue-600 px-3 py-2 rounded-xl shadow-lg border border-slate-200 text-xs font-bold flex items-center gap-1.5 backdrop-blur-sm transition-all active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
                <span>Centralizar Cidade</span>
              </button>

              {/* Badge de Território Confinado */}
              <div className="absolute top-3 left-3 z-[400] bg-slate-900/80 text-white backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-medium shadow-md flex items-center gap-1.5 pointer-events-none">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span>Território de Barra do Corda - MA</span>
              </div>
            </div>

            {/* Aviso informativo de limitação territorial */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                O mapa está limitado à extensão geográfica do município de Barra do Corda. Clique nos marcadores para ver informações e traçar rotas diretas no Google Maps.
              </span>
            </div>
          </div>

          {/* COLUNA DE LISTAGEM DE PONTOS (5 colunas no Desktop) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Lista de Pontos em Destaque
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                {pontosFiltrados.length} encontrados
              </span>
            </div>

            {/* Lista com scroll otimizado para desktop e mobile */}
            <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1 scrollbar-thin">
              {pontosFiltrados.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
                  <MapPin className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-700">Nenhum ponto encontrado</p>
                  <p className="text-xs text-slate-500 mt-1">Tente ajustar a busca ou o filtro de categoria.</p>
                  <button
                    onClick={() => { setBusca(''); setFiltroTipo('todos'); }}
                    className="mt-3 text-xs font-bold text-blue-600 hover:underline"
                  >
                    Limpar filtros
                  </button>
                </div>
              ) : (
                pontosFiltrados.map((ponto) => {
                  const isAtivo = pontoAtivo?.id === ponto.id;
                  const isPublico = ponto.tipo === 'publico';

                  return (
                    <div
                      key={ponto.id}
                      onClick={() => selecionarPonto(ponto)}
                      className={`group bg-white rounded-2xl p-3.5 border transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md ${
                        isAtivo 
                          ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50/20' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex gap-3">
                        {/* Thumbnail */}
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                          <img
                            src={ponto.imagem}
                            alt={ponto.nome}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = `https://placehold.co/200x200/e2e8f0/64748b?text=${encodeURIComponent(ponto.nome.slice(0, 10))}`;
                            }}
                          />
                          <span
                            className={`absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-extrabold text-white tracking-wide uppercase ${
                              isPublico ? 'bg-emerald-600' : 'bg-orange-600'
                            }`}
                          >
                            {isPublico ? 'Público' : 'Cliente'}
                          </span>
                        </div>

                        {/* Conteúdo */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-1">
                              <span className={`text-[11px] font-bold ${isPublico ? 'text-emerald-700' : 'text-orange-700'}`}>
                                {ponto.categoria}
                              </span>
                              {ponto.avaliacao && (
                                <span className="flex items-center gap-0.5 text-xs font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                  {ponto.avaliacao}
                                </span>
                              )}
                            </div>

                            <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                              {ponto.nome}
                            </h3>

                            <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                              {ponto.descricaoCurta}
                            </p>
                          </div>

                          {/* Tags e Ações Rápidas */}
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                            <span className="text-[11px] text-slate-500 font-medium truncate max-w-[150px] sm:max-w-[200px]" title={ponto.endereco}>
                              📍 {ponto.endereco.split(', Barra')[0]}
                            </span>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  selecionarPonto(ponto);
                                }}
                                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5 p-1"
                              >
                                Ver no mapa
                              </button>
                              <a
                                href={ponto.mapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                title="Abrir rota no Google Maps"
                                className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                              >
                                <Navigation className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
