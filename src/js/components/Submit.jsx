import React from 'react';
import PostActions from '../actions/PostActionCreators';
import {Redirect} from 'react-router';
import PostStore from '../stores/PostStore';
import {Link} from 'react-router-dom';

export default class extends React.Component {
    state = {
        newPost: {
            postTitle: "",
            postUrl: "",
            postText: ""
        }
    }

    handleOnChange = (event) => {
        let post = this.state.newPost;
        post[event.target.name] = event.target.value;

        this.setState({
            newPost: post
        });
    }

    submitPost = () => {
        let user = PostStore.getUser();

        let post = {
            post_title: this.state.newPost.postTitle,
            post_text: this.state.newPost.postText, 
            hanesst_id: 4, 
            post_type: "story", 
            post_parent: -1,
            username: user.username,
            pwd_hash: "fyQgkcLMD1", 
            post_url: this.state.newPost.postUrl
        }

        PostActions.submitPost(post);
        this.setState({
            newPost: {}
        });
    }

    render() {
        return (
            <div className="submit-container">
                <div className="title-input">
                    title <input type="text" name="postTitle" onChange={this.handleOnChange} />
                </div>
                <div className="url-input">
                    url <input type="text" name="postUrl" onChange={this.handleOnChange} />
                </div>
                <span>or</span>
                <div className="text">
                    text <textarea name="postText" id="text" cols="30" rows="10" onChange={this.handleOnChange} ></textarea>
                </div>
                <br/>
                    <Link to="/">
                        <button type="button" onClick={this.submitPost}>submit</button>
                    </Link>
                <br/>
                <p> Leave url blank to submit a question for discussion. If there is no url, the text (if any) will appear at the top of the thread.</p>
            </div>
        );
    }
};
