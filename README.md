# Gallery CRUD Application

A modern, fully-featured image gallery CRUD application built with Next.js 16.2.6, Tailwind CSS 4.3, PostgreSQL (Supabase), and Vercel Blob storage.

## Features

- ✅ **CRUD Operations**: Create, read, update, and delete images
- ✅ **4-Column Gallery Layout**: Responsive grid layout with 4 columns on desktop
- ✅ **Image Upload**: Upload images from your computer to Vercel Blob
- ✅ **Search Functionality**: Search images by title in real-time
- ✅ **Modal Forms**: Dynamic modals for creating and editing images
- ✅ **Icons & Animations**: Loading spinners, smooth transitions, and Lucide React icons
- ✅ **Toast Notifications**: User-friendly notifications for all actions
- ✅ **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- ✅ **PostgreSQL Integration**: Supabase for secure data storage
- ✅ **Vercel Ready**: Optimized for Vercel deployment

## Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager
- Supabase account (free tier available)
- Vercel account (for Blob storage)
- GitHub account (for version control)

## Setup Instructions

### 1. Clone and Install

```bash
# Navigate to the project folder
cd next3

# Install dependencies
npm install
```

### 2. Supabase Setup

1. **Create a Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for it to be provisioned

2. **Run the Database Schema**:
   - Open the Supabase SQL Editor
   - Copy and paste the contents of `DATABASE_SCHEMA.sql`
   - Execute the script

3. **Get Your Credentials**:
   - In Supabase Dashboard, go to Settings → API
   - Copy the `Project URL` and `Anon Public Key`
   - Also copy the `Service Role Key` (keep it secret!)

### 3. Vercel Blob Setup

1. **Create a Vercel Account**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in or create an account

2. **Get Blob Token**:
   - In Vercel Dashboard, go to Settings → Tokens
   - Create a new token or use the default
   - Copy the `BLOB_READ_WRITE_TOKEN`

### 4. Environment Variables

Create a `.env.local` file in the root directory and add:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Vercel Blob
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token

# Database (optional)
DATABASE_URL=your_supabase_database_url
```

### 5. Local Development

```bash
# Start the development server
npm run dev

# The app will be available at http://localhost:3000
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── gallery/           # Gallery endpoints
│   │   │   ├── route.ts       # GET (list), POST (create)
│   │   │   └── [id]/route.ts  # GET, PUT, DELETE individual items
│   │   └── upload/            # Image upload endpoint
│   ├── layout.tsx             # Root layout with Toaster
│   ├── page.tsx               # Main gallery page
│   └── globals.css            # Global styles
├── components/
│   ├── SearchBar.tsx          # Search component
│   ├── GalleryCard.tsx        # Gallery card component
│   ├── FormModal.tsx          # Add/Edit modal
│   └── DeleteModal.tsx        # Delete confirmation modal
├── lib/
│   └── supabase.ts            # Supabase client
├── types/
│   └── index.ts               # TypeScript types
```

## Deployment on Vercel

### Prerequisites
- GitHub account
- GitHub repository with this code

### Steps

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/your-repo.git
git branch -M main
git push -u origin main
```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js
   - Add environment variables in "Environment Variables" section:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `BLOB_READ_WRITE_TOKEN`
   - Click "Deploy"

3. **Set up Vercel Blob**:
   - The `BLOB_READ_WRITE_TOKEN` is automatically available if you sign in with Vercel
   - Make sure to add it to environment variables

## API Endpoints

### Gallery Routes
- `GET /api/gallery` - Get all images (with optional search parameter)
- `GET /api/gallery/[id]` - Get a single image
- `POST /api/gallery` - Create a new image
- `PUT /api/gallery/[id]` - Update an image
- `DELETE /api/gallery/[id]` - Delete an image

### Upload Route
- `POST /api/upload` - Upload image to Vercel Blob

## Technologies Used

- **Frontend**: React 19, Next.js 16.2.6, TypeScript
- **Styling**: Tailwind CSS 4.3, Bootstrap
- **Icons**: Lucide React, React Icons
- **Notifications**: React Hot Toast
- **Database**: PostgreSQL (via Supabase)
- **Storage**: Vercel Blob
- **Deployment**: Vercel

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Tips

1. **Image Optimization**: Images are optimized automatically by Next.js Image component
2. **API Caching**: Implement cache headers for better performance
3. **Database Indexes**: The schema includes indexes on frequently queried columns
4. **Lazy Loading**: Images are lazy-loaded as you scroll

## Security Best Practices

1. **Environment Variables**: Never commit `.env.local` to version control
2. **RLS Policies**: Supabase RLS is enabled - configure based on your needs
3. **CORS**: Make sure to configure CORS in Supabase if needed
4. **File Validation**: Validate file types and sizes on upload

## Troubleshooting

### Images not uploading
- Check `BLOB_READ_WRITE_TOKEN` is set correctly
- Verify Vercel Blob is enabled in your Vercel project
- Check browser console for error messages

### Database errors
- Ensure `DATABASE_SCHEMA.sql` has been run
- Verify Supabase credentials in `.env.local`
- Check RLS policies are correctly configured

### CORS issues
- Update Supabase project settings to allow your domain
- Ensure API routes are correctly configured

## Future Enhancements

- [ ] User authentication
- [ ] Image tags and categories
- [ ] Drag and drop to reorder
- [ ] Image cropping and editing
- [ ] Bulk upload
- [ ] Image filtering by date
- [ ] Dark mode
- [ ] Advanced search with filters
- [ ] Image analytics
- [ ] API documentation with Swagger

## License

MIT License - feel free to use this project for personal or commercial purposes

## Support

For issues or questions:
1. Check the GitHub Issues
2. Review the Vercel documentation
3. Check Supabase documentation
4. Review the Next.js documentation

---

Happy creating! 🎨
"# next3" 
"# next3" 
"# next3" 
"# next3" 
"# next3" 
