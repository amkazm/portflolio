import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // --- Admin user ---
  const email = process.env.ADMIN_EMAIL || "admin@aminkazempour.dev";
  const password = process.env.ADMIN_PASSWORD || "Admin123!change";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, name: "Amin Kazempour", passwordHash },
  });
  console.log(`✔ Admin user: ${email}`);

  // --- Profile (singleton) ---
  await prisma.profile.upsert({
    where: { id: "profile" },
    update: {},
    create: {
      id: "profile",
      name: "Amin Kazempour",
      title: "AI Engineer & Machine Learning Researcher",
      tagline:
        "Building intelligent systems through deep learning, medical image analysis, and large language models.",
      bio:
        "I am an AI Engineer and Machine Learning / Deep Learning researcher. " +
        "I hold a B.Sc. in Computer Engineering from Mohaghegh Ardabili University (2019–2023, GPA 17.66) " +
        "and an M.Sc. in Computer Engineering – Artificial Intelligence from the University of Tabriz (2023–2025, GPA 18.04). " +
        "My research centers on image-based AI — particularly medical image segmentation — and large language models.",
      email: "am.kazempour@gmail.com",
      linkedinUrl: "https://linkedin.com/in/aminkazempour",
      githubUrl: "https://github.com/aminkazempour",
      scholarUrl: "https://scholar.google.com/",
      researchGate: "https://www.researchgate.net/",
      twitterUrl: "",
      thesisTitle:
        "Brain MRI/CT Image Segmentation using Mamba Transformers and CNNs",
      thesisSummary:
        "My M.Sc. thesis proposes a hybrid segmentation architecture that combines convolutional " +
        "neural networks with Mamba-based state-space transformers to segment brain structures and " +
        "lesions from MRI and CT scans. The CNN backbone captures fine local detail while the Mamba " +
        "blocks model long-range spatial dependencies with linear complexity, yielding accurate " +
        "segmentation at a fraction of the compute of attention-only transformers.",
      thesisPdfUrl: "",
    },
  });
  console.log("✔ Profile seeded");

  // --- Skills ---
  const skillData: Record<string, string[]> = {
    "AI / ML": ["PyTorch", "TensorFlow", "HuggingFace", "LangChain", "scikit-learn", "OpenCV"],
    Backend: ["FastAPI", "Django", "Node.js", "PostgreSQL", "Redis"],
    Infra: ["Docker", "Linux", "Kubernetes", "Git", "CI/CD"],
  };
  let catOrder = 0;
  for (const [name, skills] of Object.entries(skillData)) {
    const existing = await prisma.skillCategory.findFirst({ where: { name } });
    const cat =
      existing ??
      (await prisma.skillCategory.create({ data: { name, order: catOrder } }));
    catOrder++;
    let sOrder = 0;
    for (const s of skills) {
      const exists = await prisma.skill.findFirst({
        where: { name: s, categoryId: cat.id },
      });
      if (!exists) {
        await prisma.skill.create({
          data: { name: s, categoryId: cat.id, order: sOrder, level: 75 + ((sOrder * 5) % 25) },
        });
      }
      sOrder++;
    }
  }
  console.log("✔ Skills seeded");

  // --- Sample publication ---
  await prisma.publication.upsert({
    where: { slug: "mamba-cnn-brain-segmentation" },
    update: {},
    create: {
      slug: "mamba-cnn-brain-segmentation",
      title:
        "Hybrid Mamba–CNN Architecture for Robust Brain MRI/CT Segmentation",
      authors: "A. Kazempour, et al.",
      venue: "Journal of Medical Imaging (example)",
      year: 2025,
      type: "JOURNAL",
      shortAbstract:
        "A hybrid state-space + convolutional model for accurate, efficient brain image segmentation.",
      fullAbstract:
        "We present a hybrid architecture combining CNN encoders with Mamba state-space blocks for " +
        "segmentation of brain structures and lesions across MRI and CT modalities. The model achieves " +
        "state-of-the-art Dice scores while reducing FLOPs relative to attention-based baselines.",
      contributions:
        "• Novel CNN–Mamba fusion block.\n• Linear-complexity long-range modeling.\n• Cross-modality (MRI+CT) evaluation.",
      methods: "CNN encoder + Mamba SSM blocks + decoder with skip connections.",
      results: "State-of-the-art Dice with ~40% fewer FLOPs than transformer baselines.",
      tags: "Medical Imaging,Deep Learning,Segmentation,Mamba,CNN",
      doi: "",
      scholarUrl: "https://scholar.google.com/",
      researchGate: "https://www.researchgate.net/",
      pdfUrl: "",
      citation:
        "Kazempour, A., et al. (2025). Hybrid Mamba–CNN Architecture for Robust Brain MRI/CT Segmentation.",
      featured: true,
    },
  });
  console.log("✔ Sample publication seeded");

  // --- Sample project ---
  await prisma.project.upsert({
    where: { slug: "brain-seg-pipeline" },
    update: {},
    create: {
      slug: "brain-seg-pipeline",
      title: "Brain Segmentation Pipeline (Mamba + CNN)",
      category: "Computer Vision",
      summary:
        "End-to-end medical image segmentation pipeline for brain MRI/CT using a hybrid Mamba–CNN model.",
      problem:
        "Manual segmentation of brain structures and lesions is slow, costly, and inconsistent between radiologists.",
      solution:
        "An automated deep-learning pipeline combining CNN feature extraction with Mamba state-space blocks for long-range context, served via a FastAPI inference API.",
      techStack: "PyTorch,MONAI,FastAPI,Docker,NumPy",
      architecture:
        "Preprocessing → CNN encoder → Mamba blocks → decoder → post-processing → REST inference API.",
      challenges:
        "Handling multi-modal inputs (MRI vs CT), class imbalance, and keeping inference latency low.",
      results:
        "High Dice overlap with expert annotations and sub-second inference per slice on a single GPU.",
      demoUrl: "",
      githubUrl: "https://github.com/aminkazempour",
      featured: true,
      order: 0,
    },
  });
  console.log("✔ Sample project seeded");

  // --- Sample experience ---
  const expExists = await prisma.experience.findFirst({
    where: { role: "Research Assistant", organization: "University of Tabriz" },
  });
  if (!expExists) {
    await prisma.experience.create({
      data: {
        role: "Research Assistant",
        organization: "University of Tabriz",
        location: "Tabriz, Iran",
        startDate: "2023-09",
        endDate: "2025-09",
        summary:
          "Research on medical image segmentation with hybrid Mamba–CNN architectures.",
        achievements:
          "Designed and trained the hybrid segmentation model.\nPublished journal and conference papers.\nBuilt the reproducible training/inference pipeline.",
        order: 0,
      },
    });
  }
  console.log("✔ Sample experience seeded");

  // --- Sample blog post ---
  await prisma.blogPost.upsert({
    where: { slug: "why-mamba-for-vision" },
    update: {},
    create: {
      slug: "why-mamba-for-vision",
      title: "Why Mamba State-Space Models Are Exciting for Vision",
      tags: "Mamba,Deep Learning,Computer Vision",
      excerpt:
        "A short look at how state-space models bring linear-complexity long-range modeling to image tasks.",
      content:
        "## State-space models meet vision\n\nTransformers gave us long-range context but at quadratic cost. " +
        "**Mamba** brings selective state-space modeling with *linear* complexity — a great fit for high-resolution " +
        "medical images.\n\n### Key idea\n\nReplace expensive global attention with selective scans that still " +
        "capture long-range dependencies.\n\n```python\n# pseudo-code\nout = mamba_block(cnn_features)\n```\n\nMore to come.",
      published: true,
    },
  });
  console.log("✔ Sample blog post seeded");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
