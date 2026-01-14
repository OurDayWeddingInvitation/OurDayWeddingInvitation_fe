import TextEditor from "@/app/components/editor/TextEditor";
import ImageAddButton from "@/app/components/ImageAddButton";
import { useImagePreview } from "@/app/lib/hooks/useImagePreview";

const CoupleIntroSection = () => {
  const groomImgHook = useImagePreview({ maxCount: 1 });
  const brideImgHook = useImagePreview({ maxCount: 1 });

  const fieldGroup = "flex flex-col gap-2.5 w-full";
  const fieldStyle = "flex flex-wrap items-center";
  const inputStyle =
    "outline-0 flex-1 border-[#E0E0E0] border placeholder:text-center rounded-sm text-sm py-1.5 px-1";

  const coupleData = [
    { label: "신랑", hook: groomImgHook },
    { label: "신부", hook: brideImgHook },
  ];

  return (
    <div>
      <div className={fieldGroup}>
        <div className={fieldStyle}>
          <div className="w-1/6 min-w-[50px]">제목</div>
          <input
            type="text"
            placeholder="제목을 작성 해주세요.(공백포함 15자 이내)"
            className={`${inputStyle} min-w-20 max-w-[275px]`}
            id=""
          />
        </div>
        {coupleData.map((data, idx) => {
          const { label, hook } = data;
          const { singlePreview, setPreview, removePreviewItem } = hook;

          return (
            <div key={idx}>
              <div>
                <div className="w-1/6 min-w-[50px] pb-1.5">{label}님 사진</div>
                <p className="text-[12px] text-[#CACACA] pb-7">
                  사진은 최대 30MB까지 업로드 가능합니다.
                </p>
                <input
                  type="file"
                  id={`coupleImg${idx}`}
                  accept="image/*"
                  onChange={(e) => setPreview(e.target.files?.[0] ?? null)}
                  className="hidden"
                />
                <ImageAddButton
                  previewImage={singlePreview?.previewUrl}
                  loading={singlePreview?.isLoading}
                  opacity={singlePreview?.isLoading ? 0.5 : 1}
                  onImageRemove={() => removePreviewItem(singlePreview.id)}
                  id={`coupleImg${idx}`}
                />
              </div>
              <div className="py-8">
                <div className="w-1/6 min-w-[50px] pb-6">{label}님 소개글</div>
                <TextEditor />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoupleIntroSection;
