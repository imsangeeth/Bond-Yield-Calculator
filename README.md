## Bond Yield Calculator

This project is a small full-stack Bond Yield Calculator with:

- **Backend**: NestJS-style TypeScript service with a `/bond/calculate` REST endpoint
- **Frontend**: React + TypeScript single-page app built with Vite

### Backend (bond-yield-backend)

- Location: `backend/`
- Entry: `src/main.ts`
- Core logic in `src/bond/bond.service.ts`
  - Current yield
  - Yield to maturity using **binary search** over the discount rate, relying on the fact that the bond pricing function is monotonically decreasing in the yield, which guarantees deterministic convergence.
  - Total interest
  - Premium/Discount/Par classification
  - Cash flow schedule generation

**Run backend:**

```bash
cd backend
npm install
npm run build
npm start
```

The backend listens on `http://localhost:3000`.

### Frontend (bond-yield-frontend)

- Location: `frontend/`
- Entry: `src/main.tsx`
- Calls `POST /bond/calculate` and displays:
  - Current yield
  - Yield to maturity
  - Total interest
  - Premium/Discount/Par
  - Full cash flow schedule table

**Run frontend:**

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies `/bond` calls to the backend.

