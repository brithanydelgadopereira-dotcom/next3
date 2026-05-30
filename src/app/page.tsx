'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Plus, Loader } from 'lucide-react';
import { GalleryItem } from '@/types';
import { SearchBar } from '@/components/SearchBar';
import { GalleryCard } from '@/components/GalleryCard';
import { FormModal } from '@/components/FormModal';
import { DeleteModal } from '@/components/DeleteModal';

export default function Home() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingItems, setIsLoadingItems] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | undefined>();
  const [deletingItem, setDeletingItem] = useState<GalleryItem | undefined>();

  // Fetch gallery items
  useEffect(() => {
    fetchItems();
  }, [searchQuery]);

  const fetchItems = async () => {
    try {
      setIsLoadingItems(true);
      const url = new URL('/api/gallery', window.location.origin);
      if (searchQuery) {
        url.searchParams.set('search', searchQuery);
      }

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        // Transform API data to match GalleryItem interface
        const transformedData = data.map(
          (item: Record<string, unknown>) => ({
            id: item.id as string,
            title: item.title as string,
            description: item.description as string,
            imageUrl: item.image_url as string,
            createdAt: item.created_at as string,
            updatedAt: item.updated_at as string,
          })
        );
        setItems(transformedData);
      } else {
        toast.error('Failed to load images');
      }
    } catch (error) {
      console.error('Error fetching items:', error);
      toast.error('Error loading images');
    } finally {
      setIsLoadingItems(false);
    }
  };

  // Handle form submission for create/update
  const handleFormSubmit = async (formData: {
    title: string;
    description: string;
    imageFile?: File;
  }) => {
    try {
      setIsSubmitting(true);
      let imageUrl = editingItem?.imageUrl;

      // Upload image if provided
      if (formData.imageFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', formData.imageFile);

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });

        if (!uploadResponse.ok) {
          toast.error('Image upload failed');
          return;
        }

        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.url;
      }

      if (editingItem) {
        // Update existing item
        const response = await fetch(`/api/gallery/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            imageUrl,
          }),
        });

        if (response.ok) {
          toast.success('Image updated successfully!');
          setEditingItem(undefined);
          setIsModalOpen(false);
          fetchItems();
        } else {
          const errorData = await response.json();
          toast.error(errorData?.error || 'Failed to update image');
        }
      } else {
        // Create new item
        if (!imageUrl) {
          toast.error('Please upload an image');
          return;
        }

        const response = await fetch('/api/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            imageUrl,
          }),
        });

        if (response.ok) {
          toast.success('Image added successfully!');
          setIsModalOpen(false);
          fetchItems();
        } else {
          const errorData = await response.json();
          toast.error(errorData?.error || 'Failed to add image');
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (!deletingItem) return;

    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/gallery/${deletingItem.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Image deleted successfully!');
        setIsDeleteModalOpen(false);
        setDeletingItem(undefined);
        fetchItems();
      } else {
        toast.error('Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: GalleryItem) => {
    setDeletingItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingItem(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Gallery CRUD
            </h1>
            <button
              onClick={() => {
                setEditingItem(undefined);
                setIsModalOpen(true);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              <span>Add Image</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search images by title..."
        />

        {/* Loading State */}
        {isLoadingItems && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-2">
              <Loader className="animate-spin text-blue-500" size={32} />
              <p className="text-gray-600">Loading images...</p>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        {!isLoadingItems && items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <GalleryCard
                key={item.id}
                item={item}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoadingItems && items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">
              {searchQuery
                ? 'No images found matching your search.'
                : 'No images yet. Click "Add Image" to get started!'}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-blue-500 hover:text-blue-600 underline"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      <FormModal
        isOpen={isModalOpen}
        isLoading={isSubmitting}
        item={editingItem}
        onClose={handleModalClose}
        onSubmit={handleFormSubmit}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        isLoading={isSubmitting}
        item={deletingItem}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingItem(undefined);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
