import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Post } from '../models/post';
import NavBar from './NavBar';
import PostDashboard from '../../features/blog/dashboard/PostDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {postStore}= useStore();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    postStore.loadPosts()
  }, [postStore])

  if (postStore.initLoadingMode) return <LoadingComponent content='Loading app... Please wait ' />

  return (
    <>
      <NavBar/>
      <Container style={{ marginTop: '5em' }}>
      <PostDashboard/>
      </Container>
    </>
  );
}
export default observer(App);

// axios.get('http://localhost:5202/api/posts')
