import { useState } from "react";
import { Mic, MicOff, Phone, PhoneOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentProps {
  userName?: string;
  type?: "generate" | "interview";
}

const Agent = ({ userName = "User", type = "interview" }: AgentProps) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState("");

  const handleCall = () => {
    if (isCallActive) {
      setIsCallActive(false);
      setIsSpeaking(false);
      setTranscript("");
    } else {
      setIsCallActive(true);
      // Simulate AI speaking
      setTimeout(() => {
        setIsSpeaking(true);
        setTranscript(
          type === "generate"
            ? "Hello! I'm here to help you create a personalized interview. What role are you preparing for?"
            : `Hello ${userName}! Welcome to your mock interview. I'll be your interviewer today. Are you ready to begin?`
        );
      }, 1000);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="call-view animate-fade-in">
      {/* AI Avatar Card */}
      <div className="card-interviewer">
        <div className="relative">
          {/* Pulsing animation when speaking */}
          {isSpeaking && isCallActive && (
            <div className="animate-speak" />
          )}
          
          {/* Avatar */}
          <div className={cn(
            "z-10 flex items-center justify-center blue-gradient rounded-full size-28 relative",
            isCallActive && "animate-pulse-glow"
          )}>
            <img
              src="/ai-avatar.svg"
              alt="AI Interviewer"
              className="size-16"
              onError={(e) => {
                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23CAC5FE'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";
              }}
            />
          </div>
        </div>

        <h3 className="text-center text-primary-100 mt-4 font-semibold">
          {isCallActive ? (isSpeaking ? "AI is speaking..." : "Listening...") : "AI Interviewer"}
        </h3>

        {/* Call Controls */}
        <div className="flex items-center gap-4 mt-4">
          {isCallActive && (
            <button
              onClick={toggleMute}
              className={cn(
                "p-3 rounded-full transition-all duration-200",
                isMuted
                  ? "bg-destructive-100 hover:bg-destructive-200"
                  : "bg-dark-200 hover:bg-dark-300 border border-border"
              )}
            >
              {isMuted ? (
                <MicOff className="size-5 text-white" />
              ) : (
                <Mic className="size-5 text-foreground" />
              )}
            </button>
          )}

          <button
            onClick={handleCall}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-200",
              isCallActive
                ? "btn-disconnect"
                : "btn-call"
            )}
          >
            {isCallActive ? (
              <>
                <PhoneOff className="size-5" />
                <span>End Call</span>
              </>
            ) : (
              <>
                <Phone className="size-5" />
                <span>Start Call</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* User Card */}
      <div className="card-border flex-1 sm:basis-1/2 w-full h-[400px] max-md:hidden">
        <div className="card-content flex flex-col gap-4 justify-center items-center p-7">
          <div className="size-28 rounded-full bg-gradient-to-br from-primary-200/20 to-accent/10 flex items-center justify-center border-2 border-primary-200/30">
            <span className="text-4xl font-bold text-primary-200">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
          <h3 className="text-center text-foreground font-semibold">{userName}</h3>
          <p className="text-muted-foreground text-sm">
            {isCallActive ? (isMuted ? "Muted" : "Connected") : "Ready to connect"}
          </p>
        </div>
      </div>

      {/* Transcript */}
      {transcript && (
        <div className="transcript-border absolute bottom-0 left-0 right-0 mx-4 mb-4">
          <div className="transcript">
            <p className="text-base text-center text-foreground">{transcript}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agent;
