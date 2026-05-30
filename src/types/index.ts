export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGalleryItemInput {
  title: string;
  description: string;
  imageFile: File;
}

export interface UpdateGalleryItemInput {
  id: string;
  title: string;
  description: string;
  imageFile?: File;
}
