"use client";

import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { MdMenu } from "react-icons/md";
import { useAppDispatch } from "@/app/hooks";
import { togglePanel } from "./side_panel/sidePanelSlice";

function NavBar() {
  const pathName: string = usePathname();
  const dispatch = useAppDispatch();

  const navLink = [
    { name: "Home", href: "/" },
    { name: "Tournaments", href: "/tournaments" },
  ];

  return (
    <header
      className={`
        fixed z-50 w-full bg-[#242528] border-b border-black shadow-md shadow-black/50
        grid items-center gap-3 px-3 py-3.5
        /* one row across all sizes: menu | search | links */
        grid-cols-[auto_minmax(0,1fr)_auto]
        md:px-4
      `}
    >
      {/* Left: Logo (desktop) / Menu (mobile) */}
      <div className="flex items-center gap-3">
        <div className="hidden md:block">Logo</div>
        <button
          className="inline-flex items-center md:hidden"
          aria-label="Open menu"
          onClick={() => dispatch(togglePanel())}
        >
          <MdMenu className="text-2xl" />
        </button>
      </div>

      {/* Center: Search (width capped on mobile so links fit on the right) */}
      <div className="w-full flex justify-center">
        <SearchBar
          className={`
            bg-[#161719] px-2 py-1 gap-2 items-center flex rounded-xl
            w-full
            /* cap width on small screens to keep links in same row */
            max-w-[55vw]   /* phones */
            sm:max-w-[60vw]
            md:w-[25vw]
            lg:w-[25vw]
          `}
          type="text"
          name="game_search_field"
          placeholder="Search Game"
        />
      </div>

      {/* Right: Nav links (no wrap; scroll horizontally if super tight) */}
      <nav
        className={`
          flex gap-4 h-full items-center
          whitespace-nowrap
          overflow-x-auto
          no-scrollbar
        `}
      >
        {navLink.map((link) => {
          const isActive = pathName === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`
                relative flex items-center px-2 py-1
                hover:text-white
                ${isActive ? "text-blue-400" : ""}
                text-sm md:text-[1rem]
                group
              `}
            >
              {link.name}
              <span
                className={`
                  absolute bottom-0 left-0 h-[2px] bg-blue-400
                  transition-all duration-300 ease-out origin-left
                  ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                `}
              />
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

export default NavBar;

// /* Optional (globals.css): hide scrollbar for the tiny horizontal overflow on the links */
// .no-scrollbar::-webkit-scrollbar { display: none; }
// .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
