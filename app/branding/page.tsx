'use client';

import { useEffect, useState } from 'react';

// Centralize all resume data for clarity
const contactInfo = {
  name: 'Ronaldo Lima',
  role: 'Gerente de Branding',
  email: 'ronaldomlima@gmail.com',
  phone: '+55 11 93459-2736',
  location: 'Alto de Pinheiros, São Paulo, SP',
};

const professionalSummary = `
Profissional de Marketing com mais de 10 anos de experiência em gestão de marca, posicionamento estratégico e desenvolvimento de campanhas integradas. Especializado em conectar o desenvolvimento de produtos e serviços às necessidades de mercado, lidero iniciativas de branding (Brand Book, tom de voz, identidade visual) e campanhas sazonais para impulsionar a presença e a reputação da marca. Com forte conhecimento em marketing de performance e análise de dados, gerencio equipes multidisciplinares e parcerias com agências para garantir consistência da marca, crescimento de engajamento e resultados de negócio.
`;

const professionalExperience = [
  {
    title: 'Gerente de Marca e Marketing',
    company: 'IBVI',
    period: 'Ago 2022 – Presente',
    location: 'São Paulo, Brasil',
    highlights: [
      'Lidero a estratégia de marca, garantindo consistência de identidade visual e tom de voz em todas as interações com o público.',
      'Desenvolvo e atualizo o Brand Book em parceria com equipes internas e agências, assegurando alinhamento de design e copywriting.',
      'Planejo e executo campanhas sazonais alinhadas a objetivos de crescimento, impactando públicos prioritários e parceiros de negócios.',
      'Coordeno ações de Trade Marketing e OOH em parceria com instituições de ensino e veículos de mídia, aumentando a visibilidade da marca em 30%.',
      'Gerencio um time interno de Criação e lidero parcerias externas (PR e agência criativa), garantindo entregas de alto impacto alinhadas ao propósito da marca.',
      'Realizo análises de percepção de marca e pesquisas de mercado, transformando dados em ações estratégicas para ampliar reputação e engajamento.',
    ],
  },
  {
    title: 'Gerente de Marketing de Produto',
    company: 'MBRAS',
    period: 'Out 2021 – Presente',
    location: 'São Paulo, Brasil',
    highlights: [
      'Desenvolvi estratégias de marketing integradas focadas em fortalecimento de marca, resultando em maior relevância junto ao público-alvo.',
      'Impulsionei campanhas de performance no Google Ads, LinkedIn Ads e Facebook Ads, aumentando as taxas de conversão em 40%.',
      'Liderei a comunicação de produto, unificando mensagens em todas as campanhas digitais e off-line, reforçando a identidade da marca.',
      'Realizei pesquisas de mercado para identificar oportunidades de posicionamento, subsidiando ajustes em tom de voz e ativos de marca.',
    ],
  },
  {
    title: 'Coordenador de Marketing',
    company: 'ConnectAD',
    period: 'Dez 2019 – Nov 2021',
    location: 'São Paulo, Brasil',
    highlights: [
      'Apoiei a criação de campanhas orientadas por dados, evidenciando diferenciais de marca em canais digitais e presenciais.',
      'Colaborei com equipes de produto e comercial para alinhar feedback de clientes à estratégia de marca, fortalecendo a reputação do portfólio.',
      'Implementei iniciativas digitais avançadas, utilizando segmentação precisa para expandir awareness e conversões em canais online.',
      'Projetos-chave: • Bebêmax – criei diretrizes de branding para melhorar a comunicação do produto. • Ziro – otimizei campanhas com foco em reputação e autoridade de mercado.',
    ],
  },
  {
    title: 'Coordenador de Marketing',
    company: 'Viva Linda',
    period: '2016 – Dez 2019',
    location: 'Sete Lagoas, Brasil',
    highlights: [
      'Gerenciei campanhas de marketing voltadas para brand awareness, aumentando o reconhecimento em 20%.',
      'Atuei em relações públicas e assessoria de imprensa para dar visibilidade aos lançamentos, reforçando a imagem institucional da marca.',
      'Coordenei estratégias de conteúdo para redes sociais, engajando o público-alvo e ampliando a presença da marca no mercado local.',
    ],
  },
];

const skillsCompetencies = [
  'Estratégia de Marca (Brand Book, Identidade Visual, Tom de Voz)',
  'Planejamento e Execução de Campanhas Sazonais e Estratégicas',
  'Gestão de PR e Reputação, Relações com a Imprensa',
  'Trade Marketing e Ações OOH (Out-of-Home)',
  'Otimização de Marketing de Performance (Google Ads, Facebook Ads, LinkedIn Ads)',
  'Análise de Dados e Métricas de Branding (Sentimento, Alcance, Engajamento)',
  'CRM e Automação de Marketing (HubSpot, Salesforce)',
  'Colaboração Multifuncional e Liderança de Equipes Internas/Agências',
  'Pesquisa de Mercado e Análise Competitiva',
  'Fluente em Inglês, Proficiência em Espanhol',
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
  'Experiência com Jira, Git, CI/CD e Plataformas de IA',
  'Software de Marketing HubSpot',
  'Certificado em Google Analytics',
];

const additionalInfo = `
• Experiência comprovada em campanhas integradas de branding, do planejamento ao lançamento, incluindo estratégias OOH, PR e digitais.
• Hábil em desenvolver e aplicar guidelines de marca, fortalecendo a identidade e a reputação em todos os pontos de contato com o público.
• Forte background em análise de mercado e pesquisas de percepção, direcionando ações de comunicação, relacionamento e engajamento.
• Perfil estratégico, criativo e orientado para resultados, com experiência em liderar equipes internas e parcerias com agências.
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
        `Currículo de ${contactInfo.name} – profissional experiente em gestão de marca, campanhas sazonais, relações públicas e marketing de performance, pronto para liderar estratégias de Branding no mercado.`
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
