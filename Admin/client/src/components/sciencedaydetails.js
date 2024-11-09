import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { Send, Users, Search, Filter, Download, Trash2, Edit, Info, ChevronDown } from 'lucide-react';

const SchoolDetailsPage = () => {
  const navigate = useNavigate();
  const [schoolData, setSchoolData] = useState([
    {
      id: 1,
      name: "Sunshine Academy",
      city: "New York",
      affiliationNumber: "12345",
      coordinatorTeacherName: "Alice Johnson",
      address: "123 Sunshine St, New York, NY",
      pincode: "10001",
      coordinatorTeacherMobile: "123-456-7890",
      accompanyingTeachers: [
        { id: 1, name: "Mr. Smith", gender: "Male" },
        { id: 2, name: "Mrs. Davis", gender: "Female" }
      ],
      competitions: [
        { id: 1, title: "Student Modal 1" },
        { id: 2, title: "Quiz Competition" }
      ],
      students: [
        {
          id: 1,
          participant1Name: "Rohan Sharma",
          participant1Gender: "Male",
          participant1Class: "10th",
          participant1Accommodation: "Hostel",
          participant2Name: "Priya Verma",
          participant2Gender: "Female",
          participant2Class: "10th",
          participant2Accommodation: "Home",
          additionalRequirements: "Vegetarian meals",
          declaration: true,
          writeup: "/uploads/writing1.pdf",
          competitionsParticipated: ["StudentModal 1"]
        },
        {
          id: 2,
          participant1Name: "Amit Patel",
          participant1Gender: "Male",
          participant1Class: "9th",
          participant1Accommodation: "Home",
          participant2Name: "Sneha Gupta",
          participant2Gender: "Female",
          participant2Class: "9th",
          participant2Accommodation: "Hostel",
          additionalRequirements: null,
          declaration: true,
          writeup: "/uploads/writing2.pdf",
          competitionsParticipated: ["Quiz Competition"]
        }
      ]
    },
    {
      id: 2,
      name: "Greenwood High",
      city: "Los Angeles",
      affiliationNumber: "67890",
      coordinatorTeacherName: "Bob Brown",
      address: "456 Greenwood Ave, Los Angeles, CA",
      pincode: "90001",
      coordinatorTeacherMobile: "987-654-3210",
      accompanyingTeachers: [
        { id: 3, name: "Ms. Lee", gender: "Female" },
        { id: 4, name: "Mr. Patel", gender: "Male" }
      ],
      competitions: [
        { id: 3, title: "Student modal 1" }
      ],
      students: [
        {
          id: 3,
          participant1Name: "Neha Singh",
          participant1Gender: "Female",
          participant1Class: "11th",
          participant1Accommodation: "Home",
          participant2Name: "Rahul Kumar",
          participant2Gender: "Male",
          participant2Class: "11th",
          participant2Accommodation: "Hostel",
          additionalRequirements: "Need special seating",
          declaration: true,
          writeup: "/uploads/writing3.pdf",
          competitionsParticipated: ["Student modal 1"]
        }
      ]
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRow, setExpandedRow] = useState(null);
  const [exportFormat, setExportFormat] = useState('excel');

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  const slideIn = useSpring({
    transform: 'translateY(0)',
    from: { transform: 'translateY(50px)' },
  });

  const toggleExpandRow = useCallback((id) => {
    setExpandedRow(expandedRow === id ? null : id);
  }, [expandedRow]);

  const filteredData = useMemo(() => {
    return schoolData.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [schoolData, searchTerm]);

  return (
    <animated.div style={fadeIn} className="container mx-auto px-4 py-8">
      <animated.div style={slideIn}>
        <div className="mb-8 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center"
          >
            Back to Dashboard
          </button>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-6">School Details</h1>
        <p className="text-gray-600 mb-8 text-lg">Manage school information and related data.</p>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Schools Data</h2>
            <div className="mb-4 flex space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search schools..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
              <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition duration-300 ease-in-out">
                <Filter size={20} />
              </button>
              <select
                className="appearance-none bg-green-100 text-green-700 font-semibold py-2 px-4 pr-8 rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer transition duration-300 ease-in-out"
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
              >
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
              <button 
                className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition duration-300 ease-in-out flex items-center"
                onClick={() => console.log('Export functionality to be implemented')}
              >
                <Download size={20} className="mr-2" />
                <span>Export</span>
              </button>
            </div>

            {filteredData.length > 0 ? (
              <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Affiliation Number</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coordinator Teacher</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map(school => (
                      <React.Fragment key={school.id}>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{school.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{school.city}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{school.affiliationNumber}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{school.coordinatorTeacherName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <button
                              onClick={() => toggleExpandRow(school.id)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              {expandedRow === school.id ? 'Hide Details' : 'View Details'}
                            </button>
                          </td>
                        </tr>
                        {expandedRow === school.id && (
                          <tr>
                            <td colSpan={5} className="px-6 py-4">
                              <div className="p-4 border border-gray-200 rounded-md">
                                <h3 className="text-lg font-semibold mb-2">Competitions</h3>
                                <ul className="list-disc pl-5 mb-4">
                                  {school.competitions.map(competition => (
                                    <li key={competition.id}>{competition.title}</li>
                                  ))}
                                </ul>

                                <h3 className="text-lg font-semibold mb-2">Students</h3>
                                {school.students.length > 0 ? (
                                  <div>
                                    {school.students.map(student => (
                                      <div key={student.id} className="border border-gray-300 rounded-md p-2 mb-4">
                                        <h4 className="font-bold">{student.participant1Name} & {student.participant2Name}</h4>
                                        <p>Class: {student.participant1Class} & {student.participant2Class}</p>
                                        <p>Gender: {student.participant1Gender} & {student.participant2Gender}</p>
                                        <p>Accommodation: {student.participant1Accommodation} & {student.participant2Accommodation}</p>
                                        <p>Additional Requirements: {student.additionalRequirements || 'None'}</p>
                                        <p>Declaration: {student.declaration ? 'Yes' : 'No'}</p>
                                        <p>Write-up: <a href={student.writeup} className="text-blue-600 underline">View</a></p>
                                        <p>Competitions Participated: {student.competitionsParticipated.join(', ')}</p>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p>No students found.</p>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No schools found.</p>
            )}
          </div>
        </div>
      </animated.div>
    </animated.div>
  );
};

export default SchoolDetailsPage;
