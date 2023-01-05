import { makeAutoObservable } from "mobx";
import agent from '../api/agent';
import { Post } from "../models/post";


export default class PostStore {
    posts: Post[] = [];
    selectedPost: Post | null = null;
    editMode = false;
    loadingMode = false; 
    initLoadingMode = false;
    submitMode = false;

    constructor() {
        makeAutoObservable(this)
    }


     loadPosts = async ()=>{
        try{
            this.setInitLoadingMode(true);
        this.loadingMode = true;
         const posts = await agent.Posts.list();
         posts.forEach(post => {
            post.date = post.date.split('T')[0];
            posts.push(post);
        });
        this.setInitLoadingMode(false);

        }

        catch(error){
            console.log(error)
            this.setInitLoadingMode(false);

        }
     }

     setInitLoadingMode= (state:boolean) =>{
        this.initLoadingMode = state;

     }


};