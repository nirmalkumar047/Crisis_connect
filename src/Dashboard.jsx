import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  AlertTriangle, 
  Users, 
  Package, 
  Truck, 
  Heart, 
  MapPin, 
  Clock, 
  TrendingUp,
  Filter,
  RefreshCw,
  Phone,
  MessageSquare
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Mock data for demonstration
const initialRequests = [
  { id: 1, lat: 28.6139, lng: 77.2090, type: 'food', priority: 'high', victims: 45, timestamp: '2 mins ago', status: 'pending', area: 'Central Delhi' },
  { id: 2, lat: 28.5355, lng: 77.3910, type: 'medical', priority: 'critical', victims: 12, timestamp: '5 mins ago', status: 'in-progress', area: 'Noida' },
  { id: 3, lat: 28.4595, lng: 77.0266, type: 'water', priority: 'medium', victims: 30, timestamp: '8 mins ago', status: 'pending', area: 'Gurgaon' },
  { id: 4, lat: 28.7041, lng: 77.1025, type: 'shelter', priority: 'high', victims: 25, timestamp: '12 mins ago', status: 'completed', area: 'North Delhi' },
  { id: 5, lat: 28.5274, lng: 77.1300, type: 'food', priority: 'medium', victims: 18, timestamp: '15 mins ago', status: 'pending', area: 'South Delhi' },
];

const volunteers = [
  { id: 1, lat: 28.6129, lng: 77.2295, name: 'Team Alpha', skills: ['medical', 'rescue'], status: 'available' },
  { id: 2, lat: 28.5505, lng: 77.2679, name: 'Team Beta', skills: ['food', 'water'], status: 'deployed' },
  { id: 3, lat: 28.4817, lng: 77.0818, name: 'Team Gamma', skills: ['shelter', 'transport'], status: 'available' },
];

const resources = [
  { type: 'Food Packets', available: 2450, deployed: 1200, location: 'Warehouse A' },
  { type: 'Water Bottles', available: 5000, deployed: 2800, location: 'Warehouse B' },
  { type: 'Medical Kits', available: 180, deployed: 120, location: 'Medical Center' },
  { type: 'Blankets', available: 800, deployed: 450, location: 'Relief Center' },
];

