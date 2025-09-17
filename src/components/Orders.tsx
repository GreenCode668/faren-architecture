import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Calendar, MapPin, Camera, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '../utils/cn';

interface Order {
  id: string;
  propertyAddress: string;
  orderType: 'photography' | 'virtual_tour' | 'drone' | 'combined';
  status: 'pending' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  scheduledDate?: Date;
  totalCost: number;
  createdAt: Date;
  clientName: string;
  priority: 'standard' | 'rush' | 'urgent';
}

const Orders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);

  // Mock orders data
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-001',
      propertyAddress: '123 Luxury Ave, Beverly Hills, CA',
      orderType: 'combined',
      status: 'scheduled',
      scheduledDate: new Date('2024-01-20'),
      totalCost: 850,
      createdAt: new Date('2024-01-15'),
      clientName: 'Sarah Johnson',
      priority: 'standard',
    },
    {
      id: 'ORD-002',
      propertyAddress: '456 Modern St, West Hollywood, CA',
      orderType: 'photography',
      status: 'completed',
      totalCost: 450,
      createdAt: new Date('2024-01-12'),
      clientName: 'Michael Chen',
      priority: 'rush',
    },
    {
      id: 'ORD-003',
      propertyAddress: '789 Sunset Blvd, Los Angeles, CA',
      orderType: 'virtual_tour',
      status: 'in_progress',
      scheduledDate: new Date('2024-01-18'),
      totalCost: 650,
      createdAt: new Date('2024-01-10'),
      clientName: 'Emily Rodriguez',
      priority: 'urgent',
    },
  ]);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'scheduled':
        return <Calendar className="w-4 h-4 text-amber-600" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-amber-100 text-amber-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: Order['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'border-l-red-500';
      case 'rush':
        return 'border-l-amber-500';
      case 'standard':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  const getOrderTypeIcon = (type: Order['orderType']) => {
    switch (type) {
      case 'photography':
        return <Camera className="w-4 h-4" />;
      case 'virtual_tour':
        return <MapPin className="w-4 h-4" />;
      case 'drone':
        return <Camera className="w-4 h-4" />;
      case 'combined':
        return <Camera className="w-4 h-4" />;
      default:
        return <Camera className="w-4 h-4" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-dark mb-2">Orders Dashboard</h1>
              <p className="text-gray-600">Manage your photography orders and assignments</p>
            </div>
            <motion.button
              onClick={() => setShowNewOrderModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>New Order</span>
            </motion.button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                  <p className="text-2xl font-bold text-dark">{orders.length}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Camera className="w-6 h-6 text-accent" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {orders.filter(o => o.status === 'completed').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">In Progress</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {orders.filter(o => o.status === 'in_progress' || o.status === 'scheduled').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                  <p className="text-2xl font-bold text-dark">
                    ${orders.reduce((sum, order) => sum + order.totalCost, 0).toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-accent">$</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by address, client, or order ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="scheduled">Scheduled</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No orders found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "bg-white rounded-xl p-6 shadow-sm border-l-4 hover:shadow-md transition-all cursor-pointer",
                  getPriorityColor(order.priority)
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="font-mono text-sm text-gray-500">{order.id}</span>
                      <div className={cn(
                        "flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium",
                        getStatusColor(order.status)
                      )}>
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status.replace('_', ' ')}</span>
                      </div>
                      {order.priority !== 'standard' && (
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          order.priority === 'urgent' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                        )}>
                          {order.priority}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-dark mb-2">{order.propertyAddress}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        {getOrderTypeIcon(order.orderType)}
                        <span className="capitalize">{order.orderType.replace('_', ' ')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>Client: {order.clientName}</span>
                      </div>
                      {order.scheduledDate && (
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{order.scheduledDate.toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-dark mb-1">
                      ${order.totalCost.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Created {order.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;