"use client";

import { useEffect, useState } from "react";

export default function Resume() {
  const [mounted, setMounted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Contact and Header Info
  const contactInfo = {
    name: "Ronaldo Lima",
    role: "Integrated Campaign Manager",
    email: "ronaldomlima@gmail.com",
    phone: "+55 11 93459-2736",
    location: "São Paulo, BR",
  };

  // Side Effects
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.title = contactInfo.role;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          `Resume of ${contactInfo.name} – an experienced ${contactInfo.role} specialized in driving multi-channel paid media, performance analytics, and integrated marketing strategies.`
        );
      }
    }
  }, [mounted, contactInfo.role, contactInfo.name]);

  // PDF Download Handler
  const downloadPDF = async () => {
    try {
      setIsGenerating(true);
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: `${window.location.origin}${window.location.pathname}`,
          jobTitle: contactInfo.role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      // Create initials from job title
      const initials = contactInfo.role
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();

      a.download = `RonaldoLima-${initials}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!mounted) return null;

  // Professional Summary
  const professionalSummary = `
Strategic Integrated Campaign Manager with over 10 years in digital marketing, specializing in developing and executing multi-channel campaigns that drive customer acquisition and revenue growth. Adept at leveraging data-driven insights to optimize performance across platforms such as Meta, Google, and TikTok. Experienced in budget forecasting, creative strategy, and cross-functional collaboration to meet and exceed KPIs. Ready to lead integrated efforts in a fast-paced tech environment.
  `;

  // Professional Experience
  const professionalExperience = [
    {
      title: "Integrated Campaign Manager",
      company: "IBVI",
      period: "Aug 2022 – Present",
      location: "São Paulo, Brazil",
      highlights: [
        "Develop and oversee end-to-end marketing strategies across Meta, Google, and TikTok, focusing on campaign optimization and ROI.",
        "Collaborate with in-house creative, product, and customer success teams to align marketing initiatives with company objectives and product updates.",
        "Leverage analytics tools (Google Analytics, Tableau) to identify trends and derive insights for improved targeting and performance.",
        "Increased overall lead generation by 30% via data-driven budget allocation and refined audience segmentation.",
      ],
    },
    {
      title: "Performance Marketing Manager",
      company: "MBRAS",
      period: "Oct 2021 – Aug 2022",
      location: "São Paulo, Brazil",
      highlights: [
        "Led multi-channel paid media campaigns (Google Ads, Meta Ads) with a strong emphasis on creative optimization and audience targeting.",
        "Implemented A/B testing frameworks that improved CTR by 20% and decreased CPA by 15%.",
        "Managed marketing budgets exceeding $1M annually, forecasting and reporting results to executive leadership.",
        "Coordinated cross-functional teams to ensure consistent brand messaging and seamless campaign execution.",
      ],
    },
    {
      title: "Marketing Coordinator",
      company: "ConnectAD",
      period: "Dec 2019 – Nov 2021",
      location: "São Paulo, Brazil",
      highlights: [
        "Supported integrated go-to-market campaigns spanning brand awareness, product launches, and targeted events.",
        "Utilized customer data and market research to refine messaging for new product releases, boosting adoption rates.",
        "Executed paid social strategies on Instagram and LinkedIn, contributing to 25% uplift in lead volume.",
      ],
    },
  ];

  // Skills & Competencies
  const skillsCompetencies = [
    "Integrated Marketing Campaigns & Strategy",
    "Multi-channel Paid Media (Meta, Google, YouTube, TikTok)",
    "Analytics Tools (Google Analytics, Tableau)",
    "Budget Forecasting & ROI Optimization",
    "Creative Asset Briefing & A/B Testing",
    "Collaboration with Cross-functional Teams",
    "Fluent in English & Portuguese",
    "Strong Project Management & Communication",
  ];

  // Education
  const education = [
    {
      degree: "MBA in Marketing",
      school: "Fundação Armando Alvares Penteado (FAAP)",
      period: "2024 – 2025",
    },
    {
      degree: "Bachelor’s in Business Administration",
      school: "Ibmec",
      period: "2004 – 2008",
    },
  ];

  // Languages
  const languages = [
    { language: "Portuguese", level: "Native" },
    { language: "English", level: "Fluent" },
    { language: "Spanish", level: "Professional Proficiency" },
  ];

  // Tools & Certifications
  const toolsCertifications = [
    "Google Ads Certification",
    "Meta Blueprint Certification",
    "Professional Scrum Master I (Scrum.org)",
    "Advanced SQL (LinkedIn Learning)",
    "HubSpot Marketing Software",
    "Google Analytics Certified",
  ];

  // Additional Info
  const additionalInfo = `
• Proven track record in leveraging data to uncover growth opportunities, optimize campaigns, and report clear results to stakeholders.
• Highly adaptable and proactive approach, thriving in fast-paced tech environments.
• Experience collaborating with global teams to deliver integrated solutions that drive customer engagement and revenue.
`;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* PDF Download Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={downloadPDF}
            disabled={isGenerating}
            className={`px-5 py-2 rounded-md bg-gray-900 text-white ${
              isGenerating
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-800 transition-colors"
            }`}
          >
            {isGenerating ? "Generating PDF..." : "Download PDF"}
          </button>
        </div>

        {/* Resume Card */}
        <div className="bg-white shadow-md rounded-md p-6">
          {/* Header */}
          <header className="text-center mb-4">
            <h1 className="text-3xl text-gray-800 mb-1">{contactInfo.name}</h1>
            <h2 className="text-xl text-gray-500">{contactInfo.role}</h2>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-gray-600 mt-3">
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              <a
                href={`https://wa.me/${contactInfo.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contactInfo.phone}
              </a>
              <span>{contactInfo.location}</span>
            </div>
          </header>

          {/* Professional Summary */}
          <section className="mb-6">
            <h3 className="text-lg text-gray-900 font-semibold mb-2">
              Professional Summary
            </h3>
            <p className="text-gray-700 whitespace-pre-line">{professionalSummary}</p>
          </section>

          {/* Professional Experience */}
          <section className="mb-6">
            <h3 className="text-lg text-gray-900 font-semibold mb-2">
              Professional Experience
            </h3>
            {professionalExperience.map((exp, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-base text-gray-800 font-medium">
                    {exp.title} – {exp.company}
                  </h4>
                  <p className="text-sm text-gray-500">{exp.period}</p>
                </div>
                <p className="text-sm text-gray-600 mb-2">{exp.location}</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {exp.highlights.map((highlight, hIdx) => (
                    <li key={hIdx}>{highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Skills & Competencies */}
          <section className="mb-6">
            <h3 className="text-lg text-gray-900 font-semibold mb-2">
              Skills & Competencies
            </h3>
            <ul className="list-disc list-inside columns-2 space-y-1 text-gray-700">
              {skillsCompetencies.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </section>

          {/* Education */}
          <section className="mb-6">
            <h3 className="text-lg text-gray-900 font-semibold mb-2">
              Education
            </h3>
            {education.map((edu, idx) => (
              <div key={idx} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-base text-gray-800 font-medium">
                    {edu.degree}
                  </h4>
                  <p className="text-sm text-gray-500">{edu.period}</p>
                </div>
                <p className="text-sm text-gray-600">{edu.school}</p>
              </div>
            ))}
          </section>

          {/* Languages */}
          <section className="mb-6">
            <h3 className="text-lg text-gray-900 font-semibold mb-2">
              Languages
            </h3>
            <ul className="space-y-1 text-gray-700">
              {languages.map((lang, idx) => (
                <li key={idx} className="flex items-center">
                  <span>{lang.language}</span>
                  <span className="mx-2">•</span>
                  <span className="text-sm text-gray-600">{lang.level}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Tools & Certifications */}
          <section className="mb-6">
            <h3 className="text-lg text-gray-900 font-semibold mb-2">
              Tools & Certifications
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {toolsCertifications.map((cert, idx) => (
                <li key={idx}>{cert}</li>
              ))}
            </ul>
          </section>

          {/* Additional Information */}
          <section>
            <h3 className="text-lg text-gray-900 font-semibold mb-2">
              Additional Information
            </h3>
            <p className="text-gray-700 whitespace-pre-line">{additionalInfo}</p>
          </section>
        </div>
      </main>
    </div>
  );
}
