import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Bot,
  User,
  Sparkles,
  Briefcase,
  Code,
  GraduationCap,
  Rocket,
  Globe,
  Mail,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Code2,
  ArrowRight,
  FileText,
} from "lucide-react";

export default function App() {
  const [currentView, setCurrentView] = useState("landing");

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi, I'm Sanjana's AI Assistant! Ask me anything about her projects, experience with Python & FastAPI, or why she'd be a great fit for your team.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const chatEndRef = useRef(null);

  const suggestedQuestions = [
    { icon: Briefcase, text: "Tell me about Sanjana's top projects" },
    { icon: Code, text: "What is her experience with Python & FastAPI?" },
    { icon: GraduationCap, text: "What is her educational background?" },
    { icon: Rocket, text: "Why should we hire Sanjana?" },
  ];

  useEffect(() => {
    if (currentView === "chat") {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, currentView]);

  const handleSend = async (textToSend) => {
    const question = textToSend || input;
    if (!question.trim() || isLoading) return;

    const userMsg = { role: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.answer || "Sorry, I couldn't generate a response." },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "⚠️ Couldn't connect to backend server. Make sure FastAPI is running on http://localhost:8000",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionClick = (questionText) => {
    setCurrentView("chat");
    handleSend(questionText);
  };

  return (
    <div className="flex h-screen bg-[#0B0F17] text-slate-100 font-sans overflow-hidden">
      
      {/* PAGE 1: WELCOME / LANDING SCREEN */}
      {currentView === "landing" && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-[#0B0F17] via-[#111827] to-[#0B0F17]"
        >
          {/* Ambient Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Welcome Card */}
          <div className="max-w-3xl w-full bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 md:p-12 shadow-2xl relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            
            {/* Avatar Section */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="relative flex-shrink-0"
            >
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-[#38BDF8] to-[#A855F7] p-1 shadow-lg shadow-sky-500/20">
                <div className="w-full h-full rounded-full bg-[#0B0F17] flex items-center justify-center overflow-hidden relative">
                  <span className="text-6xl md:text-7xl select-none">👩‍💻</span>
                </div>
              </div>
              
              <div className="absolute -top-3 -right-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1 border border-white/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hi, I'm Sanjana!</span>
              </div>
            </motion.div>

            {/* Right Welcome Text */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-medium">
                <Circle className="w-2 h-2 fill-sky-400 animate-pulse" />
                Interactive AI Portfolio
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                Welcome to <span className="bg-gradient-to-r from-[#38BDF8] to-[#A855F7] bg-clip-text text-transparent">Reflekt AI</span>
              </h1>

              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Ask me questions about Sanjana's experience, technical skills, or backend engineering projects directly through her AI representation.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <button
                  onClick={() => setCurrentView("chat")}
                  className="px-6 py-3 bg-gradient-to-r from-[#38BDF8] to-[#2563EB] hover:opacity-90 text-white font-medium rounded-xl shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Ask a Question</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="/Sanjana_Resume.pdf"
                  download="Sanjana_Resume.pdf"
                  className="px-6 py-3 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-medium rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-sky-400" />
                  <span>Download Resume PDF</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Prompts */}
          <div className="mt-8 max-w-2xl w-full text-center z-10">
            <p className="text-xs uppercase tracking-wider text-slate-500 mb-3 font-medium">Or pick a topic to jump right in</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuestionClick(q.text)}
                  className="p-3 bg-slate-900/40 hover:bg-slate-800/60 border border-slate-800/80 hover:border-sky-500/40 rounded-xl text-left text-xs text-slate-300 transition-all flex items-center gap-2.5 group cursor-pointer"
                >
                  <q.icon className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="truncate">{q.text}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* PAGE 2: ORIGINAL CHAT INTERFACE */}
      {currentView === "chat" && (
        <div className="flex-1 flex h-full relative">
          
          {/* Sidebar */}
          <aside
            className={`${
              sidebarOpen ? "w-[320px]" : "w-0"
            } transition-all duration-300 ease-in-out bg-[#0B0F17]/95 border-r border-slate-800/80 flex flex-col justify-between z-20 overflow-hidden relative`}
          >
            <div className="p-5 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div 
                  onClick={() => setCurrentView("landing")} 
                  className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <div className="p-2 rounded-xl bg-gradient-to-tr from-[#38BDF8] to-[#A855F7]">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="font-bold text-sm tracking-wide text-white">Reflekt</h1>
                    <p className="text-[10px] text-slate-400">Sanjana • AI Engineer</p>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                <Circle className="w-2 h-2 fill-emerald-400 animate-pulse" />
                <span>ACTIVE & READY TO CHAT</span>
              </div>

              {/* Back Button */}
              <button
                onClick={() => setCurrentView("landing")}
                className="w-full py-2 px-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-xl text-xs text-slate-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Back to Home Screen
              </button>

              {/* Suggested Questions */}
              <div className="space-y-3 pt-2">
                <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Suggested Questions
                </h2>
                <div className="space-y-2">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q.text)}
                      className="w-full p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-left text-xs text-slate-300 transition-all flex items-center gap-2.5 group cursor-pointer"
                    >
                      <q.icon className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform flex-shrink-0" />
                      <span className="truncate">{q.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Footer Links */}
            <div className="p-4 border-t border-slate-800/60 flex items-center justify-around text-slate-400 w-[320px]">
              <a 
                href="https://www.linkedin.com/in/sanjana-madishetti-759939336/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#38BDF8] transition-colors" 
                title="LinkedIn"
              >
                <Globe className="w-4 h-4" />
              </a>

              <a 
                href="https://github.com/Sanjana27904" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#38BDF8] transition-colors" 
                title="GitHub"
              >
                <Code2 className="w-4 h-4" />
              </a>

              {/* DOWNLOAD RESUME BUTTON */}
              <a 
                href="/Sanjana_Resume.pdf" 
                download="Sanjana_Resume.pdf"
                className="hover:text-[#38BDF8] transition-colors flex items-center gap-1" 
                title="Download Resume PDF"
              >
                <FileText className="w-4 h-4 text-sky-400 animate-pulse" />
              </a>

              <a 
                href="mailto:sanjanamadishetti27@gmail.com" 
                className="hover:text-[#38BDF8] transition-colors" 
                title="Email Sanjana"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </aside>

          {/* Toggle Sidebar Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-4 left-4 z-30 p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {/* Main Chat Interface */}
          <main className="flex-1 flex flex-col h-full bg-[#0B0F17]">
            {/* Header */}
            <header className="h-16 border-b border-slate-800/80 flex items-center justify-between px-6 pl-16">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                <span className="text-xs text-slate-400 font-medium">
                  Reflekt AI • Trained on Verified Resume Data
                </span>
              </div>
              <button
                onClick={() => setMessages([messages[0]])}
                className="text-slate-400 hover:text-rose-400 transition-colors p-2 rounded-lg hover:bg-slate-900 cursor-pointer"
                title="Clear Chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </header>

            {/* Chat Feed */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 max-w-3xl ${
                    msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                      msg.role === "user"
                        ? "bg-slate-800 text-slate-200 border border-slate-700"
                        : "bg-gradient-to-tr from-[#38BDF8] to-[#A855F7] text-white shadow-md shadow-sky-500/20"
                    }`}
                  >
                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed max-w-[85%] ${
                      msg.role === "user"
                        ? "bg-[#38BDF8] text-slate-950 font-medium rounded-tr-none shadow-md shadow-sky-500/10"
                        : "bg-slate-900/80 border border-slate-800/80 text-slate-200 rounded-tl-none backdrop-blur-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#38BDF8] to-[#A855F7] flex items-center justify-center text-white">
                    <Bot className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-400 text-sm flex items-center gap-2 rounded-tl-none">
                    <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-slate-800/80 bg-[#0B0F17]/90 backdrop-blur-md">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="max-w-3xl mx-auto relative flex items-center"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Sanjana's AI anything..."
                  className="w-full py-3.5 pl-5 pr-14 bg-slate-900/90 border border-slate-800 focus:border-sky-500 rounded-2xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#2563EB] hover:opacity-90 text-white disabled:opacity-40 transition-opacity cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}