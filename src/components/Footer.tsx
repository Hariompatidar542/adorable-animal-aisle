import { Heart, Mail, Phone, MapPin } from 'lucide-react';
export const Footer = () => {
  return <footer className="bg-gray-900 pt-16 pb-1 py py-[51px]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
                <span className="font-bold text-lg text-yellow-300">🐾</span>
              </div>
              <h3 className="text-xl font-bold text-white">PetStore</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner in pet care. We provide premium products 
              to keep your furry friends happy and healthy.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors cursor-pointer">
                <span className="text-white text-sm font-medium">f</span>
              </div>
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors cursor-pointer">
                <span className="text-white text-sm font-medium">t</span>
              </div>
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors cursor-pointer">
                <span className="text-white text-sm font-medium">in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">Shop All</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">Dogs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">Cats</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">Birds</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">Fish</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-white">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">Shipping Info</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">Returns</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">Size Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-white">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300 text-sm">+91 7089049752</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300 text-sm">hello@petstore.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300 text-sm">64A, shree vihar colony ,Indore</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 PetStore. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-sm text-gray-400 mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for pets</span>
          </div>
        </div>
      </div>
    </footer>;
};