'use client';

import { useEffect, useState } from 'react';

export default function ResumeAI() {
  const [mounted, setMounted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Informações de contato e cabeçalho
  const contactInfo = {
    name: 'Ronaldo Lima',
    role: 'Coordenador de Marketing',
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
          `Currículo de ${contactInfo.name} – Profissional de Marketing focado em estratégias integradas, gestão de campanhas multicanal e ampliação de visibilidade da marca.`
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

  // Resumo Profissional (focado em Marketing)
  const professionalSummary = `
Profissional de Marketing com sólida experiência em desenvolver e executar estratégias 360°, integrando ações online e offline para alavancar a visibilidade da marca e gerar resultados de negócios. Especialista em planejamento estratégico, gestão de campanhas multicanal, coordenação de influenciadores e maximização de rentabilidade e retenção. Capaz de gerenciar equipes e projetos simultaneamente, mantendo o foco em inovação, análise de indicadores (ROI, CAC, LTV, NPS) e alinhamento com stakeholders. Hábil na comunicação clara de ideias e resultados, buscando a integração entre vendas, produto e demais áreas da empresa para garantir entregas de impacto e alinhadas aos valores organizacionais.
`;

  // Experiência Profissional (focada em Marketing e Lançamento de Produtos)
  const professionalExperience = [
    {
      title: 'Coordenador de Marketing',
      company: 'IBVI',
      period: 'Ago 2022 – Presente',
      location: 'São Paulo, Brasil',
      highlights: [
        'Desenvolvo e implemento estratégias de marketing 360°, englobando campanhas digitais, offline e ativações presenciais para aumento de visibilidade da marca.',
        'Gerencio a interface com agências para briefing, validação de conceitos criativos e planejamento de mídia, garantindo consistência na comunicação.',
        'Coordeno ativações com influenciadores e embaixadores da marca, adaptando ações para diferentes públicos e segmentos.',
        'Monitoro métricas de rentabilização e implemento iniciativas de retenção, contribuindo para um aumento de 30% na satisfação de clientes (NPS).',
        'Colaboro com equipes internas (vendas, produto, comunicação) para garantir alinhamento estratégico em todas as frentes de marketing.',
      ],
    },
    {
      title: 'Gerente de Marketing / Product Owner',
      company: 'MBRAS',
      period: 'Out 2021 – Presente',
      location: 'São Paulo, Brasil',
      highlights: [
        'Planejei e implementei campanhas multicanal (digital, CRM e eventos) para lançamento de novos produtos, contribuindo para aumento de 35% na receita.',
        'Atuei na definição de backlog de e-commerce e coordenei sprints semanais, garantindo entregas alinhadas com metas de crescimento e retenção.',
        'Estabeleci KPIs de performance (CAC, LTV, ROAS) para aprimorar decisões de investimento e otimização de campanhas.',
        'Coordenei a integração com times globais e locais para adequação de funcionalidades ao mercado nacional, maximizando a eficiência de lançamentos.',
      ],
    },
    {
      title: 'Coordenador de Produto e Marketing – Foco em CRM',
      company: 'ConnectAD',
      period: 'Dez 2019 – Nov 2021',
      location: 'São Paulo, Brasil',
      highlights: [
        'Defini estratégias de CRM e marketing de relacionamento, gerando melhorias na retenção e engajamento de clientes (+25% na recompra).',
        'Organizei eventos e ativações para fortalecer a marca e aumentar a geração de leads, alinhando equipes de vendas e marketing.',
        'Acompanhei indicadores de rentabilidade (ROI) e otimização de campanhas, replanejando budget para maximizar resultados.',
        'Coordenei adoção de metodologias ágeis, alinhando backlog de melhorias e supervisão das entregas em conjunto com stakeholders.',
      ],
    },
    {
      title: 'Coordenador de Marketing',
      company: 'Viva Linda',
      period: '2016 – Dez 2019',
      location: 'Sete Lagoas, Brasil',
      highlights: [
        'Criei e gerenciei campanhas multicanal (offline, digital e eventos), resultando em crescimento de +20% na notoriedade da marca.',
        'Coordenei a implementação de estratégias de conteúdo (inbound marketing e SEO), elevando a taxa de conversão de leads em 15%.',
        'Atuei na gestão de parcerias com influenciadores locais, expandindo o alcance e reforçando o posicionamento da marca no mercado regional.',
        'Desenvolvi pesquisas de pós-venda e análises de funil para otimizar jornadas de comunicação e melhorar a experiência do consumidor.',
      ],
    },
  ];

  // Competências e Habilidades
  const skillsCompetencies = [
    'Planejamento e Execução de Campanhas 360°',
    'Interface com Agências e Gerenciamento de Briefings',
    'Gestão de Influenciadores e Embaixadores de Marca',
    'Rentabilização e Retenção (ROI, CAC, LTV, NPS)',
    'CRM e Automação de Marketing (HubSpot, Salesforce)',
    'Estratégias de Lançamento de Produtos e Pós-Venda',
    'Marketing de Conteúdo e SEO',
    'Gestão de Projetos e Equipes Multidisciplinares',
    'Excelente Comunicação e Alinhamento de Stakeholders',
    'Inovação e Flexibilidade em Metodologias de Trabalho',
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
    'Certificação em Metodologias Ágeis (Scrum, Kanban)',
    'Formação em SEO e Inbound Marketing',
    'SQL Avançado (LinkedIn Learning)',
    'Experiência com Jira, Git, CI/CD e Plataformas de IA',
    'Software de Marketing HubSpot e Salesforce CRM',
    'Certificado em Google Analytics',
    'Certificação em Google Ads (Pesquisa e Display)',
  ];

  // Informações Adicionais
  const additionalInfo = `
• Experiência sólida em planejamento estratégico, gestão de equipes e projetos simultâneos, garantindo entregas focadas em resultados.
• Visão analítica e criativa para otimizar campanhas, testando diferentes canais e formatos (offline, digital, eventos).
• Forte habilidade de comunicação e relacionamento, gerindo parcerias com influenciadores, agências e stakeholders internos.
• Familiaridade com tendências de mercado em inteligência artificial aplicada ao marketing, marketing de influência e trade marketing.
• Perfil orientado a resultados, buscando constantemente a inovação e a criação de valor para a marca e para o cliente.
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
            <p className="text-sm text-slate-600 font-light leading-relaxed whitespace-pre-line mb-2">
              {professionalSummary}
            </p>
          </section>

          {/* Experiência Profissional */}
          <section className="mb-1 pt-2">
            <h3 className="text-2xl font-light text-slate-900 mb-2 tracking-wide uppercase">
              Experiência Profissional
            </h3>
            {professionalExperience.map((exp, idx) => (
              <div key={idx} className="mb-4 pt-2">
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
          <section className="mb-2 pt-2">
            <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide uppercase">
              Competências e Habilidades
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-slate-600 font-light list-inside list-disc">
              {skillsCompetencies.map((skill, idx) => (
                <li key={idx} className="text-base leading-normal">
                  {skill}
                </li>
              ))}
            </ul>
          </section>

          {/* Educação */}
          <section className="mb-4 pt-2">
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
