import { useState } from 'react';
import { Search, UserPlus, Edit, Trash2, Mail, Ban, CheckCircle, X, Eye } from 'lucide-react';
import { ConfirmDialog } from './ConfirmDialog';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  posts: number;
  joined: string;
  avatar: string;
  bio?: string;
};

const initialUsers: User[] = [
  { id: 1, name: 'Priya Sharma', email: 'priya@example.com', role: 'Author', status: 'Active', posts: 24, joined: 'Jan 15, 2025', avatar: 'PS', bio: 'Senior tech reporter with 5 years experience.' },
  { id: 2, name: 'Rajesh Thapa', email: 'rajesh@example.com', role: 'Author', status: 'Active', posts: 18, joined: 'Feb 3, 2025', avatar: 'RT' },
  { id: 3, name: 'Maya Gurung', email: 'maya@example.com', role: 'Author', status: 'Active', posts: 21, joined: 'Mar 12, 2025', avatar: 'MG' },
  { id: 4, name: 'Suman Karki', email: 'suman@example.com', role: 'Editor', status: 'Active', posts: 32, joined: 'Dec 8, 2024', avatar: 'SK' },
  { id: 5, name: 'Anjali Rai', email: 'anjali@example.com', role: 'Author', status: 'Active', posts: 15, joined: 'Mar 28, 2025', avatar: 'AR' },
  { id: 6, name: 'Deepak Basnet', email: 'deepak@example.com', role: 'Subscriber', status: 'Active', posts: 0, joined: 'Apr 1, 2026', avatar: 'DB' },
  { id: 7, name: 'Kavita Magar', email: 'kavita@example.com', role: 'Author', status: 'Suspended', posts: 8, joined: 'Jan 20, 2025', avatar: 'KM' },
  { id: 8, name: 'Ramesh Shrestha', email: 'ramesh@example.com', role: 'Admin', status: 'Active', posts: 45, joined: 'Oct 5, 2024', avatar: 'RS' },
];

const ROLES = ['Admin', 'Editor', 'Author', 'Subscriber'];

