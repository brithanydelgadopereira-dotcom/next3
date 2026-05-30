# Gallery CRUD - Complete Setup Guide

This comprehensive guide will help you set up and deploy your Gallery CRUD application.

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
Ensure you have:
- Node.js 18.17+ installed
- npm or yarn
- A code editor (VS Code recommended)

### 2. Install Dependencies
```bash
cd next3
npm install
```

### 3. Set Up Environment Variables
Create `.env.local` in the project root:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_key_here
BLOB_READ_WRITE_TOKEN=your_blob_token_here
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Database Setup (Supabase)

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details:
   - **Name**: gallery-crud (or your preference)
   - **Password**: Create a strong password
   - **Region**: Choose closest to you
4. Click "Create new project"
5. Wait 2-3 minutes for provisioning

### Step 2: Create Database Tables

1. In Supabase Dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy all content from `DATABASE_SCHEMA.sql`
4. Paste it into the editor
5. Click "Run" (▶️)
6. Verify no errors appear

### Step 3: Get API Credentials

1. In Supabase Dashboard, go to **Settings** → **API**
2. Copy these values to `.env.local`:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `Anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `Service role key` → `SUPABASE_SERVICE_ROLE_KEY`

### Step 4: Enable Row Level Security (Optional)

For public gallery access without authentication:

1. Go to **Authentication** → **Policies**
2. For `gallery_items` table, ensure "Allow all" policies exist
3. Or copy the RLS policies from `DATABASE_SCHEMA.sql`

---

## 📦 Vercel Blob Setup

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in with GitHub
3. Create a team (or use personal)

### Step 2: Get Blob Token

**Option A: From Vercel Dashboard**
1. Go to **Settings** → **Tokens**
2. Click "Create new token"
3. Select scope: Full Access
4. Copy the token
5. Add to `.env.local` as `BLOB_READ_WRITE_TOKEN`

**Option B: Using Vercel CLI (Recommended)**
```bash
npm i -g vercel
vercel link
```
This automatically sets up blob storage for your project.

### Step 3: Test Image Upload

The upload endpoint is ready at `/api/upload`. It will:
1. Accept multipart form data
2. Upload to Vercel Blob
3. Return public URL

---

## 🚢 Deploy to Vercel

### Step 1: Prepare Repository

```bash
# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Gallery CRUD application"

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. Click "Import"
5. Configure project:
   - **Framework**: Next.js (auto-detected)
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next

### Step 3: Add Environment Variables

1. Click "Environment Variables"
2. Add all variables from `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `BLOB_READ_WRITE_TOKEN`

> ⚠️ **Note**: Variables starting with `NEXT_PUBLIC_` are visible in browser. Never commit secrets to Git.

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Your app is live! 🎉

---

## 🔐 Security Checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] Service role key is never committed
- [ ] RLS policies are configured in Supabase
- [ ] CORS is properly configured
- [ ] API validation is in place
- [ ] File upload validation exists
- [ ] Database backups are enabled

---

## 📱 Features Testing Guide

### ✅ Create Image
1. Click "Add Image" button
2. Select an image from your computer
3. Enter title and description
4. Click "Add Image"
5. Verify toast notification
6. Refresh to see new image

### ✅ Edit Image
1. Click "Edit" on any image card
2. Modify title/description (or both)
3. Optionally upload new image
4. Click "Update Image"
5. Verify changes appear

### ✅ Delete Image
1. Click "Delete" on any image card
2. Confirm in modal
3. Verify image is removed
4. Check toast notification

### ✅ Search
1. Enter any text in search box
2. Results update in real-time
3. Click "Clear search" to reset

### ✅ Responsive Design
1. Test on desktop (full width)
2. Test on tablet (2 columns)
3. Test on mobile (1 column)

---

## 🐛 Troubleshooting

### Images Not Uploading
**Problem**: File upload fails
**Solution**:
- Check `BLOB_READ_WRITE_TOKEN` is correct
- Verify Vercel Blob is enabled in project
- Check browser console for error details
- Test with smaller image file

### Database Connection Error
**Problem**: "Failed to load images"
**Solution**:
- Verify Supabase URL and API key
- Check database is running in Supabase
- Verify RLS policies allow access
- Check network tab in DevTools

### Build Fails on Vercel
**Problem**: Deployment fails
**Solution**:
- Check all environment variables are set
- Run `npm run build` locally to reproduce
- Check build logs in Vercel dashboard
- Ensure `DATABASE_SCHEMA.sql` was executed

### TypeScript Errors
**Problem**: Build fails with TS errors
**Solution**:
- Run `npm run build` locally
- Fix any type errors
- Ensure all imports are correct

---

## 📚 Project Structure

```
next3/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── gallery/
│   │   │   │   ├── route.ts          # GET all, POST new
│   │   │   │   └── [id]/route.ts     # GET, PUT, DELETE item
│   │   │   └── upload/
│   │   │       └── route.ts          # POST image to Blob
│   │   ├── layout.tsx                # Root layout + Toaster
│   │   ├── page.tsx                  # Main gallery page
│   │   └── globals.css               # Global styles
│   ├── components/
│   │   ├── SearchBar.tsx             # Search component
│   │   ├── GalleryCard.tsx           # Gallery card
│   │   ├── FormModal.tsx             # Add/Edit modal
│   │   └── DeleteModal.tsx           # Delete confirmation
│   ├── lib/
│   │   └── supabase.ts               # Supabase client
│   └── types/
│       └── index.ts                  # TypeScript types
├── public/                            # Static files
├── DATABASE_SCHEMA.sql                # Supabase schema
├── .env.local                         # Local env variables
├── .env.example                       # Template for env vars
├── vercel.json                        # Vercel config
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript config
└── README.md                          # Project readme
```

---

## 🎨 Customization

### Change Grid Columns
In [src/app/page.tsx](src/app/page.tsx), modify grid classes:
```tsx
// Line ~212
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// Change lg:grid-cols-4 to lg:grid-cols-3 for 3 columns, etc.
```

### Modify Colors
Update Tailwind classes in components:
- Primary blue: `bg-blue-500` → change to `bg-green-500`, etc.
- Secondary colors: `bg-red-500`, `bg-gray-50`, etc.

### Add More Fields
1. Update `DATABASE_SCHEMA.sql` to add columns
2. Update `GalleryItem` interface in [src/types/index.ts](src/types/index.ts)
3. Update API routes to handle new fields
4. Update components to display/edit new fields

---

## 📈 Performance Tips

1. **Image Optimization**
   - Next.js automatically optimizes images
   - Use formats: JPEG, PNG, WebP
   - Recommended max size: 5MB per image

2. **Database Indexes**
   - Already created on `title` and `created_at`
   - Add more if needed

3. **Caching**
   - API responses can be cached with SWR
   - Implement Next.js data revalidation

4. **Lazy Loading**
   - Images load as user scrolls
   - Implement with Intersection Observer API

---

## 🔄 CI/CD Pipeline

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

---

## 📞 Support & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Blob Docs](https://vercel.com/docs/storage/vercel-blob)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Hot Toast Docs](https://react-hot-toast.com)

---

## 📄 License

MIT License - Feel free to use commercially

---

## ✨ Next Steps

1. ✅ Set up Supabase project
2. ✅ Configure Vercel Blob
3. ✅ Add environment variables
4. ✅ Run locally: `npm run dev`
5. ✅ Deploy to Vercel
6. ✅ Share your gallery!

Happy building! 🎨
