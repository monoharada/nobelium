import Link from 'next/link'
import { useConfig } from '@/lib/config'
import FormattedDate from '@/components/FormattedDate'

// Assuming a type for the post. Update this to the correct type based on your implementation
interface Post {
  id: string;
  slug: string;
  title: string;
  date: Date;  // Or string, based on your implementation
  update_date: Date; // Or string, based on your implementation
  summary: string;
}

interface BlogPostProps {
  post: Post;
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  const BLOG = useConfig()

  return (
    <Link href={`${BLOG.path}/${post.slug}`}>
      <article key={post.id} className="mb-6 md:mb-8">
        <header className="flex flex-col justify-between md:flex-row md:items-baseline gap-x-4">
          <h2 className="text-lg md:text-xl font-medium mb-2 cursor-pointer text-black dark:text-gray-100">
            {post.title}
          </h2>
        <div className='flex flex-col gap-x-2 flex-shrink-0'>
        <time className="flex-shrink-0 text-gray-600 dark:text-gray-400">
            初稿：<FormattedDate date={post.date} />
          </time>
          <time className="flex-shrink-0 text-gray-600 dark:text-gray-400">
            更新：<FormattedDate date={post.update_date} />
          </time>
          </div>

        </header>
        <main>
          <p className="hidden md:block leading-8 text-gray-700 dark:text-gray-300">
            {post.summary}
          </p>
        </main>
      </article>
    </Link>
  )
}

export default BlogPost
