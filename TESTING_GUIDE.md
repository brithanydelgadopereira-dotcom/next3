# Gallery CRUD - Testing Guide

Complete testing checklist for the Gallery CRUD application.

## ✅ Pre-Deployment Testing

### 1. Local Development Testing

#### Build Verification
```bash
npm run build
```
✓ Should complete without errors
✓ Should generate `.next` folder
✓ Should create TypeScript types

#### Dev Server Testing
```bash
npm run dev
```
✓ Should start at http://localhost:3000
✓ Should show no TypeScript errors
✓ Should show no build errors

---

## 🧪 Feature Testing Checklist

### Before Testing Requirements
- [ ] Supabase project created and credentials set in `.env.local`
- [ ] Database schema executed in Supabase
- [ ] Vercel Blob token set in `.env.local`
- [ ] Development server running (`npm run dev`)

### UI Component Tests

#### 1. Navigation Bar
- [ ] Title "Gallery CRUD" displays
- [ ] "Add Image" button is visible
- [ ] Sticky positioning works on scroll
- [ ] Button is responsive on mobile

#### 2. Search Functionality
- [ ] Search input accepts text
- [ ] Results filter in real-time
- [ ] Search icon displays correctly
- [ ] Placeholder text shows "Search images by title..."
- [ ] Clear search works when clicking results

#### 3. Gallery Grid
- [ ] Displays 4 columns on desktop (1920px+)
- [ ] Displays 2 columns on tablet (768px)
- [ ] Displays 1 column on mobile (< 768px)
- [ ] Images scale properly
- [ ] Card hover effects work
- [ ] Images load with proper aspect ratio

#### 4. Gallery Cards
- [ ] Image displays with proper dimensions
- [ ] Title shows (truncated if long)
- [ ] Description shows (truncated if long)
- [ ] Edit button is visible and styled
- [ ] Delete button is visible and styled
- [ ] Buttons have hover effects

### Modal Tests

#### 5. Create Modal
- [ ] Opens when clicking "Add Image"
- [ ] Modal title shows "Add Image"
- [ ] Close button (X) closes modal
- [ ] File upload area displays with icon
- [ ] File input accepts only images
- [ ] Image preview shows selected image
- [ ] Title input is required
- [ ] Description input is required
- [ ] "Add Image" button submits form
- [ ] Cancel button closes without saving

#### 6. Edit Modal
- [ ] Opens when clicking Edit button
- [ ] Modal title shows "Edit Image"
- [ ] Pre-fills with current data
- [ ] Image preview shows current image
- [ ] Can upload new image (optional)
- [ ] "Update Image" button saves changes
- [ ] Changes appear in gallery immediately
- [ ] Loading spinner appears during submission

#### 7. Delete Modal
- [ ] Opens when clicking Delete button
- [ ] Shows image title in confirmation message
- [ ] Cancel button closes without deleting
- [ ] Confirm button deletes item
- [ ] Item removes from gallery
- [ ] Success toast appears

### CRUD Operations

#### 8. Create (Add Image)
1. Click "Add Image"
2. Upload an image file
3. Enter title: "Test Image"
4. Enter description: "Test Description"
5. Click "Add Image"
- [ ] Toast shows "Image added successfully!"
- [ ] Modal closes
- [ ] Gallery updates with new image
- [ ] New image appears in gallery
- [ ] Image is stored in Vercel Blob
- [ ] Data is stored in Supabase

#### 9. Read (View Images)
1. Refresh page
- [ ] Previous images still display
- [ ] Images load from Supabase
- [ ] Images load from Vercel Blob
- [ ] No loading spinner after data loads
- [ ] Gallery shows all images

#### 10. Update (Edit Image)
1. Click Edit on any image
2. Change title: "Updated Title"
3. Keep description same
4. Click "Update Image"
- [ ] Toast shows "Image updated successfully!"
- [ ] Modal closes
- [ ] Updated title displays
- [ ] Other cards unchanged

#### 11. Delete (Remove Image)
1. Click Delete on any image
2. Confirm in modal
- [ ] Toast shows "Image deleted successfully!"
- [ ] Image removed from gallery
- [ ] Modal closes
- [ ] Image removed from Supabase
- [ ] Image removed from Blob storage

### Search Tests

#### 12. Search Functionality
1. Type "test" in search box
- [ ] Only images with "test" in title show
2. Clear search
- [ ] All images display again
3. Type non-existent text
- [ ] "No images found" message shows
4. Clear search from message
- [ ] All images display again

### Notification Tests

#### 13. Toast Notifications
- [ ] Success toast appears (green, 3s duration)
- [ ] Error toast appears (red, 3s duration)
- [ ] Toast position is top-right
- [ ] Multiple toasts stack
- [ ] Toasts close automatically
- [ ] Toasts don't interfere with UI

### Loading States

#### 14. Loading Animations
- [ ] Spinner shows while fetching images
- [ ] Spinner shows while uploading image
- [ ] Spinner shows during submit
- [ ] Buttons disabled during loading
- [ ] Form inputs disabled during loading

### Responsive Design

#### 15. Mobile Testing (< 480px)
- [ ] Navigation doesn't overflow
- [ ] "Add Image" button readable
- [ ] Search input full width
- [ ] Gallery shows 1 column
- [ ] Modals fit on screen
- [ ] No horizontal scrolling

#### 16. Tablet Testing (768px - 1024px)
- [ ] Gallery shows 2 columns
- [ ] Navigation centered properly
- [ ] Modals centered and visible
- [ ] Images proportional

