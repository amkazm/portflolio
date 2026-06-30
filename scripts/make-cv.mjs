// Generates a minimal, valid placeholder CV PDF at public/cv/Amin-Kazempour-CV.pdf
// Replace this file with the real CV when ready. Run: node scripts/make-cv.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const lines = [
  "Amin Kazempour",
  "AI Engineer & Machine Learning / Deep Learning Researcher",
  "",
  "This is a placeholder CV. Replace public/cv/Amin-Kazempour-CV.pdf",
  "with your real resume, or upload one and update the CV URL in Admin > Profile.",
];

// Build a simple single-page PDF with Helvetica text.
const content =
  "BT\n/F1 18 Tf\n70 740 Td\n" +
  lines
    .map((l, i) => `${i === 0 ? "" : "0 -26 Td\n"}(${l.replace(/[()\\]/g, "\\$&")}) Tj\n`)
    .join("") +
  "ET";

const objects = [];
objects.push("<< /Type /Catalog /Pages 2 0 R >>");
objects.push("<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
objects.push(
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>"
);
objects.push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

let pdf = "%PDF-1.4\n";
const offsets = [];
objects.forEach((body, i) => {
  offsets.push(pdf.length);
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});

const xrefStart = pdf.length;
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += "0000000000 65535 f \n";
offsets.forEach((off) => {
  pdf += `${String(off).padStart(10, "0")} 00000 n \n`;
});
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

const out = "public/cv/Amin-Kazempour-CV.pdf";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, pdf, "latin1");
console.log(`Wrote ${out} (${pdf.length} bytes)`);
