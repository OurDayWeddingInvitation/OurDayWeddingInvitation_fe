import Header from "@/app/components/Header";
import Form from "./components/form/Form";
import Preview from "./components/preview/Preview";

export default function InvitationView() {
  return (
    <>
      <Header showButton={true} showSaveText={true} showTitle={true} />
      <div className="max-w-[1200px] py-27 flex mx-auto">
        <Preview />
        <div className="flex-1">
          <div className="text-[#817E7C] px-4 text-[14px] ">
            •<span className="bg-[#FFFFFF] rounded-[5px] p-0.5">⠿</span>모양이 있는 메뉴는 드래그하여 순서를 변경할 수 있습니다.
          </div>
          <Form />
        </div>
      </div>
    </>
  );
}
