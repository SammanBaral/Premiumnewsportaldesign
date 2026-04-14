import { useState } from 'react';
import { Search, Filter, UserPlus, Edit, Trash2, Mail, Ban, CheckCircle } from 'lucide-react';

const users = [
  { id: 1, name: 'Priya Sharma', email: 'priya@example.com', role: 'Author', status: 'Active', posts: 24, joined: 'Jan 15, 2025', avatar: 'PS' },
  { id: 2, name: 'Rajesh Thapa', email: 'rajesh@example.com', role: 'Author', status: 'Active', posts: 18, joined: 'Feb 3, 2025', avatar: 'RT' },
  { id: 3, name: 'Maya Gurung', email: 'maya@example.com', role: 'Author', status: 'Active', posts: 21, joined: 'Mar 12, 2025', avatar: 'MG' },
  { id: 4, name: 'Suman Karki', email: 'suman@example.com', role: 'Editor', status: 'Active', posts: 32, joined: 'Dec 8, 2024', avatar: 'SK' },
  { id: 5, name: 'Anjali Rai', email: 'anjali@example.com', role: 'Author', status: 'Active', posts: 15, joined: 'Mar 28, 2025', avatar: 'AR' },
  { id: 6, name: 'Deepak Basnet', email: 'deepak@example.com', role: 'Subscriber', status: 'Active', posts: 0, joined: 'Apr 1, 2026', avatar: 'DB' },
  { id: 7, name: 'Kavita Magar', email: 'kavita@example.com', role: 'Author', status: 'Suspended', posts: 8, joined: 'Jan 20, 2025', avatar: 'KM' },
  { id: 8, name: 'Ramesh Shrestha', email: 'ramesh@example.com', role: 'Admin', status: 'Active', posts: 45, joined: 'Oct 5, 2024', avatar: 'RS' },
];

export function UsersPage() {
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black mb-1" style={{ fontFamily: 'Merriweather, serif' }}>
              Users
            </h1>
            <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Manage users and permissions
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
            <UserPlus className="w-5 h-5" />
            Add User
          </button>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-3 border border-border focus:outline-none focus:border-black"
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-3 border border-border focus:outline-none focus:border-black"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <option>All Roles</option>
            <option>Admin</option>
            <option>Editor</option>
            <option>Author</option>
            <option>Subscriber</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-border focus:outline-none focus:border-black"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Suspended</option>
            <option>Pending</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-border p-6">
          <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Total Users</div>
          <div className="text-3xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
            {users.length.toLocaleString()}
          </div>
        </div>
        <div className="bg-white border border-border p-6">
          <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Active Users</div>
          <div className="text-3xl font-black text-green-600" style={{ fontFamily: 'Merriweather, serif' }}>
            {users.filter(u => u.status === 'Active').length}
          </div>
        </div>
        <div className="bg-white border border-border p-6">
          <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Authors</div>
          <div className="text-3xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
            {users.filter(u => u.role === 'Author').length}
          </div>
        </div>
        <div className="bg-white border border-border p-6">
          <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>New This Month</div>
          <div className="text-3xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
            247
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-border">
        <table className="w-full" style={{ fontFamily: 'Inter, sans-serif' }}>
          <thead className="bg-gray-50 border-b border-border">
            <tr>
              <th className="text-left px-6 py-4 font-semibold text-sm">User</th>
              <th className="text-left px-6 py-4 font-semibold text-sm">Email</th>
              <th className="text-left px-6 py-4 font-semibold text-sm">Role</th>
              <th className="text-left px-6 py-4 font-semibold text-sm">Posts</th>
              <th className="text-left px-6 py-4 font-semibold text-sm">Status</th>
              <th className="text-left px-6 py-4 font-semibold text-sm">Joined</th>
              <th className="text-left px-6 py-4 font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold">
                      {user.avatar}
                    </div>
                    <div className="font-semibold">{user.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium ${
                      user.role === 'Admin'
                        ? 'bg-purple-100 text-purple-700'
                        : user.role === 'Editor'
                        ? 'bg-blue-100 text-blue-700'
                        : user.role === 'Author'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.posts}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 w-fit ${
                      user.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {user.status === 'Active' ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <Ban className="w-3 h-3" />
                    )}
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.joined}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Email">
                      <Mail className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Edit">
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing 1 to 8 of 45,892 users
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-border hover:bg-gray-50 transition-colors text-sm font-medium">
              Previous
            </button>
            <button className="px-4 py-2 bg-black text-white text-sm font-medium">
              1
            </button>
            <button className="px-4 py-2 border border-border hover:bg-gray-50 transition-colors text-sm font-medium">
              2
            </button>
            <button className="px-4 py-2 border border-border hover:bg-gray-50 transition-colors text-sm font-medium">
              3
            </button>
            <button className="px-4 py-2 border border-border hover:bg-gray-50 transition-colors text-sm font-medium">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
