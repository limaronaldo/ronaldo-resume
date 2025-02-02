"use client"
import { useEffect, useState } from 'react';

export default function ResumeAI() {
  const [mounted, setMounted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Informações de contato e cabeçalho
  const contactInfo = {
    name: 'Ronaldo Lima',
    role: 'Gerente de Marketing de Produto',
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
          `Currículo de ${contactInfo.name} – Profissional de Marketing com experiência em gerenciar estratégias de marca, produtos e equipes multidisciplinares.`
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
Profissional de Marketing com sólida experiência no planejamento de estratégias de produto e execução de campanhas multicanal. Ao longo de mais de 10 anos de carreira, tenho atuado na integração entre áreas de produto, vendas e análise, criando mensagens de valor para o mercado e desenvolvendo equipes de alto desempenho. Minha vivência abrange tanto o marketing digital quanto o offline, sempre com foco em resultados mensuráveis, expansão de portfólio e fortalecimento de marca. Busco constantemente inovar processos e inspirar equipes, mantendo um olhar atento às tendências de consumo e oportunidades de crescimento.
`;

  // Experiência Profissional
  const professionalExperience = [
    {
      title: 'Gerente de Marketing de Produto',
      company: 'IBVI',
      period: 'Ago 2022 – Presente',
      location: 'São Paulo, Brasil',
      highlights: [
        'Defini e implementei estratégias de go-to-market para diversas soluções, coordenando o posicionamento de marca e criando campanhas integradas (online/offline).',
        'Estabeleci metas claras de receita e market share, monitorando métricas-chave como CPC, CPA e ROI para impulsionar campanhas de marketing de performance.',
        'Liderei equipes multidisciplinares (Produto, Vendas e BI) para refinar mensagens e melhorar a experiência do usuário, resultando em aumento de 20% na taxa de conversão.',
        'Participei ativamente de iniciativas de branding, desenvolvendo guidelines e promovendo a consistência da marca em todos os pontos de contato com o cliente.',
      ],
    },
    {
      title: 'Gerente de Marketing',
      company: 'MBRAS',
      period: 'Out 2021 – Presente',
      location: 'São Paulo, Brasil',
      highlights: [
        'Gerenciei campanhas de marketing integradas em canais digitais e tradicionais, priorizando ações de maior ROI e fortalecendo a reputação da empresa no mercado.',
        'Colaborei com times de produto e análise para segmentar clientes de forma mais precisa, resultando em campanhas de alta relevância que aumentaram engajamento em 30%.',
        'Apoiei o desenvolvimento de novos SKUs e features, conduzindo pesquisas de mercado e testes com usuários para alinhar o roadmap de produtos às demandas do público-alvo.',
        'Otimizei o planejamento orçamentário em marketing, realocando recursos para iniciativas de maior impacto e garantindo eficiência na aquisição e retenção de clientes.',
      ],
    },
    {
      title: 'Coordenador de Marketing',
      company: 'ConnectAD',
      period: 'Dez 2019 – Nov 2021',
      location: 'São Paulo, Brasil',
      highlights: [
        'Coordenei equipes responsáveis por campanhas orientadas por dados, criando estratégias de messaging diferenciadas para cada segmento de mercado.',
        'Integrei feedback de clientes e stakeholders internos, ajustando as comunicações de campanha para refletir melhor o valor do produto e aumentar a taxa de conversão.',
        'Desenvolvi iniciativas de marketing digital em redes sociais e buscadores, melhorando o fluxo de leads e reduzindo o custo de aquisição em 15%.',
        'Atuei em parceria com a área de vendas para implantar treinamentos focados no discurso de valor, gerando maior aderência ao posicionamento de marca.',
      ],
    },
    {
      title: 'Coordenador de Marketing',
      company: 'Viva Linda',
      period: '2016 – Dez 2019',
      location: 'Sete Lagoas, Brasil',
      highlights: [
        'Conduzi campanhas de marketing 360°, ampliando o alcance de marca em mídias locais e digitais, com foco na expansão de mercado regional.',
        'Desenvolvi relacionamento próximo com equipes comerciais, unificando mensagens de venda e peças de comunicação, elevando o ticket médio em 10%.',
        'Gerenciei parcerias com influenciadores e eventos promocionais para fortalecer a presença e relevância da marca em categorias estratégicas.',
      ],
    },
  ];

  // Competências e Habilidades
  const skillsCompetencies = [
    'Planejamento de Marketing de Produto (GTMs, Lançamentos)',
    'Estratégia de Branding e Posicionamento',
    'Marketing Digital e Mídia de Performance (Google Ads, Facebook Ads)',
    'Análise de Dados e Métricas (CPC, CPA, CTR, ROI)',
    'Colaboração Multifuncional (Produto, Vendas, Análise)',
    'Portfólio Management e Acompanhamento de Ciclo de Vida',
    'CRM e Automação de Marketing (HubSpot, Salesforce)',
    'Elaboração de Orçamento e Otimização do ROI em Marketing',
    'Inglês Avançado (Apresentações, Negociações Internacionais)',
    'Habilidade para Liderar e Desenvolver Equipes',
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
    'Certificação Google Ads e Pesquisa',
    'SEO e Inbound Marketing (Certificações diversas)',
    'SQL Avançado (LinkedIn Learning)',
    'Domínio de Jira, Git, CI/CD e Plataformas de IA',
    'CRM (HubSpot, Salesforce)',
    'Certificado em Google Analytics',
  ];

  // Informações Adicionais
  const additionalInfo = `
• Acredito no poder de narrativas autênticas e estratégicas para criar conexões de longo prazo com os clientes.
• Tenho histórico de incrementar vendas e fortalecer marcas por meio de abordagens integradas — do marketing digital ao ponto de venda.
• Busco expandir minha atuação gerencial, desenvolvendo estratégias de portfólio que unam inovação, valor percebido e impacto no mercado.
• Minha experiência em ambientes de ritmo acelerado e voltados a resultados me ajuda a manter equipes focadas e a alcançar metas de crescimento sustentável.
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
