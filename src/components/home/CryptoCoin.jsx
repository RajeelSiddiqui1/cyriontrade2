import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { cryptoAPI } from "@/services/api";

export const CryptoCoin = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    try {
      setLoading(true);
      const response = await cryptoAPI.getCoinList();
      setCoins(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredCoins = Array.isArray(coins) ? coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const totalPages = Math.ceil(filteredCoins.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCoins.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const formatCurrency = (val) => {
    const value = val || 0;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: value < 1 ? 4 : 2,
    }).format(value);
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden min-h-screen">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[180px] pointer-events-none rounded-full opacity-50" />

      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div className="max-w-3xl">
            <span className="text-primary uppercase tracking-[0.4em] font-black text-xs md:text-sm mb-6 block">
              Direct Market Access
            </span>
            <h2 className="text-4xl md:text-[5rem] font-black tracking-tight text-foreground leading-[1.1]">
              Live Crypto Prices.
            </h2>
            <div className="w-16 h-1 bg-primary/30 mt-8" />
          </div>

          <div className="relative group w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search coins..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-card/40 border border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50 font-medium"
            />
          </div>
        </div>

        <div className="surface overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] border-border/50 shadow-2xl bg-card/30 backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/40 bg-secondary/30">
                  <th className="hidden sm:table-cell px-8 py-6 text-xs font-black uppercase tracking-widest text-muted-foreground w-20">
                    #
                  </th>
                  <th className="px-4 py-6 text-xs font-black uppercase tracking-widest text-muted-foreground w-auto">
                    Coin
                  </th>
                  <th className="px-4 py-6 text-xs font-black uppercase tracking-widest text-muted-foreground text-right w-24 sm:w-32 md:w-44">
                    Price
                  </th>
                  <th className="px-4 py-6 text-xs font-black uppercase tracking-widest text-muted-foreground text-right w-24 sm:w-32 md:w-40">
                    24h Change
                  </th>
                  <th className="hidden lg:table-cell px-8 py-6 text-xs font-black uppercase tracking-widest text-muted-foreground text-right w-40 md:w-56">
                    Market Cap
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                <AnimatePresence mode="popLayout">
                  {loading ? (
                    [...Array(5)].map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td colSpan="5" className="px-8 py-6 h-20 bg-secondary/10" />
                      </tr>
                    ))
                  ) : currentItems.length > 0 ? (
                    currentItems.map((coin) => (
                      <motion.tr
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key={coin.id}
                        onClick={() => navigate(`/coin/${coin.id}`)}
                        className="group relative hover:bg-primary/[0.04] transition-all duration-500 cursor-pointer"
                      >
                        <td className="hidden sm:table-cell px-8 py-5 text-sm font-black text-muted-foreground/40 relative">
                          {coin.market_cap_rank}
                          <div className="absolute inset-0 w-[500%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden z-0">
                            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-primary/[0.06] to-transparent skew-x-[30deg] translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-[1500ms] ease-out" />
                          </div>
                        </td>
                        <td className="px-4 py-5 relative">
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-secondary/50 p-1 flex items-center justify-center group-hover:scale-125 transition-all duration-500 shadow-xl group-hover:shadow-primary/20 ring-1 ring-white/10 shrink-0">
                              <img
                                src={coin.image}
                                alt={coin.name}
                                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="font-black text-foreground text-xs sm:text-sm group-hover:text-primary transition-colors tracking-tight truncate">
                                {coin.name}
                              </div>
                              <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                                {coin.symbol}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-5 text-right font-black text-foreground tabular-nums relative text-sm sm:text-base">
                          {formatCurrency(coin.current_price)}
                        </td>
                        <td
                          className={cn(
                            "px-4 py-5 text-right font-black tabular-nums relative",
                            coin.price_change_percentage_24h > 0
                              ? "text-success"
                              : "text-danger"
                          )}
                        >
                          <div className="flex items-center justify-end gap-1.5 text-[10px] sm:text-xs">
                            <div
                              className={cn(
                                "w-1.5 h-1.5 rounded-full animate-pulse hidden sm:block",
                                (coin.price_change_percentage_24h || 0) > 0
                                  ? "bg-success shadow-[0_0_8px_hsl(var(--success))]"
                                  : "bg-danger shadow-[0_0_8px_hsl(var(--danger))]"
                              )}
                            />
                            {Math.abs(coin.price_change_percentage_24h || 0).toFixed(2)}%
                          </div>
                        </td>
                        <td className="hidden lg:table-cell px-8 py-5 text-right relative">
                          <div className="font-black text-foreground tabular-nums text-sm">
                            {formatCurrency(coin.market_cap)}
                          </div>
                          <div className="text-[10px] text-muted-foreground/60 font-black uppercase tracking-wider">
                            Rank: #{coin.market_cap_rank}
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-8 py-20 text-center text-muted-foreground font-medium"
                      >
                        No coins found matching your search.
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {!loading && totalPages > 1 && (
            <div className="px-4 sm:px-8 py-6 border-t border-border/20 bg-secondary/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <p className="text-xs text-muted-foreground font-medium order-2 sm:order-1">
                Showing{" "}
                <span className="text-foreground">{indexOfFirstItem + 1}</span> to{" "}
                <span className="text-foreground">
                  {Math.min(indexOfLastItem, filteredCoins.length)}
                </span>{" "}
                of <span className="text-foreground">{filteredCoins.length}</span>{" "}
                coins
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2.5 rounded-xl border border-border/50 bg-card hover:bg-primary/5 hover:border-primary/50 disabled:opacity-30 disabled:hover:bg-card disabled:hover:border-border/50 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="hidden sm:flex items-center gap-1">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    let pageNum;
                    if (totalPages <= 5) pageNum = i + 1;
                    else if (currentPage <= 3) pageNum = i + 1;
                    else if (currentPage >= totalPages - 2)
                      pageNum = totalPages - 4 + i;
                    else pageNum = currentPage - 2 + i;

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={cn(
                          "w-10 h-10 rounded-xl text-xs font-black transition-all",
                          currentPage === pageNum
                            ? "bg-primary text-primary-foreground shadow-glow"
                            : "hover:bg-primary/10 text-muted-foreground"
                        )}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2.5 rounded-xl border border-border/50 bg-card hover:bg-primary/5 hover:border-primary/50 disabled:opacity-30 disabled:hover:bg-card disabled:hover:border-border/50 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
