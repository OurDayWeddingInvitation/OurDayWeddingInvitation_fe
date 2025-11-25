type Props = {
  onClick: () => void;
  active: boolean;
  disabled: boolean;
  children: React.ReactNode;
  title: string;
};

const ToolbarButton = ({
  onClick,
  active,
  disabled,
  children,
  title,
}: Props) => {
  return (
    <button
      className={`w-8 h-8 flex items-center justify-center rounded text-sm hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none ${
        active ? "bg-gray-200" : "bg-white"
      }`}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
};

export default ToolbarButton;
