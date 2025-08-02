import React from 'react';
import { Target, Eye, Heart, Users, Award, Globe } from 'lucide-react';

const AboutUs = () => {
  const boardMembers = [
    {
      name: "Said Sabbirbhai Shekh",
      role: "President",
      image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
    },
    {
      name: "Rashida Sabbirbhai Shekh",
      role: "Vice President",
      image: "https://images.pexels.com/photos/3182822/pexels-photo-3182822.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
    },
    {
      name: "Abbasali Hassanbhai Shekh",
      role: "Secretary",
      image: "https://images.pexels.com/photos/3182827/pexels-photo-3182827.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
    },
    {
      name: "Nasirkhan Shabbirkhan Pathan",
      role: "Treasurer",
      image: "https://images.pexels.com/photos/3182835/pexels-photo-3182835.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
    },
    {
      name: "Rashida Kabirbhai Malek",
      role: "Trustee",
      image: "https://images.pexels.com/photos/3182840/pexels-photo-3182840.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
    },
    {
      name: "Munira Hussainbhai Shekh",
      role: "Trustee",
      image: "https://images.pexels.com/photos/3182845/pexels-photo-3182845.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
    }
  ];

  const missionPoints = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Women's Empowerment",
      description: "Creating opportunities for women through skill development, microfinance, and leadership training programs."
    },
    {
      icon: <Heart className="h-8 w-8 text-green-600" />,
      title: "Healthcare Access",
      description: "Providing free medical camps, health awareness programs, and essential healthcare services to underserved communities."
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: "Educational Excellence",
      description: "Ensuring quality education access through scholarships, learning centers, and educational infrastructure development."
    },
    {
      icon: <Award className="h-8 w-8 text-green-600" />,
      title: "Environmental Sustainability",
      description: "Promoting eco-friendly practices, tree plantation drives, and environmental awareness campaigns."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/6995092/pexels-photo-6995092.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
        }}
      >
        <div className="absolute inset-0 bg-blue-900 bg-opacity-75"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Our Trust</h1>
          <p className="text-xl md:text-2xl opacity-90">
            Building bridges of hope and creating pathways to a better tomorrow
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About Active For You Charitable Trust</h2>
              <div className="prose prose-lg text-gray-600 space-y-6">
                <p>
                  Active For You Charitable Trust was established with a profound vision to create sustainable change 
                  in communities across India. Founded on principles of compassion, integrity, and social responsibility, 
                  our organization has grown from humble beginnings to become a beacon of hope for thousands.
                </p>
                <p>
                  Our journey began with a simple yet powerful belief: that every individual deserves access to basic 
                  human rights including healthcare, education, and economic opportunities. Over the years, we have 
                  expanded our reach and deepened our impact, touching lives across rural and urban communities.
                </p>
                <p>
                  Today, we stand as a testament to what collective action and unwavering dedication can achieve. 
                  Our comprehensive approach addresses multiple facets of community development, ensuring that our 
                  interventions create lasting, positive change.
                </p>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/6995174/pexels-photo-6995174.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Community gathering"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering communities through sustainable development initiatives that address healthcare, education, 
              women's empowerment, and environmental conservation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {missionPoints.map((point, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{point.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{point.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <Target className="h-16 w-16 text-blue-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Integrity</h3>
              <p className="text-gray-600">
                We operate with transparency, honesty, and accountability in all our activities and partnerships.
              </p>
            </div>
            <div className="text-center p-8">
              <Eye className="h-16 w-16 text-green-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Compassion</h3>
              <p className="text-gray-600">
                Our work is driven by empathy and genuine care for the communities we serve.
              </p>
            </div>
            <div className="text-center p-8">
              <Award className="h-16 w-16 text-blue-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-600">
                We strive for the highest standards in program delivery and community impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Board */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Board</h2>
            <p className="text-xl text-gray-600">
              Dedicated leaders committed to driving positive change in our communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boardMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;