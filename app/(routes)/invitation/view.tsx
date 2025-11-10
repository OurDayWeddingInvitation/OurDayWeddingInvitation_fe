import Form from "./components/form/Form";
import Preview from "./components/preview/Preview";

export default function InvitationView() {
  return (
    <div className="max-w-[1200px] py-27 flex mx-auto justify-between">
      <Preview />
      <Form />
    </div>
  );
}
