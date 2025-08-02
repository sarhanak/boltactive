@@ .. @@
 import { Send, CheckCircle, AlertCircle } from 'lucide-react';
 import { useContact } from '../hooks/useContact';
+import LoadingSpinner from './LoadingSpinner';

 const ContactForm = () => {
@@ .. @@
           ) : (
             <>
-              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
+              <LoadingSpinner size="sm" color="border-white" />
             </>
           ) : (