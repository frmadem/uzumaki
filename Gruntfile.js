module.exports = function(grunt) {
	
    var files = [

	'src/message.js',

	'src/mailbox.js',

	'src/actor.js',

	'src/callback.js',

	'src/registry.js',
	
	'src/api.js',

	'src/uzumaki.js'
     ]; 

     var files_browser = files;

     files.push('src/main.js');

    grunt.initConfig({
        
	pkg: grunt.file.readJSON('package.json'),

	concat : {

		foo : {

			src: files,

			dest : 'dist/<%= pkg.name %>.js'
		}
	},

        uglify: {
            options: {
                banner: '// <%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n'
            },
            build: {
                src: 'dist/<%= pkg.name %>_browser.js',
                dest: 'dist/<%= pkg.name %>_browser.min.js'
            }
        },
        jshint: {
 
	        all: ['dist/<%= pkg.name %>_browser.js'],

		options: {

			evil: true

		}	
        },
        clean: {
            js: ['dist/*.js']
        },

	browserify: {

	  dist: {

	    files: {

	      'dist/uzumaki_browser.js': files_browser,
	    }

	  }
	}
    });
 
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');	 
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['clean', 'concat', 'browserify', 'uglify']);
 
};
