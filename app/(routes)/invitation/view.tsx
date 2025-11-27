import Header from "@/app/components/Header";
import Form from "./components/form/Form";
import Preview from "./components/preview/preview";
import Image from "next/image";
import ToggleImg from "@/app/assets/images/toggle-icon.svg";

export default function InvitationView() {
  return (
    <>
      <Header showButton={true} showSaveText={true} showTitle={true} />
      <div className="max-w-[1200px] py-27 flex mx-auto items-start gap-[52px] relative">
        <div className="max-w-[389px] fixed w-full">
          <Preview />
          <ul className="py-[26px] text-[#817E7C] text-[14px]  list-disc ">
            <li>미리보기는 단순 참고용으로, 정확한 시안은 적용하기 버튼을 눌러 저장 후 확인해주세요.</li>
          </ul>
        </div>
        <div className="flex-1 max-w-[736px] absolute right-0 w-full">
          <ul className="text-[#817E7C] text-[14px] px-4 list-disc list-inside w-full">
            <li>
              <span className="bg-[#FFFFFF] rounded-[5px] p-0.5">⠿</span>
              &nbsp;모양이 있는 메뉴는 드래그하여 순서를 변경할 수 있습니다.
            </li>
            <li>
              <Image src={ToggleImg} alt="토글버튼 아이콘" className="inline-block align-middle" />
              <span className="align-middle">&nbsp;버튼으로 각 메뉴의 사용 여부를 설정할 수 있습니다.</span>
            </li>
          </ul>
          <Form />
        </div>
      </div>
    </>
  );
}
