export default function Home() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-[480px] flex-1 flex-col justify-center px-5 py-10 text-center">
      <p className="text-[13px] text-[#5f6368]">ReviewUs</p>
      <h1 className="mt-2 text-[22px] font-normal text-[#202124]">Rate your experience</h1>
      <p className="mt-2 text-[14px] leading-5 text-[#5f6368]">
        Open a review link from your NFC tap to leave a rating.
      </p>
    </main>
  );
}
