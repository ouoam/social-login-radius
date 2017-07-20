function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    auth2.disconnect();
    document.getElementById('login__username').value = "";
    document.getElementById('login__password').value = "";

}

function onSuccess(googleUser) {
    document.getElementById('error_text').innerHTML = '';

    var profile = googleUser.getBasicProfile();
    console.log('Image URL: ' + profile.getImageUrl());

    var id_token = googleUser.getAuthResponse().id_token;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/newtoken');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        document.getElementById('info_text').innerHTML = 'Signed in as: ' + profile.getName();
        document.getElementById('login__username').value = profile.getEmail().split('@')[0];

        at_hash(googleUser.getAuthResponse().access_token).then(function (digest) {
            document.getElementById('login__password').value = digest;
        });
    };
    xhr.send('idtoken=' + id_token);
}

function onFailure(error) {
    console.log('Login error :', error);
    if (error.error == 'popup_closed_by_user') {
        document.getElementById('error_text').innerHTML = '';
    } else if (typeof (error.accountDomain) == 'undefined' || error.accountDomain != 'pccpl.ac.th') {
        document.getElementById('error_text').innerHTML = 'Use only PCCPL E-Mail!!!';
    }
}

function onLoad() {
    gapi.load('auth2', function () {
        auth2 = gapi.auth2.init({
            //client_id: '778914308195-brksvh8rfdee3hl4ce3k3c4h1kugb7uk.apps.googleusercontent.com',
            client_id: '1056275747245-4unpk681ffd3upkbvfnrv43jaecrglqi.apps.googleusercontent.com',
            hosted_domain: 'pccpl.ac.th'
        });
    });

    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 320,
        'height': 53,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });

    setTimeout(function () {
        document.getElementsByClassName("abcRioButton abcRioButtonBlue")[0].style.width = "";
    }, 100);
}

function at_hash(str) {
    // We transform the string into an arraybuffer.
    var buffer = new TextEncoder("utf-8").encode(str);
    return crypto.subtle.digest("SHA-256", buffer).then(function (hash) {
        var binary = '';
        var bytes = new Uint8Array(hash);
        var len = bytes.byteLength / 2; //use first half of buffer

        //convert from buffer to binary
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        //base64 encode
        str = window.btoa(binary);

        //base64url encode
        return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
    });
}
