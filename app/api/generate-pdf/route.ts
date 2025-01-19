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
      args: [...chrome.args, '--font-render-hinting=none'],
      executablePath,
      headless: chrome.headless,
      defaultViewport: {
        width: 1100,
        height: 1400,
        deviceScaleFactor: 1
      }
    });
    
    const page = await browser.newPage();
    
    // Navigate to the page and wait for network to be idle
    await page.goto(url, { 
      waitUntil: ['networkidle0', 'load', 'domcontentloaded'],
      timeout: 30000 
    });

    // Wait for content to be fully loaded
    await page.waitForSelector('#resume-content', { timeout: 5000 });

    // Modify the page for PDF generation
    const contentHeight = await page.evaluate(() => {
      // Get the resume content
      const content = document.querySelector('#resume-content');
      if (!content) throw new Error('Resume content not found');

      // Create a new wrapper
      const wrapper = document.createElement('div');
      wrapper.style.background = 'white';
      wrapper.style.width = '100%';
      wrapper.style.minHeight = '100vh';
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
      clonedContent.style.height = 'auto';

      // Add the cloned content to the wrapper
      wrapper.appendChild(clonedContent);

      // Replace the body content
      document.body.innerHTML = '';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.body.style.background = 'white';
      document.body.appendChild(wrapper);

      // Return the actual content height
      return clonedContent.getBoundingClientRect().height;
    });

    // Set viewport to match content height
    await page.setViewport({
      width: 1100,
      height: Math.ceil(contentHeight) + 100, // Add padding
      deviceScaleFactor: 1
    });

    // Generate PDF
    const pdf = await page.pdf({
      format: 'A4',
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      },
      printBackground: true,
      preferCSSPageSize: false,
      scale: 0.95,
      height: '11in'
    });

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
    return new NextResponse(
      error instanceof Error ? error.message : 'Failed to generate PDF',
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close().catch(console.error);
    }
  }
} 