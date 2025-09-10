import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
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
  MessageSquare,
  Plus,
  Camera,
  Mic,
  Send,
  Bell,
  Shield,
  Activity,
  Navigation,
  Zap,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  Upload,
  User,
  MessageCircle
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Enhanced data structures with more realistic and detailed information
const initialRequests = [
  { 
    id: 1, 
    lat: 28.6139, 
    lng: 77.2090, 
    type: 'food', 
    priority: 'high', 
    victims: 45, 
    timestamp: '2 mins ago', 
    status: 'pending', 
    area: 'Central Delhi',
    description: 'Urgent need for food supplies for flood-affected families',
    contact: '+91-9876543210',
    reportedBy: 'Local Volunteer',
    images: ['flood_damage.jpg'],
    estimatedResponse: '15 mins',
    assignedVolunteer: null
  },
  { 
    id: 2, 
    lat: 28.5355, 
    lng: 77.3910, 
    type: 'medical', 
    priority: 'critical', 
    victims: 12, 
    timestamp: '5 mins ago', 
    status: 'in-progress', 
    area: 'Noida',
    description: 'Medical emergency - injured people need immediate attention',
    contact: '+91-9876543211',
    reportedBy: 'Emergency Responder',
    images: ['medical_emergency.jpg'],
    estimatedResponse: '5 mins',
    assignedVolunteer: 'Team Alpha'
  },
  { 
    id: 3, 
    lat: 28.4595, 
    lng: 77.0266, 
    type: 'water', 
    priority: 'medium', 
    victims: 30, 
    timestamp: '8 mins ago', 
    status: 'pending', 
    area: 'Gurgaon',
    description: 'Clean drinking water shortage in residential area',
    contact: '+91-9876543212',
    reportedBy: 'Resident',
    images: [],
    estimatedResponse: '30 mins',
    assignedVolunteer: null
  },
];

const volunteers = [
  { 
    id: 1, 
    lat: 28.6129, 
    lng: 77.2295, 
    name: 'Team Alpha', 
    skills: ['medical', 'rescue'], 
    status: 'available',
    contact: '+91-9000000001',
    rating: 4.8,
    completedMissions: 23
  },
  { 
    id: 2, 
    lat: 28.5505, 
    lng: 77.2679, 
    name: 'Team Beta', 
    skills: ['food', 'water'], 
    status: 'deployed',
    contact: '+91-9000000002',
    rating: 4.6,
    completedMissions: 18
  },
  { 
    id: 3, 
    lat: 28.4817, 
    lng: 77.0818, 
    name: 'Team Gamma', 
    skills: ['shelter', 'transport'], 
    status: 'available',
    contact: '+91-9000000003',
    rating: 4.9,
    completedMissions: 31
  },
];

const resources = [
  { type: 'Food Packets', available: 2450, deployed: 1200, location: 'Warehouse A', lastUpdated: '5 mins ago' },
  { type: 'Water Bottles', available: 5000, deployed: 2800, location: 'Warehouse B', lastUpdated: '3 mins ago' },
  { type: 'Medical Kits', available: 180, deployed: 120, location: 'Medical Center', lastUpdated: '1 min ago' },
  { type: 'Blankets', available: 800, deployed: 450, location: 'Relief Center', lastUpdated: '7 mins ago' },
  { type: 'Emergency Shelters', available: 25, deployed: 12, location: 'Command Center', lastUpdated: '10 mins ago' },
];

