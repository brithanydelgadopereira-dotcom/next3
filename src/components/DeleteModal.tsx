'use client';

import React from 'react';
import { AlertCircle, Loader } from 'lucide-react';
import { GalleryItem } from '@/types';

interface DeleteModalProps {
  isOpen: boolean;
  isLoading: boolean;
  item?: GalleryItem;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteModal({
  isOpen,
  isLoading,
  item,
  onClose,
  onConfirm,
}: DeleteModalProps) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50 p-4">
      <div
        className="animate-in rounded-xl overflow-hidden w-full max-w-md"
        style={{
          background: 'var(--card-bg)',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-7 py-6">
          <div className="p-2 rounded-full" style={{ background: 'rgba(239, 68, 68, 0.08)' }}>
            <AlertCircle size={20} style={{ color: 'var(--danger)' }} />
          </div>
          <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
            Eliminar Imagen
          </h2>
        </div>

        <hr className="separator" />

        {/* Content */}
        <div className="px-7 py-6">
          <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
            ¿Estás seguro de que deseas eliminar{' '}
            <strong style={{ color: 'var(--foreground)' }}>"{item.title}"</strong>?
          </p>
          <p className="mt-3 text-xs" style={{ color: 'var(--foreground)', opacity: 0.4 }}>
            Esta acción no se puede deshacer.
          </p>
        </div>

        <hr className="separator" />

        {/* Actions */}
        <div className="flex gap-3 px-7 py-5">
          <button
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
            onClick={onConfirm}
            disabled={isLoading}
            className="btn-icon-text flex-1 justify-center py-2.5"
            style={{
              background: 'var(--danger)',
              color: '#fff',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--danger-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--danger)')}
          >
            {isLoading ? (
              <>
                <Loader size={15} className="animate-spin" />
                <span>Eliminando...</span>
              </>
            ) : (
              <span>Eliminar</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}