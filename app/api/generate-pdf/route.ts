// app/api/generate-pdf/route.ts
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chrome from '@sparticuz/chromium';
import fs from 'fs';
import path from 'path';

// Force Node.js runtime so Puppeteer and Chromium work properly
export const runtime = 'nodejs';

export async function POST(req: Request) {
  let browser;
  try {
    const { url, jobTitle } = await req.json();

    // Determine the correct Chrome/Chromium executable path
    let executablePath: string;
    let launchArgs: string[];

    // If running in AWS Lambda (or similar), use the binary provided by @sparticuz/chromium
    if (process.env.AWS_LAMBDA || process.env.AWS_EXECUTION_ENV) {
      executablePath = await chrome.executablePath();
      launchArgs = chrome.args;
    } else {
      // In local development, use your locally installed Chrome
      // You can optionally specify a path via an env variable: CHROMIUM_EXECUTABLE_PATH
      if (process.env.CHROMIUM_EXECUTABLE_PATH) {
        executablePath = process.env.CHROMIUM_EXECUTABLE_PATH;
      } else if (process.platform === 'darwin') {
        // macOS default path
        executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
      } else {
        // Linux default path (adjust as needed)
        executablePath = '/usr/bin/google-chrome-stable';
      }
      launchArgs = []; // no need for special args locally
    }

    // Verify that the Chrome executable exists
    if (!fs.existsSync(executablePath)) {
      throw new Error(
        `Chrome executable not found at ${executablePath}. ` +
        `Please install Chrome or set the CHROMIUM_EXECUTABLE_PATH environment variable.`
      );
    }

    // Launch Puppeteer using the determined executablePath and args
    browser = await puppeteer.launch({
      args: launchArgs,
      defaultViewport: {
        width: 1200,
        height: 1600,
        deviceScaleFactor: 1,
      },
      executablePath,
      headless: true,
      ignoreDefaultArgs: false,
    });

    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(30000);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // Modify the page content for PDF generation
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

    // Generate PDF with specified options
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10px',
        right: '10px',
        bottom: '10px',
        left: '10px',
      },
    });

    // Create a filename (appending job title initials if provided)
    let filename = 'RonaldoLima';
    if (jobTitle) {
      const initials = jobTitle
        .split(' ')
        .map((word: string) => word[0])
        .join('')
        .toUpperCase();
      filename = `RonaldoLima-${initials}`;
    }
    filename = `${filename}.pdf`;

    // Return the generated PDF with appropriate headers
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (error: unknown) {
    console.error('Error generating PDF:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
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