import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';

interface AvatarProps extends Omit<ImageProps, 'src'> {
  /** URL of the avatar; falls back to the default image when falsy */
  avatarUrl?: string | null;
  /** Fallback `alt` text (you can still override via props.alt) */
  defaultAlt?: string;
  /** Fallback size in pixels (you can still override via props.width/height) */
  defaultSize?: number;
}
export const Avatar: React.FC<AvatarProps> = ({
  avatarUrl,
  defaultAlt = 'User avatar',
  defaultSize = 85,
  className,
  width,
  height,
  alt,
  ...rest
}) => {
  const src = avatarUrl ?? '/assets/images/default-avatar.jpg';
  const finalAlt = alt ?? defaultAlt;
  const finalWidth = typeof width === 'number' ? width : defaultSize;
  const finalHeight = typeof height === 'number' ? height : defaultSize;
  return (
    <Image
      src={src}
      alt={finalAlt}
      width={finalWidth}
      height={finalHeight}
      className={clsx('rounded-full', className)}
      {...rest}
    />
  );
};
