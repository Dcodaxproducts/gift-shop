"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Image, { ImageProps, StaticImageData } from "next/image";

interface MyImageProps extends Omit<ImageProps, "src"> {
  src?: string | StaticImageData | File | null;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

const LOADED_IMAGE_CACHE = new Set<string>();

const normalizeUrl = (url: string) => {
  return url.replace(/([^:]\/)\/+/g, "$1");
};

const MyImage = ({
  src,
  alt,
  className,
  fallbackSrc = "/fallback.png",
  fill,
  ...rest
}: MyImageProps) => {
  const resolvedSrc = typeof src === "string" ? normalizeUrl(src) : src;
  const srcKey = typeof resolvedSrc === "string" ? resolvedSrc : "";

  if (!resolvedSrc) {
    return (
      <Image
        src={fallbackSrc}
        alt={alt}
        fill={fill}
        className={cn("object-cover", className)}
        {...rest}
      />
    );
  }

  return (
    <ImageWithLoadingState
      key={srcKey || "static-image"}
      src={resolvedSrc}
      srcKey={srcKey}
      alt={alt}
      className={className}
      fallbackSrc={fallbackSrc}
      fill={fill}
      {...rest}
    />
  );
};

type ImageWithLoadingStateProps = Omit<MyImageProps, "src"> & {
  src: string | StaticImageData | File;
  srcKey: string;
};

function ImageWithLoadingState({
  src,
  srcKey,
  alt,
  className,
  fallbackSrc = "/fallback.png",
  fill,
  ...rest
}: ImageWithLoadingStateProps) {
  const isAlreadyLoaded = srcKey ? LOADED_IMAGE_CACHE.has(srcKey) : false;
  const [isLoading, setIsLoading] = useState(!isAlreadyLoaded);
  const [isError, setIsError] = useState(false);

  if (isError) {
    return (
      <Image
        src={fallbackSrc}
        alt={alt}
        fill={fill}
        className={cn("object-cover", className)}
        {...rest}
      />
    );
  }

  // For fill mode: parent already has position:relative, shimmer uses absolute
  if (fill) {
    return (
      <>
        {isLoading && (
          <div className={cn("absolute inset-0 bg-gray-200 animate-shimmer z-10", className)} />
        )}
        <Image
          src={src as string}
          alt={alt}
          fill
          className={cn(
            "object-cover",
            !isAlreadyLoaded && "transition-opacity duration-500 ease-in-out",
            isLoading ? "opacity-0" : "opacity-100",
            className
          )}
          onLoadingComplete={() => {
            if (srcKey) LOADED_IMAGE_CACHE.add(srcKey);
            setIsLoading(false);
          }}
          onError={() => {
            setIsError(true);
            setIsLoading(false);
          }}
          {...rest}
        />
      </>
    );
  }

  // For non-fill mode: wrap in relative div so shimmer overlays image, not beside it
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-shimmer z-10" />
      )}
      <Image
        src={src as string}
        alt={alt}
        className={cn(
          "object-cover w-full h-full",
          !isAlreadyLoaded && "transition-opacity duration-500 ease-in-out",
          isLoading ? "opacity-0" : "opacity-100",
        )}
        onLoadingComplete={() => {
          if (srcKey) LOADED_IMAGE_CACHE.add(srcKey);
          setIsLoading(false);
        }}
        onError={() => {
          setIsError(true);
          setIsLoading(false);
        }}
        {...rest}
      />
    </div>
  );
}

export default MyImage;
