"use client"
import { useEffect, useState } from 'react';

export default function ResumeAI() {
  const [mounted, setMounted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Informações de contato e cabeçalho
  const contactInfo = {
    name: 'Ronaldo Lima',
    role: 'Product Manager',
    email: 'ronaldomlima@gmail.com',
    phone: '+55 11 93459-2736',
    location: 'São Paulo, SP - Brasil',
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
          `Currículo de ${contactInfo.name} – Profissional de Produto com experiência em e-commerce, logística e integração de equipes de desenvolvimento.`
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
Product Manager com mais de 10 anos de experiência na convergência entre negócios, tecnologia e experiência do usuário. Durante minha trajetória, atuei no planejamento de soluções end-to-end em diversos setores, incluindo e-commerce, fintech e vendas B2B. Sou apaixonado por identificar oportunidades de melhoria em sistemas logísticos e criar roadmaps que equilibrem necessidades dos usuários, metas de negócio e requisitos regulatórios. Tenho forte habilidade de colaboração em equipes multidisciplinares, conduzindo descobertas (Discovery) e entregas (Delivery) de produtos de forma ágil. Busco constantemente otimizar processos para gerar impacto real na vida de milhões de usuários.
`;

  // Experiência Profissional
  const professionalExperience = [
    {
      title: 'Product Manager',
      company: 'IBVI',
      period: 'Ago 2022 – Presente',
      location: 'São Paulo, Brasil',
      highlights: [
        'Gerencio backlog e roadmaps para plataformas de crédito e pagamento, alinhando requisitos de negócio às necessidades de usuários e parceiros.',
        'Lidero iniciativas de discovery para novas funcionalidades, coordenando entrevistas com stakeholders e análises de dados para priorizar o desenvolvimento.',
        'Colaboro com equipes de engenharia, design e marketing para garantir entregas de alta qualidade e cumprir metas de tempo e orçamento.',
        'Implementei métricas de produto (OKRs e KPIs) para mensurar adesão e satisfação do usuário, resultando em um aumento de 20% na adoção de novas features.',
      ],
    },
    {
      title: 'Gerente de Marketing',
      company: 'MBRAS',
      period: 'Out 2021 – Presente',
      location: 'São Paulo, Brasil',
      highlights: [
        'Desenvolvi estratégias multicanais para produtos financeiros e soluções de pagamento, incluindo criação de user stories e interface com equipes de desenvolvimento.',
        'Atuei em projetos de integração de sistemas de logística (vendas e fulfillment), contribuindo para reduzir tempo de entrega e melhorar a experiência dos vendedores.',
        'Negociei prioridades e roadmap com stakeholders internos, equilibrando metas de venda, viabilidade técnica e feedback de usuários para otimizar processos.',
        'Utilizei abordagem ágil para gerenciar sprints, definindo critérios de aceite e garantindo transparência sobre o progresso das iniciativas para toda a organização.',
      ],
    },
    {
      title: 'Coordenador de Marketing',
      company: 'ConnectAD',
      period: 'Dez 2019 – Nov 2021',
      location: 'São Paulo, Brasil',
      highlights: [
        'Coordenei squads de desenvolvimento focadas em melhorias de usabilidade, incrementando a satisfação dos clientes em 15%, segundo pesquisas de NPS.',
        'Defini KPIs de performance (CPC, ROI, engajamento) para embasar decisões de priorização de backlog e alinhamento com objetivos estratégicos de produto.',
        'Trabalhei em conjunto com equipes de vendas e atendimento para mapear requisitos regulatórios em projetos complexos de automação, garantindo compliance e eficácia de novas features.',
        'Conduzi análises de dados e testes A/B para iterar em funcionalidades-chave, reduzindo custos de aquisição e aumentando retenção de usuários finais.',
      ],
    },
    {
      title: 'Coordenador de Marketing',
      company: 'Viva Linda',
      period: '2016 – Dez 2019',
      location: 'Sete Lagoas, Brasil',
      highlights: [
        'Gerenciei iniciativas de melhoria no fluxo de cadastro e suporte a vendedores, contribuindo para maior adesão à plataforma e satisfação dos parceiros.',
        'Lancei campanhas de ativação com foco na expansão de portfólio de produtos, trabalhando de forma integrada com times de UX e engenharia.',
        'Participei ativamente de projetos de expansão regional da empresa, adaptando processos e garantindo que a experiência do vendedor se mantivesse consistente.',
      ],
    },
  ];

  // Competências e Habilidades
  const skillsCompetencies = [
    'Gestão de Produto (roadmaps, backlog, definição de OKRs)',
    'Pesquisa e Discovery (entrevistas, testes de usabilidade, MVP)',
    'Orquestração de Equipes Multidisciplinares (Engenharia, UX, Negócios)',
    'Experiência em E-commerce, Fulfillment, Logística e Marketplace',
    'Priorização de Requisitos e Gestão de Stakeholders',
    'Metodologias Ágeis (Scrum, Kanban) e PM Tools (Jira, Confluence)',
    'Análise de Dados e Métricas de Produto (NPS, CTR, ROI)',
    'Compreensão de Requisitos Regulatórios e Compliance',
    'Inglês Avançado (negociação e alinhamento internacional)',
    'Foco em Experiência do Usuário e Crescimento Sustentável',
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
    { language: 'Inglês', level: 'Avançado' },
    { language: 'Espanhol', level: 'Proficiência Profissional' },
  ];

  // Ferramentas e Certificações
  const toolsCertifications = [
    'Professional Scrum Master I (Scrum.org)',
    'Certificação em Google Analytics / Ads',
    'Especialização em Product Management (cursos diversos)',
    'SQL Avançado (LinkedIn Learning)',
    'Experiência com CRM (HubSpot, Salesforce)',
    'Design Thinking e User Research (workshops internos)',
  ];

  // Informações Adicionais
  const additionalInfo = `
• Sou movido por desafios complexos que envolvem logística, marketplace e escalabilidade, buscando soluções criativas que unam resultados e satisfação do cliente.
• Tenho experiência internacional em projetos com equipes remotas, o que me permite colaborar e alinhar visões em ambientes multiculturais.
• Acredito na importância de interações contínuas com usuários e stakeholders para refinar a visão de produto e entregas incrementais de valor.
• Estou em constante atualização sobre tendências de comércio eletrônico e operações de fulfillment para identificar oportunidades de melhoria e inovação.
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
