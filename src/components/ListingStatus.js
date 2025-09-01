// components/ListingStatus.js
import React from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const ListingStatus = ({ status, submittedAt, reviewNotes = null }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'pending_approval':
        return {
          icon: Clock,
          color: 'text-amber-600',
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          title: 'Under Review',
          description: 'Your listing is being reviewed by our team'
        };
      case 'approved':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bg: 'bg-green-50',
          border: 'border-green-200',
          title: 'Approved',
          description: 'Your listing is now live and visible to renters'
        };
      case 'rejected':
        return {
          icon: XCircle,
          color: 'text-red-600',
          bg: 'bg-red-50',
          border: 'border-red-200',
          title: 'Needs Changes',
          description: 'Please review the feedback and resubmit'
        };
      case 'changes_requested':
        return {
          icon: AlertCircle,
          color: 'text-orange-600',
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          title: 'Changes Requested',
          description: 'Minor updates needed before approval'
        };
      default:
        return {
          icon: Clock,
          color: 'text-slate-600',
          bg: 'bg-slate-50',
          border: 'border-slate-200',
          title: 'Processing',
          description: 'Please wait while we process your submission'
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <div className={`${config.bg} ${config.border} border rounded-xl p-6`}>
      <div className="flex items-start space-x-4">
        <div className={`w-10 h-10 ${config.bg} rounded-full flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${config.color}`} />
        </div>
        
        <div className="flex-1">
          <h4 className={`font-semibold ${config.color} mb-1`}>{config.title}</h4>
          <p className="text-slate-600 text-sm mb-2">{config.description}</p>
          
          {submittedAt && (
            <p className="text-slate-500 text-xs">
              Submitted {new Date(submittedAt).toLocaleString()}
            </p>
          )}
          
          {reviewNotes && (
            <div className="mt-4 p-4 bg-white rounded-lg border border-slate-200">
              <h5 className="font-medium text-slate-900 mb-2">Review Notes:</h5>
              <p className="text-sm text-slate-600">{reviewNotes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingStatus;