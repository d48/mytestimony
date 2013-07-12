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
     * Edit page (in progress)
       * insert testimony into db upon passing validation
       * Preview button
     * Browse tag results
     * Login modal
     * Register form
     * Account settings
	

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
  * look into execCommand
    * sample: http://jsfiddle.net/design48/bmbgc/1/
- look into glue.js for CommonJS modules for the browser for modularizing code
  * http://mixu.net/gluejs/
- check out bootstrap flatly theme for ideas on site design 
  * add light/subtle texture in background - paper
  * strip out all things unneeded as initial size is 139kb!
