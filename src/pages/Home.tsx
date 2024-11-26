import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Code2, AlertTriangle, Check, Copy, Coffee, Sparkles } from 'lucide-react';
import { genAI } from '@/lib/gemini';
import Editor from 'react-simple-code-editor';
import { Prism, detectLanguage } from '@/lib/prism-setup';

const SupportBox = () => (
  <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 mb-8">
    <div className="text-center space-y-4">
      <Coffee className="h-12 w-12 mx-auto text-blue-500" />
      <h2 className="text-2xl font-bold">Support Our Work ❤️</h2>
      <p className="text-gray-600 max-w-xl mx-auto">
        Help us maintain and improve our AI tools by supporting our API & hosting costs. 
        Your contribution helps keep this tool free for everyone! 🙏
      </p>
      <a
        href="https://roihacks.gumroad.com/coffee"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <Button 
          size="lg" 
          className="text-lg px-8 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
        >
          <Coffee className="mr-2 h-5 w-5" />
          Buy Us a Coffee ☕
        </Button>
      </a>
    </div>
  </Card>
);

interface CodeAnalysis {
  language: string;
  functionality: string;
  issues: string[];
}

export default function Home() {
  const [code, setCode] = useState('');
  const [analysis, setAnalysis] = useState<CodeAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const analyzeCode = async () => {
    if (!code.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      if (!genAI) {
        throw new Error("API key not configured. Please add your Gemini API key to continue.");
      }
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Analyze this code snippet and provide the following information in JSON format:
        1. The programming language used
        2. What the code does (functionality)
        3. Any potential issues, bugs, or improvements needed

        Code to analyze:
        ${code}

        Please respond in this exact JSON format:
        {
          "language": "name of the programming language",
          "functionality": "detailed explanation of what the code does",
          "issues": ["issue 1", "issue 2", ...]
        }`;
      
      const result = await model.generateContent(prompt);
      const analysisText = result.response.text();
      const analysisJson = JSON.parse(analysisText);
      setAnalysis(analysisJson);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while analyzing the code');
      setAnalysis(null);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightCode = (code: string) => {
    try {
      const language = detectLanguage(code);
      return Prism.highlight(
        code,
        Prism.languages[language] || Prism.languages.javascript,
        language
      );
    } catch (error) {
      console.error('Highlighting error:', error);
      return code;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">
            Free AI Code Detector 🔍
          </h1>
          <p className="text-xl text-gray-600">
            Instantly analyze code snippets to detect language, understand functionality, and identify potential issues
          </p>
        </div>

        <div className="gradient-border mb-8">
          <div className="p-8">
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute right-2 top-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <Editor
                  value={code}
                  onValueChange={setCode}
                  highlight={highlightCode}
                  padding={16}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 14,
                    backgroundColor: '#f5f5f5',
                    borderRadius: '0.5rem',
                    minHeight: '200px'
                  }}
                  className="border-2 focus:border-blue-400 rounded-lg"
                />
              </div>

              <Button 
                onClick={analyzeCode}
                disabled={loading || !code.trim()}
                className="w-full text-lg py-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                {loading ? (
                  <>
                    <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing Code...
                  </>
                ) : (
                  <>
                    <Code2 className="mr-2 h-5 w-5" />
                    Analyze Code 🔍
                  </>
                )}
              </Button>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>

        {analysis && (
          <div className="space-y-6 mb-12">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-lg font-semibold text-blue-600">
                  <Code2 className="h-5 w-5" />
                  Language Detected: {analysis.language}
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Functionality:</h3>
                  <p className="text-gray-700">{analysis.functionality}</p>
                </div>

                {analysis.issues.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      Potential Issues:
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {analysis.issues.map((issue, index) => (
                        <li key={index}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        <SupportBox />

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-8 mb-16">
          <article className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">
              Free AI Code Detector: Your Smart Programming Assistant ⚡
            </h2>
            
            <div className="space-y-8">
              <p className="text-gray-600 leading-relaxed">
                Our free AI code detector is your go-to tool for quick code analysis and understanding.
                Whether you're a student learning to code, a developer reviewing pull requests, or
                someone trying to understand a code snippet, our AI-powered analyzer is here to help.
              </p>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Code2 className="h-6 w-6 text-blue-500" />
                  Why Choose Our Free AI Code Detector? 🎯
                </h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">🔍</span>
                    <span>Instant language detection for 20+ programming languages</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">📝</span>
                    <span>Detailed code analysis with functionality explanation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">⚠️</span>
                    <span>Smart issue detection and improvement suggestions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💡</span>
                    <span>Best practices and optimization recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✨</span>
                    <span>100% free to use with no registration required</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-semibold mb-4">
                  Supported Programming Languages 💻
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Web Development</h3>
                    <ul className="text-gray-600 space-y-1">
                      <li>• JavaScript</li>
                      <li>• TypeScript</li>
                      <li>• HTML</li>
                      <li>• CSS</li>
                      <li>• PHP</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Systems & Mobile</h3>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Java</li>
                      <li>• C/C++</li>
                      <li>• Swift</li>
                      <li>• Kotlin</li>
                      <li>• Rust</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Modern Languages</h3>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Python</li>
                      <li>• Go</li>
                      <li>• Ruby</li>
                      <li>• SQL</li>
                      <li>• Shell Script</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-semibold mb-4">
                  Perfect for Every Developer 👩‍💻
                </h2>
                <ul className="space-y-2 text-gray-600">
                  <li>• Students learning to code</li>
                  <li>• Developers reviewing pull requests</li>
                  <li>• Teams conducting code reviews</li>
                  <li>• Anyone trying to understand code snippets</li>
                  <li>• Developers learning new languages</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-semibold mb-4">
                  How Our Free AI Code Detector Works 🔄
                </h2>
                <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                  <li>Paste your code snippet into the editor</li>
                  <li>Click "Analyze Code" to start the AI analysis</li>
                  <li>Get instant insights about language and functionality</li>
                  <li>Review potential issues and improvement suggestions</li>
                  <li>Make informed decisions about your code</li>
                </ol>
              </div>
            </div>
          </article>
        </div>

        <SupportBox />
      </div>
    </div>
  );
}