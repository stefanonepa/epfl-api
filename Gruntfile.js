/// <binding BeforeBuild='apidoc' />
module.exports = function(grunt) {
    grunt.initConfig({
        apidoc: {
            mypp: {
                src : "api/",
                dest : "public/doc",
                log: true,
                options : {
                    debug: true,
                    includeFilters : [".*\\.js$"],
                    excludeFilters : ["node_modules/"]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-apidoc');
};