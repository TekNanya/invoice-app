# 🧾 Invoice Management App — HNG14 Stage 2

A fully functional, responsive **Invoice Management Application** built using **React**, implementing complete CRUD operations, advanced form validation, state persistence, and a polished UI based on the provided Figma design.

---

## 🚀 Live Links

* 🔗 **Live Demo:** https://your-live-url.vercel.app
* 📂 **GitHub Repository:** https://github.com/TekNanya/invoice-app.git

---

## 🎯 Objective

This project fulfills all requirements of the **Frontend Wizards — Stage 2 Task**, including:

* Full CRUD operations
* Draft & payment workflow
* Status-based filtering
* Light/Dark theme toggle
* Persistent data storage
* Fully responsive UI
* Accessibility best practices

---

## 🛠 Core Features

### 🧩 CRUD Functionality

* Create invoices with dynamic item list
* View all invoices and detailed pages
* Edit existing invoices
* Delete invoices with confirmation modal

---

### ✅ Form Validation

* Required fields enforced
* Email format validation
* At least one invoice item required
* Quantity & price must be positive
* Inline errors + auto-scroll to first error

---

### 📄 Draft & Payment Flow

* Draft → Pending → Paid lifecycle
* Drafts can bypass validation
* Pending invoices can be marked as Paid
* Paid invoices are locked

---

### 🔍 Filter by Status

* Filter: **All / Draft / Pending / Paid**
* Instant UI updates
* Empty state handling

---

### 🌙 Light / Dark Mode

* Global theme toggle
* Stored in LocalStorage
* Fully responsive across components

---

### 📱 Responsive Design

* Mobile (320px+)
* Tablet (768px+)
* Desktop (1024px+)
* No layout breaking or overflow

---

### ✨ UI & Interactions

* Hover states on all interactive elements
* Smooth animations using Framer Motion

---

## 🏗 Architecture

### 📂 Project Structure

```bash
src/
 ├── assets/
 ├── components/
 │   ├── Form/
 │   │   ├── InvoiceForm.jsx
 │   │   ├── FormItem.jsx
 │   │   ├── ItemInput.jsx
 │   │
 │   ├── DeleteModal.jsx
 │   ├── EmptyState.jsx
 │   ├── Filter.jsx
 │   ├── InvoiceCard.jsx
 │   ├── Sidebar.jsx
 │   ├── StatusBadge.jsx
 │
 ├── hooks/
 │   └── useInvoiceForm.js
 │
 ├── pages/
 │   ├── Home.jsx
 │   └── InvoiceDetail.jsx
 │
 ├── utils/
 │   ├── format.js
 │   └── invoiceHelpers.js
 │
 ├── data/
 │   └── data.json
 │
 ├── App.jsx
 └── index.css
```

---

## ⚙️ Tech Stack

* **React** — SPA framework
* **Tailwind CSS** — Styling
* **Framer Motion** — Animations
* **Context API** — State management
* **LocalStorage** — Persistence

---

## ⚖️ Design Decisions & Trade-offs

* **Custom Hook (`useInvoiceForm`)**
  Extracted form logic for better separation and reusability.

* **Component-based form structure**
  (`FormItem`, `ItemInput`) to keep large forms maintainable.

* **LocalStorage instead of backend**
  Meets requirement while simplifying deployment.

---

## ♿ Accessibility (A11y)

* Semantic HTML structure
* Proper `<label>` usage
* Keyboard navigation support
* ESC key closes modal/drawer
* Accessible buttons with `aria-label`
* WCAG-compliant color contrast

---

## 🧪 Acceptance Checklist

✔ CRUD operations
✔ Form validation
✔ Status workflow
✔ Filtering
✔ Theme persistence
✔ Responsive layout
✔ Clean structure
✔ No console errors
✔ Accessibility

---

## ⚙️ Setup Instructions

### 1. Clone repo

```bash
git clone https://github.com/TekNanya/invoice-app.git 
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run app

```bash
npm run dev
```

### 4. Build project

```bash
npm run build
```

---

## 🚀 Future Improvements

* Backend integration (Node / Express / DB)
* Authentication system
* Export invoices as PDF
* Pagination / search
* Testing (Jest / React Testing Library)

---

## AUTHOR

* **Name:** BELONWU CHIDUMEBI


---
