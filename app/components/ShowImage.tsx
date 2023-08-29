import Image from "next/image"

type Props = {
  src: string | undefined
  name: string
  size: ImageSize
  className?: string
}

export enum ImageSize {
  Small = 1,
  Medium = 2,
  Large = 3,
}

const getMultiplier = (size: ImageSize) => {
  switch (size) {
    case ImageSize.Small:
      return 1
    case ImageSize.Medium:
      return 2
    case ImageSize.Large:
      return 4
    default:
      return 1
  }
}

export const ShowImage = ({ src, name, size, className }: Props) => {
  const baseWidth = 42
  const baseHeight = Math.floor(42 * 1.4)
  const sizeMultiplier = getMultiplier(size)
  const width = baseWidth * sizeMultiplier
  const height = baseHeight * sizeMultiplier

  return (
    <>
      {!!src && (
        <Image
          alt={name}
          src={src}
          width={width}
          height={height}
          className={`${!!className ? className : ""}`}
        />
      )}
      {!src && (
        <div
          style={{ width, height }}
          className={`${
            !!className ? className : ""
          }} items-center justify-center bg-slate-800 text-center text-xs text-slate-400`}
        >
          Image missing
        </div>
      )}
    </>
  )
}
