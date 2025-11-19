import Header from "@/app/components/Header";
import Form from "./components/form/Form";
import Preview from "./components/preview/Preview";

export default function InvitationView() {
  return (
    <>
      <Header showButton={true} showSaveText={true} showTitle={true} />
      <div className="max-w-[1200px] py-27 flex mx-auto items-start">
        <div className="max-w-[389px] ">
          <Preview />
          <ul className="py-[26px] text-[#817E7C] text-[14px]">
            <li>미리보기는 단순 참고용으로, 정확한 시안은 적용하기 버튼을 눌러 저장 후 확인해주세요.</li>
          </ul>
        </div>
        <div className="flex-1 max-w-[736px]">
          <div className="text-[#817E7C] text-[14px] px-4">
            •<span className="bg-[#FFFFFF] rounded-[5px] p-0.5">⠿</span>&nbsp;모양이 있는 메뉴는 드래그하여 순서를 변경할 수 있습니다.
          </div>
          <Form />
        </div>
      </div>
    </>
  );
}
