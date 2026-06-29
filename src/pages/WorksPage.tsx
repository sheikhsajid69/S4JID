import { useEffect, useState } from "react";
import { SectionHeading } from "../components/SectionHeading";

// Individual Logo component that manages its loading skeleton
function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-16 w-32 flex items-center justify-center overflow-hidden">
      {/* YouTube-like Skeleton Pulsing Loader */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse rounded-lg bg-white/[0.04] border border-white/5" />
      )}
      
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-contain select-none pointer-events-none transition-all duration-700 ease-out ${
          loaded ? "opacity-45 grayscale contrast-125" : "opacity-0"
        }`}
        loading="lazy"
      />
    </div>
  );
}

const COMPANIES = [
  "-3dXI4OlQKyNzeG8OTkYFQ.webp",
  "-MXHNnlPRjy-Yz9k64hjNw.webp",
  "-Se5RIJQQj-D6TAK2_XqYQ.webp",
  "0U2cbyhGTM61t1didvAG4A.webp",
  "0Ug6wdVQRB2UouNNSwRulg.webp",
  "0excxjTISFqhtxNRG68OSg.webp",
  "1CTfQA09QYS6Zg_BukAlDg.webp",
  "6uo557_6QE-bO3MKgmzrLA.jpg",
  "8To79GbvQFehz_GGa6YTFQ.webp",
  "8szP0Ps2SFCaDuz3EvUVVA.webp",
  "A2rY0UeTT8-FJlJjZHlUbg.jpg",
  "BKrSAgBwRI6JfJXjPaQdYg.webp",
  "Bea-46lpQGuVBjJwQccA1w.jpg",
  "DBFnDPG-Tuidizq7OF8gdA.webp",
  "DH0fstsjRZaHyi6R60_EqQ.webp",
  "DNwKhH6DQlayNdAD1qfNMg.webp",
  "E-VJ60vMQnGw9NrqPbYl4A.webp",
  "__TrSdKZQbKfEBydPEaFug.webp",
  "aFGSiswHQBCFZmeBba3WSg.webp",
  "aGXaWqFrSUis2C-q1NQy9A.webp",
  "aarXE5huSea68J6l30_DXQ.webp",
  "aifA11k8SKKCxMjPusnfDw.webp",
  "balan-logo.webp",
  "benFufXTRFaky2Q98lXNlw.webp",
  "byrbVWUSSIKDKMzlxtMUjA.webp",
  "e5hH-7Q0RJSgNZQUrCMs1A.jpg",
  "ealRqJpTTLWUolcjFTAKfg.webp"
];

const BRANDS = [
  "-1Mw-rrWSmWW6ikBEk42JQ.webp",
  "01Ihlyk-R8eXTlto0gNOdg.webp",
  "0P8U9AS5QrKVdN3lttpFyA.jpg",
  "0WJAKT1TSa2YusJav4djqA.webp",
  "0XKBcCtTT_eNcsIqNiBEvQ.jpg",
  "1KH5V1JHQY-R6daBkyxNSw.webp",
  "1LXlQgmGRTSG8naXZZBHxQ.webp",
  "2IDMt6AAQACBk8FA2uK6JA.webp",
  "2Qvv9OhQQf-5RQdcj5Xjsg.webp",
  "2eeDTpf8TsWU17nwbG06cA.webp",
  "3TtmGECTSSygrvo_Vl0syg.webp",
  "45c3gjGVSQeKQ_D8faBUQQ.webp",
  "5H4vNr1VT2ygLrFMIOvrtg.webp",
  "5VOyq_ZfR1O8BnERudoi9A.webp",
  "6Noxz8wvSOG-VJPi7524sg.webp",
  "6_CHcbn_TFu5Bor05j4hBA.webp",
  "6tnTUlrgQXOh-xLudl5exA.webp",
  "6u6c6H89QTih5HRV0GAozw.webp",
  "6uXiaCeRRziTDz4BC-lxWQ.webp",
  "6w37jpKnTfup86wgTU3mDA.webp",
  "7YLQBG8dRHmVDu0jwz749Q.webp",
  "7q5Xr3ADQsOQVUQWKkhd8w.webp",
  "8HvoWJjHQ6CWpM879FtQKQ.webp",
  "8aO8xC2KT6-xO-Rohn3EMw.webp",
  "8xzEQgHqQfGi39gEMNKETA.jpg",
  "97CoZVskREKTZ9F6OEc46g.webp",
  "B1jWO-7DS-K94YjFRXuxPg.jpg",
  "B3XmofLSQhG1VEy1zI00SQ.jpg",
  "Bm6TtkhMQmaajrmT6vUlow.webp",
  "CJIgVyL0QBO4U26rFl3xRw.webp",
  "DbUfSS6HTnmbSoD3Yj2PjA.webp",
  "_Uea3qwQQgyWVi28q-_hwQ.webp",
  "avvAjRN7T8a9oDmMorKfbw.jpg",
  "b5LvmdK1QSuB3KYEY7zXQw.webp",
  "cfiPiGriQGGhRkOOagmihQ.jpg",
  "dvEUR9lxQq2T16bnKQYXQg.webp"
];

export default function WorksPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="section-shell mx-auto max-w-6xl px-4 pt-24 md:pt-32 pb-16">
      <SectionHeading
        eyebrow="Works"
        title="Collaborations & Associated Brands"
        description="A visual timeline of startups, enterprises, and open-source platforms built for, or collaborated with, across various engineering and founder roles."
      />

      {/* Collaborated Companies Grid */}
      <div className="mt-8 glass-panel p-6 md:p-8">
        <h3 className="font-display text-2xl italic tracking-[-0.03em] text-white mb-6">
          Collaborated Companies
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6 items-center justify-items-center">
          {COMPANIES.map((company, index) => (
            <LogoImage
              key={`company-${index}`}
              src={`/companies/${company}`}
              alt={`Collaborated Company logo ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Brands Grid */}
      <div className="mt-8 glass-panel p-6 md:p-8">
        <h3 className="font-display text-2xl italic tracking-[-0.03em] text-white mb-6">
          Associated Brands
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6 items-center justify-items-center">
          {BRANDS.map((brand, index) => (
            <LogoImage
              key={`brand-${index}`}
              src={`/brands/${brand}`}
              alt={`Associated Brand logo ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
