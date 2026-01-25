import { getImagePath } from "@/app/lib/utils/functions";
import { useGalleryStore } from "@/app/store/useGalleryStore";
import { useThemeFontStore } from "@/app/store/useThemeFontStore";
import { useEffect, useState } from "react";
import { Gallery as PhotoSwipeGallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { FadeInSection } from "../FadeInSection";

const Gallery = ({ isLink }: { isLink: boolean }) => {
  const themeFont = useThemeFontStore((s) => s.themeFont);
  const galleryInfo = useGalleryStore((s) => s.galleryInfo);
  const galleryImages = useGalleryStore((s) => s.galleryImages);

  const [visibleCount, setVisibleCount] = useState<number>(9);
  const [imageSizes, setImageSizes] = useState<
    Record<string, { width: number; height: number }>
  >({});
  const zoomPrevent = themeFont?.zoomPreventYn;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  // 이미지 개수(length)가 바뀌면, 보여줄 개수를 다시 9개로 리셋합니다.
  useEffect(() => {
    setVisibleCount(9);
  }, [galleryImages?.length]);

  useEffect(() => {
    if (!galleryImages) return;

    const targets = galleryImages.slice(0, visibleCount);

    targets.forEach((image) => {
      const src = getImagePath(image.editedUrl ?? image.originalUrl);

      if (imageSizes[src]) return;

      const img = new Image();
      img.onload = () => {
        setImageSizes((prev) => {
          if (prev[src]) return prev;

          return {
            ...prev,
            [src]: {
              width: img.naturalWidth,
              height: img.naturalHeight,
            },
          };
        });
      };
      img.src = src;
    });
  }, [galleryImages, visibleCount]);

  return (
    <div className="text-center bg-[#FFFFFF] pb-10">
      <FadeInSection enabled={isLink}>
        <div
          className="tracking-[4px] pb-3 pt-10"
          style={{ color: themeFont?.accentColor }}
        >
          GALLERY
        </div>
      </FadeInSection>
      <FadeInSection enabled={isLink}>
        <p className="pb-[45px]">{galleryInfo?.title}</p>
        <PhotoSwipeGallery
          key={zoomPrevent ? "zoom-off" : "zoom-on"}
          options={{
            zoom: !zoomPrevent,
            wheelToZoom: !zoomPrevent,
            doubleTapAction: zoomPrevent ? false : "zoom",
            initialZoomLevel: zoomPrevent ? "fit" : 0,
            secondaryZoomLevel: zoomPrevent ? "fit" : 0,
            maxZoomLevel: zoomPrevent ? "fit" : 0,
          }}
        >
          <div className="grid grid-cols-3 px-4 gap-2">
            {galleryImages?.slice(0, visibleCount).map((image, idx) => {
              const src = getImagePath(image.editedUrl ?? image.originalUrl);
              const cacheVer = new Date(image.updatedAt).getTime();
              const imageUrl = `${src}?v=${cacheVer}`;
              const size = imageSizes[src];

              return (
                <Item
                  key={idx}
                  original={imageUrl}
                  thumbnail={imageUrl}
                  width={size?.width ?? 1200}
                  height={size?.height ?? 1600}
                >
                  {({ ref, open }) => (
                    <div
                      ref={ref}
                      onClick={open}
                      className="bg-[#D9D9D9] rounded-[10px] h-[94px] cursor-pointer overflow-hidden"
                    >
                      <img
                        src={imageUrl}
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
      </FadeInSection>

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
