import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardView from './components/DashboardView';
import ProfileView from './components/ProfileView';
import JobMatchingView from './components/JobMatchingView';
import ResumeAnalyzerView from './components/ResumeAnalyzerView';
import SkillGapView from './components/SkillGapView';
import RoadmapView from './components/RoadmapView';
import ApplicationTrackerView from './components/ApplicationTrackerView';
import ScamAwarenessView from './components/ScamAwarenessView';
import { 
  INITIAL_PROFILE, 
  SAMPLE_JOBS, 
  INITIAL_APPLICATIONS, 
  SAMPLE_RESUME_TEXT,
  analyzeResume 
} from './data/mockData';
import confetti from 'canvas-confetti';

const STORAGE_KEYS = {
  PROFILE: 'career_compass_profile',
  APPLICATIONS: 'career_compass_applications',
  SAVED_JOBS: 'career_compass_saved_jobs',
  ROADMAP: 'career_compass_roadmap_progress',
  RESUME_DATA: 'career_compass_resume_analysis'
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toastMessage, setToastMessage] = useState(null);

  // Profile State
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : INITIAL_PROFILE;
    } catch {
      return INITIAL_PROFILE;
    }
  });

  // Jobs State (sample listings)
  const [jobs, setJobs] = useState(SAMPLE_JOBS);

  // Applications State
  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  // Saved Jobs State
  const [savedJobIds, setSavedJobIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_JOBS);
      return saved ? JSON.parse(saved) : ['job-1', 'job-3'];
    } catch {
      return ['job-1', 'job-3'];
    }
  });

  // Roadmap Progress State
  const [roadmapProgress, setRoadmapProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ROADMAP);
      return saved ? JSON.parse(saved) : { "fe-w1-1": true, "fe-w1-2": true };
    } catch {
      return { "fe-w1-1": true, "fe-w1-2": true };
    }
  });

  // Resume Analysis State
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RESUME_DATA);
      return saved ? JSON.parse(saved) : analyzeResume(SAMPLE_RESUME_TEXT, "");
    } catch {
      return analyzeResume(SAMPLE_RESUME_TEXT, "");
    }
  });

  // Cross-view navigation context
  const [targetJobForResume, setTargetJobForResume] = useState(null);
  const [targetRoleForRoadmap, setTargetRoleForRoadmap] = useState(profile.preferredRole || "Frontend Developer");

  // Show temporary toast message
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync to localStorage
  const handleSaveProfile = (newProfile) => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(newProfile));
      showToast("Profile changes saved to localStorage!");
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveApplications = (newApps) => {
    try {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(newApps));
      showToast("Applications updated successfully!");
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleSaveJob = (jobId) => {
    const isSaved = savedJobIds.includes(jobId);
    const updated = isSaved 
      ? savedJobIds.filter(id => id !== jobId) 
      : [...savedJobIds, jobId];
    setSavedJobIds(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(updated));
      showToast(isSaved ? "Job removed from saved list" : "Job bookmarked to saved list!");
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveRoadmapProgress = (newProgress) => {
    try {
      localStorage.setItem(STORAGE_KEYS.ROADMAP, JSON.stringify(newProgress));
    } catch (e) {
      console.error(e);
    }
  };

  // Load Demo Data
  const handleLoadDemoData = () => {
    setProfile(INITIAL_PROFILE);
    setApplications(INITIAL_APPLICATIONS);
    setSavedJobIds(['job-1', 'job-2', 'job-4']);
    setRoadmapProgress({
      "fe-w1-1": true,
      "fe-w1-2": true,
      "se-w1-1": true,
      "jd-w1-1": true,
      "da-w1-1": true
    });
    const defaultResume = analyzeResume(SAMPLE_RESUME_TEXT, "");
    setResumeData(defaultResume);

    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(INITIAL_PROFILE));
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
    localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(['job-1', 'job-2', 'job-4']));
    localStorage.setItem(STORAGE_KEYS.ROADMAP, JSON.stringify({ "fe-w1-1": true, "fe-w1-2": true }));
    localStorage.setItem(STORAGE_KEYS.RESUME_DATA, JSON.stringify(defaultResume));

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });

    showToast("✨ Full demo data loaded! All sections populated.");
  };

  // Reset Demo
  const handleResetDemo = () => {
    const cleanProfile = {
      name: "",
      email: "",
      phone: "",
      degree: "B.Tech in Computer Science & Engineering",
      branch: "Computer Science",
      gradYear: "2025",
      preferredRole: "Frontend Developer",
      location: "Bengaluru, India",
      experienceLevel: "Fresher (0-1 yrs)",
      bio: "",
      skills: ["JavaScript", "HTML/CSS"]
    };

    setProfile(cleanProfile);
    setApplications([]);
    setSavedJobIds([]);
    setRoadmapProgress({});
    const cleanResume = analyzeResume("", "");
    setResumeData(cleanResume);

    localStorage.clear();
    showToast("🔄 Demo state reset to clean baseline.");
  };

  // One-click Apply / Track from Job Matching
  const handleApplyDemo = (job) => {
    const existing = applications.find(a => a.jobTitle === job.title && a.company === job.company);
    if (existing) {
      showToast(`Already tracked: ${job.title} at ${job.company}`);
      setActiveTab('tracker');
      return;
    }

    const newApp = {
      id: `app-${Date.now()}`,
      jobTitle: job.title,
      company: job.company,
      location: job.location,
      dateApplied: new Date().toISOString().split('T')[0],
      status: 'Applied',
      notes: `Applied via CareerCompass demo matching. Required skills: ${job.requiredSkills.join(', ')}`,
      salary: job.salary,
      jobUrl: `https://${job.company.toLowerCase().replace(/[^a-z0-9]/g, '')}-demo.careers`
    };

    const updated = [newApp, ...applications];
    setApplications(updated);
    handleSaveApplications(updated);
    showToast(`Added "${job.title}" to Application Tracker!`);
  };

  // Analyze Resume for specific job
  const handleSelectJobForAnalysis = (job) => {
    setTargetJobForResume(job);
    setActiveTab('resume');
  };

  // Jump from Skill Gap to Roadmap
  const handleNavigateToRoadmap = (role) => {
    setTargetRoleForRoadmap(role);
    setActiveTab('roadmap');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-brand-500 selection:text-white">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
        onLoadDemoData={handleLoadDemoData}
        onResetDemo={handleResetDemo}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {activeTab === 'dashboard' && (
          <DashboardView
            profile={profile}
            jobs={jobs}
            applications={applications}
            resumeData={resumeData}
            setActiveTab={setActiveTab}
            onSelectJobForAnalysis={handleSelectJobForAnalysis}
            onApplyDemo={handleApplyDemo}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            profile={profile}
            setProfile={setProfile}
            onSaveProfile={handleSaveProfile}
          />
        )}

        {activeTab === 'jobs' && (
          <JobMatchingView
            jobs={jobs}
            profile={profile}
            onSelectJobForAnalysis={handleSelectJobForAnalysis}
            onApplyDemo={handleApplyDemo}
            savedJobIds={savedJobIds}
            onToggleSaveJob={handleToggleSaveJob}
          />
        )}

        {activeTab === 'resume' && (
          <ResumeAnalyzerView
            jobs={jobs}
            resumeData={resumeData}
            setResumeData={setResumeData}
            initialTargetJob={targetJobForResume}
          />
        )}

        {activeTab === 'skills' && (
          <SkillGapView
            profile={profile}
            jobs={jobs}
            onNavigateToRoadmap={handleNavigateToRoadmap}
          />
        )}

        {activeTab === 'roadmap' && (
          <RoadmapView
            targetRole={targetRoleForRoadmap}
            roadmapProgress={roadmapProgress}
            setRoadmapProgress={setRoadmapProgress}
            onSaveRoadmapProgress={handleSaveRoadmapProgress}
          />
        )}

        {activeTab === 'tracker' && (
          <ApplicationTrackerView
            applications={applications}
            setApplications={setApplications}
            onSaveApplications={handleSaveApplications}
          />
        )}

        {activeTab === 'scam' && (
          <ScamAwarenessView />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">CareerCompass AI</span>
            <span>•</span>
            <span>Hackathon MVP Edition</span>
            <span>•</span>
            <span className="text-emerald-600 font-semibold">100% Client-Side Engine</span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab('scam')} className="hover:text-slate-800">
              Scam Safety Disclaimer
            </button>
            <span>•</span>
            <button onClick={handleLoadDemoData} className="hover:text-brand-600 font-medium">
              Reload Demo Data
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
