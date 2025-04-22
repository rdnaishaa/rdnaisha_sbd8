import { useState, useRef, useEffect } from 'react';
import { BookOpen, ChevronRight, ChevronLeft, X, Calendar, BookCopy, Clock, CheckCircle } from 'lucide-react';
import SBDLogo from '../assets/SBDLogo.svg';
import DMJLogo from '../assets/DMJLogo.svg';
import OSLogo from '../assets/OSLogo.svg';
import NetworkLabLogo from '../assets/Logo.svg';

function Subjects({ searchQuery, setSearchQuery }) {
    const [activeSubject, setActiveSubject] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const scrollContainerRef = useRef(null);
    const modalRef = useRef(null);
    
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };
    
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    const toggleSubject = (subject) => {
        if (activeSubject === subject) {
            setActiveSubject(null);
        } else {
            setActiveSubject(subject);
        }
    };

    const openDetailModal = (subject) => {
        setSelectedSubject(subject);
        setActiveTab('overview');
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeDetailModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'unset';
    };

    useEffect(() => {
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeDetailModal();
            }
        };

        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen]);

    const subjects = [
        {
            id: 'SBD',
            title: 'Sistem Basis Data (SBD)',
            icon: <img src={SBDLogo} alt="SBD Logo" className="w-8 h-8" />,
            description: 'Learn about database systems, concepts, and technologies used to store, manage, and retrieve data efficiently.',
            fullDescription: 'This comprehensive course covers the fundamentals of database systems, including relational database design, SQL, normalization, and modern NoSQL solutions. You will gain hands-on experience with practical implementations using Express.js and MongoDB, along with frontend integration skills essential for full-stack development.',
            duration: '14 weeks',
            level: 'Intermediate',
            prerequisites: ['Basic programming knowledge', 'Understanding of data structures'],
            instructor: 'Network Laboratory',
            materials: [
                'Modul 1: Setup RDBMS',
                'Modul 2: Relational Database Design & Data Definition/Manipulation',
                'Modul 3: Join, Views, and Advanced Query',
                'Modul 4: Normalization',
                'Modul 5: Express JS',
                'Modul 6: Advanced Express JS',
                'Modul 7: MongoDB (NoSQL)',
                'Modul 8: Basic Frontend',
                'Modul 9: Advanced Frontend',
                'PROYEK AKHIR'
            ]
        },
        {
            id: 'DMJ',
            title: 'Desain Manajemen Jaringan (DMJ)',
            icon: <img src={DMJLogo} alt="DMJ Logo" className="w-8 h-8" />,
            description: 'Explore the design and management of networks, including topologies, protocols, and performance analysis.',
            fullDescription: 'This advanced network management course provides comprehensive coverage of modern network technologies, protocols, and management strategies. Students will learn both theoretical concepts and practical implementations of routing protocols, security mechanisms, and network virtualization solutions used in enterprise environments.',
            duration: '16 weeks',
            level: 'Advanced',
            prerequisites: ['Computer Networks', 'Network Security Basics'],
            instructor: 'Network Laboratory',
            materials: [
                'Modul 1: Multi-access & Multi-area OSPFv2',
                'Modul 2: Enhanced Interior Gateway Routing Protocol (EIGRP)',
                'Modul 3: Network Address Translation (NAT) & Access Control List (ACL)',
                'Modul 4: Wide Area Network (WAN PPP & Frame Relay)',
                'Modul 5: Virtual Private Network (VPN)',
                'Modul 6: Quality of Service (QoS) & Network Management',
                'Modul 7: Network Monitoring',
                'Modul 8: Network Virtualization',
                'Modul 9: Network Automation',
                'Modul 10: Skill-Based Assessment'
            ]
        },
        {
            id: 'OS',
            title: 'Sistem Operasi (OS)',
            icon: <img src={OSLogo} alt="OS Logo" className="w-8 h-8" />,
            description: 'Learn about operating systems, their architecture, and how they manage hardware, processes, and resources.',
            fullDescription: 'This system-level course dives into the internals of modern operating systems, focusing on process management, memory allocation, file systems, and I/O operations. Students will get hands-on experience with Linux system programming and develop a deep understanding of how operating systems interact with computer hardware and manage resources.',
            duration: '12 weeks',
            level: 'Intermediate to Advanced',
            prerequisites: ['Computer Architecture', 'C Programming'],
            instructor: 'Network Laboratory',
            materials: [
                'Modul 1: Setup VM and Linux Introduction',
                'Modul 2: Basic Bootloader',
                'Modul 3: Process Creation',
                'Modul 4: Exec Family',
                'Modul 5: Signals',
                'Modul 6: File I/O',
                'Modul 7: Pipe',
                'Modul 8: Input Parsing',
                'Modul 9 & 10: Linux Shell'
            ]
        }
    ];

    const filteredSubjects = searchQuery
        ? subjects.filter(subject =>
            subject.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            subject.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            subject.id.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : subjects;

    return (
        <section id="subjects" className="py-16 relative bg-gray-800 overflow-hidden">
            {/* Dynamic background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-full h-full bg-gradient-to-br from-pink-900/10 to-transparent"></div>
                <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" style={{ transform: 'translateY(50%)' }}>
                    <path fill="#EC4899" fillOpacity="0.05" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,165.3C672,160,768,96,864,96C960,96,1056,160,1152,165.3C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col items-center mb-14">
                    <div className="bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-6 shadow-lg shadow-pink-500/20">
                        Course Catalog
                    </div>
                    
                    <h2 className="text-4xl font-bold text-center mb-4 text-pink-500 relative inline-block">
                        Explore Our Subjects
                        <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
                    </h2>
                    
                    <p className="text-lg text-center text-gray-400 max-w-2xl mt-4">
                        Dive into our comprehensive curriculum designed to build your expertise from fundamentals to advanced concepts
                    </p>
                </div>

                {/* Filter tabs with consistent sizing - Modified for equal width */}
                <div className="flex justify-center mb-12">
                    <div className="bg-gray-700 rounded-full shadow-lg p-1 flex flex-wrap justify-center">
                        <button
                            onClick={() => setSearchQuery('')}
                            className={`px-6 py-2 rounded-full transition-all duration-300 w-24 text-center ${
                                searchQuery === ''
                                    ? 'bg-pink-500 text-white shadow-lg'
                                    : 'hover:bg-gray-600'
                            }`}
                        >
                            All
                        </button>
                        {subjects.map(subject => (
                            <button
                                key={subject.id}
                                onClick={() => setSearchQuery(subject.id)}
                                className={`px-6 py-2 rounded-full transition-all duration-300 w-24 text-center ${
                                    searchQuery === subject.id
                                        ? 'bg-pink-500 text-white shadow-lg'
                                        : 'hover:bg-gray-600'
                                }`}
                            >
                                {subject.id}
                            </button>
                        ))}
                    </div>
                </div>

                {filteredSubjects.length === 0 ? (
                    <div className="text-center py-20 bg-gray-700 rounded-2xl shadow-xl">
                        <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-2xl font-semibold mb-2">No subjects found</h3>
                        <p className="text-gray-500">Try adjusting your search criteria</p>
                    </div>
                ) : (
                    <div className="relative">
                        {filteredSubjects.length > 1 && (
                            <>
                                {/* Scroll buttons - repositioned for better alignment */}
                                <button 
                                    onClick={scrollLeft}
                                    className="absolute left-0 top-1/2 transform -translate-y-1/2 md:-translate-x-2 z-20 bg-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-600 transition-all"
                                    aria-label="Scroll left"
                                >
                                    <ChevronLeft className="text-pink-500" />
                                </button>
                                
                                <button 
                                    onClick={scrollRight}
                                    className="absolute right-0 top-1/2 transform -translate-y-1/2 md:translate-x-2 z-20 bg-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-600 transition-all"
                                    aria-label="Scroll right"
                                >
                                    <ChevronRight className="text-pink-500" />
                                </button>
                            </>
                        )}
                        
                        {/* Modified scrollable container to show one item at a time */}
                        <div 
                            ref={scrollContainerRef}
                            className="flex overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
                            style={{ scrollbarWidth: 'none' }}
                        >
                            <div className="flex space-x-4 px-4 md:px-0 w-full">
                                {filteredSubjects.map((subject) => (
                                    <div 
                                        key={subject.id}
                                        className="snap-center flex-none w-full max-w-xl mx-auto"
                                    >
                                        <div 
                                            className="h-full bg-gray-700 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-pink-300/20 group"
                                            style={{ borderTop: '4px solid #EC4899' }}
                                        >
                                            <div className="p-6">
                                                <div className="flex items-center mb-4">
                                                    <div className="p-3 bg-pink-900/30 rounded-full">
                                                        {subject.icon}
                                                    </div>
                                                    <h3 className="text-xl font-semibold ml-3 text-pink-500">
                                                        {subject.title}
                                                    </h3>
                                                </div>
                                                
                                                <div className="h-24 overflow-hidden">
                                                    <p className="text-gray-300 text-sm">
                                                        {subject.description}
                                                    </p>
                                                </div>
                                                
                                                <div className="mt-6 flex justify-between">
                                                    <button
                                                        onClick={() => toggleSubject(subject.id)}
                                                        className="px-4 py-2 bg-pink-900/30 text-pink-500 rounded-lg font-medium text-sm transition-colors hover:bg-pink-900/50"
                                                    >
                                                        {activeSubject === subject.id ? 'Hide Modules' : 'Show Modules'}
                                                    </button>
                                                    
                                                    <button
                                                        onClick={() => openDetailModal(subject)}
                                                        className="px-4 py-2 bg-pink-500 text-white rounded-lg font-medium text-sm transition-colors hover:bg-pink-600"
                                                    >
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            {activeSubject === subject.id && (
                                                <div className="px-6 pb-6 max-h-64 overflow-y-auto custom-scrollbar bg-gray-800/50">
                                                    <div className="pt-2 pb-2">
                                                        <div className="text-pink-500 font-medium mb-2">Module List:</div>
                                                        <ul className="space-y-2 text-gray-300 text-sm">
                                                            {subject.materials.map((item, index) => (
                                                                <li key={index} className="flex items-start">
                                                                    <div className="flex-shrink-0 bg-pink-400 w-4 h-4 rounded-full flex items-center justify-center mt-0.5 mr-2">
                                                                        <span className="text-white text-xs">{index + 1}</span>
                                                                    </div>
                                                                    {item}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Modified Detail Modal - improved for mobile with fixed footer */}
            {isModalOpen && selectedSubject && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fadeIn">
                    <div 
                        ref={modalRef}
                        className="bg-gray-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl animate-scaleIn overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative h-48 bg-gray-700 flex items-center justify-center">
                            {/* Decorative Elements - updated to match the rest of the design */}
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="bg-gray-800 h-full w-full">
                                    <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-pink-900/10 to-transparent"></div>
                                </div>
                            </div>
                            
                            <div className="text-center z-10">
                                <div className="bg-pink-900/20 p-5 rounded-full inline-block mb-3 shadow-lg">
                                    <div className="transform scale-150">
                                        {selectedSubject.icon}
                                    </div>
                                </div>
                                <h3 className="text-pink-400 text-3xl font-bold">
                                    {selectedSubject.title}
                                </h3>
                            </div>
                        </div>
                        
                        {/* Tabs Navigation */}
                        <div className="flex border-b border-gray-700">
                            <button
                                className={`flex-1 py-4 px-6 text-center transition-colors border-b-2 font-medium ${
                                    activeTab === 'overview'
                                        ? 'border-pink-500 text-pink-500'
                                        : 'border-transparent hover:border-gray-300'
                                }`}
                                onClick={() => setActiveTab('overview')}
                            >
                                Overview
                            </button>
                            <button
                                className={`flex-1 py-4 px-6 text-center transition-colors border-b-2 font-medium ${
                                    activeTab === 'modules'
                                        ? 'border-pink-500 text-pink-500'
                                        : 'border-transparent hover:border-gray-300'
                                }`}
                                onClick={() => setActiveTab('modules')}
                            >
                                Modules
                            </button>
                            <button
                                className={`flex-1 py-4 px-6 text-center transition-colors border-b-2 font-medium ${
                                    activeTab === 'info'
                                        ? 'border-pink-500 text-pink-500'
                                        : 'border-transparent hover:border-gray-300'
                                }`}
                                onClick={() => setActiveTab('info')}
                            >
                                Details
                            </button>
                        </div>
                        
                        {/* Content area with fixed height to ensure footer stays visible */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            <div className="p-6">
                                {/* Overview Tab */}
                                {activeTab === 'overview' && (
                                    <div className="space-y-6 animate-fadeIn">
                                        <div>
                                            <h4 className="text-xl font-semibold text-pink-500 mb-3">Course Description</h4>
                                            <p className="text-gray-300 leading-relaxed">
                                                {selectedSubject.fullDescription}
                                            </p>
                                        </div>
                                        
                                        <div className="bg-gray-700/50 rounded-xl p-5">
                                            <h4 className="text-lg font-semibold text-pink-500 mb-3">Prerequisites</h4>
                                            <ul className="space-y-2">
                                                {selectedSubject.prerequisites.map((prerequisite, index) => (
                                                    <li key={index} className="flex items-center">
                                                        <CheckCircle className="text-pink-500 mr-3" size={16} />
                                                        <span className="text-gray-300">{prerequisite}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        
                                        <div className="flex justify-center">
                                            <div className="flex items-center bg-gray-700/50 px-5 py-3 rounded-full">
                                                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                                                <img src={NetworkLabLogo} alt="Network Lab Logo" className="w-7 h-7 rounded-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-400">Instructor</p>
                                                    <p className="font-medium text-gray-200">{selectedSubject.instructor}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {/* Modules Tab */}
                                {activeTab === 'modules' && (
                                    <div className="animate-fadeIn">
                                        <h4 className="text-xl font-semibold text-pink-500 mb-4">Course Modules</h4>
                                        <div className="bg-gray-700/50 rounded-xl p-5">
                                            <ul className="space-y-4">
                                                {selectedSubject.materials.map((item, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center mr-4 shadow-md shadow-pink-900/20">
                                                            {index + 1}
                                                        </div>
                                                        <div className="pt-1">
                                                            <p className="text-gray-200 font-medium">{item}</p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                                
                                {/* Details Tab */}
                                {activeTab === 'info' && (
                                    <div className="animate-fadeIn">
                                        <div className="relative mb-6">
                                            <div className="absolute top-0 left-0 w-16 h-16 bg-pink-900/30 rounded-lg -z-10 transform -translate-x-2 -translate-y-2"></div>
                                            <div className="relative bg-gray-700 p-5 rounded-lg shadow-md border border-gray-600">
                                                <h4 className="text-xl font-semibold text-pink-500 mb-3">About This Course</h4>
                                                <p className="text-gray-300 leading-relaxed">
                                                    {selectedSubject.fullDescription}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-gray-700/50 rounded-xl p-6">
                                            <h4 className="text-lg font-semibold text-pink-500 mb-4">What You'll Learn</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {selectedSubject.materials.slice(0, 6).map((item, index) => {
                                                    const moduleName = item.split(': ')[1] || item;
                                                    return (
                                                        <div key={index} className="flex items-center bg-gray-800/60 p-3 rounded-lg">
                                                            <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                                                            <span className="text-gray-300 text-sm">{moduleName}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            {selectedSubject.materials.length > 6 && (
                                                <div className="text-center mt-4">
                                                    <button 
                                                        onClick={() => setActiveTab('modules')}
                                                        className="text-pink-500 font-medium hover:text-pink-600 inline-flex items-center"
                                                    >
                                                        View all modules
                                                        <ChevronRight size={16} className="ml-1" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Fixed footer regardless of content length */}
                        <div className="bg-gray-700/50 px-6 py-4 flex justify-center sticky bottom-0">
                            <button
                                onClick={closeDetailModal}
                                className="px-8 py-2.5 bg-pink-500 text-white rounded-full font-medium transition-colors hover:bg-pink-600 shadow-md shadow-pink-500/20"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom styles */}
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #374151;
                    border-radius: 10px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #EC4899;
                    border-radius: 10px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #be185d;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes scaleIn {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease forwards;
                }
                
                .animate-scaleIn {
                    animation: scaleIn 0.4s ease forwards;
                }
            `}</style>
        </section>
    );
}

export default Subjects;