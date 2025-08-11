export default function SideNav() {
  return (
    <aside className="w-64 h-screen bg-pink-100 shadow-lg fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="p-4 text-2xl font-bold text-pink-700 border-b border-pink-200">
        🌸 Menu
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-3">
        <a href="#" className="block px-3 py-2 rounded-md hover:bg-pink-200 text-pink-900">
          Home
        </a>
        <a href="#" className="block px-3 py-2 rounded-md hover:bg-pink-200 text-pink-900">
          About
        </a>
        <a href="#" className="block px-3 py-2 rounded-md hover:bg-pink-200 text-pink-900">
          Services
        </a>
        <a href="#" className="block px-3 py-2 rounded-md hover:bg-pink-200 text-pink-900">
          Contact
        </a>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-pink-200 text-sm text-pink-700">
        © 2025 MySite
      </div>
    </aside>
  );
}
