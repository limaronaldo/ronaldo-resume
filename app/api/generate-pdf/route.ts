import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

interface GeneratePdfRequest {
  url: string;
  jobTitle?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { url, jobTitle } = await req.json() as GeneratePdfRequest;
    
    const browser = await puppeteer.launch({
      headless: true
    });
    
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });

    // Hide the download button and language switcher for PDF
    await page.evaluate(() => {
      const controls = document.querySelector('.pdf-controls');
      if (controls) {
        (controls as HTMLElement).style.display = 'none';
      }
      
      // Remove background and padding from the container
      const container = document.querySelector('.min-h-screen');
      if (container) {
        (container as HTMLElement).style.background = 'none';
        (container as HTMLElement).style.padding = '0';
      }
      
      // Get just the content card
      const content = document.querySelector('#resume-content, #cover-letter-content');
      if (content) {
        // Remove shadow and border
        (content as HTMLElement).style.boxShadow = 'none';
        (content as HTMLElement).style.border = 'none';
        (content as HTMLElement).style.borderRadius = '0';
      }
    });

    // Get the content element dimensions
    const contentBox = await page.evaluate(() => {
      const element = document.querySelector('#resume-content, #cover-letter-content');
      if (!element) return null;
      const { width, height } = element.getBoundingClientRect();
      return { width, height };
    });

    if (!contentBox) throw new Error('Content element not found');

    // Set viewport and page size to match content
    await page.setViewport({
      width: Math.ceil(contentBox.width),
      height: Math.ceil(contentBox.height),
      deviceScaleFactor: 2
    });

    const pdf = await page.pdf({
      format: 'A4',
      margin: {
        top: '0.4in',
        right: '0.1in',
        bottom: '0.4in',
        left: '0.1in'
      },
      printBackground: false,
      preferCSSPageSize: false,
      displayHeaderFooter: false,
      scale: 0.9,
      landscape: false
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
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
} 