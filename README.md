# Overview

This is a website to help people share about their tesimony of what God has done in their life. This is specifically for people that follow Jesus Christ and would like others to know of how Jesus has changed their lives. Online tools will be provided to:

1. Aid people on how to set up or write a testimony. Example: an outline and how many words to keep it within so as to help put it down.
2. Easy to use website to help create testimony and save online. Easy for anyone old enough to type and read.
3. Tools to share easily via email and text. Example: short URLs and share utility to social networks.
4. Can set testimony to be viewed publicly and anonymously so that search engines can pick up on keywords that may help others in their struggles and see how God helped and changed their lives.

## Initial Designs

Create Testimony 

![Create Testimony](https://github.com/design48/mytestimony/raw/master/design/wireframes/wireframe-create-v1.png)


## User functions and sample MongoDB command

| Description | Database function |
|:--|:--|
| Create testimony with fields for name, testimony test, and tags/keywords | `db.collectionname.insert({k:v, k:v, k:[v,v,v]});` |
| Search for testimonials based on tags/keywords | `db.collectionname.find({tags: { $all : [value] } });` |
| Show list of testimonials, using lazy load (limit by first 10) | `db.collectionname.find().limit(10);` |
| Show list of testimonials, using lazy load (get next 5 after index of 10) | `db.collectionname.find().skip(10).limit(5);` |

__note:__ Using skip is expensive as it walks through the collection to get the offset. As number for `skip()` increases, this gets more expensive for performance

* Look into saving cursors and iterating through collection from set points after each query


## Roadmap

* ~~Overview of who, what, where, how~~
* Wireframes for main application for creating and list of tesimony view 
     * ~~Create page~~
     * Edit page
     * Browse tag results
     * Login modal
     * Register form
     * Account settings
     * List of random testimonials
* Clickthroughs for mock application
* Research technologies to use, but leaning to open source for tried and tested frameworks so as to build incrementally
* Basic CRUD with database
* Look into build process, developer tooling, client-side stack: [Yeoman](http://yeoman.io/) and [grunt](https://github.com/cowboy/grunt)
