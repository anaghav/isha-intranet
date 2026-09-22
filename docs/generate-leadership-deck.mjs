import PptxGenJS from "pptxgenjs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const logoLight = path.join(root, "public/isha-logo.png");
const logoDark = path.join(root, "public/isha-logo-dark.png");
const outFile = path.join(__dirname, "Isha-Intranet-Leadership.pptx");

const cream = "E4DED4";
const creamSoft = "F7F4EF";
const ink = "1A1A1A";
const inkSoft = "2A2622";
const sidebar = "464038";
const accent = "C45C26";
const muted = "5C564E";
const white = "FFFFFF";

const pptx = new PptxGenJS();
pptx.defineLayout({ name: "WIDE", width: 13.333, height: 7.5 });
pptx.layout = "WIDE";
pptx.author = "Isha Intranet";
pptx.title = "Isha Intranet — Leadership briefing";
pptx.subject = "One home for Isha volunteers and staff";

function addFooter(slide, page, dark = false) {
  slide.addText("Isha Intranet  ·  Leadership briefing  ·  September 2026", {
    x: 0.55,
    y: 7.12,
    w: 10.2,
    h: 0.24,
    fontFace: "Calibri",
    fontSize: 11,
    color: dark ? "C8C2B6" : muted,
    margin: 0,
  });
  slide.addText(`${page}  /  4`, {
    x: 11.55,
    y: 7.12,
    w: 1.2,
    h: 0.24,
    fontFace: "Calibri",
    fontSize: 11,
    color: dark ? "C8C2B6" : muted,
    align: "right",
    margin: 0,
  });
}

function addAccentBar(slide) {
  slide.addShape("rect", {
    x: 0,
    y: 0,
    w: 0.12,
    h: 7.5,
    fill: { color: accent },
    line: { color: accent },
  });
}

// --- Slide 1: What it is ---
{
  const slide = pptx.addSlide();
  slide.addShape("rect", {
    x: 0,
    y: 0,
    w: 13.333,
    h: 7.5,
    fill: { color: sidebar },
    line: { color: sidebar },
  });
  slide.addShape("rect", {
    x: 0,
    y: 0,
    w: 0.12,
    h: 7.5,
    fill: { color: accent },
    line: { color: accent },
  });

  slide.addImage({
    path: logoLight,
    x: 0.7,
    y: 0.55,
    w: 1.55,
    h: 0.62,
  });

  slide.addText("LEADERSHIP BRIEFING", {
    x: 0.7,
    y: 1.55,
    w: 8,
    h: 0.28,
    fontFace: "Calibri",
    fontSize: 13,
    color: accent,
    bold: true,
    charSpacing: 2.4,
    margin: 0,
  });

  slide.addText("Isha Intranet", {
    x: 0.7,
    y: 1.95,
    w: 11.8,
    h: 1.05,
    fontFace: "Georgia",
    fontSize: 48,
    color: creamSoft,
    margin: 0,
  });

  slide.addText(
    "One place for volunteers and staff to stay connected with the ashram — meetings, announcements, seva, and everyday needs.",
    {
      x: 0.7,
      y: 3.15,
      w: 10.4,
      h: 0.95,
      fontFace: "Calibri",
      fontSize: 20,
      color: cream,
      margin: 0,
    },
  );

  const chips = [
    { label: "Who it is for", value: "Volunteers and staff" },
    { label: "How people sign in", value: "@sadhguru.org\n@sadhguru-ext.org" },
    { label: "Language", value: "English" },
  ];

  chips.forEach((chip, i) => {
    const x = 0.7 + i * 3.95;
    slide.addShape("roundRect", {
      x,
      y: 4.45,
      w: 3.7,
      h: 1.85,
      fill: { color: "3A362F" },
      line: { color: "3A362F" },
      rectRadius: 0.08,
    });
    slide.addText(chip.label.toUpperCase(), {
      x: x + 0.22,
      y: 4.6,
      w: 3.26,
      h: 0.28,
      fontFace: "Calibri",
      fontSize: 11,
      color: accent,
      bold: true,
      charSpacing: 1.2,
      margin: 0,
    });
    slide.addText(chip.value, {
      x: x + 0.22,
      y: 4.95,
      w: 3.26,
      h: 1.1,
      fontFace: "Calibri",
      fontSize: 18,
      color: creamSoft,
      margin: 0,
    });
  });

  addFooter(slide, 1, true);
  slide.addNotes(
    "Open with: this is an internal home for people serving at Isha. It is not a public website. Only Isha emails can sign in. v1 is simple — English only, no role system yet.",
  );
}

