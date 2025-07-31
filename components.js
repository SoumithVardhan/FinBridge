// Loans Section Component
const LoansSection = () => {
    const loans = [
        { type: 'Home Loan', icon: 'fas fa-home', rate: '6.5%', description: 'Make your dream home a reality' },
        { type: 'Personal Loan', icon: 'fas fa-user', rate: '10.5%', description: 'For all your personal needs' },
        { type: 'Business Loan', icon: 'fas fa-briefcase', rate: '8.5%', description: 'Grow your business with us' },
        { type: 'Education Loan', icon: 'fas fa-graduation-cap', rate: '7.5%', description: 'Invest in your future' },
        { type: 'Vehicle Loan', icon: 'fas fa-car', rate: '7.5%', description: 'Drive your dream vehicle' },
        { type: 'Mortgage Loan', icon: 'fas fa-building', rate: '6.5%', description: 'Leverage your property' }
    ];

    const [loanAmount, setLoanAmount] = useState(1000000);
    const [tenure, setTenure] = useState(20);
    const [interest, setInterest] = useState(8.5);

    const calculateEMI = () => {
        const P = loanAmount;
        const r = interest / (12 * 100);
        const n = tenure * 12;
        const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        return Math.round(emi);
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Loan Solutions</h2>
                    <p className="text-xl text-gray-600">Competitive rates and quick approvals for all your needs</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {loans.map((loan, index) => (
                        <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 card-hover border border-blue-100">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mr-4">
                                    <i className={`${loan.icon} text-indigo-600 text-xl`}></i>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{loan.type}</h3>
                                    <p className="text-indigo-600 font-semibold">Starting from {loan.rate}*</p>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4">{loan.description}</p>
                            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>

                {/* EMI Calculator */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold mb-2">EMI Calculator</h3>
                        <p className="text-indigo-100">Calculate your monthly payments instantly</p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Loan Amount</label>
                                <input
                                    type="range"
                                    min="100000"
                                    max="10000000"
                                    step="100000"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                                    className="w-full h-2 bg-white bg-opacity-20 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="text-center mt-2 text-xl font-bold">
                                    ₹{loanAmount.toLocaleString('en-IN')}
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Tenure (Years)</label>
                                <input
                                    type="range"
                                    min="1"
                                    max="30"
                                    value={tenure}
                                    onChange={(e) => setTenure(Number(e.target.value))}
                                    className="w-full h-2 bg-white bg-opacity-20 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="text-center mt-2 text-xl font-bold">
                                    {tenure} Years
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Interest Rate (%)</label>
                                <input
                                    type="range"
                                    min="6"
                                    max="18"
                                    step="0.1"
                                    value={interest}
                                    onChange={(e) => setInterest(Number(e.target.value))}
                                    className="w-full h-2 bg-white bg-opacity-20 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="text-center mt-2 text-xl font-bold">
                                    {interest}%
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 text-center">
                            <h4 className="text-2xl font-bold mb-4">Your Monthly EMI</h4>
                            <div className="text-5xl font-bold mb-4 text-yellow-300">
                                ₹{calculateEMI().toLocaleString('en-IN')}
                            </div>
                            <div className="space-y-2 text-sm opacity-90">
                                <div>Total Amount: ₹{(calculateEMI() * tenure * 12).toLocaleString('en-IN')}</div>
                                <div>Total Interest: ₹{((calculateEMI() * tenure * 12) - loanAmount).toLocaleString('en-IN')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Insurance Section Component
const InsuranceSection = () => {
    const insuranceTypes = [
        {
            type: 'Life Insurance',
            icon: 'fas fa-heart',
            plans: ['Term Life', 'Whole Life', 'ULIP'],
            coverage: 'Up to ₹5 Crores',
            description: 'Secure your family\'s financial future'
        },
        {
            type: 'Health Insurance',
            icon: 'fas fa-user-md',
            plans: ['Individual', 'Family Floater', 'Senior Citizen'],
            coverage: 'Up to ₹1 Crore',
            description: 'Comprehensive healthcare coverage'
        },
        {
            type: 'General Insurance',
            icon: 'fas fa-shield-alt',
            plans: ['Motor', 'Home', 'Travel'],
            coverage: 'Customized',
            description: 'Protect your valuable assets'
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Insurance Solutions</h2>
                    <p className="text-xl text-gray-600">Comprehensive protection for you and your loved ones</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {insuranceTypes.map((insurance, index) => (
                        <div key={index} className="bg-white rounded-2xl p-8 card-hover shadow-lg">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center">
                                    <i className={`${insurance.icon} text-2xl text-white`}></i>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{insurance.type}</h3>
                                <p className="text-gray-600 mb-4">{insurance.description}</p>
                                <div className="text-green-600 font-semibold text-lg">
                                    Coverage: {insurance.coverage}
                                </div>
                            </div>
                            
                            <div className="space-y-3 mb-6">
                                <h4 className="font-semibold text-gray-800">Available Plans:</h4>
                                {insurance.plans.map((plan, idx) => (
                                    <div key={idx} className="flex items-center">
                                        <i className="fas fa-check-circle text-green-500 mr-2"></i>
                                        <span className="text-gray-700">{plan}</span>
                                    </div>
                                ))}
                            </div>
                            
                            <button className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all">
                                Get Quote
                            </button>
                        </div>
                    ))}
                </div>

                {/* Insurance Comparison Tool */}
                <div className="bg-white rounded-3xl p-8 shadow-xl">
                    <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
                        Insurance Comparison Tool
                    </h3>
                    <div className="text-center text-gray-600 mb-6">
                        Compare different insurance plans and find the best coverage for your needs
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                            <i className="fas fa-calculator mr-2"></i>
                            Compare Plans
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};