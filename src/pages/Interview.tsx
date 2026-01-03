import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, ThumbsUp, AlertCircle, TrendingUp, RotateCcw } from "lucide-react";
import Logo from "@/components/Logo";
import Agent from "@/components/Agent";

const Interview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);

  // Sample interview data based on ID
  const interview = {
    id,
    role: "Frontend Developer Interview",
    type: "technical",
    techStack: ["React", "TypeScript", "TailwindCSS"],
  };

  // Sample feedback data
  const feedback = {
    overallScore: 85,
    strengths: [
      "Strong understanding of React fundamentals",
      "Clear communication of technical concepts",
      "Good problem-solving approach",
    ],
    improvements: [
      "Could elaborate more on performance optimization techniques",
      "Consider discussing more real-world examples",
    ],
    rating: 4.2,
    categories: [
      { name: "Technical Knowledge", score: 88 },
      { name: "Communication", score: 82 },
      { name: "Problem Solving", score: 85 },
      { name: "Cultural Fit", score: 80 },
    ],
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen">
        <nav className="flex items-center justify-between px-4 sm:px-8 lg:px-16 py-6 max-w-7xl mx-auto">
          <Logo />
          <Link to="/" className="btn-secondary flex items-center gap-2">
            <ArrowLeft className="size-4" />
            <span>Back to Dashboard</span>
          </Link>
        </nav>

        <main className="section-feedback py-8 animate-fade-in">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-4">
            <div className="size-20 rounded-full bg-success-100/20 flex items-center justify-center">
              <ThumbsUp className="size-10 text-success-100" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Interview Complete!</h1>
            <p className="text-muted-foreground max-w-lg">
              Great job completing your {interview.role}. Here's your detailed feedback.
            </p>
          </div>

          {/* Overall Score */}
          <div className="card-border w-full">
            <div className="card-content p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col items-center md:items-start gap-2">
                  <p className="text-muted-foreground">Overall Score</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-bold text-primary-200">{feedback.overallScore}</span>
                    <span className="text-2xl text-muted-foreground">/100</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`size-8 ${
                        star <= Math.floor(feedback.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : star <= feedback.rating
                          ? "text-yellow-400 fill-yellow-400/50"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                  <span className="text-xl font-semibold text-foreground ml-2">{feedback.rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {feedback.categories.map((category) => (
              <div key={category.name} className="card-border">
                <div className="card-content p-4 flex flex-col gap-2">
                  <p className="text-sm text-muted-foreground">{category.name}</p>
                  <p className="text-2xl font-bold text-foreground">{category.score}%</p>
                  <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
                    <div
                      className="progress-bar transition-all duration-500"
                      style={{ width: `${category.score}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Strengths & Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="card-border h-full">
              <div className="card-content p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-5 text-success-100" />
                  <h3 className="text-lg font-semibold text-foreground">Strengths</h3>
                </div>
                <ul className="space-y-3">
                  {feedback.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="size-2 rounded-full bg-success-100 mt-2" />
                      <span className="text-light-100">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card-border h-full">
              <div className="card-content p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="size-5 text-yellow-400" />
                  <h3 className="text-lg font-semibold text-foreground">Areas for Improvement</h3>
                </div>
                <ul className="space-y-3">
                  {feedback.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="size-2 rounded-full bg-yellow-400 mt-2" />
                      <span className="text-light-100">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full pt-4">
            <button
              onClick={() => setIsCompleted(false)}
              className="btn-secondary flex items-center gap-2"
            >
              <RotateCcw className="size-4" />
              <span>Retake Interview</span>
            </button>
            <Link to="/" className="btn-primary flex items-center gap-2">
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <nav className="flex items-center justify-between px-4 sm:px-8 lg:px-16 py-6 max-w-7xl mx-auto">
        <Logo />
        <button
          onClick={() => navigate("/")}
          className="btn-secondary flex items-center gap-2"
        >
          <ArrowLeft className="size-4" />
          <span>Exit</span>
        </button>
      </nav>

      <main className="root-layout relative">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-foreground">{interview.role}</h1>
          <p className="text-muted-foreground">
            Answer the questions naturally. The AI will adapt based on your responses.
          </p>
        </div>

        <div className="relative">
          <Agent userName="Candidate" type="interview" />
          
          {/* Complete button for demo */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setIsCompleted(true)}
              className="btn-primary"
            >
              Complete Interview (Demo)
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Interview;
