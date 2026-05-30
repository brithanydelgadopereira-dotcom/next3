'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Buscar por título...',
}: SearchBarProps) {
  return (
    <div className="mb-10">
      <div className="relative max-w-md mx-auto">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2"
          size={17}
          style={{ color: 'var(--foreground)', opacity: 0.25 }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="input-modern pl-10 pr-4 py-3 rounded-lg"
          style={{
            background: 'var(--card-bg)',
            boxShadow: 'var(--shadow-sm)',
          }}
        />
      </div>
    </div>
  );
}