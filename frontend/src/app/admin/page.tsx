"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import {
  LayoutDashboard,
  User,
  Wrench,
  Briefcase,
  Layers,
  FolderGit2,
  Award,
  Mail,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  PenTool,
  X,
  UserCheck,
} from "lucide-react";
import {
  adminGetDashboard,
  adminUpdateProfile,
  adminSaveService,
  adminDeleteService,
  adminSaveExperience,
  adminDeleteExperience,
  adminSaveProjectShowcase,
  adminDeleteProjectShowcase,
  adminSavePortfolio,
  adminDeletePortfolio,
  adminSaveCertificate,
  adminDeleteCertificate,
  adminFetchBrandLogos,
  adminSaveBrandLogo,
  adminDeleteBrandLogo,
  adminFetchDesignTools,
  adminSaveDesignTool,
  adminDeleteDesignTool,
  adminGetMessages,
  adminDeleteMessage,
  adminCheckAuth,
} from "@/lib/adminApi";
import { fetchServices, fetchExperiences, fetchProjectsShowcase, fetchPortfolio } from "@/lib/api";
import { showAlert } from "@/lib/alerts";
import { ImageDropzone } from "@/components/ImageDropzone";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "profile" | "about" | "brand_logos" | "design_tools" | "services" | "experiences" | "projects" | "portfolio" | "certificates" | "messages"
  >("overview");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Data states
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [profileForm, setProfileForm] = useState<any>({
    name: "",
    title: "",
    availability_badge: "",
    headline: "",
    bio: "",
    rating_score: 4.5,
    rating_text: "",
    skills_row1_input: "",
    skills_row2_input: "",
    about_image: "/images/profile/image-01.webp",
    about_p1_highlight: "Design isn't just my job—it's my passion.",
    about_p1_text: "What began as a hobby turned into a full-fledged career when I realized the true power of design: not just making things beautiful, but making them work better.",
    about_p2_highlight: "My approach is all about crafting user interfaces that serve a real purpose.",
    about_p2_text: "I believe great design should solve problems and provide seamless experiences.",
    about_p3_highlight: "I'm a perfectionist when it comes to the details, and I believe it's the little things that elevate design from good to great.",
    about_p3_text: "This meticulous attention to detail allows me to create lasting relationships with clients.",
    about_tools_title: "Tools That Power My Design Process",
    about_tools_description: "My design process is powered by tools that encourage clarity, collaboration, and creativity — turning vision into user-centered experiences.",
    stats: [
      { label: "Happy Client", value: "250+" },
      { label: "Revenue Added", value: "$50m" },
      { label: "Average Rating", value: "4.9" },
    ],
    social_links: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      dribbble: "https://dribbble.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
    },
  });

  const [brandLogosList, setBrandLogosList] = useState<any[]>([]);
  const [designToolsList, setDesignToolsList] = useState<any[]>([]);
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [experiencesList, setExperiencesList] = useState<any[]>([]);
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [portfolioList, setPortfolioList] = useState<any[]>([]);
  const [certificatesList, setCertificatesList] = useState<any[]>([]);
  const [messagesList, setMessagesList] = useState<any[]>([]);

  // Modal editing states
  const [editingModal, setEditingModal] = useState<{
    type: "service" | "experience" | "project" | "portfolio" | "certificate" | "brand_logo" | "design_tool" | null;
    item: any | null;
  }>({ type: null, item: null });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleApiError = (err: any, fallbackTitle = "Terjadi Kesalahan") => {
    const msg = err?.message || String(err);
    if (
      msg.toLowerCase().includes("unauthenticated") ||
      msg.toLowerCase().includes("sesi") ||
      msg.includes("401")
    ) {
      localStorage.removeItem("craft_admin_token");
      localStorage.removeItem("craft_admin_user");
      showAlert.error(
        "Sesi Login Berakhir",
        "Sesi login Anda tidak valid atau telah kedaluwarsa. Silakan login kembali."
      ).then(() => {
        router.push("/admin/login");
      });
      return;
    }
    showAlert.error(fallbackTitle, msg);
  };

  // Check authentication & load data immediately
  useEffect(() => {
    const savedToken = localStorage.getItem("craft_admin_token");
    const savedUser = localStorage.getItem("craft_admin_user");

    if (!savedToken) {
      router.push("/admin/login");
      return;
    }

    setToken(savedToken);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {}
    }

    // Load data directly with the saved token
    loadAllData(savedToken);
  }, []);

  const loadAllData = async (authToken: string) => {
    setLoading(true);
    try {
      const dash = await adminGetDashboard(authToken);
      if (dash) {
        setDashboardData(dash);
        if (dash.services) setServicesList(dash.services);
        if (dash.experiences) setExperiencesList(dash.experiences);
        if (dash.projects_showcase) setProjectsList(dash.projects_showcase);
        if (dash.portfolio) setPortfolioList(dash.portfolio);
        if (dash.certificates) setCertificatesList(dash.certificates);
        if (dash.brand_logos) setBrandLogosList(dash.brand_logos);
        if (dash.design_tools) setDesignToolsList(dash.design_tools);
        if (dash.messages) setMessagesList(dash.messages);

        if (dash.profile) {
          const s1 = dash.profile.skills_row1 || [
            "Figma", "UI Design", "UX Design", "Canva", "Blender", "Photoshop", "Research", "Graphics", "Copywriting"
          ];
          const s2 = dash.profile.skills_row2 || [
            "Next.js", "Tailwind CSS", "React", "TypeScript", "Framer Motion", "Design Systems", "Responsive Web", "Wireframing", "User Flows"
          ];
          const ap = dash.profile.about_paragraphs || [];
          const p1 = ap[0] || {
            highlight: "Design isn't just my job—it's my passion.",
            text: "What began as a hobby turned into a full-fledged career when I realized the true power of design: not just making things beautiful, but making them work better.",
          };
          const p2 = ap[1] || {
            highlight: "My approach is all about crafting user interfaces that serve a real purpose.",
            text: "I believe great design should solve problems and provide seamless experiences.",
          };
          const p3 = ap[2] || {
            highlight: "I'm a perfectionist when it comes to the details, and I believe it's the little things that elevate design from good to great.",
            text: "This meticulous attention to detail allows me to create lasting relationships with clients.",
          };

          setProfileForm({
            name: dash.profile.name || "",
            title: dash.profile.title || "",
            availability_badge: dash.profile.availability_badge || "",
            headline: dash.profile.headline || "",
            bio: dash.profile.bio || "",
            rating_score: dash.profile.rating_score || 4.5,
            rating_text: dash.profile.rating_text || "",
            skills_row1_input: s1.join(", "),
            skills_row2_input: s2.join(", "),
            about_image: dash.profile.about_image || "/images/profile/image-01.webp",
            about_p1_highlight: p1.highlight || "",
            about_p1_text: p1.text || "",
            about_p2_highlight: p2.highlight || "",
            about_p2_text: p2.text || "",
            about_p3_highlight: p3.highlight || "",
            about_p3_text: p3.text || "",
            about_tools_title: dash.profile.about_tools_title || "Tools That Power My Design Process",
            about_tools_description: dash.profile.about_tools_description || "My design process is powered by tools that encourage clarity, collaboration, and creativity — turning vision into user-centered experiences.",
            stats: dash.profile.stats || [
              { label: "Happy Client", value: "250+" },
              { label: "Revenue Added", value: "$50m" },
              { label: "Average Rating", value: "4.9" },
            ],
            social_links: dash.profile.social_links || {
              github: "https://github.com",
              linkedin: "https://linkedin.com",
              dribbble: "https://dribbble.com",
              twitter: "https://twitter.com",
              instagram: "https://instagram.com",
            },
          });
        }
      }
    } catch (err: any) {
      handleApiError(err, "Gagal Memuat Data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const confirmed = await showAlert.confirm(
      "Log Out?",
      "Are you sure you want to log out of the admin panel?",
      "Yes, Log Out"
    );
    if (!confirmed) return;
    localStorage.removeItem("craft_admin_token");
    localStorage.removeItem("craft_admin_user");
    router.push("/admin/login");
  };

  // Profile Save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    try {
      const skills_row1 = profileForm.skills_row1_input
        ? profileForm.skills_row1_input.split(",").map((s: string) => s.trim()).filter(Boolean)
        : [];
      const skills_row2 = profileForm.skills_row2_input
        ? profileForm.skills_row2_input.split(",").map((s: string) => s.trim()).filter(Boolean)
        : [];

      const about_paragraphs = [
        {
          highlight: profileForm.about_p1_highlight || "",
          text: profileForm.about_p1_text || "",
        },
        {
          highlight: profileForm.about_p2_highlight || "",
          text: profileForm.about_p2_text || "",
        },
        {
          highlight: profileForm.about_p3_highlight || "",
          text: profileForm.about_p3_text || "",
        },
      ];

      const sanitized = {
        ...profileForm,
        rating_score: typeof profileForm.rating_score === "string"
          ? parseFloat(String(profileForm.rating_score).replace(",", ".")) || 0
          : Number(profileForm.rating_score) || 0,
        skills_row1,
        skills_row2,
        about_paragraphs,
        about_image: profileForm.about_image,
        about_tools_title: profileForm.about_tools_title,
        about_tools_description: profileForm.about_tools_description,
      };
      await adminUpdateProfile(token, sanitized);
      showAlert.success("Profile Updated!", "Profile, About Me story, and skills ticker updated successfully.");
    } catch (err: any) {
      handleApiError(err, "Save Failed");
    } finally {
      setSaving(false);
    }
  };

  // Brand Logos actions
  const handleDeleteBrandLogo = async (id: number) => {
    if (!token) return;
    const confirmed = await showAlert.confirm("Delete Brand Logo?", "Are you sure you want to delete this brand logo?");
    if (!confirmed) return;
    try {
      await adminDeleteBrandLogo(token, id);
      setBrandLogosList((prev) => prev.filter((b) => b.id !== id));
      showAlert.toast("Brand logo deleted successfully", "success");
    } catch (err: any) {
      handleApiError(err, "Delete Failed");
    }
  };

  // Design Tools actions
  const handleDeleteDesignTool = async (id: number) => {
    if (!token) return;
    const confirmed = await showAlert.confirm("Delete Design Tool?", "Are you sure you want to delete this design tool?");
    if (!confirmed) return;
    try {
      await adminDeleteDesignTool(token, id);
      setDesignToolsList((prev) => prev.filter((t) => t.id !== id));
      showAlert.toast("Design tool deleted successfully", "success");
    } catch (err: any) {
      handleApiError(err, "Delete Failed");
    }
  };

  // Services actions
  const handleDeleteService = async (id: number) => {
    if (!token) return;
    const confirmed = await showAlert.confirm("Delete Service?", "Are you sure you want to delete this service?");
    if (!confirmed) return;
    try {
      await adminDeleteService(token, id);
      setServicesList((prev) => prev.filter((s) => s.id !== id));
      showAlert.toast("Service deleted successfully", "success");
    } catch (err: any) {
      handleApiError(err, "Delete Failed");
    }
  };

  // Experiences actions
  const handleDeleteExperience = async (id: number) => {
    if (!token) return;
    const confirmed = await showAlert.confirm("Delete Experience?", "Are you sure you want to delete this experience entry?");
    if (!confirmed) return;
    try {
      await adminDeleteExperience(token, id);
      setExperiencesList((prev) => prev.filter((e) => e.id !== id));
      showAlert.toast("Experience deleted successfully", "success");
    } catch (err: any) {
      handleApiError(err, "Delete Failed");
    }
  };

  // Projects actions
  const handleDeleteProject = async (id: number) => {
    if (!token) return;
    const confirmed = await showAlert.confirm("Delete Project?", "Are you sure you want to delete this project showcase?");
    if (!confirmed) return;
    try {
      await adminDeleteProjectShowcase(token, id);
      setProjectsList((prev) => prev.filter((p) => p.id !== id));
      showAlert.toast("Project showcase deleted", "success");
    } catch (err: any) {
      handleApiError(err, "Delete Failed");
    }
  };

  // Portfolio actions
  const handleDeletePortfolio = async (id: number) => {
    if (!token) return;
    const confirmed = await showAlert.confirm("Delete Portfolio?", "Are you sure you want to delete this portfolio project?");
    if (!confirmed) return;
    try {
      await adminDeletePortfolio(token, id);
      setPortfolioList((prev) => prev.filter((p) => p.id !== id));
      showAlert.toast("Portfolio project deleted successfully", "success");
    } catch (err: any) {
      handleApiError(err, "Delete Failed");
    }
  };

  // Certificates actions
  const handleDeleteCertificate = async (id: number) => {
    if (!token) return;
    const confirmed = await showAlert.confirm("Delete Certificate?", "Are you sure you want to delete this certificate?");
    if (!confirmed) return;
    try {
      await adminDeleteCertificate(token, id);
      setCertificatesList((prev) => prev.filter((c) => c.id !== id));
      showAlert.toast("Certificate deleted successfully", "success");
    } catch (err: any) {
      handleApiError(err, "Delete Failed");
    }
  };

  // Messages actions
  const handleDeleteMessage = async (id: number) => {
    if (!token) return;
    const confirmed = await showAlert.confirm("Delete Inquiry?", "Are you sure you want to delete this client inquiry?");
    if (!confirmed) return;
    try {
      await adminDeleteMessage(token, id);
      setMessagesList((prev) => prev.filter((m) => m.id !== id));
      showAlert.toast("Message deleted", "success");
    } catch (err: any) {
      handleApiError(err, "Delete Failed");
    }
  };

  // Generic modal form submit
  const handleSaveModalItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !editingModal.type) return;
    setSaving(true);

    try {
      const item = editingModal.item;
      if (editingModal.type === "service") {
        const res = await adminSaveService(token, item, item.id);
        if (item.id) {
          setServicesList((prev) => prev.map((s) => (s.id === item.id ? res.data : s)));
        } else {
          setServicesList((prev) => [...prev, res.data]);
        }
        showAlert.toast("Service saved successfully", "success");
      } else if (editingModal.type === "experience") {
        const payload = {
          ...item,
          bullets: Array.isArray(item.bullets)
            ? item.bullets.map((b: string) => (typeof b === "string" ? b.trim() : b)).filter(Boolean)
            : [],
          skills: typeof item.skills === "string"
            ? item.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
            : Array.isArray(item.skills)
            ? item.skills.filter(Boolean)
            : [],
        };
        const res = await adminSaveExperience(token, payload, item.id);
        if (item.id) {
          setExperiencesList((prev) => prev.map((e) => (e.id === item.id ? res.data : e)));
        } else {
          setExperiencesList((prev) => [...prev, res.data]);
        }
        showAlert.toast("Experience saved successfully", "success");
      } else if (editingModal.type === "project") {
        const payload = {
          ...item,
          features: Array.isArray(item.features)
            ? item.features.filter((f: any) => f && (f.title || f.detail))
            : [],
          tools: Array.isArray(item.tools)
            ? item.tools.filter((t: any) => t && (t.name || t.image))
            : [],
        };
        const res = await adminSaveProjectShowcase(token, payload, item.id);
        if (item.id) {
          setProjectsList((prev) => prev.map((p) => (p.id === item.id ? res.data : p)));
        } else {
          setProjectsList((prev) => [...prev, res.data]);
        }
        showAlert.toast("Project showcase saved successfully", "success");
      } else if (editingModal.type === "portfolio") {
        const res = await adminSavePortfolio(token, item, item.id);
        if (item.id) {
          setPortfolioList((prev) => prev.map((p) => (p.id === item.id ? res.data : p)));
        } else {
          setPortfolioList((prev) => [...prev, res.data]);
        }
        showAlert.toast("Portfolio project saved successfully", "success");
      } else if (editingModal.type === "certificate") {
        const res = await adminSaveCertificate(token, item, item.id);
        if (item.id) {
          setCertificatesList((prev) => prev.map((c) => (c.id === item.id ? res.data : c)));
        } else {
          setCertificatesList((prev) => [...prev, res.data]);
        }
        showAlert.toast("Certificate saved successfully", "success");
      } else if (editingModal.type === "brand_logo") {
        const res = await adminSaveBrandLogo(token, item, item.id);
        if (item.id) {
          setBrandLogosList((prev) => prev.map((b) => (b.id === item.id ? res.data : b)));
        } else {
          setBrandLogosList((prev) => [...prev, res.data]);
        }
        showAlert.toast("Brand logo saved successfully", "success");
      } else if (editingModal.type === "design_tool") {
        const res = await adminSaveDesignTool(token, item, item.id);
        if (item.id) {
          setDesignToolsList((prev) => prev.map((t) => (t.id === item.id ? res.data : t)));
        } else {
          setDesignToolsList((prev) => [...prev, res.data]);
        }
        showAlert.toast("Design tool saved successfully", "success");
      }

      setEditingModal({ type: null, item: null });
    } catch (err: any) {
      handleApiError(err, "Save Failed");
    } finally {
      setSaving(false);
    }
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "profile", label: "Hero & Bio", icon: User },
    { id: "about", label: "About Me (Foto & Cerita)", icon: UserCheck },
    { id: "brand_logos", label: "Brand Logos", icon: Sparkles, count: brandLogosList.length },
    { id: "design_tools", label: "Design Tools", icon: PenTool, count: designToolsList.length },
    { id: "services", label: "Services", icon: Wrench, count: servicesList.length },
    { id: "experiences", label: "Experience", icon: Briefcase, count: experiencesList.length },
    { id: "projects", label: "Featured Projects", icon: Layers, count: projectsList.length },
    { id: "portfolio", label: "Portfolio", icon: FolderGit2, count: portfolioList.length },
    { id: "certificates", label: "Certificates", icon: Award, count: certificatesList.length },
    { id: "messages", label: "Client Inquiries", icon: Mail, count: messagesList.length },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-top-3">
          <CheckCircle2 className="size-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md h-16 flex items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-3">
          <BrandLogo size="sm" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Superadmin CMS
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground hidden sm:block">
              Logged in as {user?.email || "ridwan@gmail.com"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-medium hover:bg-secondary transition-colors"
          >
            <span>Live Portfolio</span>
            <ExternalLink className="size-3" />
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="size-3" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Layout: Sidebar & Content */}
      <div className="flex-1 flex w-full min-h-[calc(100vh-4rem)]">
        
        {/* Sidebar Navigation - Mentok ke kiri dan full height */}
        <aside className="w-64 shrink-0 hidden md:flex flex-col border-r border-border bg-card/20 p-4 space-y-1 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="space-y-1 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-foreground text-background shadow-xs font-bold"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="size-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive ? "bg-background/20 text-background" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-4 mt-auto border-t border-border/60 text-[11px] text-muted-foreground px-2">
            <p className="font-semibold text-foreground">Craft Superadmin</p>
            <p className="text-[10px]">CMS Dashboard v2.0</p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-5xl">
          {/* Mobile Tabs Dropdown / Horizontal Scroll */}
          <div className="md:hidden flex overflow-x-auto gap-2 pb-4 scrollbar-none mb-4">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 ${
                    isActive ? "bg-foreground text-background" : "border border-border bg-card text-muted-foreground"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {loading ? (
            <div className="py-24 text-center space-y-3">
              <Loader2 className="size-8 animate-spin mx-auto text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Loading superadmin database records...</p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* --- TAB 1: OVERVIEW --- */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">System Overview</h2>
                    <p className="text-xs text-muted-foreground">
                      Summary of active landing page content stored in MySQL database.
                    </p>
                  </div>

                  {/* Stat Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl border border-border bg-card space-y-1">
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase">Services</span>
                      <p className="text-2xl font-bold">{servicesList.length}</p>
                    </div>
                    <div className="p-4 rounded-2xl border border-border bg-card space-y-1">
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase">Experiences</span>
                      <p className="text-2xl font-bold">{experiencesList.length}</p>
                    </div>
                    <div className="p-4 rounded-2xl border border-border bg-card space-y-1">
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase">Projects Showcase</span>
                      <p className="text-2xl font-bold">{projectsList.length}</p>
                    </div>
                    <div className="p-4 rounded-2xl border border-border bg-card space-y-1">
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase">Portfolio Case Studies</span>
                      <p className="text-2xl font-bold">{portfolioList.length}</p>
                    </div>
                    <div className="p-4 rounded-2xl border border-border bg-card space-y-1">
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase">Certificates</span>
                      <p className="text-2xl font-bold">{certificatesList.length}</p>
                    </div>
                    <div className="p-4 rounded-2xl border border-border bg-card space-y-1">
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase">Brand Logos</span>
                      <p className="text-2xl font-bold">{brandLogosList.length}</p>
                    </div>
                    <div className="p-4 rounded-2xl border border-border bg-card space-y-1">
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase">Design Tools</span>
                      <p className="text-2xl font-bold">{designToolsList.length}</p>
                    </div>
                    <div className="p-4 rounded-2xl border border-border bg-card space-y-1">
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase">Client Inquiries</span>
                      <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{messagesList.length}</p>
                    </div>
                  </div>

                  {/* Recent Inquiries Preview */}
                  <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold">Recent Client Messages</h3>
                      <button
                        onClick={() => setActiveTab("messages")}
                        className="text-xs text-primary hover:underline font-semibold"
                      >
                        View all
                      </button>
                    </div>

                    {messagesList.length === 0 ? (
                      <p className="text-xs text-muted-foreground py-4 text-center">No messages received yet.</p>
                    ) : (
                      <div className="divide-y divide-border">
                        {messagesList.slice(0, 3).map((m) => (
                          <div key={m.id} className="py-3 flex items-start justify-between gap-4 text-xs">
                            <div>
                              <p className="font-semibold text-foreground">{m.name} ({m.email})</p>
                              <p className="text-muted-foreground line-clamp-1 mt-0.5">{m.message}</p>
                            </div>
                            <span className="text-[10px] text-muted-foreground shrink-0">{new Date(m.created_at).toLocaleDateString()}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* --- TAB 2: HERO & PROFILE --- */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">Hero & Profile Settings</h2>
                    <p className="text-xs text-muted-foreground">
                      Edit the headline, bio, title, availability badge, and stats shown on the landing page.
                    </p>
                  </div>

                  <form onSubmit={handleSaveProfile} className="rounded-2xl border border-border bg-card p-6 space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold">Full Name</label>
                        <input
                          type="text"
                          required
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold">Professional Title</label>
                        <input
                          type="text"
                          required
                          value={profileForm.title}
                          onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold">Hero Availability Status Badge</label>
                      <input
                        type="text"
                        value={profileForm.availability_badge}
                        onChange={(e) => setProfileForm({ ...profileForm, availability_badge: e.target.value })}
                        placeholder="Available for next months | 2 slots free"
                        className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold">Main Headline</label>
                      <input
                        type="text"
                        required
                        value={profileForm.headline}
                        onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold">Bio / Subheading Description</label>
                      <textarea
                        rows={4}
                        required
                        value={profileForm.bio}
                        onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold">Rating Score</label>
                        <input
                          type="text"
                          inputMode="decimal"
                          value={profileForm.rating_score ?? ""}
                          onChange={(e) => setProfileForm({ ...profileForm, rating_score: e.target.value as any })}
                          placeholder="4.5"
                          className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold">Rating Text</label>
                        <input
                          type="text"
                          value={profileForm.rating_text}
                          onChange={(e) => setProfileForm({ ...profileForm, rating_text: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>

                    {/* Services Section Skills Ticker Marquee Settings */}
                    <div className="pt-4 border-t border-border space-y-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-foreground">Services Section Skills Ticker</h3>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">Running Badges</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Atur daftar skill badge pills yang berjalan di marquee Services (pisahkan tiap skill dengan tanda koma).
                        </p>
                      </div>

                      {/* Row 1 Skills */}
                      <div className="space-y-2 p-4 rounded-xl border border-border bg-background/50">
                        <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                          <span>Skills Marquee Row 1 (Pisahkan dengan koma)</span>
                          <span className="text-[10px] text-muted-foreground font-normal">
                            {profileForm.skills_row1_input ? profileForm.skills_row1_input.split(',').filter((s: string) => s.trim()).length : 0} items
                          </span>
                        </label>
                        <textarea
                          rows={2}
                          value={profileForm.skills_row1_input || ""}
                          onChange={(e) => setProfileForm({ ...profileForm, skills_row1_input: e.target.value })}
                          placeholder="Figma, UI Design, UX Design, Canva, Blender, Photoshop, Research, Graphics, Copywriting"
                          className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
                        />
                        {/* Live Badges Preview */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {(profileForm.skills_row1_input || "")
                            .split(",")
                            .map((s: string) => s.trim())
                            .filter(Boolean)
                            .map((tag: string, idx: number) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-border bg-card text-[11px] font-medium text-foreground shadow-2xs"
                              >
                                {tag}
                              </span>
                            ))}
                        </div>
                      </div>

                      {/* Row 2 Skills */}
                      <div className="space-y-2 p-4 rounded-xl border border-border bg-background/50">
                        <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                          <span>Skills Marquee Row 2 (Pisahkan dengan koma)</span>
                          <span className="text-[10px] text-muted-foreground font-normal">
                            {profileForm.skills_row2_input ? profileForm.skills_row2_input.split(',').filter((s: string) => s.trim()).length : 0} items
                          </span>
                        </label>
                        <textarea
                          rows={2}
                          value={profileForm.skills_row2_input || ""}
                          onChange={(e) => setProfileForm({ ...profileForm, skills_row2_input: e.target.value })}
                          placeholder="Next.js, Tailwind CSS, React, TypeScript, Framer Motion, Design Systems, Responsive Web, Wireframing, User Flows"
                          className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
                        />
                        {/* Live Badges Preview */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {(profileForm.skills_row2_input || "")
                            .split(",")
                            .map((s: string) => s.trim())
                            .filter(Boolean)
                            .map((tag: string, idx: number) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-border bg-card text-[11px] font-medium text-foreground shadow-2xs"
                              >
                                {tag}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>

                    {/* About Section Quick Banner */}
                    <div className="pt-6 border-t border-border">
                      <div className="p-4 rounded-2xl border border-primary/20 bg-primary/5 flex items-center justify-between gap-4 flex-wrap">
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                            <UserCheck className="size-4 text-primary" />
                            <span>Mencari Pengaturan Foto Profil & Cerita About Me?</span>
                          </h4>
                          <p className="text-[11px] text-muted-foreground">
                            Ganti foto profil About Me (dengan live preview & drag-and-drop) dan edit 3 paragraf cerita sekarang memiliki tab tersendiri di menu navigasi.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveTab("about")}
                          className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-all cursor-pointer shadow-xs"
                        >
                          Buka Tab About Me &rarr;
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-foreground text-background font-semibold text-xs hover:opacity-90 transition-all shadow-sm cursor-pointer disabled:opacity-50"
                    >
                      {saving ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
                      <span>Save Hero & Profile Changes</span>
                    </button>
                  </form>
                </div>
              )}

              {/* --- TAB: ABOUT ME (FOTO & CERITA) --- */}
              {activeTab === "about" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold tracking-tight">About Me Settings</h2>
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20">
                          Live On Website
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Ganti foto profil About Me dan atur 3 paragraf cerita yang tampil di section About Me landing page.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background font-semibold text-xs hover:opacity-90 transition-all shadow-sm cursor-pointer disabled:opacity-50 self-start sm:self-auto"
                    >
                      {saving ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
                      <span>Simpan Perubahan About Me</span>
                    </button>
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    {/* Visual Card Preview + Upload Dropzone */}
                    <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-foreground">Foto Profil About Me</h3>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                              Interaktif
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Ganti foto profil John Doe dengan foto Anda sendiri. Foto ini tampil di sebelah kiri teks cerita dengan efek hover hitam-putih menjadi berwarna.
                          </p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-12 gap-6 items-start pt-2">
                        {/* Live Photo Preview */}
                        <div className="md:col-span-4 space-y-2">
                          <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                            <span>Live Preview Tampilan</span>
                            <span className="text-[10px] text-muted-foreground">Rasio 4:5</span>
                          </label>
                          <div className="group relative overflow-hidden rounded-2xl border border-border bg-background shadow-md aspect-[4/5] flex items-center justify-center">
                            {profileForm.about_image ? (
                              <img
                                src={profileForm.about_image}
                                alt="About Profile Preview"
                                className="w-full h-full object-cover filter grayscale contrast-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105 transition-all duration-700 ease-in-out cursor-pointer"
                              />
                            ) : (
                              <div className="text-center p-4 text-muted-foreground text-xs">
                                Belum ada foto terpilih
                              </div>
                            )}
                            <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-xs text-white text-[10px] px-2.5 py-1 rounded-full pointer-events-none font-medium shadow-xs">
                              Hover untuk warna ✨
                            </div>
                          </div>
                          <p className="text-[11px] text-muted-foreground text-center">
                            Arahkan kursor ke foto untuk melihat efek warnanya.
                          </p>
                        </div>

                        {/* Image Dropzone Upload */}
                        <div className="md:col-span-8 space-y-4">
                          <ImageDropzone
                            label="Unggah / Ganti Foto Profil About Me"
                            value={profileForm.about_image || ""}
                            onChange={(url) => setProfileForm({ ...profileForm, about_image: url })}
                            token={token}
                          />

                          <div className="p-4 rounded-xl bg-secondary/50 border border-border/70 text-xs text-muted-foreground space-y-1.5">
                            <p className="font-bold text-foreground">💡 Panduan Unggah Foto:</p>
                            <p>• <strong>Bisa Drag & Drop:</strong> Tarik file gambar dari komputer langsung ke kotak di atas.</p>
                            <p>• <strong>Bisa Pilih File:</strong> Klik tombol &ldquo;Pilih File Gambar&rdquo; untuk browse dari perangkat.</p>
                            <p>• <strong>Rekomendasi Foto:</strong> Gunakan foto potret (vertikal) seperti foto selfie, foto studio, atau foto kerja berorientasi potret agar proporsinya pas.</p>
                            <p>• <strong>Format & Ukuran:</strong> JPG, PNG, WebP dengan ukuran maksimal 10 MB.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3 Paragraf Cerita */}
                    <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
                      <div>
                        <h3 className="text-sm font-bold text-foreground">Tiga Paragraf Cerita (Story Highlights)</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Teks di sebelah kanan foto profil. Setiap paragraf memiliki kalimat pembuka tebal (highlight) dan penjelasan detail.
                        </p>
                      </div>

                      {/* Paragraph 1 */}
                      <div className="p-4 rounded-xl border border-border bg-background/50 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-foreground">Paragraf 1 (Pembuka & Passion)</span>
                          <span className="text-[10px] text-muted-foreground">Bagian Atas</span>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-foreground">Teks Tebal / Headline Paragraf</label>
                          <input
                            type="text"
                            value={profileForm.about_p1_highlight}
                            onChange={(e) => setProfileForm({ ...profileForm, about_p1_highlight: e.target.value })}
                            placeholder="Design isn't just my job—it's my passion."
                            className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-foreground">Isi Cerita Paragraf</label>
                          <textarea
                            rows={3}
                            value={profileForm.about_p1_text}
                            onChange={(e) => setProfileForm({ ...profileForm, about_p1_text: e.target.value })}
                            placeholder="What began as a hobby turned into a full-fledged career when I realized the true power of design..."
                            className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
                          />
                        </div>
                      </div>

                      {/* Paragraph 2 */}
                      <div className="p-4 rounded-xl border border-border bg-background/50 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-foreground">Paragraf 2 (Pendekatan & Filosofi)</span>
                          <span className="text-[10px] text-muted-foreground">Bagian Tengah</span>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-foreground">Teks Tebal / Headline Paragraf</label>
                          <input
                            type="text"
                            value={profileForm.about_p2_highlight}
                            onChange={(e) => setProfileForm({ ...profileForm, about_p2_highlight: e.target.value })}
                            placeholder="My approach is all about crafting user interfaces that serve a real purpose."
                            className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-foreground">Isi Cerita Paragraf</label>
                          <textarea
                            rows={3}
                            value={profileForm.about_p2_text}
                            onChange={(e) => setProfileForm({ ...profileForm, about_p2_text: e.target.value })}
                            placeholder="I believe great design should solve problems and provide seamless experiences."
                            className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
                          />
                        </div>
                      </div>

                      {/* Paragraph 3 */}
                      <div className="p-4 rounded-xl border border-border bg-background/50 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-foreground">Paragraf 3 (Detail & Kualitas)</span>
                          <span className="text-[10px] text-muted-foreground">Bagian Bawah</span>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-foreground">Teks Tebal / Headline Paragraf</label>
                          <input
                            type="text"
                            value={profileForm.about_p3_highlight}
                            onChange={(e) => setProfileForm({ ...profileForm, about_p3_highlight: e.target.value })}
                            placeholder="I'm a perfectionist when it comes to the details..."
                            className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-foreground">Isi Cerita Paragraf</label>
                          <textarea
                            rows={3}
                            value={profileForm.about_p3_text}
                            onChange={(e) => setProfileForm({ ...profileForm, about_p3_text: e.target.value })}
                            placeholder="This meticulous attention to detail allows me to create lasting relationships with clients."
                            className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Tools Card Title & Subtitle */}
                    <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <h3 className="text-sm font-bold text-foreground">Header Kartu Tools</h3>
                          <p className="text-xs text-muted-foreground">
                            Judul & deskripsi yang tampil di atas deretan icon tool (Figma, Framer, Blender, dll).
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveTab("design_tools")}
                          className="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
                        >
                          <span>Kelola Daftar Tool & Icon ({designToolsList.length})</span>
                          <span>&rarr;</span>
                        </button>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-foreground">Judul Kartu Tools</label>
                        <input
                          type="text"
                          value={profileForm.about_tools_title}
                          onChange={(e) => setProfileForm({ ...profileForm, about_tools_title: e.target.value })}
                          placeholder="Tools That Power My Design Process"
                          className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-foreground">Subjudul / Deskripsi Kartu Tools</label>
                        <textarea
                          rows={2}
                          value={profileForm.about_tools_description}
                          onChange={(e) => setProfileForm({ ...profileForm, about_tools_description: e.target.value })}
                          placeholder="My design process is powered by tools that encourage clarity, collaboration, and creativity..."
                          className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
                        />
                      </div>
                    </div>

                    {/* Bottom Save Button */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-foreground text-background font-semibold text-xs hover:opacity-90 transition-all shadow-md cursor-pointer disabled:opacity-50"
                      >
                        {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                        <span>Simpan Perubahan About Me</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* --- TAB: BRAND LOGOS --- */}
              {activeTab === "brand_logos" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold tracking-tight">Brand & Partner Logos</h2>
                      <p className="text-xs text-muted-foreground">
                        Kelola logo brand/partner yang berjalan di marquee continuous pada bagian bawah Hero section.
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setEditingModal({
                          type: "brand_logo",
                          item: { name: "", logo: "", url: "", sort_order: brandLogosList.length + 1 },
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-foreground text-background text-xs font-semibold hover:opacity-90 cursor-pointer shadow-xs"
                    >
                      <Plus className="size-3.5" />
                      <span>Add Brand Logo</span>
                    </button>
                  </div>

                  {brandLogosList.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-border rounded-2xl bg-card/40 space-y-2">
                      <p className="text-xs text-muted-foreground">Belum ada logo brand yang ditambahkan.</p>
                      <button
                        onClick={() =>
                          setEditingModal({
                            type: "brand_logo",
                            item: { name: "", logo: "", url: "", sort_order: 1 },
                          })
                        }
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        + Tambah Logo Brand Pertama
                      </button>
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {brandLogosList.map((brand) => (
                        <div
                          key={brand.id}
                          className="p-4 rounded-2xl border border-border bg-card space-y-3 flex flex-col justify-between hover:border-foreground/20 transition-all shadow-xs"
                        >
                          <div className="space-y-2.5">
                            <div className="h-16 w-full rounded-xl bg-muted/40 border border-border flex items-center justify-center p-2.5 overflow-hidden">
                              {brand.logo ? (
                                <img
                                  src={brand.logo}
                                  alt={brand.name}
                                  className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all"
                                />
                              ) : (
                                <span className="text-[10px] text-muted-foreground italic">No Logo Image</span>
                              )}
                            </div>
                            <div>
                              <h3 className="font-bold text-sm text-foreground truncate">{brand.name}</h3>
                              {brand.url ? (
                                <a
                                  href={brand.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[11px] text-primary hover:underline inline-flex items-center gap-1 mt-0.5 truncate max-w-full"
                                >
                                  <span>{brand.url.replace(/^https?:\/\//, '')}</span>
                                  <ExternalLink className="size-2.5 shrink-0" />
                                </a>
                              ) : (
                                <span className="text-[10px] text-muted-foreground/60">No URL link</span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-border text-[11px] text-muted-foreground">
                            <span>Order #{brand.sort_order ?? 0}</span>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => setEditingModal({ type: "brand_logo", item: { ...brand } })}
                                className="p-1.5 rounded-lg border border-border hover:bg-secondary text-xs cursor-pointer"
                                title="Edit Brand"
                              >
                                <Edit className="size-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteBrandLogo(brand.id)}
                                className="p-1.5 rounded-lg border border-border hover:bg-rose-500/10 text-rose-500 text-xs cursor-pointer"
                                title="Delete Brand"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* --- TAB: DESIGN TOOLS --- */}
              {activeTab === "design_tools" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold tracking-tight">Tools That Power My Design Process</h2>
                      <p className="text-xs text-muted-foreground">
                        Kelola icon, logo, link, dan nama software tools yang tampil pada kartu di bagian About Me.
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setEditingModal({
                          type: "design_tool",
                          item: { name: "", icon: "", dark_icon: "", href: "", show_name: true, sort_order: designToolsList.length + 1 },
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-foreground text-background text-xs font-semibold hover:opacity-90 cursor-pointer shadow-xs"
                    >
                      <Plus className="size-3.5" />
                      <span>Add Design Tool</span>
                    </button>
                  </div>

                  {/* Header Title & Subtitle quick settings card */}
                  <div className="p-4 rounded-2xl border border-border bg-card space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground">Pengaturan Teks Kartu Tools</span>
                      <button
                        type="button"
                        onClick={() => setActiveTab("profile")}
                        className="text-xs text-primary hover:underline font-semibold"
                      >
                        Edit di Tab Hero & Profile &rarr;
                      </button>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p><strong className="text-foreground">Judul:</strong> {profileForm.about_tools_title || "Tools That Power My Design Process"}</p>
                      <p><strong className="text-foreground">Deskripsi:</strong> {profileForm.about_tools_description || "My design process is powered by tools that encourage clarity, collaboration, and creativity — turning vision into user-centered experiences."}</p>
                    </div>
                  </div>

                  {designToolsList.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-border rounded-2xl bg-card/40 space-y-2">
                      <p className="text-xs text-muted-foreground">Belum ada design tool yang ditambahkan.</p>
                      <button
                        onClick={() =>
                          setEditingModal({
                            type: "design_tool",
                            item: { name: "", icon: "", dark_icon: "", href: "", show_name: true, sort_order: 1 },
                          })
                        }
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        + Tambah Tool Pertama
                      </button>
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {designToolsList.map((tool) => (
                        <div
                          key={tool.id}
                          className="p-4 rounded-2xl border border-border bg-card space-y-3 flex flex-col justify-between hover:border-foreground/20 transition-all shadow-xs"
                        >
                          <div className="space-y-2.5">
                            <div className="h-16 w-full rounded-xl bg-muted/40 border border-border flex items-center justify-center p-2.5 overflow-hidden">
                              {tool.icon ? (
                                <img
                                  src={tool.icon}
                                  alt={tool.name}
                                  className="max-h-8 max-w-full object-contain"
                                />
                              ) : (
                                <span className="text-[10px] text-muted-foreground italic">No Icon</span>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h3 className="font-bold text-sm text-foreground truncate">{tool.name}</h3>
                                {tool.show_name === false && (
                                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-muted text-muted-foreground font-semibold">Icon Only</span>
                                )}
                              </div>
                              {tool.href ? (
                                <a
                                  href={tool.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[11px] text-primary hover:underline inline-flex items-center gap-1 mt-0.5 truncate max-w-full"
                                >
                                  <span>{tool.href.replace(/^https?:\/\//, '')}</span>
                                  <ExternalLink className="size-2.5 shrink-0" />
                                </a>
                              ) : (
                                <span className="text-[10px] text-muted-foreground/60">No URL link</span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-border text-[11px] text-muted-foreground">
                            <span>Order #{tool.sort_order ?? 0}</span>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => setEditingModal({ type: "design_tool", item: { ...tool } })}
                                className="p-1.5 rounded-lg border border-border hover:bg-secondary text-xs cursor-pointer"
                                title="Edit Tool"
                              >
                                <Edit className="size-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteDesignTool(tool.id)}
                                className="p-1.5 rounded-lg border border-border hover:bg-rose-500/10 text-rose-500 text-xs cursor-pointer"
                                title="Delete Tool"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* --- TAB 3: SERVICES --- */}
              {activeTab === "services" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold tracking-tight">Services Section</h2>
                      <p className="text-xs text-muted-foreground">Manage service cards shown in ServicesSection.</p>
                    </div>
                    <button
                      onClick={() => setEditingModal({ type: "service", item: { title: "", description: "", icon: "palette", sort_order: servicesList.length + 1 } })}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-foreground text-background text-xs font-semibold hover:opacity-90 cursor-pointer shadow-xs"
                    >
                      <Plus className="size-3.5" />
                      <span>Add Service</span>
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {servicesList.map((srv) => (
                      <div key={srv.id} className="p-5 rounded-2xl border border-border bg-card space-y-3 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <h3 className="font-bold text-sm text-foreground">{srv.title}</h3>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted">Icon: {srv.icon}</span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">{srv.description}</p>
                        </div>
                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                          <button
                            onClick={() => setEditingModal({ type: "service", item: { ...srv } })}
                            className="p-1.5 rounded-lg border border-border hover:bg-secondary text-xs"
                            title="Edit"
                          >
                            <Edit className="size-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteService(srv.id)}
                            className="p-1.5 rounded-lg border border-border hover:bg-rose-500/10 text-rose-500 text-xs"
                            title="Delete"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- TAB 4: EXPERIENCES --- */}
              {activeTab === "experiences" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold tracking-tight">Career Experience</h2>
                      <p className="text-xs text-muted-foreground">Manage experience timeline shown in ExperienceSection.</p>
                    </div>
                    <button
                      onClick={() => setEditingModal({
                        type: "experience",
                        item: {
                          company: "",
                          role: "",
                          period: "",
                          employment_type: "Full-time",
                          description: "",
                          bullets: [""],
                          skills: [],
                          sort_order: experiencesList.length + 1,
                        },
                      })}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-foreground text-background text-xs font-semibold hover:opacity-90 cursor-pointer shadow-xs"
                    >
                      <Plus className="size-3.5" />
                      <span>Add Experience</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {experiencesList.map((exp) => (
                      <div key={exp.id} className="p-4 rounded-2xl border border-border bg-card flex items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-foreground">{exp.role}</span>
                            <span className="text-xs text-muted-foreground">• {exp.company}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{exp.period} ({exp.employment_type || "Full-time"})</p>
                          <div className="flex items-center gap-2 text-[11px] text-muted-foreground pt-0.5">
                            <span className="font-medium text-foreground/80">{exp.bullets?.length || 0} point{exp.bullets?.length === 1 ? "" : "s"}</span>
                            <span>•</span>
                            <span>{exp.skills?.length || 0} skill tags</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() =>
                              setEditingModal({
                                type: "experience",
                                item: {
                                  ...exp,
                                  bullets: Array.isArray(exp.bullets) ? [...exp.bullets] : [],
                                  skills: Array.isArray(exp.skills) ? [...exp.skills] : [],
                                },
                              })
                            }
                            className="p-1.5 rounded-lg border border-border hover:bg-secondary text-xs cursor-pointer"
                            title="Edit Experience"
                          >
                            <Edit className="size-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteExperience(exp.id)}
                            className="p-1.5 rounded-lg border border-border hover:bg-rose-500/10 text-rose-500 text-xs cursor-pointer"
                            title="Delete Experience"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- TAB 5: PROJECTS SHOWCASE --- */}
              {activeTab === "projects" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold tracking-tight">Featured Projects Showcase</h2>
                      <p className="text-xs text-muted-foreground">Manage featured projects and tool stacks in ProjectsSection.</p>
                    </div>
                    <button
                      onClick={() =>
                        setEditingModal({
                          type: "project",
                          item: {
                            name: "",
                            duration: "",
                            period: "",
                            logo: "",
                            description: "",
                            features: [
                              { title: "Design System", detail: "" },
                              { title: "Figma Kit", detail: "" },
                            ],
                            tools: [
                              { name: "Figma", image: "/images/project/image-13.webp" },
                            ],
                            sort_order: projectsList.length + 1,
                          },
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-foreground text-background text-xs font-semibold hover:opacity-90 cursor-pointer shadow-xs"
                    >
                      <Plus className="size-3.5" />
                      <span>Add Project</span>
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {projectsList.map((proj) => (
                      <div key={proj.id} className="p-5 rounded-2xl border border-border bg-card space-y-3 flex flex-col justify-between">
                        <div className="flex gap-3.5">
                          {proj.logo && (
                            <div className="size-12 rounded-xl border border-border overflow-hidden bg-muted/40 p-1 flex items-center justify-center shrink-0">
                              <img src={proj.logo} alt={proj.name} className="max-h-full max-w-full object-contain" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <h3 className="font-bold text-sm text-foreground truncate">{proj.name}</h3>
                              <span className="text-[10px] text-muted-foreground">{proj.duration}</span>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{proj.description}</p>
                            <div className="flex items-center gap-2 text-[11px] text-muted-foreground pt-1.5">
                              <span>{proj.features?.length || 0} features</span>
                              <span>•</span>
                              <span>{proj.tools?.length || 0} tools</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                          <button
                            onClick={() =>
                              setEditingModal({
                                type: "project",
                                item: {
                                  ...proj,
                                  features: Array.isArray(proj.features) ? [...proj.features] : [],
                                  tools: Array.isArray(proj.tools) ? [...proj.tools] : [],
                                },
                              })
                            }
                            className="p-1.5 rounded-lg border border-border hover:bg-secondary text-xs cursor-pointer"
                            title="Edit Project"
                          >
                            <Edit className="size-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="p-1.5 rounded-lg border border-border hover:bg-rose-500/10 text-rose-500 text-xs cursor-pointer"
                            title="Delete Project"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- TAB 6: PORTFOLIO --- */}
              {activeTab === "portfolio" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold tracking-tight">Portfolio Projects</h2>
                      <p className="text-xs text-muted-foreground">Manage case studies and projects shown on /portfolio.</p>
                    </div>
                    <button
                      onClick={() => setEditingModal({ type: "portfolio", item: { title: "", category: "Web Design", slug: "", description: "", image_light: "/images/portfolio/image-01.webp", project_url: "" } })}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-foreground text-background text-xs font-semibold hover:opacity-90 cursor-pointer shadow-xs"
                    >
                      <Plus className="size-3.5" />
                      <span>Add Portfolio</span>
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {portfolioList.map((item) => (
                      <div key={item.id} className="p-4 rounded-2xl border border-border bg-card space-y-3 flex flex-col justify-between">
                        <div className="flex gap-3.5">
                          {item.image_light && (
                            <div className="size-16 rounded-xl border border-border overflow-hidden bg-muted/30 shrink-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={item.image_light} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">{item.category}</span>
                            <h3 className="font-bold text-sm text-foreground truncate">{item.title}</h3>
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{item.description}</p>
                            {item.project_url && (
                              <a
                                href={item.project_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 hover:underline mt-1"
                              >
                                <span>Live Website</span>
                                <ExternalLink className="size-3" />
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                          <button
                            onClick={() => setEditingModal({ type: "portfolio", item: { ...item } })}
                            className="p-1.5 rounded-lg border border-border hover:bg-secondary text-xs cursor-pointer"
                          >
                            <Edit className="size-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeletePortfolio(item.id)}
                            className="p-1.5 rounded-lg border border-border hover:bg-rose-500/10 text-rose-500 text-xs cursor-pointer"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- TAB 7: CERTIFICATES --- */}
              {activeTab === "certificates" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold tracking-tight">Certificates</h2>
                      <p className="text-xs text-muted-foreground">Manage credentials shown on /certificates.</p>
                    </div>
                    <button
                      onClick={() => setEditingModal({ type: "certificate", item: { title: "", issuer: "", issuer_org: "", category: "FRONTEND", image: "", issue_date: "", credential_id: "", verify_url: "", description: "" } })}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-foreground text-background text-xs font-semibold hover:opacity-90 cursor-pointer shadow-xs"
                    >
                      <Plus className="size-3.5" />
                      <span>Add Certificate</span>
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {certificatesList.map((cert) => (
                      <div key={cert.id} className="p-4 rounded-2xl border border-border bg-card space-y-3 flex flex-col justify-between">
                        <div className="flex gap-3 items-start">
                          {cert.image && (
                            <div className="size-16 rounded-xl overflow-hidden border border-border shrink-0 bg-muted/40">
                              <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">{cert.category}</span>
                            <h3 className="font-bold text-sm text-foreground truncate">{cert.title}</h3>
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{cert.description}</p>
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              {cert.credential_id ? (
                                <span className="text-[10px] text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded-md">
                                  ID: {cert.credential_id}
                                </span>
                              ) : (
                                <span className="text-[10px] text-muted-foreground/60 italic">No Credential ID</span>
                              )}
                              {cert.verify_url && (
                                <a
                                  href={cert.verify_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[10px] text-primary hover:underline inline-flex items-center gap-0.5"
                                >
                                  Verify Link <ExternalLink className="size-2.5" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                          <button
                            onClick={() => setEditingModal({ type: "certificate", item: { ...cert } })}
                            className="p-1.5 rounded-lg border border-border hover:bg-secondary text-xs cursor-pointer"
                          >
                            <Edit className="size-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteCertificate(cert.id)}
                            className="p-1.5 rounded-lg border border-border hover:bg-rose-500/10 text-rose-500 text-xs cursor-pointer"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- TAB 8: MESSAGES --- */}
              {activeTab === "messages" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">Client Contact Messages</h2>
                    <p className="text-xs text-muted-foreground">Inquiries submitted via the Contact form.</p>
                  </div>

                  {messagesList.length === 0 ? (
                    <div className="py-16 text-center border border-dashed border-border rounded-2xl">
                      <Mail className="size-8 mx-auto text-muted-foreground opacity-50 mb-2" />
                      <p className="text-xs text-muted-foreground">No client messages received yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messagesList.map((msg) => (
                        <div key={msg.id} className="p-5 rounded-2xl border border-border bg-card space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-bold text-sm text-foreground">{msg.name}</h3>
                              <a href={`mailto:${msg.email}`} className="text-xs text-primary hover:underline">
                                {msg.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[11px] text-muted-foreground">{new Date(msg.created_at).toLocaleString()}</span>
                              <button
                                onClick={() => handleDeleteMessage(msg.id)}
                                className="p-1.5 rounded-lg border border-border hover:bg-rose-500/10 text-rose-500 text-xs cursor-pointer"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>
                          </div>

                          {msg.budget && (
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-secondary text-[11px] font-medium text-foreground">
                              Budget: {msg.budget}
                            </span>
                          )}

                          <p className="text-xs text-foreground bg-muted/40 p-3 rounded-xl whitespace-pre-wrap leading-relaxed">
                            {msg.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}
          </div>
        </main>
      </div>

      {/* Generic Edit/Create Modal */}
      {editingModal.type && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-2xl border border-border bg-background p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="font-bold text-base capitalize">
                {editingModal.item?.id ? "Edit" : "Add New"} {editingModal.type}
              </h3>
              <button
                onClick={() => setEditingModal({ type: null, item: null })}
                className="p-1 rounded-full border border-border hover:bg-secondary cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleSaveModalItem} className="space-y-4 text-xs">
              {/* Service Form */}
              {editingModal.type === "service" && (
                <>
                  <div className="space-y-1">
                    <label className="font-semibold">Title</label>
                    <input
                      type="text"
                      required
                      value={editingModal.item?.title || ""}
                      onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, title: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold">Icon Identifier</label>
                    <input
                      type="text"
                      value={editingModal.item?.icon || ""}
                      onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, icon: e.target.value } })}
                      placeholder="palette, laptop, pen-tool, framer"
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold">Description</label>
                    <textarea
                      rows={3}
                      required
                      value={editingModal.item?.description || ""}
                      onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, description: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                    />
                  </div>
                </>
              )}

              {/* Experience Form */}
              {editingModal.type === "experience" && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold">Company / Perusahaan</label>
                      <input
                        type="text"
                        required
                        value={editingModal.item?.company || ""}
                        onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, company: e.target.value } })}
                        placeholder="e.g. Kalapa Technology"
                        className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold">Role / Jabatan</label>
                      <input
                        type="text"
                        required
                        value={editingModal.item?.role || ""}
                        onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, role: e.target.value } })}
                        placeholder="e.g. IT Development"
                        className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold">Period / Periode Waktu</label>
                      <input
                        type="text"
                        required
                        value={editingModal.item?.period || ""}
                        onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, period: e.target.value } })}
                        placeholder="e.g. Feb 2026 - Mei 2026"
                        className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold">Employment Type / Tipe</label>
                      <input
                        type="text"
                        value={editingModal.item?.employment_type ?? ""}
                        placeholder="e.g. Intern / Full-time / Contract"
                        onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, employment_type: e.target.value } })}
                        className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                      />
                    </div>
                  </div>

                  {/* Bullet Points Management */}
                  <div className="space-y-2.5 p-3.5 rounded-xl border border-border bg-background/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="font-semibold text-xs text-foreground flex items-center gap-1.5">
                          <span>Point-Point Pengalaman (Bullet List)</span>
                          <span className="text-[10px] px-2 py-0.2 rounded-full bg-primary/10 text-primary font-semibold">
                            {editingModal.item?.bullets?.length || 0} points
                          </span>
                        </label>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Tulis deskripsi tanggung jawab atau pencapaian yang tampil sebagai tanda titik (bullet) di accordion.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const cur = editingModal.item?.bullets || [];
                          setEditingModal({
                            ...editingModal,
                            item: { ...editingModal.item, bullets: [...cur, ""] },
                          });
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-xs font-semibold cursor-pointer shadow-2xs"
                      >
                        <Plus className="size-3" />
                        <span>Tambah Point</span>
                      </button>
                    </div>

                    {(!editingModal.item?.bullets || editingModal.item.bullets.length === 0) ? (
                      <div className="py-4 text-center border border-dashed border-border rounded-xl space-y-1.5 bg-card/30">
                        <p className="text-xs text-muted-foreground">Belum ada point yang ditambahkan.</p>
                        <button
                          type="button"
                          onClick={() => setEditingModal({ ...editingModal, item: { ...editingModal.item, bullets: [""] } })}
                          className="text-xs text-primary font-semibold hover:underline cursor-pointer"
                        >
                          + Tambah Point Pertama
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {editingModal.item.bullets.map((b: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-xs font-bold text-muted-foreground mt-2 size-5 flex items-center justify-center shrink-0">
                              •
                            </span>
                            <textarea
                              rows={2}
                              value={b}
                              onChange={(e) => {
                                const updated = [...editingModal.item.bullets];
                                updated[idx] = e.target.value;
                                setEditingModal({
                                  ...editingModal,
                                  item: { ...editingModal.item, bullets: updated },
                                });
                              }}
                              placeholder={`Tulis point ke-${idx + 1}...`}
                              className="flex-1 px-3 py-2 rounded-xl border border-border bg-background text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = editingModal.item.bullets.filter((_: any, i: number) => i !== idx);
                                setEditingModal({
                                  ...editingModal,
                                  item: { ...editingModal.item, bullets: updated },
                                });
                              }}
                              className="p-2 rounded-lg border border-border hover:bg-rose-500/10 text-rose-500 text-xs mt-1 cursor-pointer shrink-0"
                              title="Hapus Point"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Skills / Tech Stack Badges */}
                  <div className="space-y-2 p-3.5 rounded-xl border border-border bg-background/50">
                    <label className="font-semibold text-xs text-foreground flex items-center justify-between">
                      <span>Skills & Tools Badges (Pisahkan dengan tanda koma)</span>
                      <span className="text-[10px] text-muted-foreground font-normal">
                        {typeof editingModal.item?.skills === "string"
                          ? editingModal.item.skills.split(',').filter((s: string) => s.trim()).length
                          : (editingModal.item?.skills?.length || 0)} tags
                      </span>
                    </label>
                    <input
                      type="text"
                      value={
                        typeof editingModal.item?.skills === "string"
                          ? editingModal.item.skills
                          : Array.isArray(editingModal.item?.skills)
                          ? editingModal.item.skills.join(", ")
                          : ""
                      }
                      onChange={(e) =>
                        setEditingModal({
                          ...editingModal,
                          item: { ...editingModal.item, skills: e.target.value },
                        })
                      }
                      placeholder="e.g. Figma, Design Systems, User Research, Next.js"
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    {/* Live skills preview */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(typeof editingModal.item?.skills === "string"
                        ? editingModal.item.skills.split(",")
                        : editingModal.item?.skills || []
                      )
                        .map((s: string) => (typeof s === "string" ? s.trim() : ""))
                        .filter(Boolean)
                        .map((tag: string, idx: number) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-border bg-card text-[11px] font-medium text-foreground shadow-2xs"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold">Sort Order</label>
                    <input
                      type="number"
                      value={editingModal.item?.sort_order ?? 0}
                      onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, sort_order: parseInt(e.target.value) || 0 } })}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                    />
                  </div>
                </>
              )}

              {/* Projects Showcase Form */}
              {editingModal.type === "project" && (
                <>
                  <ImageDropzone
                    label="Logo Proyek (Drag & Drop atau Pilih Gambar - PNG / SVG / WebP)"
                    value={editingModal.item?.logo}
                    onChange={(url) => setEditingModal({ ...editingModal, item: { ...editingModal.item, logo: url } })}
                    token={token}
                  />

                  <div className="space-y-1">
                    <label className="font-semibold">Nama Proyek</label>
                    <input
                      type="text"
                      required
                      value={editingModal.item?.name || ""}
                      onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, name: e.target.value } })}
                      placeholder="e.g. UmrohApps, Billing WA, FlyonUI"
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold">Durasi Pengerjaan</label>
                      <input
                        type="text"
                        value={editingModal.item?.duration || ""}
                        onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, duration: e.target.value } })}
                        placeholder="e.g. 3 Months"
                        className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold">Periode Waktu</label>
                      <input
                        type="text"
                        value={editingModal.item?.period || ""}
                        onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, period: e.target.value } })}
                        placeholder="e.g. Juni 2026 - September 2026"
                        className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold">Deskripsi Ringkasan Proyek</label>
                    <textarea
                      rows={3}
                      required
                      value={editingModal.item?.description || ""}
                      onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, description: e.target.value } })}
                      placeholder="Tuliskan overview tentang tujuan dan hasil proyek ini..."
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                    />
                  </div>

                  {/* Key Features List */}
                  <div className="space-y-3 p-3.5 rounded-xl border border-border bg-background/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="font-semibold text-xs text-foreground flex items-center gap-1.5">
                          <span>Key Features & Highlights (Fitur Utama)</span>
                          <span className="text-[10px] px-2 py-0.2 rounded-full bg-primary/10 text-primary font-semibold">
                            {editingModal.item?.features?.length || 0} features
                          </span>
                        </label>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Poin fitur utama proyek (contoh: Design System, Figma Kit, Customizable, Real-Time Collaboration).
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const cur = editingModal.item?.features || [];
                          setEditingModal({
                            ...editingModal,
                            item: { ...editingModal.item, features: [...cur, { title: "", detail: "" }] },
                          });
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-xs font-semibold cursor-pointer shadow-2xs"
                      >
                        <Plus className="size-3" />
                        <span>Tambah Fitur</span>
                      </button>
                    </div>

                    {(!editingModal.item?.features || editingModal.item.features.length === 0) ? (
                      <div className="py-4 text-center border border-dashed border-border rounded-xl space-y-1.5 bg-card/30">
                        <p className="text-xs text-muted-foreground">Belum ada fitur yang ditambahkan.</p>
                        <button
                          type="button"
                          onClick={() =>
                            setEditingModal({
                              ...editingModal,
                              item: { ...editingModal.item, features: [{ title: "", detail: "" }] },
                            })
                          }
                          className="text-xs text-primary font-semibold hover:underline cursor-pointer"
                        >
                          + Tambah Fitur Pertama
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {editingModal.item.features.map((f: { title: string; detail: string }, idx: number) => (
                          <div key={idx} className="p-3 rounded-xl border border-border bg-card/60 space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[11px] font-bold text-muted-foreground">Fitur #{idx + 1}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = editingModal.item.features.filter((_: any, i: number) => i !== idx);
                                  setEditingModal({
                                    ...editingModal,
                                    item: { ...editingModal.item, features: updated },
                                  });
                                }}
                                className="p-1 rounded-md hover:bg-rose-500/10 text-rose-500 text-xs cursor-pointer"
                                title="Hapus Fitur"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>
                            <input
                              type="text"
                              value={f.title || ""}
                              onChange={(e) => {
                                const updated = [...editingModal.item.features];
                                updated[idx] = { ...updated[idx], title: e.target.value };
                                setEditingModal({ ...editingModal, item: { ...editingModal.item, features: updated } });
                              }}
                              placeholder="Judul Fitur (e.g. Design System, Figma Kit, Customizable)"
                              className="w-full px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            <textarea
                              rows={2}
                              value={f.detail || ""}
                              onChange={(e) => {
                                const updated = [...editingModal.item.features];
                                updated[idx] = { ...updated[idx], detail: e.target.value };
                                setEditingModal({ ...editingModal, item: { ...editingModal.item, features: updated } });
                              }}
                              placeholder="Penjelasan detail fitur..."
                              className="w-full px-3 py-1.5 rounded-lg border border-border bg-background text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tools Stack */}
                  <div className="space-y-3 p-3.5 rounded-xl border border-border bg-background/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="font-semibold text-xs text-foreground flex items-center gap-1.5">
                          <span>Tools & Software yang Digunakan</span>
                          <span className="text-[10px] px-2 py-0.2 rounded-full bg-primary/10 text-primary font-semibold">
                            {editingModal.item?.tools?.length || 0} tools
                          </span>
                        </label>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Kelola logo gambar dan nama tools (contoh: Figma, Framer, Canva) yang tampil di badge proyek.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const cur = editingModal.item?.tools || [];
                          setEditingModal({
                            ...editingModal,
                            item: { ...editingModal.item, tools: [...cur, { name: "", image: "" }] },
                          });
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-xs font-semibold cursor-pointer shadow-2xs"
                      >
                        <Plus className="size-3" />
                        <span>Tambah Tool</span>
                      </button>
                    </div>

                    {(!editingModal.item?.tools || editingModal.item.tools.length === 0) ? (
                      <div className="py-4 text-center border border-dashed border-border rounded-xl space-y-1.5 bg-card/30">
                        <p className="text-xs text-muted-foreground">Belum ada tool yang ditambahkan ke proyek ini.</p>
                        <button
                          type="button"
                          onClick={() =>
                            setEditingModal({
                              ...editingModal,
                              item: { ...editingModal.item, tools: [{ name: "", image: "" }] },
                            })
                          }
                          className="text-xs text-primary font-semibold hover:underline cursor-pointer"
                        >
                          + Tambah Tool Pertama
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {editingModal.item.tools.map((t: { name: string; image: string }, idx: number) => (
                          <div key={idx} className="p-3 rounded-xl border border-border bg-card/60 space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[11px] font-bold text-muted-foreground">Tool #{idx + 1}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = editingModal.item.tools.filter((_: any, i: number) => i !== idx);
                                  setEditingModal({
                                    ...editingModal,
                                    item: { ...editingModal.item, tools: updated },
                                  });
                                }}
                                className="p-1 rounded-md hover:bg-rose-500/10 text-rose-500 text-xs cursor-pointer"
                                title="Hapus Tool"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>
                            <input
                              type="text"
                              value={t.name || ""}
                              onChange={(e) => {
                                const updated = [...editingModal.item.tools];
                                updated[idx] = { ...updated[idx], name: e.target.value };
                                setEditingModal({ ...editingModal, item: { ...editingModal.item, tools: updated } });
                              }}
                              placeholder="Nama Tool (e.g. Figma, Framer, Canva, Blender, React)"
                              className="w-full px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            <ImageDropzone
                              label="Gambar / Icon Tool (Drag & Drop atau Pilih Gambar)"
                              value={t.image}
                              onChange={(url) => {
                                const updated = [...editingModal.item.tools];
                                updated[idx] = { ...updated[idx], image: url };
                                setEditingModal({ ...editingModal, item: { ...editingModal.item, tools: updated } });
                              }}
                              token={token}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold">Sort Order</label>
                    <input
                      type="number"
                      value={editingModal.item?.sort_order ?? 0}
                      onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, sort_order: parseInt(e.target.value) || 0 } })}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                    />
                  </div>
                </>
              )}

              {/* Portfolio Project Form */}
              {editingModal.type === "portfolio" && (
                <>
                  <div className="space-y-1">
                    <label className="font-semibold">Title</label>
                    <input
                      type="text"
                      required
                      value={editingModal.item?.title || ""}
                      onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, title: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold">Category</label>
                      <input
                        type="text"
                        required
                        value={editingModal.item?.category || ""}
                        onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, category: e.target.value } })}
                        className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold">Slug</label>
                      <input
                        type="text"
                        value={editingModal.item?.slug || ""}
                        onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, slug: e.target.value } })}
                        placeholder="auto-generated if empty"
                        className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                      />
                    </div>
                  </div>
                  <ImageDropzone
                    label="Project Image (Drag & Drop or Choose File)"
                    value={editingModal.item?.image_light}
                    onChange={(url) => setEditingModal({ ...editingModal, item: { ...editingModal.item, image_light: url } })}
                    token={token}
                  />

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="font-semibold">Live Project / Website URL</label>
                      <span className="text-[10px] text-muted-foreground">Optional (jika sudah online)</span>
                    </div>
                    <input
                      type="url"
                      value={editingModal.item?.project_url || ""}
                      onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, project_url: e.target.value } })}
                      placeholder="https://lays-ecommerce.vercel.app"
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold">Description</label>
                    <textarea
                      rows={3}
                      required
                      value={editingModal.item?.description || ""}
                      onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, description: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                    />
                  </div>
                </>
              )}

              {/* Certificate Form */}
              {editingModal.type === "certificate" && (
                <>
                  <div className="space-y-1">
                    <label className="font-semibold">Title</label>
                    <input
                      type="text"
                      required
                      value={editingModal.item?.title || ""}
                      onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, title: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold">Issuer</label>
                      <input
                        type="text"
                        required
                        value={editingModal.item?.issuer || ""}
                        onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, issuer: e.target.value } })}
                        className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold">Category</label>
                      <input
                        type="text"
                        required
                        value={editingModal.item?.category || ""}
                        onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, category: e.target.value } })}
                        className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="font-semibold">Credential ID</label>
                        <span className="text-[10px] text-muted-foreground">Optional</span>
                      </div>
                      <input
                        type="text"
                        value={editingModal.item?.credential_id || ""}
                        onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, credential_id: e.target.value } })}
                        placeholder="Contoh: META-FED-89241 (Boleh kosong)"
                        className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="font-semibold">Verify URL</label>
                        <span className="text-[10px] text-muted-foreground">Optional</span>
                      </div>
                      <input
                        type="url"
                        value={editingModal.item?.verify_url || ""}
                        onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, verify_url: e.target.value } })}
                        placeholder="https://coursera.org/verify/... (Boleh kosong)"
                        className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                      />
                    </div>
                  </div>
                  <ImageDropzone
                    label="Certificate Image (Dokumen Asli - Tanpa Hapus Background)"
                    value={editingModal.item?.image}
                    onChange={(url) => setEditingModal({ ...editingModal, item: { ...editingModal.item, image: url } })}
                    token={token}
                    disableRemoveBg={true}
                    maxDimension={2400}
                  />

                  <div className="space-y-1">
                    <label className="font-semibold">Description</label>
                    <textarea
                      rows={3}
                      required
                      value={editingModal.item?.description || ""}
                      onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, description: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                    />
                  </div>
                </>
              )}

              {/* Brand Logo Form */}
              {editingModal.type === "brand_logo" && (
                <>
                  <div className="space-y-1">
                    <label className="font-semibold">Brand / Client Name</label>
                    <input
                      type="text"
                      required
                      value={editingModal.item?.name || ""}
                      onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, name: e.target.value } })}
                      placeholder="e.g. Y Combinator, Product Hunt, Google, Microsoft"
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                    />
                  </div>

                  <ImageDropzone
                    label="Brand Logo File (Drag & Drop or Choose File - PNG / SVG / WebP)"
                    value={editingModal.item?.logo}
                    onChange={(url) => setEditingModal({ ...editingModal, item: { ...editingModal.item, logo: url } })}
                    token={token}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="font-semibold">Website URL</label>
                        <span className="text-[10px] text-muted-foreground">Optional</span>
                      </div>
                      <input
                        type="url"
                        value={editingModal.item?.url || ""}
                        onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, url: e.target.value } })}
                        placeholder="https://ycombinator.com"
                        className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold">Sort Order</label>
                      <input
                        type="number"
                        value={editingModal.item?.sort_order ?? 0}
                        onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, sort_order: parseInt(e.target.value) || 0 } })}
                        className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Design Tool Form */}
              {editingModal.type === "design_tool" && (
                <>
                  <div className="space-y-1">
                    <label className="font-semibold">Tool / Software Name</label>
                    <input
                      type="text"
                      required
                      value={editingModal.item?.name || ""}
                      onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, name: e.target.value } })}
                      placeholder="e.g. Figma, Framer, Blender, Canva, Notion"
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                    />
                  </div>

                  <ImageDropzone
                    label="Tool Icon (Drag & Drop or Choose File - PNG / SVG / WebP)"
                    value={editingModal.item?.icon}
                    onChange={(url) => setEditingModal({ ...editingModal, item: { ...editingModal.item, icon: url } })}
                    token={token}
                  />

                  <div className="space-y-1">
                    <label className="font-semibold">Dark Mode Icon (Opsional - jika ada versi icon mode gelap)</label>
                    <ImageDropzone
                      label="Dark Mode Icon (Pilih atau Drag File)"
                      value={editingModal.item?.dark_icon}
                      onChange={(url) => setEditingModal({ ...editingModal, item: { ...editingModal.item, dark_icon: url } })}
                      token={token}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="font-semibold">Website / App URL</label>
                        <span className="text-[10px] text-muted-foreground">Optional</span>
                      </div>
                      <input
                        type="url"
                        value={editingModal.item?.href || ""}
                        onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, href: e.target.value } })}
                        placeholder="https://figma.com"
                        className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold">Sort Order</label>
                      <input
                        type="number"
                        value={editingModal.item?.sort_order ?? 0}
                        onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, sort_order: parseInt(e.target.value) || 0 } })}
                        className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="tool_show_name"
                      checked={editingModal.item?.show_name ?? true}
                      onChange={(e) => setEditingModal({ ...editingModal, item: { ...editingModal.item, show_name: e.target.checked } })}
                      className="rounded border-border text-primary focus:ring-primary size-4"
                    />
                    <label htmlFor="tool_show_name" className="text-xs font-semibold cursor-pointer select-none">
                      Tampilkan teks nama di badge (contoh: Canva disembunyikan teksnya jika hanya logo)
                    </label>
                  </div>
                </>
              )}

              <div className="pt-3 border-t border-border flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingModal({ type: null, item: null })}
                  className="px-4 py-2 rounded-full border border-border hover:bg-secondary cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-full bg-foreground text-background font-semibold hover:opacity-90 disabled:opacity-50 cursor-pointer shadow-xs"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
