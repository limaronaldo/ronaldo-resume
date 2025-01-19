'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      title: "Ronaldo Lima - Product Marketing Manager Resume",
      meta_description: "Resume of Ronaldo Lima, a forward-thinking Product Marketing Manager with extensive experience in growth marketing, AI-driven solutions, and more.",
      contact: {
        name: "Ronaldo Lima",
        role: "Product Marketing Manager",
        phone: "+55 11 93459-2736",
        email: "ronaldomlima@gmail.com",
        location: "Alto de Pinheiros, São Paulo, SP"
      },
      sections: {
        professional_summary: {
          title: "Professional Summary",
          content: "Forward-thinking Product Marketing Manager with over 12 years of experience in growth marketing, product strategy, and AI-driven solutions. Known for bridging the gap between Product, Sales, and Data teams to deliver market-leading campaigns, optimize customer journeys, and drive measurable results. Skilled in integrating Large Language Models (LLMs) (Google Gemini, ChatGPT, Claude, Meta Llama) into marketing operations, reducing acquisition costs and accelerating conversions."
        },
        core_competencies: {
          title: "Core Competencies",
          items: [
            "Product Marketing & Go-to-Market Strategy",
            "Growth Hacking & Conversion Optimization (CRO)",
            "AI Integration (Google Gemini, ChatGPT, Claude, Meta Llama)",
            "Media Buying (Meta Ads, Google Ads, Linkedin Ads)",
            "CRM Implementation & Marketing Automation",
            "Full-Stack Development (Python, Node.js, React, Rust, Go)",
            "Data Analytics (SQL, Data Studio, Advanced Excel)",
            "Agile Project Management (Scrum, Jira)",
            "Team Leadership & Cross-Functional Collaboration"
          ]
        },
        experience: {
          title: "Professional Experience",
          roles: [
            {
              title: "Growth Product Manager",
              company: "IBVI",
              period: "Aug 2022 – Present",
              location: "São Paulo, Brazil",
              highlights: [
                "AI-Infused Growth: Led a digital transformation initiative under Google for Startups, incorporating advanced AI models into key business processes.",
                "Cross-Team Alignment: Collaborated with Product, Sales, and Data to refine customer journeys, resulting in a notable boost in lead quality and conversion.",
                "Predictive Analytics: Deployed LLM-based models for precise customer segmentation, driving higher retention and upselling opportunities."
              ]
            },
            {
              title: "Marketing Manager",
              company: "MBRAS Soluções Imobiliárias",
              period: "Oct 2021 – Present",
              location: "São Paulo, Brazil",
              highlights: [
                "Luxury Market Leadership: Strengthened MBRAS's brand in the high-end real estate segment through data-driven marketing.",
                "Omnichannel Strategy: Unified messaging across offline channels and digital platforms (Google Ads, Meta Ads, Linkedin Ads), maximizing ROI.",
                "Team Development: Mentored a high-performance marketing team, encouraging AI experimentation and continuous learning."
              ]
            }
          ]
        },
        education: {
          title: "Education",
          items: [
            {
              degree: "MBA in Marketing",
              school: "Fundação Armando Alvares Penteado (FAAP)",
              period: "Aug 2024 – Aug 2025"
            },
            {
              degree: "Bachelor's in Business Administration",
              school: "Ibmec",
              period: "2004 – 2008"
            }
          ]
        },
        languages: {
          title: "Languages",
          items: [
            {
              language: "Portuguese",
              level: "Native"
            },
            {
              language: "English",
              level: "Fluent"
            }
          ]
        }
      },
      additional_info: {
        title: "Additional Information",
        content: "Passionate about leveraging AI and data analytics to solve complex marketing challenges. Frequent collaborator in cross-functional teams, bridging technical and business stakeholders."
      }
    }
  },
  pt: {
    translation: {
      title: "Ronaldo Lima - Gerente de Marketing de Produto",
      meta_description: "Currículo de Ronaldo Lima, um Gerente de Marketing de Produto visionário com vasta experiência em growth marketing, soluções baseadas em IA e mais.",
      contact: {
        name: "Ronaldo Lima",
        role: "Gerente de Marketing de Produto",
        phone: "+55 11 93459-2736",
        email: "ronaldomlima@gmail.com",
        location: "Alto de Pinheiros, São Paulo, SP"
      },
      sections: {
        professional_summary: {
          title: "Resumo Profissional",
          content: "Gerente de Marketing de Produto visionário com mais de 12 anos de experiência em growth marketing, estratégia de produto e soluções baseadas em IA. Conhecido por conectar equipes de Produto, Vendas e Dados para entregar campanhas líderes de mercado, otimizar jornadas do cliente e gerar resultados mensuráveis. Especializado na integração de Modelos de Linguagem Natural (LLMs) (Google Gemini, ChatGPT, Claude, Meta Llama) em operações de marketing, reduzindo custos de aquisição e acelerando conversões."
        },
        core_competencies: {
          title: "Competências Principais",
          items: [
            "Marketing de Produto & Estratégia Go-to-Market",
            "Growth Hacking & Otimização de Conversão (CRO)",
            "Integração de IA (Google Gemini, ChatGPT, Claude, Meta Llama)",
            "Compra de Mídia (Meta Ads, Google Ads, Linkedin Ads)",
            "Implementação de CRM & Automação de Marketing",
            "Desenvolvimento Full-Stack (Python, Node.js, React, Rust, Go)",
            "Análise de Dados (SQL, Data Studio, Excel Avançado)",
            "Gestão Ágil de Projetos (Scrum, Jira)",
            "Liderança de Equipe & Colaboração Multifuncional"
          ]
        },
        experience: {
          title: "Experiência Profissional",
          roles: [
            {
              title: "Growth Product Manager",
              company: "IBVI",
              period: "ago/2022 – presente",
              location: "São Paulo, Brasil",
              highlights: [
                "Crescimento Impulsionado por IA: Liderei uma iniciativa de transformação digital apoiada pelo Google for Startups, integrando modelos avançados de IA aos processos críticos do negócio.",
                "Alinhamento Entre Equipes: Coordenei times de Produto, Vendas e Dados para otimizar a jornada do cliente, gerando um aumento imediato na qualidade dos leads e nas taxas de conversão.",
                "Análise Preditiva: Implementei modelos preditivos baseados em LLM para segmentação mais precisa de clientes, aumentando retenção e oportunidades de upselling."
              ]
            },
            {
              title: "Gerente de Marketing",
              company: "MBRAS Soluções Imobiliárias",
              period: "out/2021 – presente",
              location: "São Paulo, Brasil",
              highlights: [
                "Liderança no Mercado de Luxo: Reforcei o posicionamento da MBRAS no segmento imobiliário de alto padrão por meio de campanhas orientadas por dados.",
                "Estratégia Omnichannel: Unifiquei a comunicação da marca em canais offline e digitais (Google Ads, Meta Ads, Linkedin Ads), maximizando ROI.",
                "Desenvolvimento de Equipe: Mentorei uma equipe de marketing de alta performance, incentivando experimentação com IA e aprendizado contínuo."
              ]
            }
          ]
        },
        education: {
          title: "Formação",
          items: [
            {
              degree: "MBA em Marketing",
              school: "Fundação Armando Alvares Penteado (FAAP)",
              period: "ago/2024 – ago/2025"
            },
            {
              degree: "Bacharelado em Administração",
              school: "Ibmec",
              period: "2004 – 2008"
            }
          ]
        },
        languages: {
          title: "Idiomas",
          items: [
            {
              language: "Português",
              level: "Nativo"
            },
            {
              language: "Inglês",
              level: "Fluente"
            }
          ]
        }
      },
      additional_info: {
        title: "Informações Adicionais",
        content: "Apaixonado por utilizar IA e análise de dados para resolver desafios complexos de marketing. Colaborador frequente em equipes multifuncionais, conectando stakeholders técnicos e de negócios."
      }
    }
  },
  es: {
    translation: {
      title: "Ronaldo Lima - Gerente de Marketing de Producto",
      meta_description: "Currículum de Ronaldo Lima, un Gerente de Marketing de Producto visionario con amplia experiencia en growth marketing, soluciones basadas en IA y más.",
      contact: {
        name: "Ronaldo Lima",
        role: "Gerente de Marketing de Producto",
        phone: "+55 11 93459-2736",
        email: "ronaldomlima@gmail.com",
        location: "Alto de Pinheiros, São Paulo, SP"
      },
      sections: {
        professional_summary: {
          title: "Resumen Profesional",
          content: "Gerente de Marketing de Producto visionario con más de 12 años de experiencia en growth marketing, estrategia de producto y soluciones basadas en IA. Reconocido por conectar equipos de Producto, Ventas y Datos para entregar campañas líderes en el mercado, optimizar el recorrido del cliente y generar resultados medibles. Especializado en la integración de Modelos de Lenguaje Natural (LLMs) (Google Gemini, ChatGPT, Claude, Meta Llama) en operaciones de marketing, reduciendo costos de adquisición y acelerando conversiones."
        },
        core_competencies: {
          title: "Competencias Principales",
          items: [
            "Marketing de Producto & Estrategia Go-to-Market",
            "Growth Hacking & Optimización de Conversión (CRO)",
            "Integración de IA (Google Gemini, ChatGPT, Claude, Meta Llama)",
            "Compra de Medios (Meta Ads, Google Ads, Linkedin Ads)",
            "Implementación de CRM & Automatización de Marketing",
            "Desarrollo Full-Stack (Python, Node.js, React, Rust, Go)",
            "Análisis de Datos (SQL, Data Studio, Excel Avanzado)",
            "Gestión Ágil de Proyectos (Scrum, Jira)",
            "Liderazgo de Equipo & Colaboración Multifuncional"
          ]
        },
        experience: {
          title: "Experiencia Profesional",
          roles: [
            {
              title: "Growth Product Manager",
              company: "IBVI",
              period: "ago/2022 – presente",
              location: "São Paulo, Brasil",
              highlights: [
                "Crecimiento Impulsado por IA: Lideré una iniciativa de transformación digital respaldada por Google for Startups, incorporando modelos avanzados de IA en los procesos clave de negocio.",
                "Alineación Entre Equipos: Coordiné los equipos de Producto, Ventas y Datos para optimizar el recorrido del cliente, logrando un aumento inmediato en la calidad de leads y tasas de conversión.",
                "Análisis Predictivo: Implementé modelos predictivos basados en LLM para una segmentación de clientes más precisa, aumentando la retención y las oportunidades de upselling."
              ]
            },
            {
              title: "Gerente de Marketing",
              company: "MBRAS Soluciones Inmobiliarias",
              period: "oct/2021 – presente",
              location: "São Paulo, Brasil",
              highlights: [
                "Liderazgo en el Mercado de Lujo: Fortalecí el posicionamiento de MBRAS en el segmento inmobiliario de alta gama mediante campañas basadas en datos.",
                "Estrategia Omnicanal: Unifiqué el mensaje de la marca en canales offline y digitales (Google Ads, Meta Ads, Linkedin Ads), maximizando el ROI.",
                "Desarrollo de Equipo: Mentoricé a un equipo de marketing de alto rendimiento, fomentando la experimentación con IA y el aprendizaje continuo."
              ]
            }
          ]
        },
        education: {
          title: "Educación",
          items: [
            {
              degree: "MBA en Marketing",
              school: "Fundação Armando Alvares Penteado (FAAP)",
              period: "ago/2024 – ago/2025"
            },
            {
              degree: "Licenciatura en Administración",
              school: "Ibmec",
              period: "2004 – 2008"
            }
          ]
        },
        languages: {
          title: "Idiomas",
          items: [
            {
              language: "Portugués",
              level: "Nativo"
            },
            {
              language: "Inglés",
              level: "Fluido"
            }
          ]
        }
      },
      additional_info: {
        title: "Información Adicional",
        content: "Apasionado por utilizar IA y análisis de datos para resolver desafíos complejos de marketing. Colaborador frecuente en equipos multifuncionales, conectando stakeholders técnicos y de negocio."
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'pt', 'es'],
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n; 