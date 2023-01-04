import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Post } from '../models/post';
import NavBar from './NavBar';
import PostDashboard from '../../features/blog/dashboard/PostDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Posts.list()
      .then(response => {
        let posts: Post[] = [];
        response.forEach(post => {
          post.date = post.date.split('T')[0];
          posts.push(post);
        })
        setPosts(posts);
        setLoading(false);
      })
  }, [])

  function handleSelectPost(id: string) {
    setSelectedPost(posts.find(x => x.id === id));
  }

  function handleCancelSelect() {
    setSelectedPost(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectPost(id) : handleCancelSelect();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleDeletePost(id: string) {
    setSubmitting(true);
    agent.Posts.delete(id).then(() => {
        setPosts([...posts.filter(x => x.id !== id)])
        setSubmitting(false);
    })
}
  function handleCreateOrEditPost(post: Post) {
    setSubmitting(true);
    if (post.id) {
        agent.Posts.update(post).then(() => {
            setPosts([...posts.filter(x => x.id !== post.id), post]);
            setSelectedPost(post);
            setEditMode(false);
            setSubmitting(false);
        })
    } else {
        post.id = uuid();
        agent.Posts.create(post).then(() => {
            setPosts([...posts, post]);
            setSelectedPost(post);
            setEditMode(false);
            setSubmitting(false);
        })
    }
}

  if (loading) return <LoadingComponent content='Loading app...' />

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <PostDashboard
          posts={posts}
          selectedPost={selectedPost}
          selectPost={handleSelectPost}
          cancelSelectPost={handleCancelSelect}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditPost}
          deletePost={handleDeletePost}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;

// axios.get('http://localhost:5202/api/posts')