// --- Slide 2: What people can do ---
{
  const slide = pptx.addSlide();
  slide.addShape("rect", {
    x: 0,
    y: 0,
    w: 13.333,
    h: 7.5,
    fill: { color: cream },
    line: { color: cream },
  });
  addAccentBar(slide);

  slide.addImage({
    path: logoDark,
    x: 0.55,
    y: 0.32,
    w: 1.15,
    h: 0.46,
  });

  slide.addText("What people can do today", {
    x: 0.55,
    y: 0.92,
    w: 10,
    h: 0.5,
    fontFace: "Georgia",
    fontSize: 28,
    color: ink,
    margin: 0,
  });
  slide.addText(
    "Live tools for daily seva, plus two areas marked for the next release.",
    {
      x: 0.55,
      y: 1.42,
      w: 12,
      h: 0.32,
      fontFace: "Calibri",
      fontSize: 15,
      color: muted,
      margin: 0,
    },
  );

  const cards = [
    ["Dashboard", "Meetings on a month calendar, plus program suggestions from each person’s profile"],
    ["Announcements", "Ashram and center updates, presented in the same card style as isha.sadhguru.org"],
    ["Buy / Sell", "Bicycles, cars, and everyday items between volunteers — with photos and “mark as sold”"],
    ["Yantra Care", "Ask someone to look after a yantra or sannidhi while traveling"],
    ["Rent near Isha", "Homes around the yoga center, with photos, address, and distance from IYC"],
    ["Profile", "Name, photo, skills, programs volunteered for, and programs completed"],
    ["Donations", "Current drives and drop-off details — first drive is 22 September 2026"],
    ["Next: HR & tickets", "Leave, policies, and IT or facilities requests — pages are ready, workflows come next"],
  ];

  cards.forEach((card, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = 0.55 + col * 3.15;
    const y = 1.95 + row * 2.4;
    slide.addShape("roundRect", {
      x,
      y,
      w: 3.0,
      h: 2.2,
      fill: { color: creamSoft },
      line: { color: "D8D2C6" },
      rectRadius: 0.08,
    });
    slide.addShape("rect", {
      x,
      y,
      w: 0.08,
      h: 2.2,
      fill: { color: accent },
      line: { color: accent },
    });
    slide.addText(card[0], {
      x: x + 0.22,
      y: y + 0.18,
      w: 2.62,
      h: 0.55,
      fontFace: "Georgia",
      fontSize: 16,
      color: ink,
      margin: 0,
    });
    slide.addText(card[1], {
      x: x + 0.22,
      y: y + 0.78,
      w: 2.62,
      h: 1.2,
      fontFace: "Calibri",
      fontSize: 13,
      color: muted,
      margin: 0,
    });
  });

  addFooter(slide, 2);
  slide.addNotes(
    "Walk the eight tiles quickly. Stress that seven are already usable with sample data. HR and Raise a Ticket are in the menu so leadership can see the intended home, but the workflows are not built yet.",
  );
}

// --- Slide 3: How it looks and works ---
{
  const slide = pptx.addSlide();
  slide.addShape("rect", {
    x: 0,
    y: 0,
    w: 13.333,
    h: 7.5,
    fill: { color: cream },
    line: { color: cream },
  });
  addAccentBar(slide);

  slide.addImage({
    path: logoDark,
    x: 0.55,
    y: 0.32,
    w: 1.15,
    h: 0.46,
  });

  slide.addText("Familiar to anyone who knows Isha", {
    x: 0.55,
    y: 0.92,
    w: 12,
    h: 0.5,
    fontFace: "Georgia",
    fontSize: 28,
    color: ink,
    margin: 0,
  });
  slide.addText(
    "The look follows isha.sadhguru.org, so the intranet feels official — not like a separate product.",
    {
      x: 0.55,
      y: 1.42,
      w: 12,
      h: 0.32,
      fontFace: "Calibri",
      fontSize: 15,
      color: muted,
      margin: 0,
    },
  );

  const points = [
    {
      title: "Isha visual language",
      body: "Cream ground, ink type, terracotta accent, and the official wordmark. Announcement cards follow the live events site.",
    },
    {
      title: "A day that is easy to scan",
      body: "Dashboard places the month calendar beside that day’s meetings, so people see what is coming without hunting through lists.",
    },
    {
      title: "Seva that remembers the person",
      body: "Profile holds skills and programs served. The dashboard then suggests the next three programs that fit that person.",
    },
    {
      title: "Everyday life around the ashram",
      body: "Buy/Sell, Yantra Care, and Rent sit in simple photo cards. Donations lists the next drive and what to bring.",
    },
  ];

  points.forEach((point, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.55 + col * 6.3;
    const y = 1.95 + row * 2.35;
    slide.addShape("roundRect", {
      x,
      y,
      w: 6.05,
      h: 2.15,
      fill: { color: creamSoft },
      line: { color: "D8D2C6" },
      rectRadius: 0.08,
    });
    slide.addText(`0${i + 1}`, {
      x: x + 0.28,
      y: y + 0.22,
      w: 1.1,
      h: 0.32,
      fontFace: "Calibri",
      fontSize: 13,
      color: accent,
      bold: true,
      margin: 0,
    });
    slide.addText(point.title, {
      x: x + 0.28,
      y: y + 0.55,
      w: 5.5,
      h: 0.4,
      fontFace: "Georgia",
      fontSize: 18,
      color: ink,
      margin: 0,
    });
    slide.addText(point.body, {
      x: x + 0.28,
      y: y + 1.02,
      w: 5.5,
      h: 0.85,
      fontFace: "Calibri",
      fontSize: 14,
      color: muted,
      margin: 0,
    });
  });

  addFooter(slide, 3);
  slide.addNotes(
    "Show the live site if possible: dashboard calendar, an announcement card, then profile. The point is recognition — this looks like Isha — and usefulness — it knows the volunteer’s seva.",
  );
}