export function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [filterRole, setFilterRole] = useState('All Roles');
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [searchQuery, setSearchQuery] = useState('');
  const [editUser, setEditUser] = useState<User | null>(null);
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [emailModal, setEmailModal] = useState<User | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Author', password: '' });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = filterRole === 'All Roles' || u.role === filterRole;
    const matchStatus = filterStatus === 'All Status' || u.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  });

  const toggleSuspend = (user: User) => {
    const newStatus = user.status === 'Active' ? 'Suspended' : 'Active';
    setUsers(users.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
    showToast(`${user.name} ${newStatus === 'Active' ? 'reactivated' : 'suspended'}`);
  };

  const handleDeleteUser = (user: User) => {
    setUsers(users.filter(u => u.id !== user.id));
    setDeleteUser(null);
    showToast(`${user.name} deleted`);
  };

  const handleSaveEdit = () => {
    if (!editUser) return;
    setUsers(users.map(u => u.id === editUser.id ? editUser : u));
    setEditUser(null);
    showToast('User updated successfully');
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;
    const u: User = {
      id: Date.now(), name: newUser.name, email: newUser.email, role: newUser.role,
      status: 'Active', posts: 0, joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      avatar: newUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
    };
    setUsers([u, ...users]);
    setShowAddUser(false);
    setNewUser({ name: '', email: '', role: 'Author', password: '' });
    showToast(`${newUser.name} added successfully`);
  };

  const roleColor = (role: string) => {
    if (role === 'Admin') return 'bg-purple-100 text-purple-700';
    if (role === 'Editor') return 'bg-blue-100 text-blue-700';
    if (role === 'Author') return 'bg-green-100 text-green-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {toast && <div className="fixed bottom-6 right-6 bg-black text-white px-5 py-3 text-sm font-medium z-50 shadow-xl">{toast}</div>}

      {/* Delete Confirm */}
      {deleteUser && (
        <ConfirmDialog
          title="Delete User"
          message={`Are you sure you want to permanently delete ${deleteUser.name}? All their content will remain but their account will be removed.`}
          confirmLabel="Delete User"
          danger
          onConfirm={() => handleDeleteUser(deleteUser)}
          onCancel={() => setDeleteUser(null)}
        />
      )}

      {/* View User Modal */}
      {viewUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-black text-xl" style={{ fontFamily: 'Merriweather, serif' }}>User Profile</h2>
              <button onClick={() => setViewUser(null)} className="p-2 hover:bg-gray-100 rounded"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold">{viewUser.avatar}</div>
                <div>
                  <div className="text-xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>{viewUser.name}</div>
                  <div className="text-sm text-gray-500">{viewUser.email}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  { label: 'Role', value: <span className={`px-2 py-0.5 text-xs rounded font-medium ${roleColor(viewUser.role)}`}>{viewUser.role}</span> },
                  { label: 'Status', value: <span className={`px-2 py-0.5 text-xs rounded-full font-semibold ${viewUser.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{viewUser.status}</span> },
                  { label: 'Posts', value: <span className="font-bold">{viewUser.posts}</span> },
                  { label: 'Joined', value: viewUser.joined },
                ].map(({ label, value }) => (
                  <div key={label} className="p-3 bg-gray-50">
                    <div className="text-xs text-gray-500 mb-1">{label}</div>
                    <div>{value}</div>
                  </div>
                ))}
              </div>
              {viewUser.bio && <div className="mt-4 p-3 bg-gray-50 text-sm text-gray-600">{viewUser.bio}</div>}
            </div>
            <div className="p-6 border-t border-border flex gap-3">
              <button onClick={() => { setViewUser(null); setEditUser(viewUser); }} className="flex-1 px-4 py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors">Edit User</button>
              <button onClick={() => { setViewUser(null); setEmailModal(viewUser); }} className="flex-1 px-4 py-2.5 border border-border text-sm font-medium hover:bg-gray-50 transition-colors">Send Email</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-black text-xl" style={{ fontFamily: 'Merriweather, serif' }}>Edit User</h2>
              <button onClick={() => setEditUser(null)} className="p-2 hover:bg-gray-100 rounded"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: 'Full Name', key: 'name', type: 'text' },
                { label: 'Email', key: 'email', type: 'email' },
                { label: 'Bio', key: 'bio', type: 'textarea' },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="block text-sm font-medium mb-1">{label}</label>
                  {type === 'textarea' ? (
                    <textarea
                      value={(editUser as any)[key] || ''}
                      onChange={e => setEditUser({ ...editUser, [key]: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-border focus:outline-none focus:border-black text-sm resize-none"
                    />
                  ) : (
                    <input type={type} value={(editUser as any)[key] || ''} onChange={e => setEditUser({ ...editUser, [key]: e.target.value })} className="w-full px-3 py-2 border border-border focus:outline-none focus:border-black text-sm" />
                  )}
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select value={editUser.role} onChange={e => setEditUser({ ...editUser, role: e.target.value })} className="w-full px-3 py-2 border border-border focus:outline-none focus:border-black text-sm">
                  {ROLES.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-border flex gap-3">
              <button onClick={() => setEditUser(null)} className="flex-1 px-4 py-2.5 border border-border text-sm font-medium hover:bg-gray-50">Cancel</button>
              <button onClick={handleSaveEdit} className="flex-1 px-4 py-2.5 bg-black text-white text-sm font-semibold hover:bg-gray-800">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {emailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-black text-xl" style={{ fontFamily: 'Merriweather, serif' }}>Email {emailModal.name}</h2>
              <button onClick={() => setEmailModal(null)} className="p-2 hover:bg-gray-100 rounded"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">To</label>
                <input type="text" value={emailModal.email} readOnly className="w-full px-3 py-2 border border-border bg-gray-50 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <input type="text" placeholder="Email subject..." className="w-full px-3 py-2 border border-border focus:outline-none focus:border-black text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea rows={5} placeholder="Write your message..." className="w-full px-3 py-2 border border-border focus:outline-none focus:border-black text-sm resize-none" />
              </div>
            </div>
            <div className="p-6 border-t border-border flex gap-3">
              <button onClick={() => setEmailModal(null)} className="flex-1 px-4 py-2.5 border border-border text-sm font-medium hover:bg-gray-50">Cancel</button>
              <button onClick={() => { setEmailModal(null); showToast(`Email sent to ${emailModal.name}`); }} className="flex-1 px-4 py-2.5 bg-black text-white text-sm font-semibold hover:bg-gray-800">Send Email</button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-black text-xl" style={{ fontFamily: 'Merriweather, serif' }}>Add New User</h2>
              <button onClick={() => setShowAddUser(false)} className="p-2 hover:bg-gray-100 rounded"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: 'Full Name *', key: 'name', type: 'text', placeholder: 'e.g., Priya Sharma' },
                { label: 'Email *', key: 'email', type: 'email', placeholder: 'priya@example.com' },
                { label: 'Password', key: 'password', type: 'password', placeholder: 'Temporary password' },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-medium mb-1">{label}</label>
                  <input type={type} value={(newUser as any)[key]} onChange={e => setNewUser({ ...newUser, [key]: e.target.value })} placeholder={placeholder} className="w-full px-3 py-2 border border-border focus:outline-none focus:border-black text-sm" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })} className="w-full px-3 py-2 border border-border focus:outline-none focus:border-black text-sm">
                  {ROLES.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-border flex gap-3">
              <button onClick={() => setShowAddUser(false)} className="flex-1 px-4 py-2.5 border border-border text-sm font-medium hover:bg-gray-50">Cancel</button>
              <button onClick={handleAddUser} disabled={!newUser.name || !newUser.email} className="flex-1 px-4 py-2.5 bg-black text-white text-sm font-semibold hover:bg-gray-800 disabled:opacity-50">Add User</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black mb-1" style={{ fontFamily: 'Merriweather, serif' }}>Users</h1>
            <p className="text-gray-600">Manage users and permissions</p>
          </div>
          <button onClick={() => setShowAddUser(true)} className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors font-semibold">
            <UserPlus className="w-5 h-5" />Add User
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search users..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-border focus:outline-none focus:border-black" />
          </div>
          <select value={filterRole} onChange={e => setFilterRole(e.target.value)} className="px-4 py-3 border border-border focus:outline-none focus:border-black">
            <option>All Roles</option>{ROLES.map(r => <option key={r}>{r}</option>)}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-4 py-3 border border-border focus:outline-none focus:border-black">
            <option>All Status</option><option>Active</option><option>Suspended</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Users', value: users.length },
          { label: 'Active', value: users.filter(u => u.status === 'Active').length, color: 'text-green-600' },
          { label: 'Authors', value: users.filter(u => u.role === 'Author').length },
          { label: 'New This Month', value: 247 },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white border border-border p-6">
            <div className="text-sm text-gray-600 mb-2">{label}</div>
            <div className={`text-3xl font-black ${color || ''}`} style={{ fontFamily: 'Merriweather, serif' }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-border">
        <table className="w-full">
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
            {filtered.length === 0 ? (
              <tr><td colSpan={7} className="px-6 py-16 text-center text-gray-400"><div className="text-4xl mb-3">👤</div><div className="font-medium">No users found</div></td></tr>
            ) : filtered.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold">{user.avatar}</div>
                    <div className="font-semibold">{user.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded ${roleColor(user.role)}`}>{user.role}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.posts}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 w-fit ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {user.status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <Ban className="w-3 h-3" />}
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.joined}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <button onClick={() => setViewUser(user)} className="p-2 hover:bg-gray-100 rounded transition-colors" title="View Profile"><Eye className="w-4 h-4 text-gray-600" /></button>
                    <button onClick={() => setEmailModal(user)} className="p-2 hover:bg-gray-100 rounded transition-colors" title="Send Email"><Mail className="w-4 h-4 text-gray-600" /></button>
                    <button onClick={() => setEditUser(user)} className="p-2 hover:bg-gray-100 rounded transition-colors" title="Edit"><Edit className="w-4 h-4 text-gray-600" /></button>
                    <button onClick={() => toggleSuspend(user)} className="p-2 hover:bg-gray-100 rounded transition-colors" title={user.status === 'Active' ? 'Suspend' : 'Reactivate'}>
                      <Ban className={`w-4 h-4 ${user.status === 'Suspended' ? 'text-green-500' : 'text-gray-400'}`} />
                    </button>
                    <button onClick={() => setDeleteUser(user)} className="p-2 hover:bg-red-50 rounded transition-colors" title="Delete"><Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-6 py-4 border-t border-border flex items-center justify-between">
          <div className="text-sm text-gray-600">Showing {filtered.length} of {users.length} users</div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-border hover:bg-gray-50 text-sm font-medium">Previous</button>
            <button className="px-4 py-2 bg-black text-white text-sm font-medium">1</button>
            <button className="px-4 py-2 border border-border hover:bg-gray-50 text-sm font-medium">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
