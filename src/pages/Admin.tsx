@@ .. @@
 import { supabase } from '../lib/supabase';
 import { Lock, LogIn } from 'lucide-react';
 import AdminDashboard from '../components/AdminDashboard';
+import LoadingSpinner from '../components/LoadingSpinner';
+import { useAuth } from '../hooks/useAuth';

 const Admin = () => {
-  const [email, setEmail] = useState('');
-  const [password, setPassword] = useState('');
-  const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
-  const [isAuthenticated, setIsAuthenticated] = useState(false);
+  const [email, setEmail] = useState('');
+  const [password, setPassword] = useState('');
+  const [loginLoading, setLoginLoading] = useState(false);
+  
+  const { user, loading, signIn, signOut } = useAuth();

   const handleLogin = async (e: React.FormEvent) => {
     e.preventDefault();
-    setLoading(true);
+    setLoginLoading(true);
     setError(null);

     try {
-      const { error } = await supabase.auth.signInWithPassword({
-        email,
-        password,
-      });
-
+      const { error } = await signIn(email, password);
       if (error) throw error;
-      setIsAuthenticated(true);
     } catch (err) {
       setError(err instanceof Error ? err.message : 'Login failed');
     } finally {
-      setLoading(false);
+      setLoginLoading(false);
     }
   };

   const handleLogout = async () => {
-    await supabase.auth.signOut();
-    setIsAuthenticated(false);
+    await signOut();
     setEmail('');
     setPassword('');
   };

-  if (isAuthenticated) {
+  if (loading) {
+    return (
+      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
+        <LoadingSpinner size="lg" />
+      </div>
+    );
+  }
+
+  if (user) {
     return (
@@ .. @@
           <button
             type="submit"
-            disabled={loading}
+            disabled={loginLoading}
             className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
           >
-            {loading ? (
-              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
+            {loginLoading ? (
+              <LoadingSpinner size="sm" color="border-white" />
             ) : (