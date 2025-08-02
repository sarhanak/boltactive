@@ .. @@
 import { supabase, type Donation, type ContactMessage } from '../lib/supabase';
 import { DollarSign, Mail, Users, TrendingUp, Eye, CheckCircle } from 'lucide-react';
+import LoadingSpinner from './LoadingSpinner';

 const AdminDashboard = () => {
 }
@@ .. @@
   if (loading) {
     return (
       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
-        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
+        <LoadingSpinner size="lg" />
       </div>
     );
   }