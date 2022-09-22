import Head from 'next/head'
import { useRouter } from 'next/router'

import Layout from '../../next_components/layout'
import Date from '../../next_components/date'
import utilStyles from '../../styles/utils.module.css'
import { useQuery, withWunderGraph } from '../../components/generated/nextjs'
import { QueryResult } from '@wundergraph/sdk/client'
import { GetPostByIdResponseData } from '../../.wundergraph/generated/models'

function Post () {
  const router = useRouter()
  let result: QueryResult<GetPostByIdResponseData> | undefined
  if (typeof router.query.id === 'string') {
    result = useQuery.GetPostById({ input: { id: parseInt(router.query.id, 10) } }).result
  }

  if (result?.status === 'ok' && result.data.db_findUniquePost) {
    const post = result.data.db_findUniquePost

    return (
        <Layout home={false}>
            <Head>
              <title>{post.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{post.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={post.createdAt} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
        </Layout>
    )
  } else {
    return <p>Error</p>
  }
}

export default withWunderGraph(Post)
