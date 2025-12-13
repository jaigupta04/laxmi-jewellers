import NextImage from 'next/image'
import { ComponentProps } from 'react'

type ImageProps = Omit<ComponentProps<typeof NextImage>, 'width' | 'height'> & {
  width?: number
  height?: number
  originWidth?: number
  originHeight?: number
}

export function Image({ 
  src, 
  alt, 
  width = 800, 
  height = 600, 
  className,
  originWidth,
  originHeight,
  ...props 
}: ImageProps) {
  return (
    <NextImage
      src={src}
      alt={alt || ''}
      width={width}
      height={height}
      className={className}
      {...props}
    />
  )
}
