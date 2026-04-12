
export const SearchBar = () => {
  return (
    <form action="/" method="GET" className="max-w-xl mx-auto mb-12 flex gap-4">
      <div className="relative flex-grow">
        <input
          name="q" // ชื่อเดียวกับที่ Server Component รอรับ (q)
          type="text"
          placeholder="ค้นหาสินค้า..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 pl-14 text-white text-lg focus:border-primary outline-none transition-all shadow-xl shadow-black/20"
        />
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl">
          🔍
        </span>
      </div>

      <button
        type="submit"
        className="btn-primary px-10 rounded-2xl font-bold"
      >
        ค้นหา
      </button>
    </form>
  );
};
