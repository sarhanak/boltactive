@@ .. @@
 import React from 'react';
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
+import { HelmetProvider } from 'react-helmet-async';
 import Navbar from './components/Navbar';
 import Footer from './components/Footer';
+import ErrorBoundary from './components/ErrorBoundary';
 import Home from './pages/Home';
 import AboutUs from './pages/AboutUs';
 import Gallery from './pages/Gallery';
 import Donate from './pages/Donate';
 import Admin from './pages/Admin';

 function App() {
   return (
-    <Router>
-      <div className="min-h-screen bg-white">
-        <Navbar />
-        <main>
-          <Routes>
-            <Route path="/" element={<Home />} />
-            <Route path="/about" element={<AboutUs />} />
-            <Route path="/gallery" element={<Gallery />} />
-            <Route path="/donate" element={<Donate />} />
-            <Route path="/admin" element={<Admin />} />
-          </Routes>
-        </main>
-        <Routes>
-          <Route path="/admin" element={null} />
-          <Route path="*" element={<Footer />} />
-        </Routes>
-      </div>
-    </Router>
+    <HelmetProvider>
+      <ErrorBoundary>
+        <Router>
+          <div className="min-h-screen bg-white">
+            <Navbar />
+            <main>
+              <Routes>
+                <Route path="/" element={<Home />} />
+                <Route path="/about" element={<AboutUs />} />
+                <Route path="/gallery" element={<Gallery />} />
+                <Route path="/donate" element={<Donate />} />
+                <Route path="/admin" element={<Admin />} />
+              </Routes>
+            </main>
+            <Routes>
+              <Route path="/admin" element={null} />
+              <Route path="*" element={<Footer />} />
+            </Routes>
+          </div>
+        </Router>
+      </ErrorBoundary>
+    </HelmetProvider>
   );
 }