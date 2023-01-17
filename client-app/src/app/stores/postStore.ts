import { v4 as uuid } from 'uuid';
import { makeAutoObservable, runInAction } from "mobx";
import agent from '../api/agent';
import { Post } from "../models/post";

//runInAction is required for mobix to correctly update state
//if some async operations take more than one thick (one step), they should be wrapped.

export default class PostStore {
    postRegistry = new Map<string, Post> //dictionary in TypeScript
    selectedPost?: Post = undefined;
    editMode = false;
    loadingMode = false; 
    initLoadingMode = true;

    constructor() {
        makeAutoObservable(this)
    }

    get postsByDate() { //todo other sorting
        return Array.from(this.postRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date))
    }


     loadPosts = async ()=>{
        try{
         const posts = await agent.Posts.list();
         posts.forEach(post => {
            post.date = post.date.split('T')[0];
            this.postRegistry.set(post.id, post);
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

     selectPost = (id: string) => {
        this.selectedPost = this.postRegistry.get(id);
     }

     cancelSelectedPost = ()=>{
        this.selectedPost = undefined;
     }

     deletePost =  async (id: string) =>{
            this.loadingMode = true;
            try{
                await agent.Posts.delete(id)
                runInAction(()=>{
                    this.postRegistry.delete(id);
                    this.loadingMode = false;
                })
            }
            catch (error){
                console.log(error);
                runInAction(()=>{
                    this.loadingMode = false;
                })
            }
     }

     openForm = (id?: string)=>{
        id ? this.selectPost(id) : this.cancelSelectedPost();
        this.editMode = true;
     }

     closeForm = ()=>{
        this.editMode = false;
     }

     updatePost = async (post: Post) =>
     {
        this.loadingMode = true;

        try{
            await agent.Posts.update(post)
            runInAction(()=>
            {
                this.postRegistry.set(post.id, post)
                this.selectedPost = post
                this.editMode = false;
                this.loadingMode = false;
            })
        }
        catch (error){
            console.log(error)
            runInAction(()=>this.loadingMode = false)
        }
     }



     createPost = async (post: Post) =>
     {
        this.loadingMode = true;
        post.id = uuid();
        try{
            await agent.Posts.create(post)
            runInAction(()=>
            {
                this.postRegistry.set(post.id, post)
                this.selectedPost = post
                this.editMode = false;
                this.loadingMode = false;
            })
        }
        catch (error){
            console.log(error)
            runInAction(()=>this.loadingMode = false)
        }
     }
}