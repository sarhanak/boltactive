import React, { useState } from 'react';
import { X } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleries = [
    {
      title: "Health & Wellness",
      description: "Providing free health services to the underserved.",
      images: [
        "https://images.pexels.com/photos/6995213/pexels-photo-6995213.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
        "https://images.pexels.com/photos/6995092/pexels-photo-6995092.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
        "https://images.pexels.com/photos/3779752/pexels-photo-3779752.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
        "https://images.pexels.com/photos/3779736/pexels-photo-3779736.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
      ]
    },
    {
      title: "Community Empowerment & Education",
      description: "Empowering women and promoting education.",
      images: [
        "https://images.pexels.com/photos/6995174/pexels-photo-6995174.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
        "https://images.pexels.com/photos/5428829/pexels-photo-5428829.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
        "https://images.pexels.com/photos/5428840/pexels-photo-5428840.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
        "https://images.pexels.com/photos/6995455/pexels-photo-6995455.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
        "https://images.pexels.com/photos/8613320/pexels-photo-8613320.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
      ]
    },
    {
      title: "Environmental & Cultural Programs",
      description: "Promoting sustainability and preserving culture.",
      images: [
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
        "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
        "https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
        "https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
        "https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
      ]
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Work in Action</h1>
          <p className="text-xl md:text-2xl opacity-90">
            Witness the transformative impact of our initiatives across communities
          </p>
        </div>
      </section>

      {/* Gallery Sections */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {galleries.map((gallery, galleryIndex) => (
            <div key={galleryIndex} className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">{gallery.title}</h2>
                <p className="text-xl text-gray-600">{gallery.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.images.map((image, imageIndex) => (
                  <div
                    key={imageIndex}
                    className="group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={image}
                        alt={`${gallery.title} ${imageIndex + 1}`}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={selectedImage}
              alt="Gallery image"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Be Part of Our Story</h2>
          <p className="text-xl text-gray-600 mb-8">
            Every image tells a story of hope, transformation, and community impact. Your support helps us create more of these meaningful moments.
          </p>
          <a
            href="/donate"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg inline-block"
          >
            Join Our Mission
          </a>
        </div>
      </section>
    </div>
  );
};

export default Gallery;