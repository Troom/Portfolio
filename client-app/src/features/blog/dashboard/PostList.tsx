import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import {Button, Item, Label, Segment} from "semantic-ui-react";
import { useStore } from '../../../app/stores/store';

export default observer(function PostList()
{
    const {postStore} = useStore();
    const {deletePost, postsByDate, loadingMode} = postStore;
    const [target, setTarget] = useState('');

    function handleDeletePost(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deletePost(id)
    }
    return (
        <Segment>
            <Item.Group divided>
                {postsByDate.map(post => (
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
                                        onClick={() => postStore.selectPost(post.id)}/>
                                <Button loading={loadingMode && target === post.id}
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
})