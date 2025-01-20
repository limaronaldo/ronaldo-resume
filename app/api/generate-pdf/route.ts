import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chrome from '@sparticuz/chromium';

interface GeneratePdfRequest {
  url: string;
  jobTitle?: string;
}

export async function POST(req: NextRequest) {
  let browser;
  try {
    const { url, jobTitle } = await req.json() as GeneratePdfRequest;
    
    // Configure Chrome for serverless environment
    const executablePath = await chrome.executablePath();
    
    browser = await puppeteer.launch({
      args: [
        ...chrome.args,
        '--hide-scrollbars',
        '--disable-web-security',
        '--font-render-hinting=none',
        '--disable-setuid-sandbox',
        '--no-sandbox',
        '--disable-dev-shm-usage'
      ],
      executablePath,
      headless: true,
      defaultViewport: {
        width: 1200,
        height: 1600,
        deviceScaleFactor: 1
      }
    });
    
    const page = await browser.newPage();
    
    // Navigate to the page and wait for network to be idle
    await page.goto(url, { 
      waitUntil: ['networkidle0', 'load', 'domcontentloaded'],
      timeout: 30000 
    });

    // Wait for translations to be loaded and content to be ready
    await page.waitForSelector('.bg-white.shadow-xl.rounded-xl', { timeout: 10000 });
    await page.waitForFunction(() => {
      const summaryText = document.querySelector('section:first-of-type p')?.textContent;
      const titleText = document.querySelector('h2')?.textContent;
      return summaryText && summaryText.length > 0 && 
             titleText && titleText.length > 0 && 
             !summaryText.includes('sections.') &&
             !titleText.includes('contact.');
    }, { timeout: 10000 });

    // Modify the page to only show the card content
    await page.evaluate((jobTitle) => {
      const card = document.querySelector('.bg-white.shadow-xl.rounded-xl');
      if (!card) throw new Error('Card content not found');

      // Update the job title in the header and professional summary if provided
      if (jobTitle) {
        const titleElement = card.querySelector('h2');
        if (titleElement) {
          titleElement.textContent = jobTitle;
        }

        // Find and update the professional summary content
        const summaryElement = card.querySelector('section:first-of-type p');
        if (summaryElement && summaryElement.textContent) {
          const summaryText = summaryElement.textContent;
          
          // Get the current language
          const lang = document.documentElement.lang || 'en';
          
          // Create a new first sentence with the job title
          let newText = summaryText;
          
          // Try to match the first part of the text up to the experience part
          const experienceMatch = summaryText.match(/(?:.*?)(?:with|com|con)\s+(.*?(?:years|anos|años).*?\.)/i);
          if (experienceMatch) {
            const experiencePart = experienceMatch[1];
            const conjunction = lang === 'pt' ? 'com' : lang === 'es' ? 'con' : 'with';
            newText = `${jobTitle} ${conjunction} ${experiencePart}${summaryText.substring(experienceMatch[0].length)}`;
          }
          
          summaryElement.textContent = newText;
        }
      }

      // Create a wrapper for the card
      const wrapper = document.createElement('div');
      wrapper.style.background = 'white';
      wrapper.style.width = '100%';
      wrapper.style.minHeight = '100vh';
      wrapper.style.padding = '15px';
      wrapper.style.display = 'flex';
      wrapper.style.alignItems = 'flex-start';
      wrapper.style.justifyContent = 'center';

      // Clone the card and remove shadow/border
      const clonedCard = card.cloneNode(true) as HTMLElement;
      clonedCard.style.boxShadow = 'none';
      clonedCard.style.borderRadius = '0';
      clonedCard.style.margin = '0';
      clonedCard.style.maxWidth = '1000px';
      clonedCard.style.width = '100%';

      // Add page break rules
      const style = document.createElement('style');
      style.textContent = `
        .border-t {
          display: none !important;
        }
        .mb-12 {
          margin-bottom: 2rem;
        }
        section:has(h3:contains('EDUCATION')) {
          break-before: page;
          margin-top: 3rem !important;
        }
        section:has(h3:contains('ADDITIONAL INFORMATION')) {
          break-before: avoid;
          break-after: avoid;
          display: block !important;
          margin-top: 2rem;
        }
        section:has(h3:contains('TOOLS & CERTIFICATIONS')) {
          break-after: avoid;
        }
      `;
      document.head.appendChild(style);

      // Replace the body content with just the card
      wrapper.appendChild(clonedCard);
      document.body.innerHTML = '';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.body.style.background = 'white';
      document.body.appendChild(wrapper);

      return clonedCard.getBoundingClientRect();
    }, jobTitle);

    // Generate PDF with the card content only
    const pdf = await page.pdf({
      format: 'A4',
      margin: {
        top: '0.6in',
        right: '0.2in',
        bottom: '0.3in',
        left: '0.2in'
      },
      printBackground: true,
      preferCSSPageSize: true
    });

    // Create filename with initials if job title is provided
    let filename = 'RonaldoLima';
    if (jobTitle) {
      const initials = jobTitle
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();
      filename = `RonaldoLima-${initials}`;
    }

    // Get language from URL
    const lang = url.includes('/pt/') ? 'pt' : url.includes('/es/') ? 'es' : 'en';
    filename = `${filename}-${lang}.pdf`;

    // Return PDF with appropriate headers
    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdf.length.toString()
      }
    });
  } catch (error: unknown) {
    console.error('Error generating PDF:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: `Error generating PDF: ${errorMessage}` },
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
} 