const Dashboard = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [refreshTime, setRefreshTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTime(new Date());
      // Simulate new request
      if (Math.random() > 0.8) {
        const newRequest = {
          id: Date.now(),
          lat: 28.6 + (Math.random() - 0.5) * 0.2,
          lng: 77.2 + (Math.random() - 0.5) * 0.4,
          type: ['food', 'medical', 'water', 'shelter'][Math.floor(Math.random() * 4)],
          priority: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
          victims: Math.floor(Math.random() * 50) + 5,
          timestamp: 'Just now',
          status: 'pending',
          area: 'New Area'
        };
        setRequests(prev => [newRequest, ...prev]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#ca8a04';
      case 'low': return '#16a34a';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#16a34a';
      case 'in-progress': return '#ca8a04';
      case 'pending': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const filteredRequests = requests.filter(req => 
    selectedFilter === 'all' || req.type === selectedFilter
  );

  const chartData = [
    { name: 'Food', value: requests.filter(r => r.type === 'food').length },
    { name: 'Medical', value: requests.filter(r => r.type === 'medical').length },
    { name: 'Water', value: requests.filter(r => r.type === 'water').length },
    { name: 'Shelter', value: requests.filter(r => r.type === 'shelter').length },
  ];

  const priorityData = [
    { name: 'Critical', value: requests.filter(r => r.priority === 'critical').length, color: '#dc2626' },
    { name: 'High', value: requests.filter(r => r.priority === 'high').length, color: '#ea580c' },
    { name: 'Medium', value: requests.filter(r => r.priority === 'medium').length, color: '#ca8a04' },
    { name: 'Low', value: requests.filter(r => r.priority === 'low').length, color: '#16a34a' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="text-red-500" />
                Disaster Relief Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Real-time coordination and resource management</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock size={16} />
                Last updated: {refreshTime.toLocaleTimeString()}
              </div>
              <button 
                onClick={() => setRefreshTime(new Date())}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <RefreshCw size={16} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-red-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Active Requests</p>
                <p className="text-3xl font-bold text-gray-900">{requests.filter(r => r.status === 'pending').length}</p>
              </div>
              <AlertTriangle className="h-12 w-12 text-red-500" />
            </div>
            <p className="text-xs text-red-500 mt-2">+{Math.floor(Math.random() * 5)} in last hour</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">People Affected</p>
                <p className="text-3xl font-bold text-gray-900">{requests.reduce((sum, r) => sum + r.victims, 0)}</p>
              </div>
              <Users className="h-12 w-12 text-blue-500" />
            </div>
            <p className="text-xs text-blue-500 mt-2">Across {requests.length} locations</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Available Volunteers</p>
                <p className="text-3xl font-bold text-gray-900">{volunteers.filter(v => v.status === 'available').length}</p>
              </div>
              <Heart className="h-12 w-12 text-green-500" />
            </div>
            <p className="text-xs text-green-500 mt-2">{volunteers.filter(v => v.status === 'deployed').length} deployed</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Resources Ready</p>
                <p className="text-3xl font-bold text-gray-900">{resources.reduce((sum, r) => sum + r.available, 0)}</p>
              </div>
              <Package className="h-12 w-12 text-purple-500" />
            </div>
            <p className="text-xs text-purple-500 mt-2">{resources.reduce((sum, r) => sum + r.deployed, 0)} deployed</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Live Relief Map</h2>
                <div className="flex gap-2">
                  <select 
                    value={selectedFilter} 
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
                  >
                    <option value="all">All Requests</option>
                    <option value="food">Food</option>
                    <option value="medical">Medical</option>
                    <option value="water">Water</option>
                    <option value="shelter">Shelter</option>
                  </select>
                </div>
              </div>
              
              <div className="h-96 rounded-lg overflow-hidden border">
                <MapContainer 
                  center={[28.6139, 77.2090]} 
                  zoom={11} 
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {/* Request Markers */}
                  {filteredRequests.map(request => (
                    <Marker key={request.id} position={[request.lat, request.lng]}>
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-bold capitalize">{request.type} Request</h3>
                          <p className="text-sm text-gray-600">{request.area}</p>
                          <p className="text-sm">Victims: {request.victims}</p>
                          <p className="text-sm">Priority: 
                            <span 
                              className="ml-1 px-2 py-1 rounded text-white text-xs"
                              style={{ backgroundColor: getPriorityColor(request.priority) }}
                            >
                              {request.priority}
                            </span>
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{request.timestamp}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                  
                  {/* Volunteer Markers */}
                  {volunteers.map(volunteer => (
                    <Marker key={volunteer.id} position={[volunteer.lat, volunteer.lng]}>
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-bold">{volunteer.name}</h3>
                          <p className="text-sm">Skills: {volunteer.skills.join(', ')}</p>
                          <p className="text-sm">Status: 
                            <span className={`ml-1 px-2 py-1 rounded text-white text-xs ${
                              volunteer.status === 'available' ? 'bg-green-500' : 'bg-orange-500'
                            }`}>
                              {volunteer.status}
                            </span>
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
              
              {/* Map Legend */}
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Critical Priority</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>High Priority</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Medium Priority</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Low Priority</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Priority Requests */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Priority Requests</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {requests
                  .filter(r => r.priority === 'critical' || r.priority === 'high')
                  .slice(0, 5)
                  .map(request => (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: getPriorityColor(request.priority) }}
                          ></div>
                          <span className="font-medium capitalize">{request.type}</span>
                        </div>
                        <span className="text-xs text-gray-500">{request.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600">{request.area}</p>
                      <p className="text-sm text-gray-700">{request.victims} people affected</p>
                      <div className="flex justify-between items-center mt-2">
                        <span 
                          className="text-xs px-2 py-1 rounded text-white"
                          style={{ backgroundColor: getStatusColor(request.status) }}
                        >
                          {request.status}
                        </span>
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <Phone size={14} />
                          </button>
                          <button className="text-green-600 hover:text-green-800">
                            <MessageSquare size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Charts */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Request Distribution</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={priorityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {priorityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Resource Availability */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Resource Status</h3>
              <div className="space-y-3">
                {resources.map((resource, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{resource.type}</span>
                      <span className="text-sm text-gray-600">{resource.location}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Available: {resource.available}</span>
                      <span>Deployed: {resource.deployed}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ 
                          width: `${(resource.available / (resource.available + resource.deployed)) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Recent Activity */}
        <div className="mt-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Location</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Type</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Priority</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Victims</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Time</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {requests.slice(0, 8).map(request => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{request.area}</td>
                      <td className="px-4 py-3 capitalize">{request.type}</td>
                      <td className="px-4 py-3">
                        <span 
                          className="px-2 py-1 rounded text-white text-xs"
                          style={{ backgroundColor: getPriorityColor(request.priority) }}
                        >
                          {request.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3">{request.victims}</td>
                      <td className="px-4 py-3">
                        <span 
                          className="px-2 py-1 rounded text-white text-xs"
                          style={{ backgroundColor: getStatusColor(request.status) }}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{request.timestamp}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-800 p-1">
                            <MapPin size={16} />
                          </button>
                          <button className="text-green-600 hover:text-green-800 p-1">
                            <Truck size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;