type Props = {
  children: React.ReactNode;
};

const ToolbarGroup = ({ children }: Props) => {
  return <div className="flex flex-wrap gap-1 items-center">{children}</div>;
};

export default ToolbarGroup;
