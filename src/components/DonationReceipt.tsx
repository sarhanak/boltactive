import React from 'react';
import { Download, Mail, CheckCircle } from 'lucide-react';
import { Donation } from '../lib/supabase';

interface DonationReceiptProps {
  donation: Donation;
  onClose: () => void;
}

const DonationReceipt: React.FC<DonationReceiptProps> = ({ donation, onClose }) => {
  const downloadReceipt = () => {
    const receiptContent = `
      DONATION RECEIPT
      
      Active For You Charitable Trust
      Shikari Faliyu, Godhra Bhagol,
      Tal.: Santrampur, Mahisagar 389260
      
      Receipt No: ${donation.id}
      Date: ${new Date(donation.created_at).toLocaleDateString()}
      
      Donor Details:
      Name: ${donation.name}
      Email: ${donation.email}
      Phone: ${donation.phone || 'N/A'}
      
      Donation Amount: ₹${donation.amount}
      Payment Status: ${donation.payment_status}
      
      Thank you for your generous contribution!
      This donation is eligible for tax deduction under Section 80G.
    `;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `donation-receipt-${donation.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="text-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">Donation Receipt</h2>
        </div>

        <div className="space-y-4 mb-6">
          <div className="border-b pb-2">
            <p className="text-sm text-gray-600">Receipt No:</p>
            <p className="font-semibold">{donation.id.slice(0, 8)}</p>
          </div>
          
          <div className="border-b pb-2">
            <p className="text-sm text-gray-600">Date:</p>
            <p className="font-semibold">{new Date(donation.created_at).toLocaleDateString()}</p>
          </div>
          
          <div className="border-b pb-2">
            <p className="text-sm text-gray-600">Amount:</p>
            <p className="font-semibold text-lg text-green-600">₹{donation.amount}</p>
          </div>
          
          <div className="border-b pb-2">
            <p className="text-sm text-gray-600">Status:</p>
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              {donation.payment_status}
            </span>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={downloadReceipt}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </button>
          
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors duration-200"
          >
            Close
          </button>
        </div>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          This donation is eligible for tax deduction under Section 80G
        </p>
      </div>
    </div>
  );
};

export default DonationReceipt;