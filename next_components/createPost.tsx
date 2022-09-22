import { useState } from 'react'
import PropTypes from 'prop-types'

import { useMutation, withWunderGraph } from '../components/generated/nextjs'
import utilStyles from '../styles/utils.module.css'

const CreatePost = ({ onPressClose, refetch }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const createPost = useMutation.CreatePost()

  function onPressPost () {
    createPost.mutate({ input: { title, content } })
      .then(() => {
        setTitle('')
        setContent('')
        refetch()
      })
      .catch(() => undefined)
  }

  return (
    <div className={utilStyles.postFormWrapper}>
      <form className={utilStyles.postForm}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className={utilStyles.inputs}
          placeholder="Post title"
          value={title}
          onInput={e => setTitle(e.target.value)}
        />

        <label htmlFor="content">Content</label>
        <textarea
          rows={10}
          className={utilStyles.inputs}
          placeholder="Write your thoughts..."
          value={content}
          onInput={e => setContent(e.target.value)}
        />
      </form>

      <button
        className={utilStyles.formButtons}
        id={(title && content) ? utilStyles.postButton : utilStyles.postButtonInactive}
        disabled={!title}
        onClick={() => {
          if (!title || !content) {
            return
          }
          onPressClose()
          onPressPost()
        }}
      >
        Post
      </button>

      <button
        className={utilStyles.formButtons}
        id={utilStyles.closeButton}
        onClick={onPressClose}
      >
        Close
      </button>
    </div>
  )
}

CreatePost.propTypes = {
  onPressClose: PropTypes.func,
  refetch: PropTypes.func
}

export default withWunderGraph(CreatePost)
