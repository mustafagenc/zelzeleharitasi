"use client";

import Link from "next/link";
import { PiBowlSteamFill } from "react-icons/pi";

export const Footer = () => {
  return (
    <>
      <footer className="z-10 fixed bottom-2 right-2 left-2 lg:bottom-10 lg:right-10 lg:left-10 bg-white flex flex-col lg:flex-row dark:bg-black p-4 text-shadow-2xs rounded-md select-none">
        <div className="text-xs text-gray-500 dark:text-gray-400 grow text-left lg:block hidden">
          Bu uygulama 
          <a
            href="http://www.koeri.boun.edu.tr/scripts/lst8.asp"
            target="_blank"
            className="text-blue-500 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300 mx-1"
          >
            Boğaziçi Üniversitesi Kandilli Rasathanesi ve Deprem Araştırma
            Enstitüsü
          </a>  
          (KRDAE) tarafından sağlanan verileri kullanmaktadır. Tüm deprem
          verilerinin telif hakları Boğaziçi Üniversitesi Rektörlüğü&apos;ne
          aittir.<br/>
          Bu veri bilimsel ve bilgilendirme amaçlı kullanılabilir ancak ticari
          amaçla kullanılamaz.
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 grow text-center lg:text-right lg:hidden">
          <a
            href="http://www.koeri.boun.edu.tr/scripts/lst8.asp"
            target="_blank"
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Boğaziçi Üniversitesi Kandilli Rasathanesi ve Deprem Araştırma
            Enstitüsü
          </a>
        </div>

        <div className="hidden lg:flex items-center justify-center lg:mt-0 mt-4 wd-82">
          <Link
            href="https://x.com/search?q=IStandWithPalastine&f=live"
            target="_blank"
            className="flex h-7 w-40 flex-row items-center space-x-1.5 rounded-sm bg-gray-600 bg-[url(/palestine.svg)] bg-contain bg-right bg-no-repeat px-2 py-1 pr-9 text-white shadow-sm transition duration-200 ease-in-out hover:opacity-90"
          >
            <span className="text-shadow text-xs">#IStandWithPalestine</span>
          </Link>
          <Link
            href="https://buymeacoffee.com/mustafagenc"
            target="_blank"
            className="ml-2 flex h-7 w-40 flex-row items-center space-x-1.5 rounded-sm bg-blue-500 px-2 py-1 text-white shadow-sm transition duration-200 ease-in-out hover:opacity-90 dark:bg-blue-600"
          >
            <PiBowlSteamFill className="h-5 w-5" />
            <span className="text-shadow text-xs">Bana bir çay ısmarla</span>
          </Link>
        </div>
      </footer>
    </>
  );
};
