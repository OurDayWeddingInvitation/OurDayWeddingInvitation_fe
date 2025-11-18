import Header from "@/app/components/Header";
import Form from "./components/form/Form";
import Preview from "./components/preview/Preview";

export default function InvitationView() {
  return (
    <>
      <Header showButton={true} showSaveText={true} showTitle={true} />
      <div className="max-w-[1200px] py-27 flex mx-auto justify-between">
        <Preview />
        <Form />
      </div>
    </>
  );
}
