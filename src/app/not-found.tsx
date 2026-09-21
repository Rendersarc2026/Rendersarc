import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-black px-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <h1 className="text-8xl md:text-[150px] font-extralight tracking-tighter text-[#00995a]">
          404
        </h1>
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-light">Page <span className="text-[#00995a]">Not Found</span></h2>
          <p className="text-black/60 text-lg md:text-xl font-light max-w-lg mx-auto">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="pt-8">
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#fafafa] border border-black/10 hover:border-[#00ea77] rounded-full text-black hover:text-[#00995a] transition-all duration-300 font-medium tracking-wide hover:shadow-[0_0_30px_rgba(0,234,119,0.2)]"
          >
            RETURN HOME
          </Link>
        </div>
      </div>
    </div>
  );
}
