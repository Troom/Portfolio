import { Grid } from "semantic-ui-react";
import { Post } from "../../../app/models/post";
import PostDetails from "../details/PostDetails";
import PostForm from "../form/PostForm";
import PostList from './PostList';

interface Props {
    posts: Post[];
    selectedPost: Post | undefined;
    selectPost: (id: string) => void;
    cancelSelectPost: () => void;
    openForm: (id: string) => void;
    closeForm: () => void;
    editMode: boolean;
    createOrEdit: (post: Post) => void;
    deletePost: (id: string) => void;
    submitting: boolean;
}

export default function PostDashboard({ posts, selectedPost, selectPost,
    cancelSelectPost, openForm, closeForm, editMode, createOrEdit, deletePost, submitting }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <PostList 
                    posts={posts} 
                    selectPost={selectPost}
                    deletePost={deletePost} 
                    submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedPost && !editMode &&
                    <PostDetails
                        post={selectedPost}
                        cancelSelectPost={cancelSelectPost}
                        openForm={openForm}
                    />}
                {editMode &&
                    <PostForm 
                        closeForm={closeForm} 
                        post={selectedPost} 
                        createOrEdit={createOrEdit} 
                        submitting={submitting}
                        />}
                        
            </Grid.Column>

        </Grid>
    )
}