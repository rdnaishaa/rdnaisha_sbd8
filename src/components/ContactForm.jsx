import React, { useState } from 'react';
import { Send, Mail, User, MessageSquare, Loader, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';

function ContactForm({ ngabersMode }) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showTooltip, setShowTooltip] = useState(false);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
    
    // Clear errors when user types
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formState.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!formState.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errors.email = "Invalid email address";
    }
    
    if (!formState.message.trim()) {
      errors.message = "Message is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({ name: '', email: '', message: '' });
      }, 3000);
    }, 1500);
  };

  const themeColor = ngabersMode ? 'purple' : 'pink';
  const gradientClasses = ngabersMode 
    ? 'from-purple-500 to-blue-600'
    : 'from-pink-500 to-indigo-600';

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Enhanced animated background with more complex shapes */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-pink-300 dark:bg-pink-700 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-indigo-300 dark:bg-indigo-700 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-pink-200 dark:bg-pink-600 blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-56 h-56 rounded-lg bg-indigo-200 dark:bg-indigo-800 rotate-45 blur-2xl animate-pulse" style={{ animationDelay: '0.8s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="relative">
              <Sparkles className={`absolute -top-4 -left-6 w-5 h-5 text-${themeColor}-400`} />
              <h2 className={`text-4xl font-bold text-${themeColor}-500`}>
                Let's Connect
              </h2>
              <Sparkles className={`absolute -bottom-2 -right-6 w-5 h-5 text-${themeColor}-400`} />
            </span>
          </div>
          <div className={`w-24 h-1 bg-gradient-to-r bg-pink-500 mx-auto my-6 rounded-full`}></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Have a question or want to work together? Feel free to reach out and I'll get back to you as soon as possible!
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 backdrop-blur-sm backdrop-filter relative">
     
          {isSubmitted ? (
            <div className="p-12 flex flex-col items-center justify-center min-h-80">
              <div className={`w-20 h-20 rounded-full bg-${themeColor}-100 dark:bg-${themeColor}-900 flex items-center justify-center mb-6 relative`}>
                <div className={`absolute inset-0 rounded-full bg-${themeColor}-500 opacity-20 animate-ping`}></div>
                <CheckCircle className={`w-10 h-10 text-${themeColor}-500`} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center max-w-md">
                Thank you for reaching out. I'll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name Field */}
                <div className="relative group">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 text-gray-400 group-focus-within:text-${themeColor}-500 ${
                    focusedField === 'name' || formState.name ? 'opacity-0' : 'opacity-100'
                  }`}>
                    <User size={20} className="transition-all duration-300 group-hover:rotate-12" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-12 py-4 rounded-lg bg-gray-50 dark:bg-gray-700 border-2 focus:outline-none transition-all duration-300 ${
                      focusedField === 'name' 
                        ? `border-${themeColor}-500 shadow-md shadow-${themeColor}-100 dark:shadow-none` 
                        : 'border-gray-200 dark:border-gray-600'
                    }`}
                    placeholder=""
                  />
                  <label className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                    focusedField === 'name' || formState.name
                      ? `text-sm text-${themeColor}-500 -top-2.5 bg-white dark:bg-gray-800 px-2`
                      : 'text-gray-500 top-1/2 -translate-y-1/2'
                  }`}>
                    Your Name
                  </label>
                  {formErrors.name && (
                    <p className="absolute -bottom-6 left-4 text-sm text-red-500">{formErrors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="relative group">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 text-gray-400 group-focus-within:text-${themeColor}-500 ${
                    focusedField === 'email' || formState.email ? 'opacity-0' : 'opacity-100'
                  }`}>
                    <Mail size={20} className="transition-all duration-300 group-hover:rotate-12" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-12 py-4 rounded-lg bg-gray-50 dark:bg-gray-700 border-2 focus:outline-none transition-all duration-300 ${
                      focusedField === 'email' 
                        ? `border-${themeColor}-500 shadow-md shadow-${themeColor}-100 dark:shadow-none` 
                        : 'border-gray-200 dark:border-gray-600'
                    }`}
                    placeholder=""
                  />
                  <label className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                    focusedField === 'email' || formState.email
                      ? `text-sm text-${themeColor}-500 -top-2.5 bg-white dark:bg-gray-800 px-2`
                      : 'text-gray-500 top-1/2 -translate-y-1/2'
                  }`}>
                    Your Email
                  </label>
                  {formErrors.email && (
                    <p className="absolute -bottom-6 left-4 text-sm text-red-500">{formErrors.email}</p>
                  )}
                </div>
              </div>

              {/* Message Field */}
              <div className="relative group mt-8">
                <div className={`absolute left-4 top-6 transition-all duration-300 text-gray-400 group-focus-within:text-${themeColor}-500 ${
                  focusedField === 'message' || formState.message ? 'opacity-0' : 'opacity-100'
                }`}>
                  <MessageSquare size={20} className="transition-all duration-300 group-hover:rotate-12" />
                </div>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-12 py-4 rounded-lg bg-gray-50 dark:bg-gray-700 border-2 focus:outline-none min-h-32 transition-all duration-300 ${
                    focusedField === 'message' 
                      ? `border-${themeColor}-500 shadow-md shadow-${themeColor}-100 dark:shadow-none` 
                      : 'border-gray-200 dark:border-gray-600'
                  }`}
                  placeholder=""
                />
                <label className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                  focusedField === 'message' || formState.message
                    ? `text-sm text-${themeColor}-500 -top-2.5 bg-white dark:bg-gray-800 px-2`
                    : 'text-gray-500 top-6'
                }`}>
                  Your Message
                </label>
                {formErrors.message && (
                  <p className="absolute -bottom-6 left-4 text-sm text-red-500">{formErrors.message}</p>
                )}
              </div>
              
            {/* Submit Button */}
            <div className="mt-12 flex justify-end">
              <div className="relative">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`relative group overflow-hidden rounded-lg font-medium text-white bg-pink-500 transition-all duration-300 hover:scale-105 disabled:opacity-70`}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <div className="px-8 py-3 relative z-10 flex items-center">
                    {isSubmitting ? (
                      <>
                        <Loader className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </div>
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    <div className="w-8 h-full bg-white bg-opacity-30 skew-x-30 transform -translate-x-32 group-hover:animate-shine"></div>
                  </div>
                </button>

                {/* Tooltip */}
                {showTooltip && (
                  <div className={`absolute -top-12 right-0 bg-pink-600 text-white text-sm px-3 py-1 rounded-lg transition-opacity duration-200`}>
                    <span className="block">Send your message</span>
                    <span className={`absolute bottom-0 right-6 w-3 h-3 bg-pink-600 transform rotate-45 translate-y-1/2`}></span>
                  </div>
                )}
              </div>
            </div>
            </form>
          )}
        </div>
      </div>

        {/* Social Media & Contact Info with updated design */}
        <div className="mt-16">
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#" 
              className="group relative flex items-center px-5 py-3 rounded-full bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${gradientClasses} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></span>
              <svg className={`w-5 h-5 mr-2 text-${themeColor}-500 group-hover:scale-110 transition-transform duration-300`} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="font-medium text-gray-700 dark:text-gray-200">LinkedIn</span>
              <ArrowRight className={`ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-${themeColor}-500`} />
            </a>
            
            <a 
              href="#" 
              className="group relative flex items-center px-5 py-3 rounded-full bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${gradientClasses} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></span>
              <svg className={`w-5 h-5 mr-2 text-${themeColor}-500 group-hover:scale-110 transition-transform duration-300`} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span className="font-medium text-gray-700 dark:text-gray-200">GitHub</span>
              <ArrowRight className={`ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-${themeColor}-500`} />
            </a>
            
            <a 
              href="#" 
              className="group relative flex items-center px-5 py-3 rounded-full bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${gradientClasses} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></span>
              <svg className={`w-5 h-5 mr-2 text-${themeColor}-500 group-hover:scale-110 transition-transform duration-300`} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
              <span className="font-medium text-gray-700 dark:text-gray-200">Twitter</span>
              <ArrowRight className={`ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-${themeColor}-500`} />
            </a>
            
            <a 
              href="mailto:raishasyauqi7@email.com" 
              className="group relative flex items-center px-5 py-3 rounded-full bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${gradientClasses} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></span>
              <Mail className={`w-5 h-5 mr-2 text-${themeColor}-500 group-hover:scale-110 transition-transform duration-300`} />
              <span className="font-medium text-gray-700 dark:text-gray-200">raishasyauqi7@email.com</span>
              <ArrowRight className={`ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-${themeColor}-500`} />
            </a>
          </div>
        </div>
    </section>
  );
}


export default ContactForm;