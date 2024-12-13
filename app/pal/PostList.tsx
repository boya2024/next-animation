import Image from "next/image";


export default function PostList() {

  const allArticlesData = [
    {
      id: '1',
      title: 'next',
      date: '2024-11-21'
    },
    {
      id: '2',
      title: 'Java笔记',
      date: '2024-11-21'
    }
  ]

  return(
    <section className="flex flex-col space-y-10">
      <h2 className="lg:text-5sxl text-center text-2xl font-semibold sm:text-3xl md:text-4xl">Posts</h2>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allArticlesData.map((item: any, index: number) => (
          <Post key={index} data={item} />
        ))}
      </section>
    </section>  
  )
}


function Post({data}: {data: any}) {

  return (
    <a href={`/posts/${data.id}`}>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6 pb-4 gap-[6px]">
          <div className="aspect-video relative w-full max-w-[812.5px] overflow-hidden">
          <Image
            alt={data.title}
            loading="lazy"
            unoptimized={false} // 可选，是否禁用自动优化
            fill // 填充整个父容器
            className="rounded-sm object-cover"
            sizes="(min-width: 1520px) 280px, (min-width: 1280px) calc(13.64vw + 75px), (min-width: 1040px) calc(33.64vw - 75px), (min-width: 780px) calc(50vw - 74px), calc(100vw - 82px)"
            src="/cover-image.webp" // 替换为实际的图像路径
            style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', color: 'transparent' }}
          />
          </div>
          <h3 className="text-2xl font-semibold leading-none tracking-tight">{data.title}</h3>
        </div>
        <div className="p-6 pt-0">
          <dl className="pb-1">
            <dt className="sr-only">Published on</dt>
            <dd className="flex items-center gap-1 text-sm text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calendar h-4 w-4"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
              <time dateTime="September 9, 2024">{data.date}</time>
            </dd>
          </dl>
          <span className="line-clamp-2">Ensure your React applications are efficient and maintainable with these practical tips.</span>
        </div>
      </div>
    </a>
  )
}
