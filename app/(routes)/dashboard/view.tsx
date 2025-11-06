import Form from "./components/form/form";
import PreView from "./components/pre-view/pre-view";

export default function DashboardView() {
  //page쪽에서 받은 데이터로 zustand세팅 쫙해야함
  return (
    <div className="flex flex-row items-start max-w-[1200px] mx-auto justify-center ">
      <PreView />
      <Form />
    </div>
  );
}
