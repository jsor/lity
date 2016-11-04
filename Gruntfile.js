'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) 2015-<%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= pkg.license %> */\n',
        clean: {
            css: ['dist/**/*.css'],
            js: ['dist/**/*.js']
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            js: {
                expand: true,
                cwd: 'src/',
                src: '**/*.js',
                dest: 'dist/'
            },
            css: {
                expand: true,
                cwd: 'src/',
                src: '**/*.css',
                dest: 'dist/'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            js: {
                expand: true,
                cwd: 'dist/',
                src: '**/*.js',
                dest: 'dist/',
                ext: '.min.js',
                extDot: 'first'
            }
        },
        replace: {
            js: {
                options: {
                    variables: {
                        VERSION: '<%= pkg.version %>',
                        DATE: '<%= grunt.template.today("yyyy-mm-dd") %>'
                    },
                    prefix: '@'
                },
                files: [
                    {
                        src: ['dist/*.js'],
                        dest: './'
                    }
                ]
            }
        },
        postcss: {
            options: {
                processors: [
                    require('postcss-cssnext')({
                        browsers: [
                            'Android 2.3',
                            'Android >= 4',
                            'Chrome >= 20',
                            'Firefox >= 24',
                            'Explorer >= 8',
                            'iOS >= 6',
                            'Opera >= 12',
                            'Safari >= 6'
                        ]
                    }),
                    require('postcss-remove-root'),
                    require('stylefmt')
                ]
            },
            css: {
                expand: true,
                cwd: 'dist/',
                src: '**/*.css',
                dest: 'dist/'
            }
        },
        cssnano: {
            min: {
                options: {
                    discardComments: true
                },
                expand: true,
                cwd: 'dist/',
                src: '**/*.css',
                dest: 'dist/',
                ext: '.min.css',
                extDot: 'first'
            }
        },
        watch: {
            css: {
                files: 'src/**/*.css',
                tasks: ['dist-css']
            },
            js: {
                files: 'src/**/*.js',
                tasks: ['dist-js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-cssnano');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('dist-css', ['clean:css', 'concat:css', 'postcss', 'cssnano']);
    grunt.registerTask('dist-js', ['clean:js', 'concat:js', 'uglify', 'replace']);
    grunt.registerTask('default', ['dist-css', 'dist-js']);
};
