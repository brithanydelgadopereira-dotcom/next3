'use client';

import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { GalleryItem } from '@/types';
import Image from 'next/image';

interface GalleryCardProps {
  item: GalleryItem;
  onEdit: (item: GalleryItem) => void;
  onDelete: (item: GalleryItem) => void;
}

export function GalleryCard({ item, onEdit, onDelete }: GalleryCardProps) {
  return (
    <div className="card-modern flex flex-col">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden" style={{ background: 'var(--background)' }}>
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500"
          style={{ transform: 'scale(1)' }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="text-base font-semibold mb-2 leading-snug line-clamp-1"
          style={{ color: 'var(--foreground)' }}
        >
          {item.title}
        </h3>
        <p
          className="text-sm leading-relaxed mb-5 line-clamp-2"
          style={{ color: 'var(--foreground)', opacity: 0.55 }}
        >
          {item.description}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2.5 mt-auto">
          <button
            onClick={() => onEdit(item)}
            className="btn-icon-text flex-1 justify-center py-2.5"
            style={{
              background: 'var(--primary)',
              color: '#fff',
              fontSize: '0.8rem',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--primary-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--primary)')}
          >
            <Edit2 size={14} />
            <span>Editar</span>
          </button>
          <button
            onClick={() => onDelete(item)}
            className="btn-icon-text flex-1 justify-center py-2.5"
            style={{
              background: 'var(--danger)',
              color: '#fff',
              fontSize: '0.8rem',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--danger-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--danger)')}
          >
            <Trash2 size={14} />
            <span>Eliminar</span>
          </button>
        </div>
      </div>
    </div>
  );
}