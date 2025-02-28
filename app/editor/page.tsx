// app/editor/page.tsx
import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/auth';
import EditorContent from '@/components/editor/EditorContent';

interface EditorProps {
  searchParams: {
    siteId?: string;
  };
}

export default async function Editor({ searchParams }: EditorProps) {
  const session = await getAuthSession();
  const { siteId } = searchParams;
  
  if (!session) {
    redirect('/auth/signin');
  }
  
  if (!siteId) {
    redirect('/dashboard');
  }
  
  return <EditorContent />;
}