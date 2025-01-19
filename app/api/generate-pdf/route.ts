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

    // Wait for the card content to be loaded
    await page.waitForSelector('.bg-white.shadow-xl.rounded-xl', { timeout: 10000 });

    // Modify the page to only show the card content
    await page.evaluate(() => {
      const card = document.querySelector('.bg-white.shadow-xl.rounded-xl');
      if (!card) throw new Error('Card content not found');

      // Create a wrapper for the card
      const wrapper = document.createElement('div');
      wrapper.style.background = 'white';
      wrapper.style.width = '100%';
      wrapper.style.minHeight = '100vh';
      wrapper.style.padding = '20px';
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
        section {
          break-inside: avoid;
          page-break-inside: avoid;
        }
        .border-t {
          display: none !important;
        }
        .mb-12 {
          margin-bottom: 2rem;
        }
        .grid {
          break-inside: avoid;
          page-break-inside: avoid;
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
    });

    // Generate PDF with the card content only
    const pdf = await page.pdf({
      format: 'A4',
      margin: {
        top: '0.4in',
        right: '0.3in',
        bottom: '0.4in',
        left: '0.3in'
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