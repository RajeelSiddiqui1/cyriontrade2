import { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Maximize2, 
  Download,
  Layers,
  Activity,
  BarChart3,
  LineChart,
  Signal,
  Cpu,
  Globe,
  ShieldCheck,
  Zap
} from "lucide-react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";
import { cn } from "@/lib/utils";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { cryptoAPI } from "@/services/api";

const CoinDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const chartRef = useRef(null);
  
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [ohlcData, setOhlcData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);
  const [timeframe, setTimeframe] = useState("1"); 
  const [chartType, setChartType] = useState("candlestick"); 

  useEffect(() => {
    fetchCoinDetail();
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (chartType === "candlestick") {
      fetchOHLCData(timeframe);
    } else {
      fetchHistoricalData(timeframe);
    }
  }, [id, timeframe, chartType]);

  const fetchCoinDetail = async () => {
    try {
      setLoading(true);
      const response = await cryptoAPI.getSingleCoin(id);
      setCoin(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistoricalData = async (days) => {
    try {
      setChartLoading(true);
      const response = await cryptoAPI.getHistoricalChart(id, days);
      if (response.data && response.data.prices) {
        setChartData(response.data.prices);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setChartLoading(false);
    }
  };

  const fetchOHLCData = async (days) => {
    try {
      setChartLoading(true);
      // Valid Coingecko ranges: 1, 7, 14, 30, 90, 180, 365
      const validDays = days === "1" ? "1" : days === "30" ? "30" : days === "365" ? "365" : "90";
      const response = await cryptoAPI.getOHLCData(id, validDays);
      if (response.data && Array.isArray(response.data)) {
        setOhlcData(response.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setChartLoading(false);
    }
  };

  const formatCurrency = (val) => {
    if (val === undefined || val === null) return "---";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: val < 1 ? 4 : 2,
      maximumFractionDigits: val < 1 ? 4 : 2,
    }).format(val);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      chartRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const downloadChart = () => {
    ApexCharts.exec('coin-details-chart', 'downloadCSV');
  };

  const getApexOptions = useMemo(() => {
    return {
      chart: {
        id: 'coin-details-chart',
        type: chartType === 'histogram' ? 'bar' : chartType,
        height: 600,
        toolbar: { show: false },
        animations: { 
            enabled: true, 
            easing: 'easeinout', 
            speed: 800,
            dynamicAnimation: { speed: 350 }
        },
        background: 'transparent',
        foreColor: '#64748b',
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        dropShadow: {
            enabled: chartType === 'line',
            enabledOnSeries: undefined,
            top: 5,
            left: 0,
            blur: 5,
            color: 'hsl(var(--primary))',
            opacity: 0.3
        }
      },
      grid: {
        show: true,
        borderColor: 'rgba(255, 255, 255, 0.03)',
        strokeDashArray: 5,
        position: 'back',
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: true } },
        padding: { top: 10, right: 0, bottom: 0, left: 10 }
      },
      plotOptions: {
        candlestick: {
          colors: { 
              upward: '#10b981', // emerald-500
              downward: '#f43f5e' // rose-500
          },
          wick: { useFillColor: true }
        },
        bar: { 
            columnWidth: '75%',
            borderRadius: 2,
            colors: {
                ranges: [
                    { from: 0, to: 1000000000000, color: 'hsl(var(--primary))' }
                ]
            }
        }
      },
      stroke: {
        width: (chartType === 'line' || chartType === 'area') ? 3 : 1,
        curve: 'smooth',
      },
      dataLabels: { enabled: false },
      xaxis: {
        type: 'datetime',
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: { colors: '#64748b', fontSize: '11px', fontWeight: 600, fontFamily: 'inherit' },
          offsetY: 5,
        },
        crosshairs: {
            show: true,
            position: 'back',
            stroke: {
                color: 'rgba(255,255,255,0.1)',
                width: 1,
                dashArray: 4,
            },
        },
      },
      yaxis: {
        opposite: true,
        labels: {
          formatter: (val) => formatCurrency(val),
          style: { colors: '#64748b', fontSize: '11px', fontWeight: 600, fontFamily: 'inherit' },
          offsetX: -5,
        },
        crosshairs: { show: false }
      },
      tooltip: {
        enabled: true,
        theme: 'dark',
        shared: true,
        intersect: false,
        x: { 
          show: true,
          format: 'dd MMM yyyy, HH:mm'
        },
        y: {
          formatter: (val) => formatCurrency(val)
        },
        style: { fontSize: '13px', fontFamily: 'inherit' },
        marker: { show: true }
      },
      fill: {
        type: chartType === 'area' ? 'gradient' : 'solid',
        gradient: {
          shadeIntensity: 1,
          type: 'vertical',
          opacityFrom: 0.6,
          opacityTo: 0.05,
          stops: [0, 100]
        }
      },
      colors: chartType === 'candlestick' ? undefined : ['hsl(var(--primary))'],
      markers: {
        size: 0,
        colors: ['hsl(var(--primary))'],
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: { size: 6 }
      }
    };
  }, [chartType]);

  const getSeries = useMemo(() => {
    if (chartType === 'candlestick') {
      return [{
        name: 'Price',
        data: ohlcData.map(d => [d[0], d[1], d[2], d[3], d[4]])
      }];
    } else {
      return [{
        name: 'Price',
        data: chartData.map(d => [d[0], d[1]])
      }];
    }
  }, [chartType, chartData, ohlcData]);

  if (loading && !coin) {
      return (
          <div className="min-h-screen bg-[#030508] flex items-center justify-center">
              <div className="relative flex flex-col items-center gap-6">
                  <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-150 animate-pulse-glow" />
                  <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin z-10 box-shadow-[0_0_40px_hsl(var(--primary)_/_0.5)]" />
                  <span className="text-primary tracking-[0.5em] text-xs font-black uppercase inline-block animate-pulse z-10">Initializing Intelligence</span>
              </div>
          </div>
      )
  }
  
  if (!coin) return null;

  const isPositive = coin.market_data?.price_change_percentage_24h >= 0;

  return (
    <div className="min-h-screen bg-[#030508] text-foreground selection:bg-primary/30 antialiased overflow-x-hidden">
      <SiteNav />
      
      {/* VVIP Ambient Backgrounds */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1200px] max-w-full h-[800px] bg-primary/10 blur-[200px] rounded-[100%] pointer-events-none -z-10 mix-blend-screen opacity-60" />
      <div className="fixed bottom-0 right-0 w-[800px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none -z-10 mix-blend-screen opacity-40" />
      <div className="fixed inset-0 grid-bg opacity-[0.03] pointer-events-none -z-10" />

      <main className="pt-32 pb-24 px-4 relative z-10">
        <div className="container max-w-[1400px] mx-auto">
          
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               className="flex items-center gap-6"
            >
                <div className="relative group perspective-1000">
                    <div className="absolute inset-0 bg-primary/30 blur-[40px] rounded-full scale-110 opacity-50 group-hover:opacity-100 transition-all duration-700" />
                    <div className="w-24 h-24 rounded-full glass-strong p-4 flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(0,0,0,0.5)] border-white/10 group-hover:rotate-y-12 transition-transform duration-700 transform-style-3d">
                        <img src={coin.image.large} alt={coin.name} className="w-full h-full object-contain filter drop-shadow-[0_10px_10px_rgba(var(--primary-rgb),0.5)]" />
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-4xl md:text-6xl font-black p-3 italic tracking-tight uppercase text-gradient-primary leading-none">
                            {coin.name}
                        </h1>
                        <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-black tracking-widest text-muted-foreground uppercase self-end mb-1">
                            {coin.symbol}
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-primary" /> Core Asset</div>
                        <div className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-primary" /> Global Rank #{coin.market_cap_rank}</div>
                    </div>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-end gap-10 bg-[#0a0d14]/80 backdrop-blur-3xl px-8 py-5 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[40px] rounded-full" />
                <div className="relative z-10 flex flex-col">
                    <span className="text-[10px] text-muted-foreground/60 tracking-[0.3em] font-black uppercase mb-1">Live Exchange Rate</span>
                    <span className="text-4xl lg:text-5xl font-black italic tracking-tighter text-white tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        {formatCurrency(coin.market_data?.current_price?.usd)}
                    </span>
                </div>
                <div className="relative z-10 flex flex-col pb-1">
                    <span className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-black italic tabular-nums shadow-lg",
                        isPositive ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    )}>
                        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {Math.abs(coin.market_data?.price_change_percentage_24h || 0).toFixed(2)}%
                    </span>
                </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            
            {/* VIP Chart Section (Takes up 3 columns) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-3 flex flex-col gap-6"
            >
              <div 
                ref={chartRef}
                className="bg-[#0a0d14]/80 backdrop-blur-3xl p-6 lg:p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 relative group min-h-[600px] flex flex-col"
              >
                {/* Glow outlines on hover */}
                <div className="absolute inset-0 rounded-[2.5rem] border border-primary/0 group-hover:border-primary/20 transition-colors duration-1000 pointer-events-none" />
                <div className="absolute top-0 inset-x-20 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                {/* Chart Top Controls */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 relative z-10">
                  <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_hsl(var(--primary))]" />
                          <span className="text-[10px] font-black tracking-widest uppercase text-primary">Live Data</span>
                      </div>
                      <div className="h-4 w-px bg-white/10" />
                      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/5 shadow-inner">
                        {[
                          { id: 'candlestick', icon: Layers, label: 'Candles' },
                          { id: 'line', icon: LineChart, label: 'Line' },
                          { id: 'area', icon: Activity, label: 'Area' },
                        ].map((t) => (
                          <button
                            key={t.id}
                            onClick={() => setChartType(t.id)}
                            className={cn(
                              "px-5 py-2.5 rounded-xl flex items-center gap-2.5 transition-all duration-300 relative overflow-hidden",
                              chartType === t.id 
                                ? "bg-white/10 text-white shadow-lg" 
                                : "text-muted-foreground hover:text-white hover:bg-white/5"
                            )}
                          >
                            {chartType === t.id && <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-50" />}
                            <t.icon className="w-4 h-4 relative z-10" />
                            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block relative z-10">{t.label}</span>
                          </button>
                        ))}
                      </div>
                  </div>

                  <div className="flex items-center gap-3 bg-black/40 p-1.5 rounded-2xl border border-white/5 shadow-inner">
                    <button 
                      onClick={toggleFullScreen}
                      className="w-10 h-10 rounded-xl bg-transparent flex items-center justify-center text-muted-foreground hover:bg-white/10 hover:text-white transition-all"
                      title="Fullscreen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={downloadChart}
                      className="w-10 h-10 rounded-xl bg-transparent flex items-center justify-center text-muted-foreground hover:bg-white/10 hover:text-white transition-all"
                      title="Download CSV"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Chart Area */}
                <div className="flex-1 relative min-h-[600px]">
                  {chartLoading && (
                    <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#0a0d14]/60 backdrop-blur-sm rounded-3xl">
                       <div className="flex flex-col items-center gap-4">
                           <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)]" />
                           <span className="text-[10px] text-primary/80 uppercase tracking-[0.3em] font-black animate-pulse">Syncing...</span>
                       </div>
                    </div>
                  )}
                  
                  <div className={cn("w-full h-full transition-opacity duration-500", chartLoading ? "opacity-50" : "opacity-100")}>
                    {(getSeries[0]?.data?.length > 0 || !chartLoading) && (
                      <ReactApexChart 
                        options={getApexOptions} 
                        series={getSeries} 
                        type={chartType === 'histogram' ? 'bar' : chartType} 
                        height={600} 
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Advanced Analytics Ribbon */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                      { icon: Activity, label: "24h Volume", value: `$${new Intl.NumberFormat("en-US", { notation: "compact" }).format(coin.market_data?.total_volume?.usd)}` },
                      { icon: TrendingUp, label: "24h High", value: formatCurrency(coin.market_data?.high_24h?.usd), color: "text-emerald-400" },
                      { icon: TrendingDown, label: "24h Low", value: formatCurrency(coin.market_data?.low_24h?.usd), color: "text-rose-400" },
                      { icon: Signal, label: "Market Dominance", value: `${coin.market_data?.market_cap_change_percentage_24h?.toFixed(2)}%` }
                  ].map((stat, i) => (
                      <div key={i} className="bg-[#0a0d14]/60 backdrop-blur-xl p-5 rounded-3xl border border-white/5 flex flex-col gap-3 hover:bg-white/[0.02] transition-colors group">
                          <div className="flex items-center gap-2 text-muted-foreground/60">
                              <stat.icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                              <span className="text-[9px] uppercase font-black tracking-widest">{stat.label}</span>
                          </div>
                          <span className={cn("text-xl font-black italic tabular-nums leading-none", stat.color || "text-white")}>
                              {stat.value}
                          </span>
                      </div>
                  ))}
              </div>
            </motion.div>

            {/* Right Sidebar */}
            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               animate={{ opacity: 1, x: 0 }}
               className="lg:col-span-1 flex flex-col gap-6"
            >
                {/* Timeframe Selector (VIP styled vertical or block) */}
                <div className="bg-[#0a0d14]/80 backdrop-blur-3xl p-6 rounded-[2rem] border border-white/5 shadow-2xl">
                    <h3 className="text-[10px] text-muted-foreground/50 tracking-[0.3em] font-black uppercase mb-4 flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5" /> Resolution
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                          { label: "24 Hours", value: "1", sub: "1H Candles" },
                          { label: "30 Days", value: "30", sub: "1D Candles" },
                          { label: "90 Days", value: "90", sub: "4D Candles" },
                          { label: "1 Year", value: "365", sub: "1W Candles" },
                        ].map((tf) => (
                          <button
                            key={tf.value}
                            onClick={() => setTimeframe(tf.value)}
                            className={cn(
                              "p-3 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 border",
                              timeframe === tf.value
                                ? "bg-primary/10 border-primary/30 text-primary shadow-[inset_0_0_20px_rgba(var(--primary-rgb),0.2)]"
                                : "bg-black/20 border-white/5 text-muted-foreground hover:bg-white/5 hover:text-white"
                            )}
                          >
                            <span className="text-sm font-black italic">{tf.label}</span>
                            <span className="text-[8px] uppercase tracking-widest opacity-60 font-bold">{tf.sub}</span>
                          </button>
                        ))}
                    </div>
                </div>

                {/* About Protocol */}
                <div className="bg-[#0a0d14]/80 backdrop-blur-3xl p-6 rounded-[2rem] border border-white/5 shadow-2xl flex-1 flex flex-col">
                    <h3 className="text-[10px] text-muted-foreground/50 tracking-[0.3em] font-black uppercase mb-4 flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5" /> Protocol Intel
                    </h3>
                    <div className="text-sm text-gray-400 font-medium leading-relaxed prose prose-invert overflow-hidden relative flex-1">
                        <p className="line-clamp-[12] italic opacity-80 decoration-primary/30">
                            {coin.description?.en ? (
                                <span dangerouslySetInnerHTML={{ __html: coin.description.en.split('. ').slice(0, 3).join('. ') + '.' }} />
                            ) : (
                                "No intelligence data available for this protocol currently. The autonomous systems are continuously gathering market metrics to provide accurate insights."
                            )}
                        </p>
                        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#0a0d14] to-transparent" />
                    </div>
                    
                    <a href={coin.links?.homepage[0]} target="_blank" rel="noreferrer" className="mt-4 w-full py-3 rounded-xl bg-white/5 border border-white/10 text-center text-xs font-black uppercase tracking-widest hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all">
                        Official Terminal
                    </a>
                </div>
            </motion.div>

          </div>
        </div>
      </main>

      <SiteFooter />

      {/* Global CSS for VVIP ApexCharts overrides */}
      <style>{`
        .apexcharts-canvas { margin: 0 auto; }
        .apexcharts-tooltip {
          background: rgba(10, 13, 20, 0.95) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          backdrop-filter: blur(24px) saturate(150%);
          box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.8), 0 0 20px rgba(var(--primary-rgb), 0.1) !important;
          border-radius: 16px !important;
          color: white !important;
          overflow: hidden;
        }
        .apexcharts-tooltip-title {
          background: rgba(255, 255, 255, 0.02) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
          font-weight: 900 !important;
          font-style: italic;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          padding: 10px 16px !important;
          color: rgba(255,255,255,0.7) !important;
        }
        .apexcharts-tooltip-series-group {
          padding: 8px 16px !important;
          display: flex;
          align-items: center;
        }
        .apexcharts-tooltip-text {
          font-weight: 800 !important;
          font-size: 14px !important;
        }
        .apexcharts-xaxistooltip {
          background: rgba(var(--primary-rgb), 0.1) !important;
          border: 1px solid rgba(var(--primary-rgb), 0.2) !important;
          backdrop-filter: blur(10px);
          color: white !important;
          border-radius: 8px !important;
          font-weight: 800 !important;
          box-shadow: 0 5px 15px rgba(0,0,0,0.5);
        }
        .apexcharts-xaxistooltip-bottom:after, .apexcharts-xaxistooltip-bottom:before {
            border-bottom-color: rgba(var(--primary-rgb), 0.2) !important;
        }
        .apexcharts-yaxistooltip {
          background: rgba(10, 13, 20, 0.9) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: white !important;
        }
        .apexcharts-grid-borders line {
            stroke: rgba(255,255,255,0.05);
        }
        
        /* Fullscreen adjustments */
        :fullscreen .surface { background: #030508 !important; }
        :fullscreen main, :fullscreen .container {
          width: 100vw !important;
          max-width: 100vw !important;
          height: 100vh !important;
          padding: 0 !important;
          margin: 0 !important;
          border-radius: 0 !important;
          overflow: hidden;
          background: #030508;
        }
        :fullscreen .lg\\:col-span-3 { grid-column: span 12 / span 12 !important; height: 100%; display: flex; flex-direction: column; }
        :fullscreen .bg-\\[\\#0a0d14\\]\\/80 { border-radius: 0 !important; border: none; min-height: 100vh; }
        :fullscreen .flex-1.relative.min-h-\\[450px\\] { flex: 1 1 auto; height: auto; min-height: 0; padding-bottom: 50px; }
      `}</style>
    </div>
  );
};

export default CoinDetail;
