                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="bg-white rounded-2xl p-8 shadow-xl">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Login to Your Account</h3>
                                <form onSubmit={handleLogin} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={loginForm.email}
                                            onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                        <input
                                            type="password"
                                            value={loginForm.password}
                                            onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                                    >
                                        <i className="fas fa-sign-in-alt mr-2"></i>
                                        Login
                                    </button>
                                </form>
                                <div className="text-center mt-6">
                                    <a href="#" className="text-indigo-600 hover:text-indigo-800">Forgot Password?</a>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Portal Features</h3>
                            <div className="space-y-4">
                                {portalFeatures.map((feature, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                                            <i className={`${feature.icon} text-indigo-600`}></i>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h4>
                                            <p className="text-gray-600">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-gray-50 min-h-screen pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Welcome back, User!</h2>
                    <button
                        onClick={() => setIsLoggedIn(false)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                        <i className="fas fa-sign-out-alt mr-2"></i>
                        Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {portalFeatures.map((feature, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 card-hover">
                            <div className="text-center">
                                <div className="w-12 h-12 mx-auto mb-4 bg-indigo-100 rounded-xl flex items-center justify-center">
                                    <i className={`${feature.icon} text-indigo-600 text-xl`}></i>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors">
                                    Access
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Applications</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <div>
                                    <div className="font-semibold">Home Loan Application</div>
                                    <div className="text-sm text-gray-600">Application ID: HL2025001</div>
                                </div>
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Approved</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                                <div>
                                    <div className="font-semibold">Health Insurance</div>
                                    <div className="text-sm text-gray-600">Application ID: HI2025002</div>
                                </div>
                                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Pending</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Portfolio Summary</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Total Investment</span>
                                <span className="font-semibold">₹2,50,000</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Current Value</span>
                                <span className="font-semibold text-green-600">₹2,85,750</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Total Gain</span>
                                <span className="font-semibold text-green-600">+₹35,750 (14.3%)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Contact Section Component
const ContactSection = () => {
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your inquiry! We will get back to you soon.');
        setContactForm({ name: '', email: '', phone: '', service: '', message: '' });
    };

    const contactMethods = [
        {
            icon: 'fas fa-phone',
            title: 'Call Us',
            details: '+91 98765 43210',
            action: 'tel:+919876543210'
        },
        {
            icon: 'fab fa-whatsapp',
            title: 'WhatsApp',
            details: '+91 98765 43210',
            action: 'https://wa.me/919876543210'
        },
        {
            icon: 'fas fa-envelope',
            title: 'Email',
            details: 'info@srassociates.com',
            action: 'mailto:info@srassociates.com'
        },
        {
            icon: 'fas fa-map-marker-alt',
            title: 'Visit Us',
            details: 'Hyderabad, Telangana',
            action: '#'
        }
    ];

    return (
        <section className="py-20 bg-gray-900 text-white min-h-screen pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
                    <p className="text-xl text-gray-300">Ready to start your financial journey? Contact us today!</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {contactMethods.map((method, index) => (
                                <a
                                    key={index}
                                    href={method.action}
                                    className="bg-gray-800 rounded-xl p-6 card-hover block"
                                >
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mr-4">
                                            <i className={`${method.icon} text-white text-xl`}></i>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white">{method.title}</h4>
                                            <p className="text-gray-300 text-sm">{method.details}</p>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <div className="bg-gray-800 rounded-xl p-6">
                            <h4 className="text-xl font-bold mb-4">Office Hours</h4>
                            <div className="space-y-2 text-gray-300">
                                <div className="flex justify-between">
                                    <span>Monday - Friday</span>
                                    <span>9:00 AM - 7:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Saturday</span>
                                    <span>9:00 AM - 5:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sunday</span>
                                    <span>Closed</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-8 text-gray-900">
                        <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={contactForm.name}
                                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={contactForm.email}
                                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={contactForm.phone}
                                        onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Service Interest</label>
                                    <select
                                        value={contactForm.service}
                                        onChange={(e) => setContactForm({...contactForm, service: e.target.value})}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select Service</option>
                                        <option value="loans">Loans</option>
                                        <option value="insurance">Insurance</option>
                                        <option value="mutual-funds">Mutual Funds</option>
                                        <option value="general">General Inquiry</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Message</label>
                                <textarea
                                    value={contactForm.message}
                                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                                    rows="4"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="Tell us about your requirements..."
                                    required
                                ></textarea>
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                            >
                                <i className="fas fa-paper-plane mr-2"></i>
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Footer Component
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="text-2xl font-bold mb-4">
                            <i className="fas fa-bridge mr-2"></i>FinBridge
                        </div>
                        <p className="text-gray-300 mb-4">
                            Your trusted partner for comprehensive financial solutions.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-300 hover:text-white">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Services</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li><a href="#" className="hover:text-white">Home Loans</a></li>
                            <li><a href="#" className="hover:text-white">Personal Loans</a></li>
                            <li><a href="#" className="hover:text-white">Insurance</a></li>
                            <li><a href="#" className="hover:text-white">Mutual Funds</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li><a href="#" className="hover:text-white">About Us</a></li>
                            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
                            <li><a href="#" className="hover:text-white">Customer Support</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                        <div className="space-y-2 text-gray-300">
                            <div><i className="fas fa-phone mr-2"></i>+91 98765 43210</div>
                            <div><i className="fas fa-envelope mr-2"></i>info@srassociates.com</div>
                            <div><i className="fas fa-map-marker-alt mr-2"></i>Hyderabad, Telangana</div>
                        </div>
                    </div>
                </div>
                
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                    <p>&copy; 2025 FinBridge - SR Associates. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

// Main App Component
const App = () => {
    const [currentSection, setCurrentSection] = useState('home');

    const renderSection = () => {
        switch (currentSection) {
            case 'home':
                return (
                    <>
                        <HeroSection />
                        <ServicesOverview />
                    </>
                );
            case 'loans':
                return <LoansSection />;
            case 'insurance':
                return <InsuranceSection />;
            case 'mutual-funds':
                return <MutualFundsSection />;
            case 'portal':
                return <CustomerPortal />;
            case 'contact':
                return <ContactSection />;
            default:
                return <HeroSection />;
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Navigation currentSection={currentSection} setCurrentSection={setCurrentSection} />
            <main>
                {renderSection()}
            </main>
            <Footer />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));