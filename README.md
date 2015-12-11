## Introduction

![Build Status](https://travis-ci.org/HelpfulHuman/HelpfulUI.svg)

**Helpful UI** is a specification for creating clean and predictable HTML and CSS.  The goal is to set standards that can be used across multiple projects to make it easier for developers to collaborate more effectively.

This project is heavily inspired by standards like [BEM](), [CSStyle](http://csstyle.io) and [SMACSS](https://smacss.com/), as well as, tools like the [nib](http://tj.github.io/nib/) stylus framework.

This library offers a small, focused collection of functions that serve the goals of the specification.  If you're looking for a framework that expands on this library, then you'll want to check out [Helpful UI's Elements](https://github.com/HelpfulHuman/HelpfulUI-Elements) package.

## Getting Started

Helpful UI is built in a very similar fashion to [nib](https://github.com/tj/nib).  You can even use the two together if you like.  There are multiple ways you can use this library, which we have listed below.

### Express / Connect

```javascript
var connect = require('connect')
var stylus = require('stylus')
var ui = require('helpful-ui')

var server = connect()

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(ui()) // magic sauce
}

server.use(stylus.middleware({
    src: __dirname,
    compile: compile
}))
```

### Gulp

If you're using the [gulp-stylus](https://www.npmjs.com/package/gulp-stylus) plugin, install `helpful-ui` and call it in gulp-stylus' `use` parameter.

```javascript
var gulp = require('gulp')
var stylus = require('gulp-stylus')
var ui = require('helpful-ui')

gulp.task('styles', function () {
  return gulp.src('*.styl')
    .pipe(stylus({
      use: [ ui() ]  // magic sauce
    }))
    .pipe(gulp.dest('./'))
})
```

### Bower

Install via Bower

```
bower install helpful-ui
```

## Usage

If you used the [Express / Connect](#express-connect) or [Gulp](#gulp) set-ups mentioned previously, you can simply import the `helpful-ui` package by name.

```stylus
@import 'helpful-ui'

// add your stylesheets below
@import 'components/*'
@import 'path/to/custom/file'
```

### Configuration

Helpful UI offers some basic configuration options that can be changed using a hash called `$hui`.  You need to place this hash before importing any Helpful UI files.

[Available options ➝](https://github.com/HelpfulHuman/HelpfulUI/wiki/Available-Options)

```stylus
$hui = {
  option-name: option-value
}

@import 'helpful-ui'
```

### CSS Reset: Zero

Helpful UI comes with its own normalization/reset sheet that is generated specifically for your project.  We call it "Zero".  You just need to `@import` it.

```stylus
@import 'helpful-ui'
@import 'helpful-ui/zero'
```

### Elements [Coming Soon]

We've tried to keep the core of Helpful UI down to a small set of features that are likely to be used in most projects.  If you would like even more functionality, you can bring in the [Helpful UI Elements](https://github.com/HelpfulHuman/HelpfulUI-Elements) library.  Helpful UI installs the Elements package behind the scenes and offers a shortcut for including the library in your project.

Just add this after `@import 'helpful-ui'` (or zero if you are using it):

```stylus
@import 'helpful-ui/zero'
@import 'helpful-ui/elements'
```

## Specification: Selector Types

The following section helps explain the various rules for naming classes and how they are used to create more readable mark up.

### Components

Components are the building blocks of your user interface.  They should always be the top level class and act as a namespace for their dependent [parts](#parts), [modifiers](#modifiers) and [states](#states).

###### html
```html
<a href="#" class="button">
  Example Button Component
</a>
```

###### stylus
```stylus
{component(button)}
  rules...
```

### Parts

Parts are the pieces that make up components.  The part's class consists of its name prefixed by the component's name and 2 underscores: `.component__part`.  This helps namespace smaller pieces in a clear way to help reduce confusion and risk of accidental style inheritance.

###### html
```html
<div class="panel">
  <header class="panel__header">Example</header>
  <section class="panel__body">Lorem ipsum...</section>
</div>
```

###### stylus
```stylus
{component(panel)}
  {part(header)}
    rules...

  {part(body)}
    rules...
```

### States

States are classes that change a component's behavior only while they're applied.  States are prefixed with `is-` and should always be used as compound selectors.  An example: `.component.is-state`

###### html
```html
<div class="tabs">
  <div class="tabs__tab is-active">Tab 1</div>
  <div class="tabs__tab">Tab 2</div>
  <div class="tabs__tab">Tab 3</div>
</div>
```

###### stylus
```stylus
{component(tabs)}
  {part(tab)}
    {state(active)}
        rules...
```


### Modifiers

Modifiers are classes that extend the behavior of the component or part that they are applied to.  They are prefixed with `+` and can either be "global utilities", like `+clearfix`, or component specific "options", like `button +blue`.  Component specific options should _always_ be defined as compound classes.

###### html
```html
<div class="thumbnails +dark +clearfix">
  ...
</div>
```

###### stylus
```stylus
{modifier(clearfix)}
  rules...

{component(thumbnails)}
  {modifier(dark)}
    rules...
```

###### Please Note

In order to use the `+` character in a CSS class name, you will need to escape it using the `\` character.  If you are you using stylus, then you will need to escape the escape character as well. Examples: `.\+foo` in vanilla CSS and `.\\+foo` in Stylus.

### Contexts

Contexts are top-level selectors that have a cascading effect on all of their child components.  It is highly recommended to use components and modifiers over contexts in most cases, however, sometimes small adjustments need to be made in order for a set of components to cooperate.  Context classes are denoted using the `as-` prefix.  You should never have more than one context applied to an element at any given time.

###### html
```html
<body class="as-about-page">
  <header class="hero">
  </header>
</body>
```

###### stylus
```stylus
{context(about-page)}
  {component(hero)}
    rules...
```

## Specification: Stylus Best Practices

Stylus is a fantastic language that gives developers a lot of flexibility.  However, through this flexibility other aspects like readability are often lost.  That's what this section hopes to address.

### Prepend Variables With `$`

Taking a note from SCSS, prepending variables with a `$` sign helps differentiate variables from functions and mixins.

```stylus
$myVar = true

myFunc ()
  return true
```