const Dash = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [refreshTime, setRefreshTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [realTimeData, setRealTimeData] = useState([]);

  // New request form state
  const [newRequest, setNewRequest] = useState({
    type: 'food',
    priority: 'medium',
    victims: 1,
    area: '',
    description: '',
    contact: '',
    reportedBy: '',
    lat: 28.6139,
    lng: 77.2090,
    images: []
  });

  // Real-time performance metrics
  const [performanceMetrics, setPerformanceMetrics] = useState({
    averageResponseTime: '12 mins',
    completionRate: '87%',
    activeVolunteers: volunteers.filter(v => v.status === 'available').length,
    totalResourcesDeployed: resources.reduce((sum, r) => sum + r.deployed, 0)
  });

  // Simulate real-time updates and notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTime(new Date());
      
      // Add real-time data point
      setRealTimeData(prev => [...prev.slice(-9), {
        time: new Date().toLocaleTimeString(),
        requests: requests.length,
        resolved: requests.filter(r => r.status === 'completed').length
      }]);

      // Simulate new urgent notification
      if (Math.random() > 0.9) {
        const newNotification = {
          id: Date.now(),
          type: 'urgent',
          message: 'New critical medical emergency reported in South Delhi',
          timestamp: new Date().toLocaleTimeString(),
          read: false
        };
        setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
      }

      // Simulate random new request
      if (Math.random() > 0.85) {
        const areas = ['East Delhi', 'West Delhi', 'South Delhi', 'North Delhi', 'Gurgaon', 'Noida', 'Faridabad'];
        const descriptions = [
          'Urgent food assistance needed for elderly residents',
          'Medical supplies required for local clinic',
          'Clean water shortage affecting multiple families',
          'Temporary shelter needed due to structural damage',
          'Emergency evacuation assistance required'
        ];
        
        const newReq = {
          id: Date.now(),
          lat: 28.6 + (Math.random() - 0.5) * 0.3,
          lng: 77.2 + (Math.random() - 0.5) * 0.5,
          type: ['food', 'medical', 'water', 'shelter'][Math.floor(Math.random() * 4)],
          priority: ['medium', 'high', 'critical'][Math.floor(Math.random() * 3)],
          victims: Math.floor(Math.random() * 40) + 5,
          timestamp: 'Just now',
          status: 'pending',
          area: areas[Math.floor(Math.random() * areas.length)],
          description: descriptions[Math.floor(Math.random() * descriptions.length)],
          contact: `+91-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
          reportedBy: 'Auto-generated',
          images: [],
          estimatedResponse: `${Math.floor(Math.random() * 30) + 10} mins`,
          assignedVolunteer: null
        };
        setRequests(prev => [newReq, ...prev]);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [requests.length]);

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    
    const submittedRequest = {
      ...newRequest,
      id: Date.now(),
      timestamp: 'Just now',
      status: 'pending',
      estimatedResponse: calculateEstimatedResponse(newRequest.priority),
      assignedVolunteer: null
    };

    setRequests(prev => [submittedRequest, ...prev]);
    
    // Add success notification
    setNotifications(prev => [{
      id: Date.now(),
      type: 'success',
      message: 'Your request has been submitted successfully. Help is on the way!',
      timestamp: new Date().toLocaleTimeString(),
      read: false
    }, ...prev.slice(0, 4)]);

    // Reset form
    setNewRequest({
      type: 'food',
      priority: 'medium',
      victims: 1,
      area: '',
      description: '',
      contact: '',
      reportedBy: '',
      lat: 28.6139,
      lng: 77.2090,
      images: []
    });
    
    setShowRequestForm(false);
  };

  const calculateEstimatedResponse = (priority) => {
    switch (priority) {
      case 'critical': return '5-10 mins';
      case 'high': return '10-20 mins';
      case 'medium': return '20-45 mins';
      case 'low': return '45-90 mins';
      default: return '30 mins';
    }
  };

  const assignVolunteer = (requestId, volunteerId) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, assignedVolunteer: volunteers.find(v => v.id === volunteerId)?.name, status: 'in-progress' }
        : req
    ));
    
    setNotifications(prev => [{
      id: Date.now(),
      type: 'info',
      message: `Volunteer assigned to request #${requestId}`,
      timestamp: new Date().toLocaleTimeString(),
      read: false
    }, ...prev.slice(0, 4)]);
  };

  const markRequestComplete = (requestId) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'completed' } : req
    ));
  };

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
    { name: 'Food', value: requests.filter(r => r.type === 'food').length, color: '#3b82f6' },
    { name: 'Medical', value: requests.filter(r => r.type === 'medical').length, color: '#ef4444' },
    { name: 'Water', value: requests.filter(r => r.type === 'water').length, color: '#06b6d4' },
    { name: 'Shelter', value: requests.filter(r => r.type === 'shelter').length, color: '#8b5cf6' },
  ];

  const priorityData = [
    { name: 'Critical', value: requests.filter(r => r.priority === 'critical').length, color: '#dc2626' },
    { name: 'High', value: requests.filter(r => r.priority === 'high').length, color: '#ea580c' },
    { name: 'Medium', value: requests.filter(r => r.priority === 'medium').length, color: '#ca8a04' },
    { name: 'Low', value: requests.filter(r => r.priority === 'low').length, color: '#16a34a' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Enhanced Header with Real-time Alerts */}
      <div className="bg-white shadow-lg border-b border-blue-100">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                  <div className="relative">
                    <AlertTriangle className="text-red-500" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                  Smart Relief Coordination Hub
                </h1>
                <p className="text-gray-600 mt-1">AI-powered disaster response and resource management</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Real-time Notifications */}
              <div className="relative">
                <button className="bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 relative">
                  <Bell size={20} />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
                {notifications.length > 0 && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border max-h-64 overflow-y-auto z-50">
                    {notifications.slice(0, 5).map(notification => (
                      <div key={notification.id} className="p-3 border-b border-gray-100 hover:bg-gray-50">
                        <p className="text-sm font-medium">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Request Button */}
              <button 
                onClick={() => setShowRequestForm(true)}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2 font-medium shadow-lg"
              >
                <Plus size={16} />
                Report Emergency
              </button>

              {/* Status Indicators */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  System Online
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock size={16} />
                  {refreshTime.toLocaleTimeString()}
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
      </div>

      {/* Emergency Request Form Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <AlertCircle className="text-red-500" />
                  Report Emergency Request
                </h2>
                <button 
                  onClick={() => setShowRequestForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle size={24} />
                </button>
              </div>
              <p className="text-gray-600 mt-2">Fill out this form to request emergency assistance. Our team will respond as quickly as possible.</p>
            </div>
            
            <form onSubmit={handleSubmitRequest} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Type *</label>
                  <select 
                    value={newRequest.type} 
                    onChange={(e) => setNewRequest({...newRequest, type: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  >
                    <option value="food">Food & Supplies</option>
                    <option value="medical">Medical Emergency</option>
                    <option value="water">Water & Sanitation</option>
                    <option value="shelter">Shelter & Housing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level *</label>
                  <select 
                    value={newRequest.priority} 
                    onChange={(e) => setNewRequest({...newRequest, priority: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  >
                    <option value="low">Low - Can wait</option>
                    <option value="medium">Medium - Important</option>
                    <option value="high">High - Urgent</option>
                    <option value="critical">Critical - Life threatening</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of People Affected *</label>
                  <input 
                    type="number" 
                    min="1"
                    value={newRequest.victims} 
                    onChange={(e) => setNewRequest({...newRequest, victims: parseInt(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location/Area *</label>
                  <input 
                    type="text" 
                    value={newRequest.area} 
                    onChange={(e) => setNewRequest({...newRequest, area: e.target.value})}
                    placeholder="e.g., Sector 15, Noida"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description *</label>
                <textarea 
                  value={newRequest.description} 
                  onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                  placeholder="Describe the situation, specific needs, and any relevant details..."
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number *</label>
                  <input 
                    type="tel" 
                    value={newRequest.contact} 
                    onChange={(e) => setNewRequest({...newRequest, contact: e.target.value})}
                    placeholder="+91-XXXXXXXXXX"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                  <input 
                    type="text" 
                    value={newRequest.reportedBy} 
                    onChange={(e) => setNewRequest({...newRequest, reportedBy: e.target.value})}
                    placeholder="Full name"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  <p><strong>Estimated Response:</strong> {calculateEstimatedResponse(newRequest.priority)}</p>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowRequestForm(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="bg-red-600 text-white px-8 py-2 rounded-lg hover:bg-red-700 font-medium flex items-center gap-2"
                  >
                    <Send size={16} />
                    Submit Request
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enhanced Stats Cards with Real-time Metrics */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-red-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-red-100 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="flex items-center justify-between relative">
              <div>
                <p className="text-sm font-medium text-red-600">Active Emergencies</p>
                <p className="text-3xl font-bold text-gray-900">{requests.filter(r => r.status === 'pending').length}</p>
              </div>
              <AlertTriangle className="h-12 w-12 text-red-500" />
            </div>
            <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
              <TrendingUp size={12} />
              Avg response: {performanceMetrics.averageResponseTime}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="flex items-center justify-between relative">
              <div>
                <p className="text-sm font-medium text-blue-600">People Affected</p>
                <p className="text-3xl font-bold text-gray-900">{requests.reduce((sum, r) => sum + r.victims, 0)}</p>
              </div>
              <Users className="h-12 w-12 text-blue-500" />
            </div>
            <p className="text-xs text-blue-500 mt-2">Across {requests.length} locations</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-100 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="flex items-center justify-between relative">
              <div>
                <p className="text-sm font-medium text-green-600">Active Volunteers</p>
                <p className="text-3xl font-bold text-gray-900">{performanceMetrics.activeVolunteers}</p>
              </div>
              <Heart className="h-12 w-12 text-green-500" />
            </div>
            <p className="text-xs text-green-500 mt-2">{volunteers.filter(v => v.status === 'deployed').length} deployed</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-100 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="flex items-center justify-between relative">
              <div>
                <p className="text-sm font-medium text-purple-600">Resources Ready</p>
                <p className="text-3xl font-bold text-gray-900">{resources.reduce((sum, r) => sum + r.available, 0)}</p>
              </div>
              <Package className="h-12 w-12 text-purple-500" />
            </div>
            <p className="text-xs text-purple-500 mt-2">{performanceMetrics.totalResourcesDeployed} deployed</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-orange-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-100 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="flex items-center justify-between relative">
              <div>
                <p className="text-sm font-medium text-orange-600">Success Rate</p>
                <p className="text-3xl font-bold text-gray-900">{performanceMetrics.completionRate}</p>
              </div>
              <Activity className="h-12 w-12 text-orange-500" />
            </div>
            <p className="text-xs text-orange-500 mt-2">Last 24 hours</p>
          </div>
        </div>

        {/* Main Content with Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'overview' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'analytics' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Analytics
            </button>
            <button 
              onClick={() => setActiveTab('volunteers')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'volunteers' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Volunteers
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Enhanced Map Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Navigation className="text-blue-500" />
                    Live Relief Map
                  </h2>
                  <div className="flex gap-2">
                    <select 
                      value={selectedFilter} 
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Requests</option>
                      <option value="food">Food</option>
                      <option value="medical">Medical</option>
                      <option value="water">Water</option>
                      <option value="shelter">Shelter</option>
                    </select>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm flex items-center gap-2">
                      <Zap size={14} />
                      Auto-Route
                    </button>
                  </div>
                </div>
                
                <div className="h-96 rounded-lg overflow-hidden border border-gray-200 shadow-inner">
                  <MapContainer 
                    center={[28.6139, 77.2090]} 
                    zoom={11} 
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    
                    {/* Request Markers with enhanced popups */}
                    {filteredRequests.map(request => (
                      <Marker key={request.id} position={[request.lat, request.lng]}>
                        <Popup maxWidth={300}>
                          <div className="p-3">
                            <h3 className="font-bold capitalize text-lg flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: getPriorityColor(request.priority) }}
                              ></div>
                              {request.type} Request
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">{request.area}</p>
                            <p className="text-sm mb-2">{request.description}</p>
                            <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                              <p><strong>Victims:</strong> {request.victims}</p>
                              <p><strong>Reporter:</strong> {request.reportedBy}</p>
                              <p><strong>Contact:</strong> {request.contact}</p>
                              <p><strong>ETA:</strong> {request.estimatedResponse}</p>
                            </div>
                            <div className="flex justify-between items-center mt-3">
                              <span 
                                className="px-2 py-1 rounded text-white text-xs font-medium"
                                style={{ backgroundColor: getStatusColor(request.status) }}
                              >
                                {request.status}
                              </span>
                              <div className="flex gap-1">
                                {request.assignedVolunteer ? (
                                  <button
                                    onClick={() => markRequestComplete(request.id)}
                                    className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700"
                                  >
                                    <CheckCircle size={12} />
                                  </button>
                                ) : (
                                  <select
                                    onChange={(e) => e.target.value && assignVolunteer(request.id, parseInt(e.target.value))}
                                    className="text-xs border rounded px-1 py-1"
                                    defaultValue=""
                                  >
                                    <option value="">Assign</option>
                                    {volunteers.filter(v => v.status === 'available').map(v => (
                                      <option key={v.id} value={v.id}>{v.name}</option>
                                    ))}
                                  </select>
                                )}
                                <button className="text-blue-600 hover:text-blue-800 p-1">
                                  <Phone size={12} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                    
                    {/* Enhanced Volunteer Markers */}
                    {volunteers.map(volunteer => (
                      <Marker key={volunteer.id} position={[volunteer.lat, volunteer.lng]}>
                        <Popup>
                          <div className="p-3">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                              <User className="text-blue-500" size={16} />
                              {volunteer.name}
                            </h3>
                            <p className="text-sm mb-1"><strong>Skills:</strong> {volunteer.skills.join(', ')}</p>
                            <p className="text-sm mb-1"><strong>Contact:</strong> {volunteer.contact}</p>
                            <p className="text-sm mb-1"><strong>Rating:</strong> 
                              <span className="flex items-center gap-1 ml-1">
                                <Star className="text-yellow-500 fill-current" size={12} />
                                {volunteer.rating}
                              </span>
                            </p>
                            <p className="text-sm mb-2"><strong>Missions:</strong> {volunteer.completedMissions}</p>
                            <span className={`px-2 py-1 rounded text-white text-xs ${
                              volunteer.status === 'available' ? 'bg-green-500' : 'bg-orange-500'
                            }`}>
                              {volunteer.status}
                            </span>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
                
                {/* Enhanced Map Legend */}
                <div className="mt-4 bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Map Legend</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
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
                      <span>Low Priority / Volunteers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Right Sidebar */}
            <div className="space-y-6">
              {/* Priority Requests with Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="text-red-500" size={20} />
                  Priority Requests
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {requests
                    .filter(r => r.priority === 'critical' || r.priority === 'high')
                    .slice(0, 5)
                    .map(request => (
                      <div key={request.id} className="border border-red-100 rounded-lg p-4 bg-red-50">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full animate-pulse"
                              style={{ backgroundColor: getPriorityColor(request.priority) }}
                            ></div>
                            <span className="font-medium capitalize">{request.type}</span>
                            <span className="text-xs bg-white px-2 py-1 rounded">{request.priority}</span>
                          </div>
                          <span className="text-xs text-gray-500">{request.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-1">{request.area}</p>
                        <p className="text-xs text-gray-600 mb-2">{request.description}</p>
                        <p className="text-sm font-medium text-red-700">{request.victims} people affected</p>
                        <div className="flex justify-between items-center mt-3">
                          <span 
                            className="text-xs px-2 py-1 rounded text-white"
                            style={{ backgroundColor: getStatusColor(request.status) }}
                          >
                            {request.status}
                          </span>
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:text-blue-800 bg-white p-1 rounded shadow">
                              <Phone size={14} />
                            </button>
                            <button className="text-green-600 hover:text-green-800 bg-white p-1 rounded shadow">
                              <MessageCircle size={14} />
                            </button>
                            <button className="text-purple-600 hover:text-purple-800 bg-white p-1 rounded shadow">
                              <Navigation size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Real-time Performance Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Real-time Activity</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={realTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="requests" stroke="#ef4444" strokeWidth={2} />
                      <Line type="monotone" dataKey="resolved" stroke="#16a34a" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Enhanced Resource Status */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="text-purple-500" size={20} />
                  Resource Status
                </h3>
                <div className="space-y-4">
                  {resources.map((resource, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{resource.type}</span>
                        <span className="text-xs text-gray-500">{resource.lastUpdated}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-green-600">Available: {resource.available}</span>
                        <span className="text-orange-600">Deployed: {resource.deployed}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300" 
                          style={{ 
                            width: `${(resource.available / (resource.available + resource.deployed)) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600">{resource.location}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Request Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Priority Breakdown</h3>
              <div className="h-64">
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
          </div>
        )}

        {activeTab === 'volunteers' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Volunteer Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {volunteers.map(volunteer => (
                <div key={volunteer.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold">{volunteer.name}</h4>
                      <p className="text-sm text-gray-600">{volunteer.contact}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm"><strong>Skills:</strong> {volunteer.skills.join(', ')}</p>
                    <p className="text-sm flex items-center gap-1">
                      <strong>Rating:</strong> 
                      <Star className="text-yellow-500 fill-current" size={14} />
                      {volunteer.rating}
                    </p>
                    <p className="text-sm"><strong>Missions:</strong> {volunteer.completedMissions}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      volunteer.status === 'available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {volunteer.status}
                    </span>
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Phone size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <MessageCircle size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Bottom Section - Comprehensive Activity Table */}
        <div className="mt-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Recent Activity & Operations</h3>
              <div className="flex gap-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                  Export Data
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm">
                  Generate Report
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">ID</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Location</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Type</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Priority</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Victims</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Reporter</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Assigned</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Time</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {requests.slice(0, 10).map(request => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-xs">#{request.id}</td>
                      <td className="px-4 py-3">{request.area}</td>
                      <td className="px-4 py-3">
                        <span className="capitalize font-medium">{request.type}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span 
                          className="px-2 py-1 rounded text-white text-xs font-medium"
                          style={{ backgroundColor: getPriorityColor(request.priority) }}
                        >
                          {request.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-bold">{request.victims}</td>
                      <td className="px-4 py-3 text-gray-600">{request.reportedBy}</td>
                      <td className="px-4 py-3">
                        <span 
                          className="px-2 py-1 rounded text-white text-xs font-medium"
                          style={{ backgroundColor: getStatusColor(request.status) }}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-xs">
                        {request.assignedVolunteer || 'Unassigned'}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{request.timestamp}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded">
                            <MapPin size={14} />
                          </button>
                          <button className="text-green-600 hover:text-green-800 p-1 hover:bg-green-50 rounded">
                            <Phone size={14} />
                          </button>
                          <button className="text-purple-600 hover:text-purple-800 p-1 hover:bg-purple-50 rounded">
                            <Truck size={14} />
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

export default Dash;
