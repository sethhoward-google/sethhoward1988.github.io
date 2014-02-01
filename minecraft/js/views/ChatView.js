
var ChatView = function () {
    this.init();
}

ChatView.prototype = {
    
    init: function () {
        this.el =   '<div class="chat">' +
                        '<div class="container">' +
                            '<div class="close-socket">Close Socket</div>' +
                            '<div class="window"></div>' +
                            '<div class="input">' +
                                '<div class="name">' +
                                    '<input type="text" placeholder="name" />' +
                                '</div>' +
                                '<div class="message">' +
                                    '<input type="text" placeholder="say something..." />' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>'

        this.$el = $(this.el);
        this.$messageInput = this.$el.find('.message input');
        this.$nameInput = this.$el.find('.name input');
        this.setup();


        
        var that = this;

        setTimeout(function () {
            that.appendMessage($('<div class="message admin">Welcome to the Minecraft in-game chat!</div>'));
            setTimeout(function () {
                that.appendMessage($('<div class="message admin">Be sure to fill out your name to identify yourself.</div>'))
            },300)
        },3000);

        this.socket = new WebSocket('ws://'+ Poll.getInstance().jsonapi.host+':' +(parseInt(Poll.getInstance().jsonapi.port)+2)+'/');
        
        this.socket.onopen = function (e) {
            that.appendMessage(that.createMessage('Connection to server established...'));
            that.socket.send("/api/subscribe?source=chat&key="+ Poll.getInstance().jsonapi.createKey("chat"));
        };

        this.socket.onerror = function (e) {
            console.log('ERROR');
        };
        
        this.socket.onmessage = function (e) {
            var data = JSON.parse(e.data),
                message = '';

            if(!data.success.message){
                return;
            }

            if(!data.success.player){
                message = data.success.message;
            } else {
                message = '<' + data.success.player + '> ' + data.success.message;
            }

            that.appendMessage(that.createMessage(message));
        };
        
        this.socket.onclose = function (e) {
            that.appendMessage(that.createMessage('Lost connection to server...'));  
        };
        
    },

    appendMessage: function (message) {
        this.window.append(message);
        this.window[0].scrollTop = this.window[0].scrollHeight;
    },

    createMessage: function (message, user) {
        var name = $('<span class="user"></span>').text(user);
        var message = $('<span class="msg"></span>').text(message);
        var $el = $('<div class="message"></div>').append(name).append(message);
        return $el;
    },

    sendMessage: function (message) {
        var url = Poll.getInstance().jsonapi.makeURL("broadcast", [message]);
        url = "/api"+url.substr(url.lastIndexOf("/"));
        url = url.substr(0, url.indexOf("&callback=?"));
        this.socket.send(url);
    },

    setup: function () {
        this.window = this.$el.find('.window');
        this.onInputKeyup = _.bind(this.onInputKeyup, this);
        this.$el.find('.input input').on('keyup', this.onInputKeyup);
        this.nameInput = this.$el.find('.name input');
        this.onClickCloseSocket = _.bind(this.onClickCloseSocket, this);
        this.$el.find('.close-socket').on('click', this.onClickCloseSocket);
    },

    onInputKeyup: function (evt) {
        if(evt.keyCode == 13){
            var text = this.$messageInput.val();
            var name = this.$nameInput.val();
            name = name ? name : 'Anonymouse';
            if(text){
                var message = this.createMessage(text);
                this.sendMessage('<' + window.ip + ' - ' + name + '> ' + text);
                $(evt.target).val('');
            }
        }
    },

    onClickCloseSocket: function () {
        this.socket.close();
    }
}
