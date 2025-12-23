import React from 'react';
import { User, Mail, Calendar, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const UserProfile: React.FC = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
        <button
          onClick={handleSignOut}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <User className="h-5 w-5 text-gray-400 mr-3" />
          <div>
            <p className="text-sm font-medium text-gray-900">User ID</p>
            <p className="text-sm text-gray-600">{user.id}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Mail className="h-5 w-5 text-gray-400 mr-3" />
          <div>
            <p className="text-sm font-medium text-gray-900">Email</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-gray-400 mr-3" />
          <div>
            <p className="text-sm font-medium text-gray-900">Member since</p>
            <p className="text-sm text-gray-600">
              {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full mr-2 ${
              user.email_confirmed_at ? 'bg-green-500' : 'bg-yellow-500'
            }`} />
            <p className="text-sm text-gray-600">
              Email {user.email_confirmed_at ? 'verified' : 'not verified'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;