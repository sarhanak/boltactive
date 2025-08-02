import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Heart, BookOpen, Leaf, ArrowRight } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import NewsletterSignup from '../components/NewsletterSignup';

const Home = () => {
  const programs = [
    {
      icon: <Users className="h-12 w-12 text-blue-600" />,
      title: "Women's Empowerment",
      description: "Supporting women through skill development, education, and economic opportunities to build stronger communities."
    },
    {
      icon: <Heart className="h-12 w-12 text-green-600" />,
      title: "Health & Welfare",
      description: "Providing essential healthcare services, medical camps, and wellness programs for underserved populations."
    },
    {
      icon: <BookOpen className="h-12 w-12 text-blue-600" />,
      title: "Education For All",
      description: "Ensuring access to quality education and learning opportunities for children and adults in rural communities."
    },
    {
      icon: <Leaf className="h-12 w-12 text-green-600" />,
      title: "Environmental & Cultural Development",
      description: "Promoting sustainable practices and preserving cultural heritage while protecting our environment."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/6995213/pexels-photo-6995213.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
          }}
        >
          <div className="absolute inset-0 bg-blue-900 bg-opacity-70"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">Active For You Charitable Trust</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">Empowering Communities, Transforming Lives</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/donate"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Donate Now
            </Link>
            <Link
              to="/about"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Our Core Programs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Do</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive programs address critical needs in communities, creating lasting positive impact through targeted interventions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex justify-center mb-6">
                  {program.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{program.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Message from the President */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">A Message From Our President</h2>
              <div className="prose prose-lg text-gray-600 mb-8">
                <p className="leading-relaxed">
                  "I am writing to you today with immense gratitude and a deep sense of purpose. Our journey at Active For You Charitable Trust has been one of hope, determination, and unwavering commitment to serving those who need it most."
                </p>
                <p className="leading-relaxed">
                  "Through our collective efforts, we have touched thousands of lives, empowered countless women, provided essential healthcare, and fostered educational opportunities that transform communities from within."
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <p className="font-semibold text-gray-900 text-lg">Said Sabbirbhai Shekh</p>
                <p className="text-gray-600">President, Active For You Charitable Trust</p>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center mt-6 text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200"
              >
                Learn more about our story
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
                  alt="Said Sabbirbhai Shekh, President"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Join Our Mission</h2>
          <p className="text-xl text-blue-100 mb-8">
            Every contribution, no matter the size, helps us create meaningful change in the lives of those who need it most.
          </p>
          <Link
            to="/donate"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Make a Difference Today
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <ContactForm />
            </div>
            <div className="space-y-8">
              <NewsletterSignup />
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Visit Us</h3>
                <div className="space-y-4 text-gray-600">
                  <p>
                    <strong>Address:</strong><br />
                    Shikari Faliyu, Godhra Bhagol,<br />
                    Tal.: Santrampur, Mahisagar 389260
                  </p>
                  <p>
                    <strong>Email:</strong><br />
                    <a href="mailto:ACTIVEFORYOUTRUST@GMAIL.COM" className="text-blue-600 hover:text-blue-700">
                      ACTIVEFORYOUTRUST@GMAIL.COM
                    </a>
                  </p>
                  <p>
                    <strong>Phone:</strong><br />
                    <a href="tel:9925255729" className="text-blue-600 hover:text-blue-700">
                      9925255729
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;