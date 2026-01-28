"use client"

import { useState, useEffect, useRef } from "react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { LoaderIcon, SearchIcon, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface SearchResultsProps {
  searchQuery: string;
  isOpen: boolean;
  onClose: () => void;
}

export const SearchResults = ({ searchQuery, isOpen, onClose }: SearchResultsProps) => {
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const resultsRef = useRef<HTMLDivElement>(null);
  const trpc = useTRPC();

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, isLoading, error } = useQuery(
    trpc.products.getMany.queryOptions({
      search: debouncedQuery,
      limit: 5, // Limit results for dropdown
    })
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !searchQuery.trim()) {
    return null;
  }

  const products = data?.docs || [];
  const hasResults = products.length > 0;

  return (
    <div
      ref={resultsRef}
      className="absolute top-full left-0 right-0 mt-1 z-[99999]"
      style={{ zIndex: 99999 }}
    >
      <div className="bg-[#b19681] text-white border border-[#b19681] rounded-md shadow-2xl max-h-80 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="flex items-center space-x-3">
              <LoaderIcon className="h-5 w-5 animate-spin text-white" />
              <span className="text-sm text-white/80">Szukanie produktów...</span>
            </div>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <div className="text-white text-sm">
              Wystąpił błąd podczas wyszukiwania
            </div>
          </div>
        ) : !hasResults ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
              <SearchIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-white mb-1">Nie znaleziono produktów</p>
            <p className="text-xs text-white/70">
              Spróbuj innej frazy wyszukiwania
            </p>
          </div>
        ) : (
          <div className="overflow-y-auto max-h-80">
            <div className="p-3 border-b border-border/50">
              <p className="text-xs font-medium text-white/80">
                Znaleziono {products.length} {products.length === 1 ? 'produkt' : 'produktów'}
              </p>
            </div>
            
            <div className="divide-y divide-border/50">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="block p-3 hover:bg-white/10 transition-colors duration-150"
                  onClick={onClose}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg bg-muted/50 flex-shrink-0 overflow-hidden">
                      {product.image ? (
                        <Image
                          src={product.image.url}
                          alt={product.image.alt || product.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-6 h-6 rounded bg-muted" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-white truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-white/80 mt-0.5">
                        {formatCurrency(product.price)}
                      </p>
                    </div>
                    
                    <ArrowRight className="w-4 h-4 text-white/70 flex-shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
            
            {products.length >= 5 && (
              <div className="p-3 border-t border-white/20 bg-white/5">
                <Link
                  href={`/products?search=${encodeURIComponent(searchQuery)}`}
                  className="flex items-center justify-center space-x-2 text-sm font-medium text-white hover:text-white/80 transition-colors duration-150"
                  onClick={onClose}
                >
                  <span>Zobacz wszystkie wyniki</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
