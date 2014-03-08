[![Build Status](https://travis-ci.org/d48/mytestimony.png?branch=master)](https://travis-ci.org/d48/mytestimony)

```
 __    __     __  __     ______   ______     ______     ______   __     __    __     ______     __   __     __  __    
/\ "-./  \   /\ \_\ \   /\__  _\ /\  ___\   /\  ___\   /\__  _\ /\ \   /\ "-./  \   /\  __ \   /\ "-.\ \   /\ \_\ \   
\ \ \-./\ \  \ \____ \  \/_/\ \/ \ \  __\   \ \___  \  \/_/\ \/ \ \ \  \ \ \-./\ \  \ \ \/\ \  \ \ \-.  \  \ \____ \  
 \ \_\ \ \_\  \/\_____\    \ \_\  \ \_____\  \/\_____\    \ \_\  \ \_\  \ \_\ \ \_\  \ \_____\  \ \_\\"\_\  \/\_____\ 
  \/_/  \/_/   \/_____/     \/_/   \/_____/   \/_____/     \/_/   \/_/   \/_/  \/_/   \/_____/   \/_/ \/_/   \/_____/ 
                                                                                                                      
```

# Overview

This is a website to help people share about their tesimony of what God has done in their life. This is specifically for people that follow Jesus Christ and would like others to know of how Jesus has changed their lives. Online tools will be provided to:

1. Aid people on how to set up or write a testimony. Example: an outline and how many words to keep it within so as to help put it down.
2. Easy to use website to help create testimony and save online. Easy for anyone old enough to type and read.
3. Tools to share easily via email and text. Example: short URLs and share utility to social networks.
4. Can set testimony to be viewed publicly and anonymously so that search engines can pick up on keywords that may help others in their struggles and see how God helped and changed their lives.

[View temporary working website on Amazon EC2 instance](http://54.186.24.182/)


## Technology

[From Wiki](https://github.com/d48/mytestimony/wiki/Technology)

## How to configure/install and run locally

* Requirements
  * Node.js version 0.8.14 - [http://blog.nodejs.org/2012/10/25/node-v0.8.14/](Download and install)
  * MongoDB - [http://docs.mongodb.org/manual/installation/](Download and install)

Once the above is installed, clone this repo and run `npm install` to donwload and install node library dependencies

```
$ git clone git@github.com:d48/mytestimony.git && cd mytestimony
$ npm install
```

**To start app**, run the following and open web browser at `http://localhost:3000`

```
$ make startapp
```

**To stop app**

```
$ make stopapp 
```


## Initial Designs

**Homepage - one page app**

![Homepage](https://github.com/d48/mytestimony/raw/master/design/wireframes/wireframe-home-v1.png)

**Homepage - Share Testimony**

![Create](http://f.cl.ly/items/3V0h0S103d2C2O0o0v0v/home-wf-share.png)

## Database setup

[From Wiki](https://github.com/d48/mytestimony/wiki/Database)


## RESTful API

View architecture and details here: https://docs.google.com/document/d/1DmooeXBQrIVdDpkACxRuvmMi2VNw3Ht8d2x5o9OHRO0/edit

## Roadmap

* paste youtube link to pull up video thumbnail
  * or ability to upload their own testimonial video
* ability to post up their own audio testimony
* ~~Overview of who, what, where, how~~
* Wireframes for main application for creating and list of tesimony view 
     * ~~Create page~~
	   * ~~Design testimony detail page~~
     * ~~List of random testimonials~~
     * ~~Edit page~~
       * ~~insert testimony into db upon passing validation~~
       * Preview button
       * Idea of now having testimony form be multi-steps with option
         for user to provide email to have generated link for safe keeping
     * Browse tag results
     * Login modal
     * Register form
     * Account settings
* setting up aws ec2 instance to have git deploy to it upon commits
  * convoluted to set up the instance
  * following blog post http://thefloppydisk.wordpress.com/2013/04/25/a-node-js-application-on-the-amazon-cloud-part-1-installing-node-on-an-ec2-instance/
 * installed node and npm
 * ~~configured base node app, request not resolving. need to troubleshoot~~
   * updated http and port, hit public dns url: http://ec2-54-213-215-238.us-west-2.compute.amazonaws.com
   * user is specific for ssh ssh -i mythosts.pem ec2-user@ec2-54-213-215-238.us-west-2.compute.amazonaws.com
   * to run node.js continually, installed `forever` module: https://github.com/nodejitsu/forever
   * ~~looking to instlaling new instance of mongodb instead of configuring from marketplace.~~
   * new Url: http://ec2-54-186-24-182.us-west-2.compute.amazonaws.com or http://54.186.24.182/
* move Single Page Application model
    * reading tech talk of medium.com setup: https://medium.com/tech-talk/fb44da86dc1f
    * no page refreshes
    * streamline content loading (lazy loading, scroll to bottom and load more), look at http://artsy.net
        * vid of browsing through with loaders, modals, and content fades: http://screencast.com/t/VyrULmZL9m2u
    * streamline editor, look at http://www.medium.com
        * vid of browsing and using editor to create a post: http://www.screencast.com/t/wKkNX88hQGwl
	

## Todo
- Start rolling out mocha tests
  * hook in zombie.js or phantom.js to mock in DOM 
- Integrate `jsdoc3` lib and throw in `doc` directory. To build on every post-commit or set up watch on changes to .js file
  * Start looking into grunt for build/deploy scripts
- Throw up instance on aws (Amazon Web Services)
- Look into postmark.js and wrapper for api https://github.com/voodootikigod/postmark.js
  * look into general smtp service via node
- sanitization on client side and server side form submission
  * HTML escaping from user supplied input (especially formatted testimony)
  * insert tags and remove duplicates
- client side validation of form
  * make more robust
- form wysiwig with bold, italics, strikethrough, bullet list, number list 
  * working now. be sure to add bullet/number list
- look into glue.js for CommonJS modules for the browser for modularizing code
  * http://mixu.net/gluejs/
- share feature
  * ux design to have button open up div with options
- CI
  * look into http://ci.testling.com/
