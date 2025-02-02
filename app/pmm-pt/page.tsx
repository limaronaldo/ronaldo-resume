'use client';

import { useEffect, useState } from 'react';

// Centralize all resume data for clarity
const contactInfo = {
  name: 'Ronaldo Lima',
  role: 'Gerente de Inovação e Produtos (IA)',
  email: 'ronaldomlima@gmail.com',
  phone: '+55 11 93459-2736',
  location: 'Alto de Pinheiros, São Paulo, SP',
};

const professionalSummary = `
Gerente de Inovação e Produtos com mais de 10 anos de experiência em marketing e desenvolvimento de soluções tecnológicas, incluindo IA Generativa. Destaco-me por transitar entre áreas técnicas e de negócio, alinhando requisitos complexos a objetivos de mercado. Sou especializado em traduzir necessidades organizacionais em estratégias de produto eficazes, conduzindo experimentações e provas de conceito para validar hipóteses. Tenho forte habilidade em liderar times multidisciplinares na concepção, execução e lançamento de produtos baseados em Inteligência Artificial, sempre de olho em métricas-chave de sucesso. Com sólida formação em marketing e gestão, atuo no posicionamento estratégico de soluções inovadoras, garantindo máxima entrega de valor ao cliente e ao negócio.
`;

const professionalExperience = [
  {
    title: 'Gerente de Marketing de Produto',
    company: 'IBVI',
    period: 'Ago 2022 – Presente',
    location: 'São Paulo, Brasil',
    highlights: [
      'Lidero estratégias de entrada no mercado para soluções de crédito inovadoras, incluindo projetos com modelos de IA para análise de risco e segmentação de clientes.',
      'Desenvolvo provas de conceito envolvendo IA Generativa para melhorar a comunicação e a abordagem de captação de usuários, resultando em protótipos ágeis e insights valiosos para o roadmap de produto.',
      'Atuo em conjunto com equipes de dados, produto e vendas para refinar produtos e campanhas com base em métricas de performance (CPC, CPA, CTR, ROI) e feedback do cliente.',
      'Crio hipóteses e conduzo experimentos em ambientes de teste controlados, validando a viabilidade de novas funcionalidades baseadas em Inteligência Artificial.',
    ],
  },
  {
    title: 'Gerente de Marketing',
    company: 'MBRAS',
    period: 'Out 2021 – Presente',
    location: 'São Paulo, Brasil',
    highlights: [
      'Liderei a iniciativa de incorporar tecnologias de Machine Learning em produtos existentes, otimizando a segmentação de clientes e aumentando as taxas de conversão em 40%.',
      'Conduzi alinhamentos entre equipes de dados e áreas de negócio para refinar modelos de classificação, priorizando recursos que gerassem maior impacto no roadmap de inovação.',
      'Utilizei análises avançadas e segmentação de mercado para otimizar campanhas digitais e validar necessidades de clientes, garantindo aderência às estratégias de Inovação.',
      'Coordenei manuais de lançamento de produto envolvendo funcionalidades de IA, integrando feedback de usuários para aprimorar a experiência e guiar o desenvolvimento contínuo.',
    ],
  },
  {
    title: 'Coordenador de Marketing',
    company: 'ConnectAD',
    period: 'Dez 2019 – Nov 2021',
    location: 'São Paulo, Brasil',
    highlights: [
      'Apoiei a criação de campanhas orientadas por dados e algoritmos de recomendação, destacando diferenciais de produto em um mercado competitivo.',
      'Trabalhei em estreita colaboração com cientistas de dados e equipes de desenvolvimento para integrar feedback de clientes na evolução de modelos de análise de comportamento.',
      'Implementei iniciativas digitais direcionadas utilizando segmentação avançada e testes A/B, aumentando a geração de leads qualificados e a eficácia das campanhas.',
      'Projetos-chave: • Bebêmax – integrei análise preditiva para identificar padrões de consumo e otimizar a oferta de produtos. • Ziro – utilizei segmentação precisa do público para melhorar o desempenho das campanhas e validar hipóteses de adoção de novas funcionalidades de IA.',
    ],
  },
  {
    title: 'Coordenador de Marketing',
    company: 'Viva Linda',
    period: '2016 – Dez 2019',
    location: 'Sete Lagoas, Brasil',
    highlights: [
      'Gerenciei campanhas de marketing abrangentes focadas em aumentar o reconhecimento do produto e impulsionar a aquisição de usuários em diversos canais digitais.',
      'Colaborei com as equipes de vendas e produto para garantir que as comunicações destacassem claramente benefícios e possibilidades de inovação.',
      'Supervisionei esforços de publicidade multicanal que aumentaram o alcance de mercado em 20%, gerando insights para possíveis aplicações de algoritmos de recomendação.',
    ],
  },
];

