// Timbermen staff alerts. Shows a phone notification for each push and opens /staff when tapped.
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('push',function(e){
  var d={};try{d=e.data?e.data.json():{}}catch(x){}
  e.waitUntil(self.registration.showNotification(d.title||'Timbermen',{body:d.body||'',tag:d.tag||undefined,icon:'/icon-192.png',badge:'/icon-192.png',data:{url:d.url||'/staff'}}));
});
self.addEventListener('notificationclick',function(e){
  e.notification.close();var u=(e.notification.data&&e.notification.data.url)||'/staff';
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(cs){
    for(var i=0;i<cs.length;i++){if(cs[i].url.indexOf('/staff')>-1&&'focus' in cs[i])return cs[i].focus()}
    return self.clients.openWindow(u)}));
});
