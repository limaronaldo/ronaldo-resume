'use client';

import { useEffect, useState } from 'react';

// Centralize all resume data for clarity
const contactInfo = {
  name: 'Ronaldo Lima',
  // Updated role to highlight e-commerce, consumer goods, and innovation.
  role: 'Gerente de Marketing e Inovação (E-commerce & Bens de Consumo)',
  email: 'ronaldomlima@gmail.com',
  phone: '+55 11 93459-2736',
  location: 'Alto de Pinheiros, São Paulo, SP',
};

// Updated professional summary to emphasize e-commerce, consumer goods, data solutions, and startup mindset.
const professionalSummary = `
Profissional versátil em Marketing e Inovação, com foco em estratégias de crescimento para bens de consumo e e-commerce. Especialista em soluções de gestão de dados, atua de forma estratégica e operacional na geração de demanda, posicionamento de marca e expansão de receita. Sólida experiência em liderar projetos que integram governança de dados, alocação de mídia e validação de produto, especialmente em ambientes de startup. Perfil hands-on, capaz de transitar entre estratégia e execução, fortalecendo a cultura colaborativa e impulsionando resultados de ARR em mercados locais e internacionais.`;

// Revised experiences to incorporate e-commerce, consumer goods, and data management angles
const professionalExperience = [
  {
    title: 'Gerente de Marketing de Produto',
    company: 'IBVI',
    period: 'Ago 2022 – Presente',
    location: 'São Paulo, Brasil',
    highlights: [
      'Estruturei estratégias de entrada no mercado para soluções de crédito e dados, aplicando tecnologias de IA para segmentação de clientes em e-commerce e bens de consumo.',
      'Implementei testes de viabilidade para expansão internacional, validando potenciais adaptações de produto e garantindo coesão na comunicação de valor.',
      'Coordenei equipes multidisciplinares em um ambiente de cultura horizontal, priorizando inovação e promovendo colaboração entre marketing, dados e vendas.',
      'Lancei campanhas de geração de demanda focadas em redes sociais e eventos setoriais, aumentando a visibilidade da empresa em 30% e contribuindo para o crescimento de ARR.',
    ],
  },
  {
    title: 'Gerente de Marketing',
    company: 'MBRAS',
    period: 'Out 2021 – Presente',
    location: 'São Paulo, Brasil',
    highlights: [
      'Desenvolvi estratégias para bens de consumo e canal e-commerce, integrando análise de dados avançada para personalizar ofertas e otimizar ROAS (Return on Ad Spend).',
      'Conduzi o redesenho do site e materiais de venda, reforçando a clareza na proposta de valor e alinhando o discurso de marketing à linguagem do mercado-alvo.',
      'Trabalhei junto a áreas de produto e TI para validar novas funcionalidades de governança de dados, tornando o roadmap mais competitivo e escalável.',
      'Gerenciei parcerias e campanhas de mídia paga, garantindo alocação eficiente de orçamento e mensuração contínua de resultados, com ênfase em performance (CPC, CPA e CTR).',
    ],
  },
  {
    title: 'Coordenador de Marketing',
    company: 'ConnectAD',
    period: 'Dez 2019 – Nov 2021',
    location: 'São Paulo, Brasil',
    highlights: [
      'Atuei em campanhas B2B e B2C para bens de consumo, utilizando algoritmos de recomendação para aumentar a conversão em plataformas de e-commerce.',
      'Criei processos de coleta e governança de dados de clientes, possibilitando segmentações avançadas e melhorando a eficiência de mídia em 25%.',
      'Promovi cultura data-driven em uma equipe jovem e horizontal, definindo metas claras e fomentando autonomia na condução de projetos estratégicos.',
      'Projetos-chave: • Bebêmax – desenvolvimento de análise preditiva para antecipar demandas de consumidoras. • Ziro – otimização de funil de marketing em e-commerce, explorando testes A/B e recomendação de produtos.',
    ],
  },
  {
    title: 'Coordenador de Marketing',
    company: 'Viva Linda',
    period: '2016 – Dez 2019',
    location: 'Sete Lagoas, Brasil',
    highlights: [
      'Gerenciei campanhas multicanal voltadas para bens de consumo, expandindo o alcance em mercados locais e e-commerce, aumentando a base de clientes em 20%.',
      'Desenvolvi estratégias de branding e comunicação, reforçando o posicionamento de produto em redes sociais e plataformas digitais.',
      'Introduzi metodologias ágeis no planejamento de marketing, agilizando validações de hipóteses e impulsionando a troca de insights entre áreas de vendas e produto.',
    ],
  },
];

