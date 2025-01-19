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

    // Wait for the card content to be loaded
    await page.waitForSelector('.bg-white.shadow-xl.rounded-xl', { timeout: 10000 });

    // Get the card element and its dimensions
    const cardDimensions = await page.evaluate(() => {
      const card = document.querySelector('.bg-white.shadow-xl.rounded-xl');
      if (!card) throw new Error('Card content not found');
      const { width, height } = card.getBoundingClientRect();
      return { width, height };
    });

    // Set viewport to match card dimensions with some padding
    await page.setViewport({
      width: Math.ceil(cardDimensions.width) + 80, // Add padding for margins
      height: Math.ceil(cardDimensions.height) + 80,
      deviceScaleFactor: 1
    });

    // Generate PDF with the card content only
    const pdf = await page.pdf({
      format: 'A4',
      margin: {
        top: '0.4in',
        right: '0.4in',
        bottom: '0.4in',
        left: '0.4in'
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