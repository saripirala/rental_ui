// components/OwnerProfile.js
import React from 'react';
import { Star, Shield, Calendar, MessageCircle, MapPin } from 'lucide-react';

const OwnerProfile = ({ owner, onMessageOwner }) => {
  const defaultOwner = {
    full_name: "Premium Host",
    avatar: null,
    rating: 4.9,
    review_count: 127,
    joined_date: "2024-01-15",
    verified: true,
    response_rate: 98,
    response_time: "within an hour",
    location: "New York, NY",
    bio: "Passionate about fashion and sustainability. I love sharing my curated collection of designer pieces with fellow fashion enthusiasts."
  };

  const ownerData = { ...defaultOwner, ...owner };
  const joinedYear = new Date(ownerData.joined_date).getFullYear();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-r from-slate-400 to-slate-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {ownerData.avatar ? (
              <img src={ownerData.avatar} alt={ownerData.full_name} className="w-full h-full rounded-full object-cover" />
            ) : (
              ownerData.full_name?.charAt(0) || 'H'
            )}
          </div>
          {ownerData.verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <Shield className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-xl font-semibold text-slate-900">{ownerData.full_name}</h3>
            {ownerData.verified && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                Verified
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-slate-600 mb-2">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-slate-400 text-slate-400" />
              <span className="font-medium">{ownerData.rating}</span>
              <span>({ownerData.review_count} reviews)</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Joined {joinedYear}</span>
            </div>
          </div>

          <div className="flex items-center space-x-1 text-sm text-slate-500 mb-3">
            <MapPin className="w-4 h-4" />
            <span>{ownerData.location}</span>
          </div>
        </div>
      </div>

      {/* Owner Stats */}
      <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-100">
        <div className="text-center">
          <div className="text-lg font-semibold text-slate-900">{ownerData.response_rate}%</div>
          <div className="text-xs text-slate-500">Response rate</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-slate-900">{ownerData.response_time}</div>
          <div className="text-xs text-slate-500">Response time</div>
        </div>
      </div>

      {/* Bio */}
      {ownerData.bio && (
        <div className="pt-4 border-t border-slate-100">
          <p className="text-slate-600 leading-relaxed">{ownerData.bio}</p>
        </div>
      )}

      {/* Contact Button */}
      <button
        onClick={onMessageOwner}
        className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
      >
        <MessageCircle size={18} />
        <span>Contact Host</span>
      </button>
    </div>
  );
};

export default OwnerProfile;