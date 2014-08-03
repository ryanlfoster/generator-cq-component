'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var CqComponentGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.preprocesorMap = {
      "sass":   "gulp-ruby-sass",
      "less":   "gulp-less",
      "stylus": "gulp-stylus"
    }

    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies({
          bower: false,
          npm: true
        });
      }
    });


  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous CqComponent generator!'));

    var prompts = [{
      type: 'confirm',
      name: 'isCssPrepocesor',
      message: 'Would you like to enable some css preprocesor?',
      default: false
    }, {
      when: function (props) { return props.isCssPrepocesor; },
      type: 'list',
      name: 'cssPreprocesor',
      message: 'Choose your favourite css preprocesor?',
      choices: ['less', 'sass', 'stylus']
    }];

    this.prompt(prompts, function (props) {
      if(props.isCssPrepocesor){
        this.options.isCssPreprocesorSet = true;
        this.options.cssPreprocesorName = this.preprocesorMap[props.cssPreprocesor];
      }

      done();
    }.bind(this));
  },

  createDirs: function () {
    this.componentCLibDir = this.options.componentName + '/clientlib';
    var jsDir = this.componentCLibDir + '/js';
    var scssDir = this.componentCLibDir + '/scss';
    var distDir = this.componentCLibDir + '/dist';

    this.mkdir(jsDir);
    this.mkdir(jsDir + '/models');
    this.mkdir(jsDir + '/collections');
    this.mkdir(jsDir + '/view');

    this.mkdir(scssDir);
    this.mkdir(distDir);
  },

  createFiles: function () {
    this.template('_package.json', 'package.json', this.options);
    this.copy('_gulpfile.js', 'gulpfile.js');
    this.copy('scss/example.scss', 'scss/example.scss');

    
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = CqComponentGenerator;