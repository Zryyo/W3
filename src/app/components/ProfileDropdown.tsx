import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { User, Settings, Bell, HelpCircle, LogOut, ChevronDown, Shield } from 'lucide-react';

interface ProfileDropdownProps {
  userType: 'individual' | 'advisor';
}

export function ProfileDropdown({ userType }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleLogout = () => {
    setIsOpen(false);
    navigate('/');
  };

  // Profile data based on user type
  const profileData = userType === 'individual' 
    ? {
        name: 'Alex Johnson',
        email: 'user@financialwallet.com',
        initials: 'AJ',
        role: 'Premium Member',
        bgColor: 'bg-blue-500',
        icon: User,
      }
    : {
        name: 'Sarah Martinez',
        email: 'advisor@financialwallet.com',
        initials: 'SM',
        role: 'Financial Advisor',
        bgColor: 'bg-purple-500',
        icon: Shield,
      };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 rounded-lg transition-all"
      >
        {/* Avatar */}
        <div className={`w-8 h-8 ${profileData.bgColor} rounded-full flex items-center justify-center text-white text-sm font-semibold`}>
          {profileData.initials}
        </div>
        
        {/* Name (hidden on mobile) */}
        <span className="hidden sm:inline text-sm text-white font-medium">{profileData.name.split(' ')[0]}</span>
        
        {/* Chevron */}
        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl overflow-hidden z-50">
          {/* Profile Header */}
          <div className="p-4 border-b border-zinc-800 bg-zinc-800/30">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${profileData.bgColor} rounded-full flex items-center justify-center text-white font-semibold`}>
                {profileData.initials}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-white truncate">{profileData.name}</h4>
                <p className="text-xs text-zinc-400 truncate">{profileData.email}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <profileData.icon className="w-3 h-3 text-zinc-500" />
                  <span className="text-xs text-zinc-500">{profileData.role}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {/* Account Settings */}
            <button
              onClick={() => {
                setIsOpen(false);
                console.log('Account settings clicked');
              }}
              className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-zinc-800/50 transition-colors text-left"
            >
              <div className="w-9 h-9 bg-zinc-800 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-zinc-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white">Account Settings</div>
                <div className="text-xs text-zinc-500">Manage your profile</div>
              </div>
            </button>

            {/* Preferences */}
            <button
              onClick={() => {
                setIsOpen(false);
                console.log('Preferences clicked');
              }}
              className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-zinc-800/50 transition-colors text-left"
            >
              <div className="w-9 h-9 bg-zinc-800 rounded-lg flex items-center justify-center">
                <Settings className="w-4 h-4 text-zinc-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white">Preferences</div>
                <div className="text-xs text-zinc-500">Customize your experience</div>
              </div>
            </button>

            {/* Notifications */}
            <button
              onClick={() => {
                setIsOpen(false);
                console.log('Notifications clicked');
              }}
              className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-zinc-800/50 transition-colors text-left"
            >
              <div className="w-9 h-9 bg-zinc-800 rounded-lg flex items-center justify-center relative">
                <Bell className="w-4 h-4 text-zinc-400" />
                {/* Notification badge */}
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white">Notifications</div>
                <div className="text-xs text-zinc-500">Manage alerts</div>
              </div>
            </button>

            {/* Help & Support */}
            <button
              onClick={() => {
                setIsOpen(false);
                console.log('Help & Support clicked');
              }}
              className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-zinc-800/50 transition-colors text-left"
            >
              <div className="w-9 h-9 bg-zinc-800 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-4 h-4 text-zinc-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white">Help & Support</div>
                <div className="text-xs text-zinc-500">Get assistance</div>
              </div>
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-zinc-800"></div>

          {/* Logout */}
          <div className="py-2">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-red-500/10 transition-colors text-left group"
            >
              <div className="w-9 h-9 bg-zinc-800 group-hover:bg-red-500/20 rounded-lg flex items-center justify-center transition-colors">
                <LogOut className="w-4 h-4 text-zinc-400 group-hover:text-red-400 transition-colors" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white group-hover:text-red-400 transition-colors">Log Out</div>
                <div className="text-xs text-zinc-500">Return to login page</div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
