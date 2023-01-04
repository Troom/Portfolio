import {Button, Container, Menu} from "semantic-ui-react";
import React from "react";

interface Props {
    openForm: () => void;
}

export default function NavBar({openForm}: Props) {
    return (
        <Menu inverted fixed='top'>
            <Container>
            <Menu.Item name='Home' />
            <Menu.Item name='About' />
            <Menu.Item name='Contanct' />
            <Menu.Item name='Projects' />

            </Container>
            <Container>
                <Menu.Item header>
                    HomePage
                </Menu.Item>
                <Menu.Item name='Blog' />
                <Menu.Item>
                    <Button onClick={openForm} positive content='Create Post' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}