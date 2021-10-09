# thevoid

* `cd theVoidApp/`
* `expo start`
* `expo start -c`
* clear cache: `rm -rf /tmp/metro-*`


<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="/__/firebase/8.10.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="/__/firebase/8.10.0/firebase-analytics.js"></script>

<!-- Initialize Firebase -->
<script src="/__/firebase/init.js"></script>

npm install -g firebase-tools

You can deploy now or later. To deploy now, open a terminal window, then navigate to or create a root directory for your web app.

Sign in to Google
firebase login
Initiate your project
Run this command from your app's root directory:

firebase init
When you're ready, deploy your web app
Put your static files (e.g. HTML, CSS, JS) in your app’s deploy directory (the default is 'public'). Then, run this command from your app’s root directory:

firebase deploy
After deploying, view your app at thevoid-54561.web.app

Need help? Take a look at the Hosting docs


#api:

* /users/id => chatIds, communityIds
* /chats/id => userIds, messageIds 


##data structure:
ava - **storage get** [on login]
 * users[by id - on login]
    * authid
    * username
    * email
    * password
    * created_at
    * last_online
    * status
    * notes
        * id list
    * chats
        * id list
    * courses
        * id list
 * chats
    * info [by chat id - on get current_user]
        * type
        * users
            * id - **storage get ava by id**
            * name
        * last message
            * content
            * created_at
            * sender id
            * status
            * image
    * messages [by chat id - on open chat]
        * recent
            * content
            * created_at
            * sender id
            * status
            * image
        * archived
            * content
            * created_at
            * sender id
            * status
            * image
 * courses [by id - on get participations]
    * info
        * name
        * type
        * description
        * ava?
        * style
    * users
        * status
        * messages
            * content
            * created_at
 * notes [by id - onload user info]
    * content
