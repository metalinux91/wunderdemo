import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import Layout, { siteTitle } from '../next_components/layout'
import Date from '../next_components/date'
import CreatePost from '../next_components/createPost'
import utilStyles from '../styles/utils.module.css'
import { useQuery, withWunderGraph } from '../components/generated/nextjs'

const Home = () => {
  const [formVisible, setFormVisible] = useState(false)

  const { result, refetch } = useQuery.GetLatestPosts({ input: { take: 3 } })

  let latestPosts: Array<{ id: number, title: string, createdAt: string }> = []
  if (result?.status === 'ok') {
    latestPosts = result.data.db_findManyPost
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p className={utilStyles.subtitle}>
          A super simple blog built using WunderGraph and NextJS
        </p>
      </section>

      {
        latestPosts.length > 0 &&
        <section>
          <ul className={utilStyles.list}>
            {
              latestPosts.map(({ id, createdAt, title }: { id: number, createdAt: string, title: string }) => (
                <li className={utilStyles.listItem} key={id}>
                  <Link href={`/posts/${id}`}>
                    <a>{title}</a>
                  </Link>
                  <br />
                  <small className={utilStyles.lightText}>
                    <Date dateString={createdAt} />
                  </small>
                </li>
              ))
            }
          </ul>
        </section>
      }

      {
        !formVisible
          ? (
            <button
              className={utilStyles.postButton}
              onClick={() => setFormVisible(true)}
            >
              Post something
            </button>
            )
          : <CreatePost onPressClose={() => setFormVisible(false)} refetch={refetch} />
      }
    </Layout>
  )
}

export default withWunderGraph(Home)
