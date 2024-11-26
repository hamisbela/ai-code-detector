import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Code2, Phone, Send } from 'lucide-react';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">
            Contact Us 📬
          </h1>
          <p className="text-xl text-gray-600">
            Questions about our Free AI Code Detector? Get in touch!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div className="gradient-border">
              <Card className="p-8 space-y-4">
                <Mail className="h-8 w-8 text-blue-500" />
                <h3 className="text-xl font-semibold">Email Us ✉️</h3>
                <p className="text-gray-600">support@aicodedetector.com</p>
              </Card>
            </div>

            <div className="gradient-border">
              <Card className="p-8 space-y-4">
                <Code2 className="h-8 w-8 text-blue-500" />
                <h3 className="text-xl font-semibold">GitHub 🌐</h3>
                <p className="text-gray-600">@AICodeDetector</p>
              </Card>
            </div>

            <div className="gradient-border">
              <Card className="p-8 space-y-4">
                <Phone className="h-8 w-8 text-blue-500" />
                <h3 className="text-xl font-semibold">Support 🤝</h3>
                <p className="text-gray-600">24/7 AI Chat Support</p>
              </Card>
            </div>
          </div>

          <div className="gradient-border">
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name 👤
                  </label>
                  <Input 
                    id="name" 
                    required 
                    className="h-12 border-2 focus:border-blue-400" 
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email ✉️
                  </label>
                  <Input 
                    type="email" 
                    id="email" 
                    required 
                    className="h-12 border-2 focus:border-blue-400" 
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message 💭
                  </label>
                  <Textarea 
                    id="message" 
                    required 
                    className="min-h-[150px] border-2 focus:border-blue-400" 
                    placeholder="Tell us about your code analysis needs or any questions about our AI Code Detector..."
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send Message ✨
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}