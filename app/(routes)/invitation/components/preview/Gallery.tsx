import { getImagePath } from "@/app/lib/utils/functions";
import { useGalleryStore } from "@/app/store/useGalleryStore";
import { useThemeFontStore } from "@/app/store/useThemeFontStore";
import { useEffect, useState } from "react";
import { Gallery as PhotoSwipeGallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

const Gallery = () => {
  const themeFont = useThemeFontStore((s) => s.themeFont);
  const galleryInfo = useGalleryStore((s) => s.galleryInfo);
  const galleryImages = useGalleryStore((s) => s.galleryImages);

  const [visibleCount, setVisibleCount] = useState<number>(9);
  const [imageSizes, setImageSizes] = useState<
    Record<number, { width: number; height: number }>
  >({});

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  // 이미지 개수(length)가 바뀌면, 보여줄 개수를 다시 9개로 리셋합니다.
  useEffect(() => {
    setVisibleCount(9);
  }, [galleryImages?.length]);

  // 이미지 가로 세로 크기 함수
  const handleImageLoad = (idx: number, src: string) => {
    if (imageSizes[idx]) return;

    const img = new Image();
    img.onload = () => {
      setImageSizes((prev) => ({
        ...prev,
        [idx]: { width: img.naturalWidth, height: img.naturalHeight },
      }));
    };
    img.src = src;
  };

  return (
    <div className="text-center bg-[#FFFFFF] pb-10">
      <div
        className="tracking-[4px] text-[12px] pb-3 pt-10"
        style={{ color: themeFont?.accentColor }}
      >
        GALLERY
      </div>
      <p className="pb-[45px]">{galleryInfo?.title}</p>
      <PhotoSwipeGallery>
        <div className="grid grid-cols-3 px-4 gap-2">
          {galleryImages?.slice(0, visibleCount).map((image, idx) => {
            const src = getImagePath(image.editedUrl ?? image.originalUrl);

            handleImageLoad(idx, src);

            const width = imageSizes[idx]?.width ?? 1200;
            const height = imageSizes[idx]?.height ?? 1600;

            return (
              <Item
                key={idx}
                original={src}
                thumbnail={src}
                width={width}
                height={height}
              >
                {({ ref, open }) => (
                  <div
                    ref={ref}
                    onClick={open}
                    className="bg-[#D9D9D9] rounded-[10px] h-[94px] cursor-pointer overflow-hidden"
                  >
                    <img
                      src={src}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                )}
              </Item>
            );
          })}
        </div>
      </PhotoSwipeGallery>

      {galleryImages?.length > visibleCount && (
        <button
          className="rounded-full px-3 text-[#FFFFFF] mt-10 py-1 cursor-pointer"
          style={{ backgroundColor: themeFont?.accentColor }}
          onClick={handleLoadMore}
        >
          더보기
        </button>
      )}
    </div>
  );
};

export default Gallery;
