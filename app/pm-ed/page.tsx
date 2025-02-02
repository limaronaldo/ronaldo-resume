'use client';

import { useEffect, useState } from 'react';

export default function ResumeAI() {
  const [mounted, setMounted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Informações de contato e cabeçalho
  const contactInfo = {
    name: 'Ronaldo Lima',
    role: 'Gerente de Produto - EdTech', 
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
          `Currículo de ${contactInfo.name} – Profissional com sólida experiência em gestão de produtos, metodologias ágeis e análise de dados, visando o desenvolvimento de soluções educacionais inovadoras.`
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

  // Resumo Profissional (focado em Product Management)
  const professionalSummary = `
Gerente de Produto com experiência sólida em Marketing Digital e E-commerce, capaz de equilibrar visão estratégica e execução tática. Especialista em metodologias ágeis (Scrum/Kanban), análise de dados e definição de KPIs para evoluir produtos, impulsionar engajamento e alcançar objetivos de negócio. Hábil em priorizar backlog, definir roadmap e colaborar com equipes multidisciplinares (desenvolvimento, UX/UI, marketing e vendas). Experiência em liderança de times, condução de pesquisas de usuário e tomada de decisão orientada por dados, garantindo entregas de valor e satisfação do cliente. Focado em criar as melhores experiências de aprendizado e contribuir para o crescimento sustentável das soluções educacionais.
`;

  // Experiência Profissional (adaptada para foco em Product Management)
  const professionalExperience = [
    {
      title: 'Gerente de Produto - EdTech',
      company: 'IBVI',
      period: 'Ago 2022 – Presente',
      location: 'São Paulo, Brasil',
      highlights: [
        'Defino e priorizo o roadmap do produto, alinhando metas de curto e longo prazo com a estratégia de negócio da empresa.',
        'Lidero cerimônias ágeis (planning, daily, review e retrospectiva), garantindo comunicação clara e colaborativa entre times de desenvolvimento, design e marketing.',
        'Desenvolvo pesquisas e testes de usabilidade para entender necessidades dos usuários e embasar a evolução contínua do produto.',
        'Analiso métricas de engajamento, NPS e conversão para orientar melhorias e novas funcionalidades, resultando em crescimento de 25% no uso semanal da plataforma.',
      ],
    },
    {
      title: 'Gerente de Marketing / Product Owner',
      company: 'MBRAS',
      period: 'Out 2021 – Presente',
      location: 'São Paulo, Brasil',
      highlights: [
        'Atuei como Product Owner para o canal de e-commerce, definindo backlog, priorizando demandas e garantindo entregas alinhadas com metas de receita.',
        'Implementei métricas de performance (CAC, LTV, ROAS) para tomada de decisão mais assertiva, aumentando em 35% a retenção de clientes.',
        'Coordenei a interação entre stakeholders (equipe global e local) para adaptar funcionalidades da plataforma ao mercado brasileiro.',
        'Conduzi sprints semanais, validando stories e assegurando que as melhorias atendessem aos requisitos funcionais e expectativas do usuário final.',
      ],
    },
    {
      title: 'Coordenador de Produto e Marketing – Foco em CRM',
      company: 'ConnectAD',
      period: 'Dez 2019 – Nov 2021',
      location: 'São Paulo, Brasil',
      highlights: [
        'Gerenciei a evolução de uma plataforma de CRM, definindo funcionalidades e prioridades baseado em feedback de usuários e análise de dados.',
        'Liderei uma equipe multidisciplinar para desenvolver réguas de relacionamento e automações, aumentando a taxa de recompra em 25%.',
        'Monitorei KPIs de engajamento (CTR, taxa de abertura, NPS) e alinhei melhorias contínuas com equipes de desenvolvimento e vendas.',
        'Facilitei a adoção de metodologias ágeis, participando ativamente de plannings e reviews para otimização de processos e entregas.',
      ],
    },
    {
      title: 'Coordenador de Marketing / Iniciação em Gestão de Produto',
      company: 'Viva Linda',
      period: '2016 – Dez 2019',
      location: 'Sete Lagoas, Brasil',
      highlights: [
        'Colaborei na concepção de um aplicativo de varejo de moda, mapeando jornada do usuário e definindo requisitos para funcionalidades-chave.',
        'Apoiei o time de desenvolvimento e design na implementação de melhorias, resultando em +20% de adesão ao canal mobile.',
        'Analisei métricas de funil (instalação, ativação, retenção) e apresentei planos de ação para otimizar a experiência do consumidor.',
        'Coordenei estratégias multicanal para fortalecer a marca e alinhá-la com o roadmap de lançamentos em e-commerce e mobile.',
      ],
    },
  ];

  // Competências e Habilidades (enfatizando Product Management, métodos ágeis e análise de dados)
  const skillsCompetencies = [
    'Gestão de Produtos e Definição de Roadmap',
    'Metodologias Ágeis (Scrum e Kanban)',
    'Pesquisa de Usuário e Testes de Usabilidade',
    'Análise de Dados (CAC, LTV, ROAS, NPS, Engajamento)',
    'Priorização e Gestão de Backlog',
    'Facilitação de Reuniões e Alinhamento de Stakeholders',
    'Experiência em EdTech, E-commerce e Marketing Digital',
    'Ferramentas de Gestão e Automação (Jira, Confluence, Salesforce, HubSpot)',
    'Colaboração com Equipes Multidisciplinares (Tech, UX/UI, Marketing, Vendas)',
    'Orientação a Resultados, Resolução de Problemas e Planejamento Estratégico',
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
    'SEO e Inbound Marketing (Diversas Certificações)',
    'SQL Avançado (LinkedIn Learning)',
    'Experiência com Jira, Git, CI/CD e Plataformas de IA',
    'Software de Marketing HubSpot e Salesforce CRM',
    'Certificado em Google Analytics',
    'Google Ads (Pesquisa e Display)',
  ];

  // Informações Adicionais
  const additionalInfo = `
• Paixão por criar soluções de educação inovadoras, gerando impacto positivo no processo de aprendizagem dos usuários.
• Vasta experiência na definição de métricas de sucesso do produto e no acompanhamento de KPIs para decisões data-driven.
• Forte habilidade de comunicação para alinhar expectativas com stakeholders e equipes multidisciplinares.
• Perfil orientado a resultados, sempre buscando otimização contínua e crescimento sustentável do produto.
• Flexibilidade e visão estratégica para adaptar metodologias e processos, mantendo a cultura de colaboração e melhoria contínua.
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
