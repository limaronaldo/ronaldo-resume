'use client';

import { useEffect, useState } from 'react';

export default function ResumeAI() {
  const [mounted, setMounted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Informações de contato e cabeçalho
  const contactInfo = {
    name: 'Ronaldo Lima',
    role: 'Product Marketing Manager',
    email: 'ronaldomlima@gmail.com',
    phone: '+55 11 93459-2736',
    location: 'Alto de Pinheiros, São Paulo, SP',
  };

  // Lida com efeitos colaterais
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.title = contactInfo.role;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute(
          'content',
          `Currículo de ${contactInfo.name} – um experiente Gerente de Marketing de Produto especializado em traduzir soluções financeiras complexas em mensagens claras e orientadas por dados para o sucesso no mercado.`
        );
      }
    }
  }, [mounted, contactInfo.role, contactInfo.name]);

  // Manipulador de Download de PDF
  const downloadPDF = async () => {
    try {
      setIsGenerating(true);
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: `${window.location.origin}${window.location.pathname}`,
          jobTitle: contactInfo.role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao gerar PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;

      // Cria as iniciais a partir do cargo
      const initials = contactInfo.role
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase();

      a.download = `RonaldoLima-${initials}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!mounted) return null;

  // Resumo Profissional
  const professionalSummary = `
Gerente de Marketing de Produto dinâmico com mais de 10 anos de experiência elaborando narrativas envolventes e executando estratégias de entrada no mercado em ambientes orientados pela tecnologia. Especializado em conectar o desenvolvimento de produtos às necessidades do mercado, atuo com marketing de performance e análise de dados para impulsionar a aquisição de usuários e o crescimento da receita. Hábil em aprimorar o posicionamento do produto em mercados competitivos e em colaborar com equipes de produto, vendas e análise para otimizar campanhas e aumentar a adoção no mercado.
`;

  // Experiência Profissional
  const professionalExperience = [
    {
      title: 'Gerente de Marketing de Produto',
      company: 'IBVI',
      period: 'Ago 2022 – Presente',
      location: 'São Paulo, Brasil',
      highlights: [
        'Lidero estratégias de entrada no mercado para soluções de crédito inovadoras, alinhando o posicionamento do produto às tendências de mercado em evolução.',
        'Otimizo campanhas de marketing de performance no Google Ads, LinkedIn Ads e Facebook Ads — aumentando a aquisição de usuários em 25%.',
        'Colaboro com as equipes de produto, vendas e análise para refinar mensagens-chave e ajustar táticas de campanha com base em dados de desempenho.',
        'Utilizo insights detalhados de métricas (CPC, CPA, CTR, ROI) para melhorar continuamente os resultados das campanhas e atingir metas de receita.',
      ],
    },
    {
      title: 'Gerente de Marketing',
      company: 'MBRAS',
      period: 'Out 2021 – Presente',
      location: 'São Paulo, Brasil',
      highlights: [
        'Desenvolvi estratégias de marketing integradas que enfatizavam o posicionamento competitivo do produto e propostas de valor claras.',
        'Utilizei análises avançadas e segmentação de mercado para otimizar campanhas digitais, resultando em um aumento de 40% nas taxas de conversão.',
        'Coordenei manuais de lançamento de produto entre equipes multifuncionais, garantindo mensagens coesas do planejamento à execução.',
        'Aprimorei o engajamento multicanal por meio de mensagens direcionadas e ajustes focados no desempenho.',
      ],
    },
    {
      title: 'Coordenador de Marketing',
      company: 'ConnectAD',
      period: 'Dez 2019 – Nov 2021',
      location: 'São Paulo, Brasil',
      highlights: [
        'Apoiei a criação de campanhas orientadas por dados que destacaram os benefícios do produto e a diferenciação no mercado.',
        'Trabalhei em estreita colaboração com as equipes de produto para integrar o feedback dos clientes nas estratégias de marketing, refinando as mensagens das campanhas.',
        'Implementei iniciativas digitais direcionadas utilizando segmentação avançada para aumentar a geração de leads e conversões.',
        'Projetos-chave: • Bebêmax – otimizei as mensagens do produto em canais digitais. • Ziro – melhorei o desempenho das campanhas por meio de segmentação precisa do público.',
      ],
    },
    {
      title: 'Coordenador de Marketing',
      company: 'Viva Linda',
      period: '2016 – Dez 2019',
      location: 'Sete Lagoas, Brasil',
      highlights: [
        'Gerenciei campanhas de marketing abrangentes focadas em aumentar o reconhecimento do produto e impulsionar a aquisição de usuários.',
        'Colaborei com as equipes de vendas para garantir que as comunicações de marketing transmitissem claramente os benefícios do produto.',
        'Supervisionei esforços de publicidade multicanal que aumentaram o alcance de mercado e o engajamento em 20%.',
      ],
    },
  ];

  // Competências e Habilidades
  const skillsCompetencies = [
    'Estratégia de Marketing de Produto e Execução de Entrada no Mercado',
    'Otimização de Marketing de Performance (Google Ads, Facebook Ads, LinkedIn Ads)',
    'Análise de Dados e Medição de Desempenho (CPC, CPA, CTR, ROI)',
    'Colaboração Multifuncional (Produto, Vendas e Análise)',
    'Pesquisa de Mercado e Análise Competitiva',
    'Mensagens Estratégicas e Posicionamento de Produto',
    'CRM e Automação de Marketing (HubSpot, Salesforce)',
    'Planejamento Orçamentário e Otimização do ROI',
    'Fluente em Inglês, Proficiência em Espanhol',
    'Conhecimento em Fintech e Mercados de Crédito',
  ];

  // Educação
  const education = [
    {
      degree: 'MBA em Marketing',
      school: 'Fundação Armando Alvares Penteado (FAAP)',
      period: '2024 – 2025',
    },
    {
      degree: 'Bacharelado em Administração de Empresas',
      school: 'Ibmec',
      period: '2004 – 2008',
    },
  ];

  // Idiomas
  const languages = [
    { language: 'Português', level: 'Nativo' },
    { language: 'Inglês', level: 'Fluente (Estudo e Experiência Internacional)' },
    { language: 'Espanhol', level: 'Proficiência Profissional' },
  ];

  // Ferramentas e Certificações
  const toolsCertifications = [
    'Professional Scrum Master I (Scrum.org)',
    'Certificação em Pesquisa do Google Ads',
    'SEO e Inbound Marketing (Diversas Certificações)',
    'SQL Avançado (LinkedIn Learning)',
    'Experiência com Jira, Git, CI/CD e Plataformas de IA',
    'Software de Marketing HubSpot',
    'Certificado em Google Analytics',
  ];

  // Informações Adicionais
  const additionalInfo = `
• Especialista em desenvolver narrativas de produto que transformam soluções financeiras complexas em benefícios claros para o mercado.
• Experiência comprovada em impulsionar a adoção de produtos e o crescimento da receita por meio de estratégias de marketing de performance orientadas por dados.
• Hábil em sintetizar insights de mercado e feedback dos clientes para ajustar o posicionamento do produto e iniciativas de entrada no mercado.
• Apaixonado por colaborar com equipes multifuncionais para entregar campanhas integradas que apoiam os objetivos de negócios.
`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Botão para Download de PDF */}
        <div className="flex justify-end mb-4">
          <button
            onClick={downloadPDF}
            disabled={isGenerating}
            className={`px-6 py-2 rounded-lg bg-slate-900 text-white transition-colors ${
              isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-800'
            }`}
          >
            {isGenerating ? 'Gerando PDF...' : 'Baixar PDF'}
          </button>
        </div>

        {/* Cartão Principal do Currículo */}
        <div className="bg-white shadow-xl rounded-xl p-8 md:p-12">
          {/* Cabeçalho */}
          <header className="text-center mb-0">
            <h1 className="text-4xl font-light text-slate-900 mb-2">
              {contactInfo.name}
            </h1>
            <h2 className="text-2xl text-slate-600 font-light mb-6">
              {contactInfo.role}
            </h2>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-slate-500 font-light mb-4">
              <a
                href={`mailto:${contactInfo.email}`}
                className="hover:text-slate-700 transition-colors"
              >
                {contactInfo.email}
              </a>
              <a
                href={`https://wa.me/${contactInfo.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-700 transition-colors"
              >
                {contactInfo.phone}
              </a>
              <span>{contactInfo.location}</span>
            </div>
          </header>

          {/* Resumo Profissional */}
          <section className="mb-2">
            <h3 className="text-2xl font-light text-slate-900 tracking-wide uppercase mt-2">
              Resumo Profissional
            </h3>
            <p className="text-md text-slate-600 font-light leading-relaxed whitespace-pre-line mb-2">
              {professionalSummary}
            </p>
          </section>

          {/* Experiência Profissional */}
          <section className="mb-1 pt-2">
            <h3 className="text-2xl font-light text-slate-900 mb-2 tracking-wide uppercase">
              Experiência Profissional
            </h3>
            {professionalExperience.map((exp, idx) => (
              <div key={idx} className="mb-6 pt-2">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-xl text-slate-800 font-normal">
                    {exp.title} – {exp.company}
                  </h4>
                  <p className="text-sm text-slate-500 font-light whitespace-nowrap ml-2">
                    {exp.period}
                  </p>
                </div>
                <p className="text-sm text-slate-500 font-light mb-2">
                  {exp.location}
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-600 font-light">
                  {exp.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="text-base leading-relaxed">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Competências e Habilidades */}
          <section className="mb-12 pt-4">
            <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide uppercase">
              Competências e Habilidades
            </h3>
            <ul className="grid grid-cols-2 gap-4 text-slate-600 font-light list-inside list-disc">
              {skillsCompetencies.map((skill, idx) => (
                <li key={idx} className="text-base leading-relaxed">
                  {skill}
                </li>
              ))}
            </ul>
          </section>

          {/* Educação */}
          <section className="mb-4 pt-12">
            <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide uppercase">
              Educação
            </h3>
            {education.map((edu, idx) => (
              <div key={idx} className="mb-2">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-xl text-slate-800 font-normal">
                    {edu.degree}
                  </h4>
                  <p className="text-sm text-slate-500 font-light whitespace-nowrap ml-4">
                    {edu.period}
                  </p>
                </div>
                <p className="text-base text-slate-600 font-light">
                  {edu.school}
                </p>
              </div>
            ))}
          </section>

          {/* Idiomas */}
          <section className="mb-6">
            <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide uppercase">
              Idiomas
            </h3>
            <ul className="space-y-2 text-slate-600 font-light">
              {languages.map((lang, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="text-slate-800 font-light text-lg">
                    {lang.language}
                  </span>
                  <span className="text-slate-300 mx-3">•</span>
                  <span className="text-base text-slate-600 font-light">
                    {lang.level}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Ferramentas e Certificações */}
          <section className="mb-6">
            <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide uppercase">
              Ferramentas e Certificações
            </h3>
            <ul className="list-disc list-inside space-y-2 text-slate-600 font-light">
              {toolsCertifications.map((cert, idx) => (
                <li key={idx} className="text-base leading-relaxed">
                  {cert}
                </li>
              ))}
            </ul>
          </section>

          {/* Informações Adicionais */}
          <section className="border-t border-slate-200 pt-2">
            <h3 className="text-2xl font-light text-slate-900 mb-2">
              Informações Adicionais
            </h3>
            <p className="text-md text-slate-600 font-light leading-relaxed whitespace-pre-line">
              {additionalInfo}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}