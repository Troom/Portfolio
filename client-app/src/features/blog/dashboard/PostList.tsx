import React, { SyntheticEvent, useState } from 'react';
import {Button, Item, Label, Segment} from "semantic-ui-react";
import {Post} from "../../../app/models/post";

interface Props {
    posts: Post[];
    selectPost: (id: string) => void;
    deletePost: (id: string) => void;
    submitting: boolean;
}

export default function PostList({posts, selectPost, deletePost, submitting}: Props) {
    const [target, setTarget] = useState('');

    function handleDeletePost(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deletePost(id)
    }
    return (
        <Segment>
            <Item.Group divided>
                {posts.map(post => (
                    <Item key={post.id}>
                        <Item.Content>
                            <Item.Header as='a'>{post.title}</Item.Header>
                            <Item.Meta>{post.date}</Item.Meta>
                            <Item.Description>
                                <div>{post.description}</div>
                                <div>{post.content}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='View' color='blue'
                                        onClick={() => selectPost(post.id)}/>
                                <Button loading={submitting && target === post.id}
                                        name={post.id} floated='right' content='Delete'
                                        color='red'
                                        onClick={(e) => handleDeletePost(e, post.id)}/>
                                <Label basic content={post.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}