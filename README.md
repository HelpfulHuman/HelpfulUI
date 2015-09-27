## Introduction

![Build Status](https://travis-ci.org/HelpfulHuman/HelpfulUI.svg)

**Helpful UI** is a specification for creating clean and predictable HTML and CSS.  The goal is to set standards that can be used across multiple projects to make it easier for developers to collaborate efficiently.

This project is heavily inspired by standards like [CSStyle](http://csstyle.io) and [SMACSS](https://smacss.com/) and the [nib](http://tj.github.io/nib/) stylus framework.

## Getting Started

Helpful UI is built in a very similar fashion to [nib](https://github.com/tj/nib) and can therefore be used in similar contexts.  Additionally, we've set it up so you can pull down the files via Bower if you prefer it.

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
    .use(ui())
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

If you used the [Express / Connect](#express-connect) or [Gulp](#gulp) set-ups mentioned previously, you can simply import Helpful UI's main file (if you want everything) or you can cherry pick particular components and helpers.

```stylus
// load everything
@import 'helpful-ui'

// load only the helpers
@import 'helpful-ui/helpers'

// load only the reset sheet
@import 'helpful-ui/reset'

// load everything but the button styles
$button__enabled = false
@import 'helpful-ui'
```

## Selector Types

The following section helps explain the various rules for naming classes and how they are used to create more readable mark up.

### Components

Components are the building blocks of your user interface.  They should always be the top level class and act as a namespace for their dependent [parts](#parts), [modifiers](#modifiers) and [states](#states).

```html
<a href="#" class="button">
  Example Button Component
</a>
```

### Parts

Parts are the pieces that make up components.  The part's class consists of its name prefixed by the component's name and 2 underscores: `.component__part`.  This helps namespace smaller pieces in a clear way to help reduce confusion and risk of accidental style inheritance.

```html
<div class="panel">
  <header class="panel__header">Example</header>
  <section class="panel__body">Lorem ipsum...</section>
</div>
```

### States

States are classes that change a component's behavior only while they're applied.  States are prefixed with `is-` and should always be used as compound selectors.  An example: `.component.is-state`

```html
<div class="tabs">
  <div class="tabs__tab is-active">Tab 1</div>
  <div class="tabs__tab">Tab 2</div>
  <div class="tabs__tab">Tab 3</div>
</div>
```

### Modifiers

Modifiers are classes that extend the behavior of the component or part that they are applied to.  They are prefixed with `+` and can either be "global utilities", like `+clearfix`, or component specific "options", like `button +blue`.  Component specific options should _always_ be defined as compound classes.

```html
<div class="thumbnails +dark +clearfix">
  ...
</div>
```

###### Please Note

In order to use the `+` character in a CSS class name, you will need to escape it using the `\` character.  If you are you using stylus, then you will need to escape the escape character as well. Examples: `.\+foo` in vanilla CSS and `.\\+foo` in Stylus.

### Contexts

Contexts are top-level selectors that have a cascading effect on all of their child components.  It is highly recommended to use components and modifiers over contexts in most cases, however, sometimes small adjustments need to be made in order for a set of components to cooperate.  Context classes are denoted using the `as-` prefix.  You should never have more than one context applied to an element at any given time.

```html
<body class="as-about-page">
  ...
</body>
```
