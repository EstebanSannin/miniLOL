/*********************************************************************
 *           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE             *
 *                   Version 2, December 2004                        *
 *                                                                   *
 *  Copyleft meh.                                                    *
 *                                                                   *
 *           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE             *
 *  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION  *
 *                                                                   *
 *  0. You just DO WHAT THE FUCK YOU WANT TO.                        *
 *********************************************************************/

miniLOL.module.create('security', {
    version: '0.1.1',

    type: 'passive',
    
    onLoad: function () {
        include("css", this.root+"/resources/style.css");

        new Ajax.Request(this.root+"/main.php?build", {
            method: 'get',
            asynchronous: false,

            onFailure: function () {
                miniLOL.content.set("Failed to build the configuration tree.");
            },
        });

        this.execute({ connected: true });
    },

    execute: function (args) {
        if (!args) {
            return;
        }

        if (args["login"]) {
            if (args["do"]) {
                miniLOL.module.execute('logger', ['log', 100, 'security', 'login', args['password'] || ""]);

                if (!args["password"]) {
                    miniLOL.content.set('The password is missing.');
                    return false;
                }

                new Ajax.Request(this.root+"/main.php?login&password=#{0}".interpolate([encodeURIComponent(args["password"])]), {
                    method: 'get',

                    onSuccess: function (http) {
                        miniLOL.content.set(http.responseText);
                    },

                    onFailure: function () {
                        miniLOL.content.set('Something went deeply wrong :(');
                    },
                });
            }
            else {
                new Ajax.Request(this.root+"/resources/login.tpl", {
                    method: 'get',

                    onSuccess: function (http) {
                        miniLOL.content.set(http.responseText);
                    },

                    onFailure: function () {
                        miniLOL.content.set('Something went deeply wrong :(');
                    },
                });
            }
        }
        else if (args["logout"]) {
            miniLOL.module.execute('logger', ['log', 30, 'security', 'logout']);

            new Ajax.Request(this.root+"/main.php?logout", {
                method: 'get',

                onSuccess: function (http) {
                    miniLOL.content.set(http.responseText);
                },

                onFailure: function () {
                    miniLOL.content.set('Something went deeply wrong :(');
                },
            });
        }
        else if (args["connected"]) {
            var result = "false";

            miniLOL.module.execute('logger', ['log', 30, 'security', 'connected']);
            
            new Ajax.Request(this.root+"/main.php?connected", {
                method: 'get',
                asynchronous: false,

                onSuccess: function (http) {
                    result = http.responseText;
                },
            });

            return this.connected = (result == "true");
        }
        else if (args["get"]) {
            var result = "";

            miniLOL.module.execute('logger', ['log', 30, 'security', 'get', args["get"]]);
            
            new Ajax.Request(this.root+"/main.php?get=" + args["get"], {
                method: 'get',
                asynchronous: false,

                onSuccess: function (http) {
                    result = http.responseText;
                },
            });

            return result;
           
        }
    },
});