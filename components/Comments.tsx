import 'gitalk/dist/gitalk.css'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import cn from 'classnames'
import { fetchCusdisLang } from '@/lib/cusdisLang'
import { useConfig } from '@/lib/config'

interface GitalkProps {
  options: GitalkConfig
}

const GitalkComponent = dynamic<GitalkProps>(
  () => {
    return import('gitalk/dist/gitalk-component')
  },
  { ssr: false }
)
const UtterancesComponent = dynamic(
  () => {
    return import('@/components/Utterances')
  },
  { ssr: false }
)
const CusdisComponent = dynamic(
  () => {
    return import('react-cusdis').then(m => m.ReactCusdis)
  },
  { ssr: false }
)

// Assuming a type for the frontMatter and BLOG.comment. Update this to the correct type based on your implementation
interface FrontMatter {
  id: string;
  title: string;
  fullWidth?: boolean;
}

interface GitalkConfig {
  id: string;
  title: string;
  clientID: string;
  clientSecret: string;
  repo: string;
  owner: string;
  admin: string[];
  distractionFreeMode: boolean;
}

interface CusdisConfig {
  host: string;
  appId: string;
}

interface BlogComment {
  provider: string;
  gitalkConfig?: GitalkConfig;
  cusdisConfig?: CusdisConfig;
}

interface BlogConfig {
  path: string;
  lang: string;
  link: string;
  appearance:  "light" | "dark" | "auto";
  comment?: BlogComment;
}

interface CommentsProps {
  frontMatter: FrontMatter;
}

const Comments: React.FC<CommentsProps> = ({ frontMatter }) => {
  const router = useRouter()
  const BLOG: BlogConfig = useConfig()

  const fullWidth = frontMatter.fullWidth ?? false

  return (
    <div
      className={cn(
        'px-4 font-medium text-gray-500 dark:text-gray-400 my-5',
        fullWidth ? 'md:px-24' : 'mx-auto max-w-3xl',
      )}
    >
      {BLOG.comment && BLOG.comment.provider === 'gitalk' && (
        <GitalkComponent
          options={{
            id: frontMatter.id,
            title: frontMatter.title,
            clientID: BLOG.comment.gitalkConfig!.clientID,
            clientSecret: BLOG.comment.gitalkConfig!.clientSecret,
            repo: BLOG.comment.gitalkConfig!.repo,
            owner: BLOG.comment.gitalkConfig!.owner,
            admin: BLOG.comment.gitalkConfig!.admin,
            distractionFreeMode: BLOG.comment.gitalkConfig!.distractionFreeMode
          }}
        />
      )}
      {BLOG.comment && BLOG.comment.provider === 'utterances' && (
        <UtterancesComponent issueTerm={frontMatter.id} layout={fullWidth} />
      )}
      {BLOG.comment && BLOG.comment.provider === 'cusdis' && (
        <CusdisComponent
          lang={fetchCusdisLang(BLOG.lang)}
          attrs={{
            host: BLOG.comment.cusdisConfig!.host,
            appId: BLOG.comment.cusdisConfig!.appId,
            pageId: frontMatter.id,
            pageTitle: frontMatter.title,
            pageUrl: BLOG.link + router.asPath,
            theme: BLOG.appearance
          }}
        />
      )}
    </div>
  )
}

export default Comments
