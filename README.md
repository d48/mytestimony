[![Build Status](https://travis-ci.org/d48/mytestimony.png?branch=master)](https://travis-ci.org/d48/mytestimony)

# Overview

This is a website to help people share about their tesimony of what God has done in their life. This is specifically for people that follow Jesus Christ and would like others to know of how Jesus has changed their lives. Online tools will be provided to:

1. Aid people on how to set up or write a testimony. Example: an outline and how many words to keep it within so as to help put it down.
2. Easy to use website to help create testimony and save online. Easy for anyone old enough to type and read.
3. Tools to share easily via email and text. Example: short URLs and share utility to social networks.
4. Can set testimony to be viewed publicly and anonymously so that search engines can pick up on keywords that may help others in their struggles and see how God helped and changed their lives.

## Initial Designs

**Homepage - one page app**

![Homepage](https://github.com/d48/mytestimony/raw/master/design/wireframes/wireframe-home-v1.png)

**Homepage - Share Testimony**

![Create](http://f.cl.ly/items/3V0h0S103d2C2O0o0v0v/home-wf-share.png)


## User functions and sample MongoDB command

|Description                                                              |Database function                                                              |
|:--                                                                      |:--                                                                            |
|Create testimony with fields for name, testimony test, and tags/keywords |`db.collectionname.insert({k:v, k:v, k:[v,v,v]});`                             |
|Search for testimonials based on tags/keywords                           |`db.collectionname.find({tags: { $all : [value] } });`                         |
|Show list of testimonials, using lazy load (limit by first 10)           |`db.collectionname.find().limit(10);`                                          |
|Show list of testimonials, using lazy load (get next 5 after index of 10)|`db.collectionname.find().skip(10).limit(5);`                                  |
|Search in a field using regular expression (case insensitive)            |`db.collectionname.find(testimony: /keyword*/i);`                              |
|Search for testimony with _id                                            |`db.collectionname.findOne({_id: new ObjectID('generatedstring')}, calback());`|

__note:__ Using skip is expensive as it walks through the collection to get the offset. As number for `skip()` increases, this gets more expensive for performance

* Look into saving cursors and iterating through collection from set points after each query

## Sample MongoDB Schema

_For testimonies, pretty simple_

```javascript
// mytestimony.testimonies
{
	"_id": ObjectId("50427d77e4ba90f9269360c1"),
		// from _id in users document
		"author_id": ObjectId("99927d77e4ba90f9269360c1"),
		"date": // native MongoDB date string,
		"testimony" : // Some long string,
		"tags": ['God','Holy Spirit','alchohol','freedom'],
		"shareUrl": 'http://testim.ony/576el43'
}
```

_For users_
  
```javascript
// mytestimony.users
{
	"_id": ObjectId("99927d77e4ba90f9269360c1"),
		"author": "Joe Smith",
		"email": "joe.smith@email.com",
		"password": // md5 hash that's salted
}
```
  

## RESTful API

View architecture and details here: https://docs.google.com/document/d/1DmooeXBQrIVdDpkACxRuvmMi2VNw3Ht8d2x5o9OHRO0/edit

## Roadmap

* ~~Overview of who, what, where, how~~
* Wireframes for main application for creating and list of tesimony view 
     * ~~Create page~~
	  * Design testimony detail page
     * ~~List of random testimonials~~
     * Edit page
     * Browse tag results
     * Login modal
     * Register form
     * Account settings
* Clickthroughs for mock application
* Interactivity styling
	* [wantful](http://www.wantful.com) uses Backbone.js and responsive/fluid layout :sparkles:
	* [Podio](http://www.podio.com) uses Backbone.js and rails. Review how they do tags
	* [storify](http://www.storify.com) is a node.js web app that displays a wysiwig editor 
		* inspiration for clean asset and use of expressjs.com
* Research technologies to use, but leaning to open source for tried and tested frameworks so as to build incrementally
	* using MongoDB
	* [brunch.io](http://brunch.io/) 
	* reviewing twitter bootstrap to tweak base styles and responsive layout
	* using `nodemon` to automatically compile and rerun server app
		* look into adding livereload so don't have to manually refresh
	* reviewing different mvc approaches and build tools to organize code and increase workflow performance
	* ~~use of SASS instead of Stylus for for css preprocessing for debugging via browser~~
		* SASS middleware not supported in expressjs framework. 
	* use of [OOCSS](https://github.com/stubbornella/oocss/wiki)
	* use [SMACCS](http://smacss.com/) - scalable and modular architecture for css. 
		* Inspired by this talk to clean up and reuse code [Youtube vid](http://www.youtube.com/watch?v=hou2wJCh3XE)
		
* Basic CRUD with database
	* ~~RESTful API with JSON endpoint: look into [deployd](http://deployd.com/)~~ building custom
* ~~Look into build process, developer tooling, client-side stack: [Yeoman](http://yeoman.io/), [grunt](https://github.com/cowboy/grunt), [buildify](https://github.com/powmedia/buildify)~~
	* Yeoman.io uses grunt and has some cool configurations for compressing html, css, and js, providing version number and deploying based on dev or production setting

## Todo

- Set up Travis CI tests and continous integration for the site. Look into just running Jasmine test suite
	* begin implementing tests for each method now, start off with one file for now
- Integrate `jsdoc3` lib and throw in `doc` directory. To build on every post-commit or set up watch on changes to .js file
  * Start looking into grunt for build/deploy scripts
- Throw up instance on aws (Amazon Web Services)
- Look into postmark.js and wrapper for api https://github.com/voodootikigod/postmark.js
  * look into general smtp service via node

## Bugs

* ~~issue with multiple db connections on each request. connect once per client and share connection across application. place in bootstrap~~
	* fixed by updating how conneciton is instantiated and used in api routes. Pattern from here <https://github.com/ccoenraets/nodecellar/blob/master/routes/wines.js#L10-L30>
