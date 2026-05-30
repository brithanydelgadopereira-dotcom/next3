'use client';

import React, { useState, useEffect } from 'react';
import { X, Upload, Loader } from 'lucide-react';
import { GalleryItem } from '@/types';

interface FormModalProps {
  isOpen: boolean;
  isLoading: boolean;
  item?: GalleryItem;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    imageFile?: File;
  }) => void;
}

export function FormModal({
  isOpen,
  isLoading,
  item,
  onClose,
  onSubmit,
}: FormModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title,
        description: item.description,
      });
      setPreview(item.imageUrl);
    } else {
      setFormData({ title: '', description: '' });
      setPreview(null);
    }
    setSelectedFile(null);
  }, [item, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: formData.title,
      description: formData.description,
      imageFile: selectedFile || undefined,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50 p-4">
      <div
        className="animate-in rounded-xl overflow-hidden w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{
          background: 'var(--card-bg)',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-6">
          <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
            {item ? 'Editar Imagen' : 'Agregar Imagen'}
          </h2>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-1.5 rounded-lg transition-opacity"
            style={{ color: 'var(--foreground)', opacity: 0.35 }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.35')}
          >
            <X size={20} />
          </button>
        </div>

        <hr className="separator" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-7 space-y-6">
          {/* Image Preview */}
          {preview && (
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider mb-2.5" style={{ color: 'var(--foreground)', opacity: 0.5 }}>
                Vista previa
              </label>
              <img
                src={preview}
                alt="Preview"
                className="w-full h-52 object-cover rounded-lg"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              />
            </div>
          )}

          {/* File Input */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider mb-2.5" style={{ color: 'var(--foreground)', opacity: 0.5 }}>
              Imagen {item && '(opcional)'}
            </label>
            <div className="upload-dashed">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isLoading}
                className="hidden"
                id="image-input"
                required={!item}
              />
              <label
                htmlFor="image-input"
                className="flex flex-col items-center gap-3 cursor-pointer"
              >
                <div className="p-2.5 rounded-full" style={{ background: 'rgba(59, 130, 246, 0.08)' }}>
                  <Upload size={20} style={{ color: 'var(--primary)' }} />
                </div>
                <span className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.55 }}>
                  {selectedFile
                    ? selectedFile.name
                    : 'Seleccionar archivo'}
                </span>
                <span className="text-xs" style={{ color: 'var(--foreground)', opacity: 0.3 }}>
                  PNG, JPG o WebP
                </span>
              </label>
            </div>
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider mb-2.5" style={{ color: 'var(--foreground)', opacity: 0.5 }}>
              Título
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              disabled={isLoading}
              required
              className="input-modern"
              placeholder="Nombre de la imagen"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider mb-2.5" style={{ color: 'var(--foreground)', opacity: 0.5 }}>
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              disabled={isLoading}
              required
              rows={3}
              className="input-modern resize-none"
              placeholder="Breve descripción de la imagen"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="btn-icon-text flex-1 justify-center py-2.5"
              style={{
                border: '1px solid var(--border-light)',
                color: 'var(--foreground)',
                background: 'transparent',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-icon-text flex-1 justify-center py-2.5"
              style={{
                background: 'var(--primary)',
                color: '#fff',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--primary-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--primary)')}
            >
              {isLoading ? (
                <>
                  <Loader size={15} className="animate-spin" />
                  <span>Guardando...</span>
                </>
              ) : (
                <span>{item ? 'Actualizar' : 'Agregar'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}