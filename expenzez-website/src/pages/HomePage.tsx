import React from 'react';
import { 
  Shield, 
  Brain, 
  CreditCard, 
  Bell, 
  Zap, 
  Download,
  Sparkles,
  TrendingUp
} from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <CreditCard className="h-12 w-12" />,
      title: "UK Banking Integration",
      description: "Connect all your UK bank accounts securely via TrueLayer. Real-time transaction sync and categorization.",
      gradient: "from-primary-500 to-primary-600"
    },
    {
      icon: <Brain className="h-12 w-12" />,
      title: "AI-Powered Insights",
      description: "Get personalized financial advice from our intelligent AI assistant. Chat-based interface for instant guidance.",
      gradient: "from-secondary-500 to-secondary-600"
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Bank-Grade Security",
      description: "Advanced encryption, biometric authentication, and PIN protection. Your data is always secure.",
      gradient: "from-accent-500 to-accent-600"
    },
    {
      icon: <TrendingUp className="h-12 w-12" />,
      title: "Smart Analytics",
      description: "Visualize your spending patterns with beautiful charts and get actionable insights to improve your finances.",
      gradient: "from-primary-600 to-secondary-500"
    },
    {
      icon: <Bell className="h-12 w-12" />,
      title: "Smart Notifications",
      description: "Real-time transaction alerts and spending notifications. Stay informed about your finances.",
      gradient: "from-secondary-600 to-accent-500"
    },
    {
      icon: <Zap className="h-12 w-12" />,
      title: "Instant Sync",
      description: "Lightning-fast transaction synchronization across all your connected accounts.",
      gradient: "from-accent-600 to-primary-500"
    }
  ];


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-3 h-3 mr-2" />
              Now Available - MVP Launch
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 max-w-4xl mx-auto">
              Smart Expense Tracking for
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"> UK Users</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Connect your UK banks, track spending with AI insights, and take control of your finances.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
              <a
                href="https://apps.apple.com/app/expenzez"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-4 h-4 mr-2" />
                Download for iOS
              </a>
              
              <button className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors">
                Learn More
              </button>
            </div>
            
            {/* App Screenshots */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-lg mx-auto">
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <img 
                  src="/screenshot 1.png" 
                  alt="Expenzez Dashboard" 
                  className="w-full h-auto rounded-lg"
                />
                <h3 className="text-sm font-semibold text-gray-900 mt-3 mb-1">Dashboard</h3>
                <p className="text-xs text-gray-600">Track all accounts</p>
              </div>
              
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <img 
                  src="/screenshot 2.png" 
                  alt="Budget Tracking" 
                  className="w-full h-auto rounded-lg"
                />
                <h3 className="text-sm font-semibold text-gray-900 mt-3 mb-1">Budget Tracking</h3>
                <p className="text-xs text-gray-600">Monitor spending</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your UK finances in one secure app.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-lg text-white mb-4`}>
                  {React.cloneElement(feature.icon, { className: "h-6 w-6" })}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to get started?
          </h2>
          
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Download Expenzez today and start taking control of your finances with smart UK banking integration.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://apps.apple.com/app/expenzez"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="w-4 h-4 mr-2" />
              Download for iOS
            </a>
            
            <div className="text-center py-3">
              <div className="text-sm text-gray-500">Android version coming soon</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;