import IsAuthenticated from "./_components/isAuthenticated";

interface PropType {
  children: React.ReactNode;
}

const ConsoleLayout = ({ children }: PropType) => {
  return (
    <div>
      <IsAuthenticated />
      {children}
    </div>
  );
};

export default ConsoleLayout;
