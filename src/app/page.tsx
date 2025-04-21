'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the chat page
    router.push('/chat');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">The Echo Chamber</h1>
        <p className="text-gray-300">
          Redirecting to the psychoanalysis chamber...
        </p>
      </div>
    </div>
  );
}
