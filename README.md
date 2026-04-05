# RemovAI - Premium Image Background Remover 🚀

[![Live Demo](https://img.shields.io/badge/Live_Demo-back--ground--remove.vercel.app-purple?style=for-the-badge&logo=vercel)](https://back-ground-remove.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

RemovAI is an industry-standard, production-ready web application designed to magically remove the background of any image in under 3 seconds. Engineered for graphic designers, e-commerce owners, and digital content creators, it provides a flawless, fully-responsive workspace to rapidly process, edit, and export visual assets.

![RemovAI Banner](https://back-ground-remove.vercel.app/og-image.jpg) *(Replace with actual banner if available)*

🌐 **Live Production Link:** [https://back-ground-remove.vercel.app](https://back-ground-remove.vercel.app)

---

## ✨ Key Features

* **⚡ Lightning Fast AI Engine:** Achieve studio-quality results in seconds without losing original image resolution or edge detals (e.g. hair, fur, transparent objects).
* **🎨 Ultimate Canvas Editor:** Instantly inject custom solid colors or overlay full background backdrop images natively inside your browser. 
* **💾 Session History:** Automatically caches your workflow in `localStorage`, letting you freely explore, switch, and download your last 5 processed image histories anytime securely.
* **🎛️ Export Controls:** Select exactly how you want your media. Compress into web-friendly JPEGs via quality sliders, or strictly preserve transparency via pure PNG format.
* **📱 Ultra-Responsive UI:** Built with strict dark/light mode premium layouts powered by Tailwind CSS v4 to look beautifully scaled on iPhones, iPads, and Ultra-wide Desktop displays.

---

## 🛠️ Technology Stack

* **Framework:** [Next.js (App Router)](https://nextjs.org/) 
* **Styling:** [Tailwind CSS (V4)](https://tailwindcss.com/) + CSS Modules/Globals
* **Icons:** [Lucide-React](https://lucide.dev/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Notifications:** [React Toastify](https://fkhadra.github.io/react-toastify/)
* **Deployment & Hosting:** [Vercel Architecture](https://vercel.com/)

---

## 🚀 Getting Started (Local Development)

Follow these steps to run the application on your local machine.

### 1. Clone the repository
```bash
git clone https://github.com/stackbymazed/BG_Remove.git
cd BG_Remove
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Setup Environment Variables
Create a `.env.local` file directly inside the root directory and securely add your API configuration key:
```env
REMOVE_BG_API_KEY=your_secret_api_key_here
```
*(Warning: Never commit this file to public repositories!)*

### 4. Start the application
```bash
npm run dev
```
Navigate to `http://localhost:3000` inside your browser to view the application locally.

---

## 🌐 Deploy to Vercel

If you want to host this code in your own Vercel environment:

1. Link your GitHub account to [Vercel](https://vercel.com/).
2. Import the `BG_Remove` repository.
3. Critically: Under **Settings > Environment Variables**, add your `REMOVE_BG_API_KEY` exactly as it sits locally.
4. Hit **Deploy**.

---

## 👨‍💻 Developer Comments
Architecture decisions center around preserving client-side performance. Heavy image blob creations, slider computations, and DOM-native Canvas API repainting are delegated carefully to avoid unnecessary re-renders. Next.js handles server-side edge runtime for raw API fetches bridging browser and image extraction services.

---
**Maintained by:** [@stackbymazed](https://github.com/stackbymazed) / Directed by Nayem  
💌 Feedback and pull requests are warmly welcomed!
