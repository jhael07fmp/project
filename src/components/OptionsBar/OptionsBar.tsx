const OptionsBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="w-full rounded-md bg-yellow-400 p-4 text-xl font-medium 
    min-h-[2rem] flex items-center justify-between"
    >
      {children}
    </div>
  );
};

export default OptionsBar;
