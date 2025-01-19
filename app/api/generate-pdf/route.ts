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
    const executablePath = await chrome.executablePath;
    
    const browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: executablePath,
      headless: chrome.headless,
      defaultViewport: {
        width: 1200,
        height: 1600,
        deviceScaleFactor: 2
      }
    });
    
    const page = await browser.newPage();
    await page.goto(url, { 
      waitUntil: ['networkidle0', 'load', 'domcontentloaded'],
      timeout: 30000 
    });

    // Wait for content to be fully loaded
    await page.waitForSelector('#resume-content, #cover-letter-content', { timeout: 5000 });

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
        // Set white background
        (content as HTMLElement).style.background = '#ffffff';
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
      scale: 0.95
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