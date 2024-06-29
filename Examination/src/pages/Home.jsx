import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div className='min-h-screen bg-gradient-to-br from-red-200 to-yellow-200'> 
  <div className='flex flex-col gap-6 p-10 max-w-6xl mx-auto'>
    <h1 className='text-3xl font-bold lg:text-5xl'>Secure Examination Paper Distribution System</h1>
    <p className='text-gray-500 text-sm'>
      Securely share PDFs for examinations and paper distribution to ensure confidentiality and integrity.
    </p>
    <div className='mt-9'>
      <ul className='list-disc list-inside text-lg space-y-7'>
        <li>Ensure encrypted file transfers.</li>
        <li>Implement access controls to restrict document visibility.</li>
        <li>Use digital signatures to verify document authenticity.</li>
        <li>Monitor and audit document access and distribution.</li>
      </ul>
    </div>
  </div>
</div>

  );
}