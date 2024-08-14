interface PropType {
  chidlren: React.ReactNode;
}

const ConsoleLayout = ({ chidlren }: PropType) => {
  return (
    <div>
      <div>
        <h2>Navigation</h2>
      </div>
      {chidlren}
    </div>
  );
};

export default ConsoleLayout;
