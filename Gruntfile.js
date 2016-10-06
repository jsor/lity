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
            css: ['dist/*.css'],
            js: ['dist/*.js']
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
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            js: {
                expand: true,
                cwd: 'src/',
                src: '**/*.js',
                dest: 'dist/',
                ext: '.min.js',
                extDot: 'first'
            }
        },
        replace: {
            dist: {
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
        less: {
            options: {
                banner: '<%= banner %>'
            },
            src: {
                expand: true,
                cwd: 'src/',
                src: ['**/*.less'],
                dest: 'dist/',
                ext: '.css',
                extDot: 'first'
            },
            min: {
                options: {
                    compress: true
                },
                expand: true,
                cwd: 'src/',
                src: ['**/*.less'],
                dest: 'dist/',
                ext: '.min.css',
                extDot: 'first'
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({
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
                    })
                ]
            },
            src: {
                expand: true,
                cwd: 'dist/',
                src: ['**/*.css', '!**/*.min.css'],
                dest: 'dist/'
            },
            min: {
                options: {
                    cascade: false
                },
                expand: true,
                cwd: 'dist/',
                src: '**/*.min.css',
                dest: 'dist/'
            }
        },
        watch: {
            css: {
                files: 'src/**/*.less',
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
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('dist-css', ['clean:css', 'less', 'postcss']);
    grunt.registerTask('dist-js', ['clean:js', 'concat', 'uglify', 'replace']);
    grunt.registerTask('default', ['dist-css', 'dist-js']);
};
