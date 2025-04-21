import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import SBDLogo from '../assets/SBDLogo.svg';
import DMJLogo from '../assets/DMJLogo.svg';
import OSLogo from '../assets/OSLogo.svg';

function Subjects({ searchQuery, setSearchQuery }) {
    const [activeSubject, setActiveSubject] = useState(null);
    const [isHovered, setIsHovered] = useState(null);

    const toggleSubject = (subject) => {
        if (activeSubject === subject) {
            setActiveSubject(null);
        } else {
            setActiveSubject(subject);
        }
    };

    const subjects = [
        {
            id: 'SBD',
            title: 'Sistem Basis Data (SBD)',
            icon: <img src={SBDLogo} alt="SBD Logo" className="w-8 h-8" />,
            description: 'Learn about database systems, concepts, and technologies used to store, manage, and retrieve data efficiently.',
            materials: [
                'Modul 1: Setup RDBMS',
                'Modul 2: Relational Database Design & Data Definition/Manipulation',
                'Modul 3: Join, Views, and Advanced Query',
                'Modul 4: Normalization',
                'Modul 5: Express JS',
                'Modul 6: Advanced Express JS',
                'Modul 7: MongoDB (NoSQL)',
                'Modul 8: Basic Frontend',
                'Modul 9: Advanced Frontend'
            ]
        },
        {
            id: 'DMJ',
            title: 'Desain Manajemen Jaringan (DMJ)',
            icon: <img src={DMJLogo} alt="DMJ Logo" className="w-8 h-8" />,
            description: 'Explore the design and management of networks, including topologies, protocols, and performance analysis.',
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
            materials: [
                'Modul 1: Setup VM and Linux Introduction',
                'Modul 2: Basic Bootloader',
                'Modul 3: Process Creation',
                'Modul 4: Exec Family',
                'Modul 5: Signals',
                'Modul 6: File I/O',
                'Modul 7: Pipe',
                'Modul 8: Input Parsing',
                'Modul 9: Linux Shell',
                'Modul 10: Skill-Based Assessment'
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
        <section id="subjects" className="py-24 relative bg-gray-100 dark:bg-gray-800">
            {/* Background effect with floating shapes */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full opacity-20 animate-float"
                        style={{
                            width: `${Math.random() * 250 + 50}px`,
                            height: `${Math.random() * 250 + 50}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            backgroundColor: '#EC4899', // Soft pink color
                            animationDelay: `${i * 0.7}s`,
                            animationDuration: `${Math.random() * 4 + 4}s`
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <h2 className="text-4xl font-bold text-center mb-2 text-pink-500">
                    Our Subjects
                </h2>
                <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-6">
                    Dive into our comprehensive curriculum
                </p>
                <div className={`w-24 h-1 bg-gradient-to-r bg-pink-500 mx-auto mb-12 rounded-full`}></div>

                <div className="flex justify-center mb-8">
                    <div className="flex flex-wrap justify-center gap-2">
                        <button
                            onClick={() => setSearchQuery('')}
                            className={`px-4 py-2 rounded-lg transition ${
                                searchQuery === ''
                                    ? 'bg-pink-500 text-white'
                                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                            }`}
                        >
                            All
                        </button>
                        {subjects.map(subject => (
                            <button
                                key={subject.id}
                                onClick={() => setSearchQuery(subject.id)}
                                className={`px-4 py-2 rounded-lg transition ${
                                    searchQuery === subject.id
                                        ? 'bg-pink-500 text-white'
                                        : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                                }`}
                            >
                                {subject.id}
                            </button>
                        ))}
                    </div>
                </div>

                {filteredSubjects.length === 0 ? (
                    <div className="text-center py-12">
                        <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-2xl font-semibold mb-2">No subjects found</h3>
                        <p className="text-gray-500">Try adjusting your search criteria</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredSubjects.map((subject) => (
                            <div
                                key={subject.id}
                                className={`bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform ${
                                    isHovered === subject.id ? 'scale-105' : ''
                                } ${activeSubject === subject.id ? 'ring-4 ring-pink-500' : ''}`}
                                onMouseEnter={() => setIsHovered(subject.id)}
                                onMouseLeave={() => setIsHovered(null)}
                            >
                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        {subject.icon}
                                        <h3 className="text-xl font-semibold ml-3 text-pink-500">
                                            {subject.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {subject.description}
                                    </p>
                                    <button
                                        onClick={() => toggleSubject(subject.id)}
                                        className="px-4 py-2 rounded-lg text-white font-medium transition-all bg-pink-500 hover:bg-pink-600 mt-4"
                                    >
                                        {activeSubject === subject.id ? 'Hide Materials' : 'Show Materials'}
                                    </button>
                                </div>
                                {activeSubject === subject.id && (
                                    <div className="px-6 pb-6 max-h-64 overflow-y-auto">
                                        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                            {subject.materials.map((item, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="inline-block w-2 h-2 mt-2 mr-2 rounded-full bg-pink-400"></span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default Subjects;
