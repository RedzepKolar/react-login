export default function PageContent({ children }) {
  return (
    <div className="flex justify-center items-center h-screen bg-[#151D2F]">
      <div className="w-full max-w-5xl">{children}</div>
    </div>
  );
}
