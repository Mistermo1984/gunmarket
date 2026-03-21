interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default function LazyImage({ src, alt, className, priority = false }: LazyImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={(e) => {
        (e.target as HTMLImageElement).src = "/placeholder-weapon.svg";
      }}
    />
  );
}
