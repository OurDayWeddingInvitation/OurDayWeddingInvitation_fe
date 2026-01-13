import ImageAddButton from "@/app/components/ImageAddButton";
import { useImagePreview } from "@/app/lib/hooks/useImagePreview";

const ParentsIntroSection = () => {
  const groomParentsImgHook = useImagePreview({ maxCount: 1 });
  const brideParentsImgHook = useImagePreview({ maxCount: 1 });

  const inputStyle =
    "outline-0 flex-1 border-[#E0E0E0] border rounded-sm text-sm py-1.5 px-1 ";
  const fieldGroup = "flex flex-col gap-2.5 w-full";
  const fieldStyle = "flex flex-wrap items-center";
  const labelStyle = "w-1/6 min-w-[50px]";

  const parentsData = [
    { label: "신랑", hook: groomParentsImgHook },
    { label: "신부", hook: brideParentsImgHook },
  ];

  return (
    <div>
      <div className={fieldGroup}>
        <div className={fieldStyle}>
          <div className={labelStyle}>제목</div>
          <input
            type="text"
            className={`${inputStyle} max-w-[275px]`}
            defaultValue={"우리의 부모님"}
            placeholder="제목을 작성 해주세요.(공백포함 15자 이내)"
          />
        </div>
        <div className={`${fieldStyle} pb-3`}>
          <div className={labelStyle}>소개글</div>
          <div className="flex gap-2 flex-1 items-end">
            <textarea
              className={`${inputStyle} m-h-[69px] resize-none max-w-[275px]`}
              defaultValue={
                "저희의 시작을 사랑으로 응원해주신 양가 부모님을 소개합니다."
              }
              placeholder="소개글을 작성해주세요.(공백포함 100자 이내)"
              onChange={(e) => {}}
            />
            <a href="" className="text-[#CACACA] underline text-[12px]">
              문구 예시 보러가기
            </a>
          </div>
        </div>
        <div>
          {parentsData.map((data, idx) => {
            const { label, hook } = data;
            const { singlePreview, setPreview, removePreviewItem } = hook;

            return (
              <div key={idx}>
                <div className="pb-1.5">{label}측 부모님 사진</div>
                <p className="text-[12px] text-[#CACACA] pb-7">
                  사진은 최대 30MB까지 업로드 가능합니다.
                </p>
                <input
                  type="file"
                  id={`parentsImg${idx}`}
                  accept="image/*"
                  onChange={(e) => setPreview(e.target.files?.[0] ?? null)}
                  className="hidden"
                />
                <div className={`${idx === 0 && "pb-[38px]"}`}>
                  <ImageAddButton
                    previewImage={singlePreview?.previewUrl}
                    loading={singlePreview?.isLoading}
                    opacity={singlePreview?.isLoading ? 0.5 : 1}
                    onImageRemove={() => removePreviewItem(singlePreview.id)}
                    id={`parentsImg${idx}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ParentsIntroSection;
