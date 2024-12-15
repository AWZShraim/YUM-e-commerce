export default function Footer() {
    return (
      <footer className="bg-york-black text-york-white py-8 border-t border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">About YUM</h3>
              <p className="text-sm">
                York University Market (YUM) is the official marketplace for the York
                University community. Buy, sell, and connect with fellow York members.
              </p>
            </div>
  
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="hover:text-york-red">About Us</a></li>
                <li><a href="/contact" className="hover:text-york-red">Contact</a></li>
                <li><a href="/faq" className="hover:text-york-red">FAQ</a></li>
                <li><a href="/terms" className="hover:text-york-red">Terms of Service</a></li>
              </ul>
            </div>
  
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm">
                <li>4700 Keele Street</li>
                <li>Toronto, Ontario</li>
                <li>M3J 1P3</li>
                <li>Email: yumsupport@yorku.ca</li>
              </ul>
            </div>
          </div>
  
          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} York University Market. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
  }