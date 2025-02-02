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
    location: 'São Paulo, SP - Brazil',
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
Product Manager with over 10 years of experience in the convergence of business, technology, and user experience. Throughout my career, I have worked on planning end-to-end solutions across various sectors, including e-commerce, fintech, and B2B sales. I am passionate about identifying opportunities for improvement in logistics systems and creating roadmaps that balance user needs, business goals, and regulatory requirements. I have strong collaboration skills in cross-functional teams, leading product discovery and delivery in an agile manner. I constantly seek to optimize processes to generate real impact in the lives of millions of users.
`;

  // Professional Experience
  const professionalExperience = [
    {
      title: 'Product Manager',
      company: 'IBVI',
      period: 'Aug 2022 – Present',
      location: 'São Paulo, Brazil',
      highlights: [
        'Manage backlog and roadmaps for credit and payment platforms, aligning business requirements with user and partner needs.',
        'Lead discovery initiatives for new features, coordinating stakeholder interviews and data analysis to prioritize development.',
        'Collaborate with engineering, design, and marketing teams to ensure high-quality deliveries and meet time and budget goals.',
        'Implemented product metrics (OKRs and KPIs) to measure user adoption and satisfaction, resulting in a 20% increase in new feature adoption.',
      ],
    },
    {
      title: 'Marketing Manager',
      company: 'MBRAS',
      period: 'Oct 2021 – Present',
      location: 'São Paulo, Brazil',
      highlights: [
        'Developed multichannel strategies for financial products and payment solutions, including user story creation and interface with development teams.',
        'Worked on logistics systems integration projects (sales and fulfillment), helping reduce delivery time and improve seller experience.',
        'Negotiated priorities and roadmap with internal stakeholders, balancing sales goals, technical feasibility, and user feedback to optimize processes.',
        'Used agile approach to manage sprints, defining acceptance criteria and ensuring transparency about initiative progress across the organization.',
      ],
    },
    {
      title: 'Marketing Coordinator',
      company: 'ConnectAD',
      period: 'Dec 2019 – Nov 2021',
      location: 'São Paulo, Brazil',
      highlights: [
        'Coordinated development squads focused on usability improvements, increasing customer satisfaction by 15% according to NPS surveys.',
        'Defined performance KPIs (CPC, ROI, engagement) to support backlog prioritization decisions and alignment with strategic product objectives.',
        'Worked with sales and customer service teams to map regulatory requirements in complex automation projects, ensuring compliance and effectiveness of new features.',
        'Conducted data analysis and A/B testing to iterate on key features, reducing acquisition costs and increasing end-user retention.',
      ],
    },
    {
      title: 'Marketing Coordinator',
      company: 'Viva Linda',
      period: '2016 – Dec 2019',
      location: 'Sete Lagoas, Brazil',
      highlights: [
        'Managed improvement initiatives in seller registration and support flow, contributing to greater platform adoption and partner satisfaction.',
        'Launched activation campaigns focused on product portfolio expansion, working closely with UX and engineering teams.',
        'Actively participated in company regional expansion projects, adapting processes and ensuring consistent seller experience.',
      ],
    },
  ];

  // Skills & Competencies
  const skillsCompetencies = [
    'Product Management (roadmaps, backlog, OKRs definition)',
    'Research and Discovery (interviews, usability testing, MVP)',
    'Cross-functional Team Orchestration (Engineering, UX, Business)',
    'Experience in E-commerce, Fulfillment, Logistics and Marketplace',
    'Requirements Prioritization and Stakeholder Management',
    'Agile Methodologies (Scrum, Kanban) and PM Tools (Jira, Confluence)',
    'Data Analysis and Product Metrics (NPS, CTR, ROI)',
    'Understanding of Regulatory Requirements and Compliance',
    'Advanced English (international negotiation and alignment)',
    'Focus on User Experience and Sustainable Growth',
  ];

  // Education
  const education = [
    {
      degree: 'MBA in Marketing',
      school: 'Fundação Armando Alvares Penteado (FAAP)',
      period: '2024 – 2025',
    },
    {
      degree: 'Bachelor in Business Administration',
      school: 'Ibmec',
      period: '2004 – 2008',
    },
  ];

  // Languages
  const languages = [
    { language: 'Portuguese', level: 'Native' },
    { language: 'English', level: 'Advanced' },
    { language: 'Spanish', level: 'Professional Proficiency' },
  ];

  // Tools & Certifications
  const toolsCertifications = [
    'Professional Scrum Master I (Scrum.org)',
    'Google Analytics / Ads Certification',
    'Product Management Specialization (various courses)',
    'Advanced SQL (LinkedIn Learning)',
    'Experience with CRM (HubSpot, Salesforce)',
    'Design Thinking and User Research (internal workshops)',
  ];

  // Additional Information
  const additionalInfo = `
• I am driven by complex challenges involving logistics, marketplace, and scalability, seeking creative solutions that combine results and customer satisfaction.
• I have international experience in projects with remote teams, which allows me to collaborate and align visions in multicultural environments.
• I believe in the importance of continuous interactions with users and stakeholders to refine product vision and incremental value delivery.
• I constantly stay updated on e-commerce trends and fulfillment operations to identify opportunities for improvement and innovation.
`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Download PDF Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={downloadPDF}
            disabled={isGenerating}
            className={`px-6 py-2 rounded-lg bg-slate-900 text-white transition-colors ${
              isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-800'
            }`}
          >
            {isGenerating ? 'Generating PDF...' : 'Download PDF'}
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