const skillsCompetencies = [
  'Gestão de Produtos de IA (Machine Learning e IA Generativa)',
  'Estratégia de Marketing de Produto e Inovação',
  'Pesquisa de Mercado, Validação de Hipóteses e Roadmap de Produto',
  'Otimização de Marketing de Performance (Google Ads, Facebook Ads, LinkedIn Ads)',
  'Colaboração Multifuncional (Engenheiros de Dados, Cientistas de Dados, Vendas)',
  'Definição de Métricas e Medição de Desempenho (CPC, CPA, CTR, ROI)',
  'Prototipagem e Experimentação em Ambientes de Teste',
  'Metodologias Ágeis (Scrum, Kanban) e Gestão de Projetos',
  'Fluente em Inglês, Proficiência em Espanhol',
  'Conhecimento em Fintech, Crédito e Mercado de Soluções de IA',
];

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

const languages = [
  { language: 'Português', level: 'Nativo' },
  { language: 'Inglês', level: 'Fluente (Estudo e Experiência Internacional)' },
  { language: 'Espanhol', level: 'Proficiência Profissional' },
];

const toolsCertifications = [
  'Professional Scrum Master I (Scrum.org)',
  'Certificação em Pesquisa do Google Ads',
  'SEO e Inbound Marketing (Diversas Certificações)',
  'SQL Avançado (LinkedIn Learning)',
  'Experiência com plataformas e APIs de IA (OpenAI, Azure Cognitive, Vertex AI)',
  'Software de Marketing HubSpot',
  'Certificado em Google Analytics',
  'Familiaridade com Python e bibliotecas de Machine Learning',
];

const additionalInfo = `
• Experiência comprovada em liderar o desenvolvimento de produtos de Inteligência Artificial, desde a concepção até o lançamento.
• Capacidade de transitar entre áreas técnicas e de negócio, alinhando objetivos de mercado a requisitos de dados e engenharia de software.
• Forte habilidade para formular hipóteses, conduzir provas de conceito e usar métricas adequadas para avaliar a viabilidade de produtos de IA.
• Entusiasta de tendências tecnológicas, sempre buscando soluções inovadoras que agreguem valor ao negócio.
• Apaixonado por metodologias ágeis, colaboração multifuncional e criação de experiências que encantem clientes e usuários finais.
`;

export default function ResumeAI() {
  const [mounted, setMounted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Update document title and meta description
    document.title = contactInfo.role;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        `Currículo de ${contactInfo.name} – especialista em Inovação, AI e estratégias de Produto, com experiência em conduzir soluções de Inteligência Artificial do conceito ao lançamento.`
      );
    }
  }, []);

  const handleDownloadPDF = async () => {
    try {
      setIsGenerating(true);
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      const link = document.createElement('a');
      link.href = url;

      // Cria as iniciais a partir do cargo
      const initials = contactInfo.role
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase();

      link.download = `RonaldoLima-${initials}.pdf`;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Botão para Download de PDF */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleDownloadPDF}
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
