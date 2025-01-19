import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chrome from '@sparticuz/chromium';

interface GeneratePdfRequest {
  url: string;
  jobTitle?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { url, jobTitle } = await req.json() as GeneratePdfRequest;
    
    // Configure Chrome for serverless environment
    const executablePath = await chrome.executablePath();
    
    const browser = await puppeteer.launch({
      args: [...chrome.args, '--font-render-hinting=none'],
      executablePath,
      headless: chrome.headless,
      defaultViewport: {
        width: 850,
        height: 1100,
        deviceScaleFactor: 1
      }
    });
    
    const page = await browser.newPage();
    await page.goto(url, { 
      waitUntil: ['networkidle0', 'load', 'domcontentloaded'],
      timeout: 30000 
    });

    // Wait for content to be fully loaded
    await page.waitForSelector('#resume-content', { timeout: 5000 });

    // Modify the page for PDF generation
    await page.evaluate(() => {
      // Get the resume content
      const content = document.querySelector('#resume-content');
      if (!content) return;

      // Create a new wrapper
      const wrapper = document.createElement('div');
      wrapper.style.background = 'white';
      wrapper.style.position = 'fixed';
      wrapper.style.top = '0';
      wrapper.style.left = '0';
      wrapper.style.width = '100%';
      wrapper.style.height = '100%';
      wrapper.style.padding = '40px';
      wrapper.style.boxSizing = 'border-box';
      wrapper.style.display = 'flex';
      wrapper.style.alignItems = 'flex-start';
      wrapper.style.justifyContent = 'center';

      // Clone the content
      const clonedContent = content.cloneNode(true) as HTMLElement;
      clonedContent.style.boxShadow = 'none';
      clonedContent.style.border = 'none';
      clonedContent.style.margin = '0';
      clonedContent.style.width = '100%';
      clonedContent.style.maxWidth = '800px';
      clonedContent.style.background = 'white';

      // Add the cloned content to the wrapper
      wrapper.appendChild(clonedContent);

      // Replace the body content
      document.body.innerHTML = '';
      document.body.style.margin = '0';
      document.body.style.background = 'white';
      document.body.appendChild(wrapper);
    });

    // Wait a bit for any fonts to load
    await page.waitForTimeout(1000);

    const pdf = await page.pdf({
      format: 'A4',
      margin: {
        top: '0.4in',
        right: '0.4in',
        bottom: '0.4in',
        left: '0.4in'
      },
      printBackground: true,
      preferCSSPageSize: true,
      scale: 0.98
    });

    await browser.close();

    // Create initials from job title if provided
    let filename = 'RonaldoLima';
    if (jobTitle) {
      const initials = jobTitle
        .split(' ')
        .map((word: string) => word[0])
        .join('')
        .toUpperCase();
      filename = `RonaldoLima-${initials}`;
    }

    // Get language from URL
    const lang = url.includes('/pt/') ? 'pt' : url.includes('/es/') ? 'es' : 'en';
    filename = `${filename}-${lang}.pdf`;

    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
} 