// --- Slide 4: Built with / next ---
{
  const slide = pptx.addSlide();
  slide.addShape("rect", {
    x: 0,
    y: 0,
    w: 13.333,
    h: 7.5,
    fill: { color: cream },
    line: { color: cream },
  });
  addAccentBar(slide);

  slide.addImage({
    path: logoDark,
    x: 0.55,
    y: 0.32,
    w: 1.15,
    h: 0.46,
  });

  slide.addText("Ready to use, with a clear next step", {
    x: 0.55,
    y: 0.92,
    w: 12,
    h: 0.5,
    fontFace: "Georgia",
    fontSize: 28,
    color: ink,
    margin: 0,
  });
  slide.addText(
    "A secure web app for Isha emails only. Sample data is in place so leadership can walk through the full experience.",
    {
      x: 0.55,
      y: 1.42,
      w: 12,
      h: 0.32,
      fontFace: "Calibri",
      fontSize: 15,
      color: muted,
      margin: 0,
    },
  );

  slide.addShape("roundRect", {
    x: 0.55,
    y: 1.95,
    w: 6.05,
    h: 4.7,
    fill: { color: sidebar },
    line: { color: sidebar },
    rectRadius: 0.08,
  });
  slide.addText("ASK OF LEADERSHIP", {
    x: 0.85,
    y: 2.2,
    w: 5.45,
    h: 0.28,
    fontFace: "Calibri",
    fontSize: 12,
    color: accent,
    bold: true,
    charSpacing: 1.4,
    margin: 0,
  });
  slide.addText("Walk through the live intranet and confirm this is the right first home.", {
    x: 0.85,
    y: 2.58,
    w: 5.45,
    h: 0.95,
    fontFace: "Georgia",
    fontSize: 20,
    color: creamSoft,
    margin: 0,
  });

  const asks = [
    "Keep v1 simple: no roles, English only",
    "Prioritize HR and Raise a Ticket next",
    "Later: Google Calendar, Google / Apple sign-in",
  ];
  asks.forEach((ask, i) => {
    slide.addText(`${i + 1}`, {
      x: 0.85,
      y: 3.7 + i * 0.72,
      w: 0.35,
      h: 0.4,
      fontFace: "Georgia",
      fontSize: 16,
      color: accent,
      margin: 0,
    });
    slide.addText(ask, {
      x: 1.25,
      y: 3.7 + i * 0.72,
      w: 5.0,
      h: 0.55,
      fontFace: "Calibri",
      fontSize: 16,
      color: cream,
      margin: 0,
    });
  });

  const nextItems = [
    { title: "HR", body: "Leave, policies, and people — the tab is already in the sidebar." },
    { title: "Raise a Ticket", body: "IT, facilities, and other requests from one place." },
    { title: "Meetings from Google", body: "Replace sample meetings with the real ashram calendar." },
    { title: "Easier sign-in", body: "Google and Apple login when we are ready to turn them on." },
  ];

  nextItems.forEach((item, i) => {
    const y = 1.95 + i * 1.18;
    slide.addShape("roundRect", {
      x: 6.85,
      y,
      w: 5.9,
      h: 1.05,
      fill: { color: creamSoft },
      line: { color: "D8D2C6" },
      rectRadius: 0.08,
    });
    slide.addText(item.title, {
      x: 7.1,
      y: y + 0.12,
      w: 5.4,
      h: 0.32,
      fontFace: "Georgia",
      fontSize: 16,
      color: ink,
      margin: 0,
    });
    slide.addText(item.body, {
      x: 7.1,
      y: y + 0.46,
      w: 5.4,
      h: 0.45,
      fontFace: "Calibri",
      fontSize: 13,
      color: muted,
      margin: 0,
    });
  });

  addFooter(slide, 4);
  slide.addNotes(
    "Close by asking for a walkthrough and a priority call: HR and tickets first, then calendar and SSO. Do not dwell on the tech stack unless asked — it is a standard secure web app.",
  );
}

await pptx.writeFile({ fileName: outFile });
console.log(outFile);
