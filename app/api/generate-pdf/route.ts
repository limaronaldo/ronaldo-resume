//app/api/generate-pdf/route.ts
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chrome from '@sparticuz/chromium';

export async function POST(req: Request) {
  let browser;
  try {
    const { url, jobTitle } = await req.json();

    // Configure Chrome for serverless environment
    const executablePath = await chrome.executablePath;
    
    if (!executablePath) {
      throw new Error('Chrome executable not found');
    }

    browser = await puppeteer.launch({
      args: [
        ...chrome.args,
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
      executablePath: await executablePath(),
      headless: true,
      ignoreDefaultArgs: false,
    });

    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(30000);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // Hide everything except the main card
    await page.evaluate(() => {
      document.body.style.background = 'white';
      const mainCard = document.querySelector('.bg-white.shadow-xl.rounded-xl');
      const container = document.querySelector('.container');
      if (container && container instanceof HTMLElement) {
        container.style.padding = '0';
        container.style.maxWidth = 'none';
      }
      if (mainCard && mainCard instanceof HTMLElement) {
        mainCard.style.boxShadow = 'none';
        mainCard.style.borderRadius = '0';
      }
      // Hide the download button
      const downloadBtn = document.querySelector('.flex.justify-end.mb-4');
      if (downloadBtn && downloadBtn instanceof HTMLElement) {
        downloadBtn.style.display = 'none';
      }
    });

    // Generate PDF with adjusted margins
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10px',
        right: '10px',
        bottom: '10px',
        left: '10px',
      },
    });

    // Create filename with initials if job title is provided
    let filename = 'RonaldoLima';
    if (jobTitle) {
      const initials = jobTitle
        .split(' ')
        .map((word: string) => word[0])
        .join('')
        .toUpperCase();
      filename = `RonaldoLima-${initials}`;
    }

    // Set final filename
    filename = `${filename}.pdf`;

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
