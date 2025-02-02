'use client';

import { useEffect, useState } from 'react';

export default function ResumeAI() {
  const [mounted, setMounted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Informações de contato e cabeçalho
  const contactInfo = {
    name: 'Ronaldo Lima',
    role: 'Gerente de Marketing - CRM & Mídia',  // Changed "–" to "-"
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
          `Currículo de ${contactInfo.name} – um experiente profissional de Marketing, com foco em CRM, Mídia e estratégias multicanais para gerar crescimento e retenção no e-commerce.`
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

  // Resumo Profissional (atualizado para enfatizar CRM, Mídia e E-commerce)
  const professionalSummary = `
Gerente de Marketing com sólida experiência em CRM, Mídia e E-commerce, focado em criar estratégias integradas para todo o funil de marketing — desde brand awareness até retenção. Especialista em desenvolver réguas de relacionamento, aprovar planos de mídia 360º e liderar equipes de alta performance. Vasto conhecimento em análise de dados, pesquisas de mercado e otimização de campanhas, garantindo resultados tangíveis em aquisição e fidelização de clientes. Hábil em trabalhar de forma colaborativa com times locais e globais para adaptar comunicações e processos, assegurando que a experiência do consumidor brasileiro seja relevante, inovadora e escalável.
`;

  // Experiência Profissional (com ênfase em CRM, mídia, liderança de equipe, e-commerce)
  const professionalExperience = [
    {
      title: 'Gerente de Marketing – CRM & Mídia',
      company: 'IBVI',
      period: 'Ago 2022 – Presente',
      location: 'São Paulo, Brasil',
      highlights: [
        'Desenvolvo e aprovo planos de mídia, do estratégico ao tático, abrangendo canais digitais (Google Ads, Facebook, LinkedIn) e offline para maximizar awareness e conversão.',
        'Estruturei réguas de relacionamento para campanhas de retenção e remarketing, aumentando em 30% as vendas recorrentes em canais de e-commerce.',
        'Lidero uma equipe multifuncional de 8 pessoas (analistas de CRM, mídia e conteúdo), definindo metas claras e garantindo um ambiente de alta performance e colaboração.',
        'Coordeno relatórios de desempenho e apresentações para stakeholders internos e globais, orientando decisões de negócio baseadas em dados de ROI e CAC.',
      ],
    },
    {
      title: 'Gerente de Marketing',
      company: 'MBRAS',
      period: 'Out 2021 – Presente',
      location: 'São Paulo, Brasil',
      highlights: [
        'Planejei estratégias de mídia e coordenei réguas de CRM que resultaram em um aumento de 35% na retenção de clientes no canal online.',
        'Trabalhei ativamente com times globais para adaptar campanhas de produto ao mercado brasileiro, mantendo a consistência de marca e linguagem local.',
        'Estruturei relatórios analíticos para mapear todo o funil do cliente (awareness, consideração, conversão), otimizando investimentos com foco em retorno sobre gasto publicitário (ROAS).',
        'Implementei iniciativas para fomentar a inovação, buscando soluções de automação e análise avançada de dados para impulsionar o crescimento sustentado.',
      ],
    },
    {
      title: 'Coordenador de Marketing – Foco em CRM',
      company: 'ConnectAD',
      period: 'Dez 2019 – Nov 2021',
      location: 'São Paulo, Brasil',
      highlights: [
        'Gerenciei o desenvolvimento e implementação de estratégias de CRM, segmentando públicos em diferentes estágios de compra para aumentar engajamento e receita.',
        'Liderei a equipe de marketing na criação de comunicações personalizadas, promovendo campanhas de retenção que elevaram as taxas de recompra em 25%.',
        'Atuei em parceria com áreas de produto, vendas e análise para estruturar réguas de relacionamento e comunicações omnichannel (e-mail, SMS e push notifications).',
        'Foquei em dados para embasar decisões, definindo KPIs como LTV (Lifetime Value) e CAC (Custo de Aquisição de Cliente), e apresentando resultados para a diretoria.',
      ],
    },
    {
      title: 'Coordenador de Marketing',
      company: 'Viva Linda',
      period: '2016 – Dez 2019',
      location: 'Sete Lagoas, Brasil',
      highlights: [
        'Desenvolvi campanhas de marketing multicanal com foco em varejo de moda e lifestyle, elevando a participação do e-commerce em 20%.',
        'Trabalhei junto às equipes de vendas para garantir que as comunicações refletissem a proposta de valor do produto, contribuindo para o aumento das vendas online.',
        'Monitorei e analisei métricas de performance (CTR, CPA, ROI) para otimizar os investimentos em mídia e garantir alinhamento com metas de receita.',
        'Gerenciei equipe e parceiros externos, assegurando cronogramas e metas para lançamentos de coleção e campanhas sazonais de moda.',
      ],
    },
  ];

  // Competências e Habilidades (enfatizando CRM, Mídia, Liderança)
  const skillsCompetencies = [
    'Desenvolvimento de Estratégias de CRM e Mídia (Online e Offline)',
    'Gestão e Liderança de Equipes (desenvolvimento, produtividade e performance)',
    'Estratégias de E-commerce, Varejo de Moda e Lifestyle',
    'Análise de Dados Avançada (CAC, LTV, ROAS, CTR, CPA)',
    'Pesquisa de Mercado e Análise Competitiva',
    'Gestão de Orçamentos e Planejamento de Mídia 360º',
    'Ferramentas de Marketing Automation (HubSpot, Salesforce, RD Station)',
    'Inovação e Busca de Soluções Tecnológicas para Otimização de Processos',
    'Fluente em Inglês e Proficiência em Espanhol',
    'Foco em Resultados e Otimização Contínua das Campanhas',
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
    { language: 'Inglês', level: 'Avançado (Experiência Internacional)' },
    { language: 'Espanhol', level: 'Proficiência Profissional' },
  ];

  // Ferramentas e Certificações
  const toolsCertifications = [
    'Professional Scrum Master I (Scrum.org)',
    'Certificação em Pesquisa do Google Ads',
    'SEO e Inbound Marketing (Diversas Certificações)',
    'SQL Avançado (LinkedIn Learning)',
    'Experiência com Jira, Git, CI/CD e Plataformas de IA',
    'Software de Marketing HubSpot e Salesforce CRM',
    'Certificado em Google Analytics',
    'Certificações em RD Station e Gestão de E-commerce',
  ];

  // Informações Adicionais (enfatizando interesse em moda, lifestyle, inovação, etc.)
  const additionalInfo = `
• Interesse genuíno no segmento de moda e lifestyle, com foco no e-commerce como principal canal de vendas.
• Vasta experiência em planejar, implementar e otimizar réguas de relacionamento que impactam diretamente o funil de vendas.
• Perfil analítico e orientado a dados para embasar tomadas de decisão e sugerir melhorias contínuas em produtos e campanhas.
• Paixão por liderar equipes, promovendo inovação e colaboração entre diferentes áreas e equipes globais.
• Flexibilidade e visão estratégica para adequar mensagens e abordagens ao público brasileiro, garantindo relevância e competitividade.
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
