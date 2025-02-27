import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Wedding Website Builder</h1>
        <p className="text-xl mb-8">Create your beautiful, customized wedding website in minutes.</p>
        
        <Link 
          href="/editor"
          className="px-6 py-3 bg-black text-white rounded-full font-medium text-lg hover:bg-gray-800 transition-colors"
        >
          Start Building
        </Link>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Beautiful Designs</h2>
            <p>Choose from our collection of elegant, customizable themes.</p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Easy to Use</h2>
            <p>No coding required. Our intuitive editor makes website creation simple.</p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Mobile Friendly</h2>
            <p>Your website will look great on all devices, from desktop to mobile.</p>
          </div>
        </div>
      </div>
    </div>
  );
}