#### 17. Desktop Testing (1920px+)
- [ ] Gallery shows 4 columns
- [ ] Full-width utilization
- [ ] No unnecessary spacing
- [ ] Modals appropriately sized

### Browser Compatibility

#### 18. Chrome/Edge
- [ ] All features work
- [ ] No console errors
- [ ] Images load
- [ ] Modals function

#### 19. Firefox
- [ ] All features work
- [ ] File upload works
- [ ] Styling renders correctly
- [ ] No warnings

#### 20. Safari
- [ ] Images display
- [ ] Modals work
- [ ] File upload compatible
- [ ] No rendering issues

---

## 🚀 Performance Testing

### 21. Load Performance
- [ ] Page loads in < 2 seconds
- [ ] Gallery renders smoothly
- [ ] No janky animations
- [ ] Scroll is smooth
- [ ] No layout shift

### 22. Image Performance
- [ ] Images load quickly
- [ ] Large images optimized
- [ ] Lazy loading works
- [ ] No oversized images
- [ ] Proper dimensions

### 23. API Performance
- [ ] GET /api/gallery responds < 500ms
- [ ] POST /api/gallery responds < 1s
- [ ] PUT /api/gallery/[id] responds < 1s
- [ ] DELETE /api/gallery/[id] responds < 500ms
- [ ] /api/upload responds < 2s

---

## 🔒 Security Testing

### 24. Input Validation
- [ ] Empty title rejected
- [ ] Empty description rejected
- [ ] File type validation works
- [ ] File size validation works
- [ ] SQL injection attempts blocked
- [ ] XSS attempts blocked

### 25. Authentication & Authorization
- [ ] RLS policies enforced
- [ ] Unauthorized requests blocked
- [ ] Service role key not exposed
- [ ] API keys not in browser console
- [ ] No sensitive data in localStorage

### 26. Data Protection
- [ ] Deleted images cannot be recovered (intentionally)
- [ ] Edit doesn't affect other items
- [ ] Delete doesn't affect other items
- [ ] Concurrent uploads handled
- [ ] Race conditions prevented

---

## 🐛 Error Handling

### 27. Network Errors
- Disable internet temporarily
- [ ] Graceful error message appears
- [ ] Toast shows error
- [ ] App remains functional
- [ ] Retry works after reconnect

### 28. Invalid Input
- [ ] Non-image files rejected
- [ ] Oversized files rejected
- [ ] Missing fields blocked
- [ ] Invalid URLs handled
- [ ] Errors shown in modals

### 29. Server Errors
- [ ] 400 errors handled
- [ ] 404 errors handled
- [ ] 500 errors handled
- [ ] User-friendly messages shown
- [ ] No stack traces in UI

---

## 📊 Deployment Testing

### Before Deploying to Vercel

1. Run production build
```bash
npm run build
npm run start
```

2. Check build output
- [ ] No warnings
- [ ] All routes compiled
- [ ] Size reasonable

3. Environment variables
- [ ] All required vars set
- [ ] No sensitive data in code
- [ ] .env.local in .gitignore

### After Deploying to Vercel

4. Test deployed site
- [ ] Homepage loads
- [ ] All API routes work
- [ ] Images upload and display
- [ ] Search works
- [ ] CRUD operations work

5. Monitor performance
- [ ] Page speed > 80 LCP score
- [ ] No TypeScript errors
- [ ] No runtime errors
- [ ] No network errors

---

## 📋 Testing Checklist Summary

| Component | Tested | Passed | Notes |
|-----------|--------|--------|-------|
| Build | [ ] | [ ] | |
| Dev Server | [ ] | [ ] | |
| Create Modal | [ ] | [ ] | |
| Edit Modal | [ ] | [ ] | |
| Delete Modal | [ ] | [ ] | |
| Create Item | [ ] | [ ] | |
| Read Items | [ ] | [ ] | |
| Update Item | [ ] | [ ] | |
| Delete Item | [ ] | [ ] | |
| Search | [ ] | [ ] | |
| Mobile (480px) | [ ] | [ ] | |
| Tablet (768px) | [ ] | [ ] | |
| Desktop (1920px) | [ ] | [ ] | |
| Chrome | [ ] | [ ] | |
| Firefox | [ ] | [ ] | |
| Safari | [ ] | [ ] | |
| Performance | [ ] | [ ] | |
| Security | [ ] | [ ] | |
| Error Handling | [ ] | [ ] | |
| Production Build | [ ] | [ ] | |
| Deployed Site | [ ] | [ ] | |

---

## 🎯 Critical Path Tests

Must pass before deployment:

1. **User can create an image**
   - Upload file → See in gallery → Find in database

2. **User can search images**
   - Create image → Search by title → Results filter

3. **User can edit image**
   - Create → Edit title → Changes appear

4. **User can delete image**
   - Create → Delete → Confirm → Image gone

5. **Deployed site works**
   - All above on production Vercel URL

---

## 📝 Test Results Template

```
Date: ___________
Tester: ________
Environment: [ ] Local [ ] Staging [ ] Production
Browser: __________ Version: __________

Overall Status: [ ] PASS [ ] FAIL

Issues Found:
1. ___________________________
2. ___________________________

Performance Notes:
- Page Load: _______ ms
- API Response: _______ ms
- LCP Score: _______

Approved for Deployment: [ ] Yes [ ] No
```

---

Happy Testing! 🧪
