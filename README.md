# Khatabook – Expense Tracker Web Application

Khatabook is a full-stack expense tracking web application that helps users manage income and expenses efficiently with real-time analytics and data visualization. The platform focuses on simplicity, security, and automation, making personal finance management seamless.

---

## Features

*  **Income & Expense Management**
  Track daily income and expenses with structured categorization.

*  **Real-time Data Visualization & Analytics**
  Interactive charts and summaries to understand spending patterns.

*  **Responsive & Intuitive UI**
  Clean, mobile-friendly interface built with modern frontend tools.

*  **Secure Backend & Database**
  Reliable data storage and access using Prisma ORM with Supabase.

*  **AI-powered Receipt Scanner**
  Upload receipts and automatically extract transaction details using AI.

*  **Security & Rate Limiting**
  Integrated Arcjet for enhanced security and abuse protection.

---

##  Tech Stack

* **Frontend:** Next.js, Tailwind CSS
* **Backend:** Next.js API Routes, Supabase
* **ORM:** Prisma
* **AI Integration:** Gemini AI (Receipt Scanning & Data Extraction)
* **Security:** Arcjet

---

##  Project Structure (High Level)

```bash
khatabook/
├── actions/ # Server actions (transactions, mutations)
├── app/ # Next.js App Router (pages, layouts, routes)
├── components/ # Reusable UI components
├── data/ # Static data & constants
├── hooks/ # Custom React hooks
├── lib/ # Utility functions & helpers
├── prisma/ # Prisma schema & database migrations
├── public/ # Static assets (images, icons)
├── .gitignore # Git ignored files
├── components.json # UI components configuration
├── eslint.config.mjs # ESLint configuration
├── jsconfig.json # JS path aliases & config
├── middleware.js # Next.js middleware (auth, protection)
├── next.config.mjs # Next.js configuration
├── postcss.config.mjs # PostCSS configuration
├── package.json # Project dependencies & scripts
├── package-lock.json # Dependency lock file
├── LICENSE # MIT License
└── README.md # Project documentation
```

---

##  Setup & Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/SarthakJain10/KhataBook.git
   cd KhataBook
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file and configure the following:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
   
   DATABASE_URL=
   DIRECT_URL=
   
   ARCJET_KEY=
   RESEND_API_KEY=
   GEMINI_API_KEY=
   ```

4. **Run database migrations**

   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

---

##  AI Receipt Scanner Workflow

1. User uploads a receipt image
2. Image is processed using Gemini AI
3. Transaction details (amount, date, merchant) are extracted
4. Data is validated and stored in the database
5. Analytics update in real time

---

##  Application Flowchart
<img width="2825" height="886" alt="Khatabook-flowchart" src="https://github.com/user-attachments/assets/a8580ee0-b4d2-4f5e-843c-c70b4ae3c1d3" />



---

## 🌱 Future Enhancements

* Budget planning & alerts
* Export reports (PDF/CSV)
* Multi-currency support
* Role-based access

---

##  Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

##  License

This project is licensed under the MIT License.

---

**Built with ❤️ by Sarthak Jain**
