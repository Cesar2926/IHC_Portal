interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {}

export function Border({ src, alt, ...props }: Props) {
    return (
        <div className="relative group w-[300px] h-[300px] cursor-pointer">
            <img
                className="absolute w-full h-full transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                src={src}
                alt={alt}
                {...props}
            />
            <img
                className="absolute w-full h-full transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                src={src?.replace('border', 'border_hover')}
                alt={`${alt} Hover`}
                {...props}
            />
        </div>
    );
}