// Updated skills and competencies to underscore e-commerce, data management, and startup context.
const skillsCompetencies = [
  'Estratégias de Marketing para E-commerce e Bens de Consumo',
  'Gestão de Produtos de IA (Machine Learning e IA Generativa)',
  'Implementação de Soluções de Governança de Dados e Alocação de Mídia',
  'Pesquisa de Mercado, Validação de Hipóteses e Roadmap de Produto',
  'Otimização de Marketing de Performance (Google Ads, Facebook Ads, LinkedIn Ads)',
  'Colaboração Multifuncional (Engenheiros de Dados, Cientistas de Dados, Vendas)',
  'Definição de Métricas e Medição de Desempenho (CPC, CPA, CTR, ROI, ROAS)',
  'Prototipagem e Experimentação em Ambientes de Teste',
  'Metodologias Ágeis (Scrum, Kanban) e Gestão de Projetos',
  'Familiaridade com Cenários de Startup, Bootstrapping e Expansão de ARR',
  'Fluente em Inglês, Proficiência em Espanhol',
  'Conhecimento em Fintech, Mercado de Soluções de IA e E-commerce',
];

// Education can remain similar, but feel free to adapt or rename to highlight relevant courses.
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

// Languages remain the same, adapt if needed.
const languages = [
  { language: 'Português', level: 'Nativo' },
  { language: 'Inglês', level: 'Fluente (Estudo e Experiência Internacional)' },
];

// Tools & certifications can emphasize e-commerce, data, analytics, etc.
const toolsCertifications = [
  'Professional Scrum Master I (Scrum.org)',
  'Certificação em Google Ads (Pesquisa, Display, Shopping)',
  'SEO e Inbound Marketing (Diversas Certificações)',
  'SQL Avançado (LinkedIn Learning)',
  'Experiência com Plataformas e APIs de IA (OpenAI, Azure Cognitive, Vertex AI)',
  'Certificado em Google Analytics e Google Tag Manager',
  'Familiaridade com Python e bibliotecas de Machine Learning',
  'Conhecimento prático de plataformas de e-commerce (Shopify, VTEX, WooCommerce)',
];

// Updated Additional Info to reflect the startup context, culture, and readiness to scale.
const additionalInfo = `
• Perfil empreendedor, focado em escalar soluções de e-commerce e bens de consumo, com comprovada experiência em gestão de dados e análise de mercado.
• Capacidade de transitar entre estratégia e execução, contribuindo para culturas organizacionais horizontais e jovens.
• Focado em resultados e eficiência de mídia, com histórico de liderança de equipes enxutas e colaborativas.
• Entusiasta de inovação, sempre buscando formas de adaptar soluções a novos mercados e cenários de crescimento.
• Disponível para trabalho remoto, participando de reuniões e eventos presenciais conforme a necessidade.
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
        `Currículo de ${contactInfo.name} – profissional em Marketing, Inovação e E-commerce, com experiência em soluções de Dados e IA.`
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
          <section className="mb-4 pt-2">
            <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide uppercase">
              Competências e Habilidades
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-slate-600 font-light list-inside list-disc">
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
            <h3 className="text-2xl font-light text-slate-900 mb-4 tracking-wide uppercase">
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
            <h3 className="text-2xl font-light text-slate-900 mb-0">
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
