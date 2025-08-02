@@ .. @@
 import { Users, Heart, BookOpen, Leaf, ArrowRight } from 'lucide-react';
 import ContactForm from '../components/ContactForm';
 import NewsletterSignup from '../components/NewsletterSignup';
+import SEO from '../components/SEO';
+import { useAnalytics } from '../hooks/useAnalytics';

 const Home = () => {
+  const { trackEvent } = useAnalytics();
+
+  const handleDonateClick = () => {
+    trackEvent({
+      event: 'donate_button_click',
+      category: 'engagement',
+      label: 'hero_section'
+    });
+  };
+
   const programs = [
@@ .. @@
   return (
     <div>
+      <SEO />
+      
       {/* Hero Section */}
@@ .. @@
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link
               to="/donate"
+              onClick={handleDonateClick}
               className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
             >