module.exports = function(grunt) {
 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

	concat : {

		foo : {

			src: [

				'src/message.js',

				'src/mailbox.js',

				'src/actor.js',

				'src/callback.js',

				'src/actor_process.js',

				'src/registry.js'

				//'src/uzumaki.js', 
			
				//'src/core/component.js',

				//'src/api.js',	
		
				//'src/uzify.js',

				//'src/register.js'

			],
			dest : 'dist/<%= pkg.name %>.js'
		}
	},

        uglify: {
            options: {
                banner: '// <%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n'
            },
            build: {
                src: 'dist/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
 
	        all: ['dist/<%= pkg.name %>.js'],

		options: {

			evil: true

		}	
        },
        clean: {
            js: ['dist/*.js']
        }
    });
 
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');	 

    grunt.registerTask('default', ['clean', 'concat', 'jshint', 'uglify']);
 
};
