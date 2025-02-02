'use client';

import { useEffect, useState } from 'react';

export default function ResumeAI() {
  const [mounted, setMounted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Contact and header info
  const contactInfo = {
    name: 'Ronaldo Lima',
    role: 'Head de Marketing / Growth Marketing',
    email: 'ronaldomlima@gmail.com',
    phone: '+55 11 93459-2736',
    location: 'Alto de Pinheiros, São Paulo, SP',
  };

  // Handle side effects
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
          `Currículo de ${contactInfo.name} – destaque em liderança de marketing para software B2B, uso de IA Generativa e fluência em inglês e proficiência em Espanhol.`
        );
      }
    }
  }, [mounted, contactInfo.role, contactInfo.name]);

  // PDF Download Handler
  const downloadPDF = async () => {
    try {
      setIsGenerating(true);
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: `${window.location.origin}/omie`,  // Changed from resume-tiktok to omie
          jobTitle: contactInfo.role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;

      // Create initials from job title
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
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!mounted) return null;

  // Professional Summary (in Portuguese, emphasizing contábil software + leadership)
  const professionalSummary = `
Profissional de Marketing e Growth com mais de 10 anos de experiência, especialista em liderar equipes e estratégias de marketing voltadas para o segmento de software B2B. Tenho forte atuação em geração de demanda, inbound marketing, marketing de performance (Google Ads, LinkedIn Ads, etc.) e integração com vendas para aumentar ticket médio e taxa de conversão. Sou fluente em Inglês e possuo vasta experiência em Inteligência Artificial Generativa, utilizando modelos de última geração (ChatGPT, Claude, Google Gemini, Deepseek) para acelerar produção de conteúdo, otimizar campanhas e melhorar a tomada de decisão de negócios.
`;

  // Professional Experience (adapted to highlight contábil software and leadership)
  const professionalExperience = [
    {
      title: 'Head de Marketing & Growth',
      company: 'IBVI',
      period: 'Ago 2022 – Presente',
      location: 'São Paulo, Brasil',
      highlights: [
        'Lidero uma equipe multifuncional (Marketing e Vendas) focada em software para empresas, atuando no desenho de estratégias de inbound, SEO e marketing de performance.',
        'Integrei modelos de IA Generativa em campanhas e fluxos de nutrição, resultando em aumento de 30% na taxa de conversão de leads.',
        'Desenvolvi e implementei processos de integração entre marketing e vendas (CRM e automação), reduzindo tempo de resposta a leads qualificados em 40%.',
        'Criei ações de branding e posicionamento específicas para o segmento imobiliário, fortalecendo a reputação da marca como referência no setor.'
      ],
    },
    {
      title: 'Marketing Manager',
      company: 'MBRAS',
      period: 'Out 2021 – Ago 2022',
      location: 'São Paulo, Brasil',
      highlights: [
        'Estruturei uma equipe de marketing de alta performance, definindo OKRs, pipelines de inbound e estratégias de conteúdo para geração de leads em empresas imobiliárias e financeiras.',
        'Integrei campanhas de mídia paga (Meta, Google, LinkedIn) com conteúdos gerados por IA para segmentação avançada, elevando a qualidade dos leads em 25%.',
        'Coordenei iniciativas de co-marketing com parceiros, expandindo o alcance e estabelecendo credibilidade junto a escritórios de advocavia de médio e grande porte.',
      ],
    },
    {
      title: 'Coordenador de Marketing',
      company: 'ConnectAD',
      period: 'Dez 2019 – Nov 2021',
      location: 'São Paulo, Brasil',
      highlights: [
        'Implantei funis de nutrição e automações de e-mail marketing voltadas para o público de software B2B, otimizando ROI das campanhas em mais de 35%.',
        'Utilizei Python, SQL e IA Generativa para acelerar testes A/B, personalizar abordagens e reduzir custos de aquisição em múltiplos canais.',
        'Key Projects:',
        '• Bebêmax (cliente e-commerce): desenvolvimento de chatbots e páginas de vendas inteligentes com IA para aumentar vendas cross-sell.',
        '• Ziro (cliente no setor de varejo): criação de conteúdo com IA para SEO e automação de CRM para captura de leads qualificados.',
      ],
    },
    {
      title: 'Coordenador de Marketing',
      company: 'Viva Linda',
      period: '2016 – Dez 2019',
      location: 'Sete Lagoas, Brasil',
      highlights: [
        'Transformei operações de marketing tradicionais em digitais, aplicando estratégias de IA e conteúdo multilíngue (Português/Espanhol) para expandir a base de clientes.',
        'Desenvolvi campanhas omnichannel, alinhadas com equipes de vendas e varejo, aumentando a taxa de conversão em 20%.',
        'Formei e liderei um time de marketing orientado a dados, testando e escalando campanhas de alta performance em diversos nichos de mercado.',
      ],
    },
  ];

  // Skills & Competencies (focus on inbound, SEO, contábil software, leadership)
  const skillsCompetencies = [
    'Liderança de Equipes de Marketing B2B',
    'Integração de IA Generativa (ChatGPT, Claude, Google Gemini)',
    'Inbound Marketing, SEO e Marketing de Performance (Google Ads, LinkedIn Ads)',
    'Criação e Execução de Estratégias 360° (Branding, Conteúdo, Mídia Paga)',
    'Integração Marketing-Vendas (CRM, Automação, Pipeline de Vendas)',
    'Estruturação de Processos e OKRs para Escala de Equipes',
    'Otimização de Conversão (CRO) e Estratégias de Retenção',
    'Data Analytics (SQL, Python, Google Data Studio, Excel Avançado)',
    'Gerenciamento de Projetos Ágeis (Scrum, Kanban)',
    'Espanhol Profissional para estratégias regionais (LatAm)',
  ];

  // Education
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

  // Languages
  const languages = [
    { language: 'Português', level: 'Nativo' },
    { language: 'Inglês', level: 'Fluente' },
    { language: 'Espanhol', level: 'Profissional' },
  ];

  // Tools & Certifications
  const toolsCertifications = [
    'Professional Scrum Master I (Scrum.org)',
    'Google Ads Search Certification',
    'SEO e Inbound Marketing (Certificações diversas)',
    'SQL Avançado (LinkedIn Learning)',
    'Experiência em Jira, Git, CI/CD e plataformas de IA',
  ];

  // Additional info
  const additionalInfo = `
Estou altamente motivado para continuar impulsionando resultados e inovação no setor de software. Tenho histórico de construção de equipes e processos do zero, foco em execução e uso intenso de tecnologia e IA para alavancar campanhas de marketing e vendas. Gosto de atuar de forma colaborativa, integrando soluções que fortalecem a marca e geram crescimento sustentável. Vamos juntos elevar o patamar de eficiência, rentabilidade e reconhecimento de mercado!
`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* PDF Download Button */}
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

        {/* Main Resume Card */}
        <div className="bg-white shadow-xl rounded-xl p-8 md:p-12">
          {/* Header */}
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

          {/* Professional Summary */}
          <section className="mb-2">
            <h3 className="text-2xl font-light text-slate-900 tracking-wide uppercase mt-4">
              Resumo Profissional
            </h3>
            <p className="text-md text-slate-600 font-light leading-relaxed whitespace-pre-line mb-6">
              {professionalSummary}
            </p>
          </section>

          {/* Professional Experience */}
          <section className="mb-8">
            <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide uppercase">
              Experiência Profissional
            </h3>
            {professionalExperience.map((exp, idx) => (
              <div key={idx} className="mb-8">
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

          {/* Skills & Competencies */}
          <section className="mb-12">
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

          {/* Education */}
          <section className="mb-12">
            <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide uppercase">
              Formação Acadêmica
            </h3>
            {education.map((edu, idx) => (
              <div key={idx} className="mb-4">
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

          {/* Languages */}
          <section className="mb-12">
            <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide uppercase">
              Idiomas
            </h3>
            <ul className="space-y-2 text-slate-600 font-light">
              {languages.map((lang, idx) => (
                <li
                  key={idx}
                  className={`flex items-center
                  `}
                >
                  <span
                    className={
                      lang.language === 'Espanhol'
                        ? 'text-slate-800 font-light text-lg'
                        : 'text-slate-800 font-light text-lg'
                    }
                  >
                    {lang.language}
                  </span>
                  <span className="text-slate-300 mx-3">•</span>
                  <span
                    className={
                      lang.language === 'Espanhol'
                        ? 'text-base text-slate-600 font-light'
                        : 'text-base text-slate-600 font-light'
                    }
                  >
                    {lang.level}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Tools & Certifications */}
          <section className="mb-12">
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

          {/* Additional Information */}
          <section className="border-t border-slate-200 pt-10">
            <h3 className="text-2xl font-light text-slate-900 mb-6">
              Informações Adicionais
            </h3>
            <p className="text-lg text-slate-600 font-light leading-relaxed whitespace-pre-line">
              {additionalInfo}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}