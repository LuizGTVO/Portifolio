"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, personalInfo } from "@/data/portfolioData";
import { Menu, X } from "lucide-react";

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      setIsAdmin(document.cookie.includes("admin_session=admluiz"));
    };
    checkAdmin();
    window.addEventListener("focus", checkAdmin);
    return () => window.removeEventListener("focus", checkAdmin);
  }, []);

  useEffect(() => {
    // 1. Scroll effect for navbar styling
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // 2. Intersection Observer to detect section in viewport
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Trigger when section is in the middle of viewport
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const section = document.querySelector(link.href);
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 transition-all duration-300">
      {/* Main Nav Container */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`w-full max-w-4xl flex items-center justify-between px-6 py-3 rounded-full border transition-all duration-300 ${
          scrolled
            ? "bg-[#050505]/75 backdrop-blur-md border-[#1a1a1f] shadow-lg shadow-black/30"
            : "bg-transparent border-transparent"
        }`}
      >
        {/* Logo / Brand Name */}
        <a
          href="#home"
          onClick={(e) => handleClick(e, "#home")}
          className="text-white font-bold tracking-tight text-lg hover:opacity-80 transition-opacity"
        >
          {personalInfo.name}
          <span className="text-accent-purple font-black">.</span>
        </a>

        {/* Desktop Navigation Links & Login */}
        <div className="hidden md:flex items-center gap-3">
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isHomeActive = activeSection === "home" && link.href === "#home";
              const isAboutActive = activeSection === "about" && link.href === "#about";
              const isProjectsActive = activeSection === "projects" && link.href === "#projects";
              const isEducationActive = activeSection === "education" && link.href === "#education";
              const isContactActive = activeSection === "contact" && link.href === "#contact";

              const isActive =
                isHomeActive || isAboutActive || isProjectsActive || isEducationActive || isContactActive;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`relative px-4 py-1.5 text-sm font-medium transition-colors duration-300 rounded-full ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activePill"
                      className="absolute inset-0 bg-white/5 border border-white/10 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </nav>
          {isAdmin ? (
            <div className="flex items-center gap-2">
              <a
                href="/dashboard"
                className="px-4 py-1.5 rounded-full bg-indigo-600 border border-indigo-500 text-xs font-semibold text-white hover:bg-indigo-500 transition-all duration-300"
              >
                Painel Admin
              </a>
              <button
                onClick={() => {
                  document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                  window.location.href = "/";
                }}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-semibold text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 transition-all duration-300 cursor-pointer"
              >
                Sair Admin
              </button>
            </div>
          ) : (
            <a
              href="/login"
              className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              Modo Admin
            </a>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 text-zinc-400 hover:text-white rounded-full bg-white/5 border border-white/10"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-4 right-4 bg-[#050505]/95 border border-[#1a1a1f] backdrop-blur-xl p-6 rounded-3xl flex flex-col gap-4 shadow-2xl md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="text-zinc-300 hover:text-white text-lg py-2 border-b border-[#111] last:border-0 font-medium"
              >
                {link.label}
              </a>
            ))}
            {isAdmin ? (
              <>
                <a
                  href="/dashboard"
                  className="text-indigo-400 hover:text-indigo-300 text-lg py-2 font-semibold text-center mt-2 border-t border-white/5 pt-4"
                >
                  Painel Admin (CRUD)
                </a>
                <button
                  onClick={() => {
                    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                    window.location.href = "/";
                  }}
                  className="text-rose-400 hover:text-rose-300 text-lg py-2 font-semibold text-center cursor-pointer"
                >
                  Sair Modo Admin
                </button>
              </>
            ) : (
              <a
                href="/login"
                className="text-indigo-400 hover:text-indigo-300 text-lg py-2 font-semibold text-center mt-2 border-t border-white/5 pt-4"
              >
                Modo Admin
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
