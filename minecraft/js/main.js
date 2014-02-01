window.map = new MapView(json.points);
window.sidebar = new SidebarView;
window.chat = new ChatView;
$('body').append(map.$el);
$('body').append(sidebar.$el);
$('body').append(chat.$el);
Poll.getInstance().start()


window.ip = 'no-ip';
function getip(json){
  window.ip = json.ip
}

window.unload = function () {
    chat.socket.close();
};

window.onbeforeunload = function() {
    chat.socket.onclose = function () {}; // disable onclose handler first
    chat.socket.close()
};


