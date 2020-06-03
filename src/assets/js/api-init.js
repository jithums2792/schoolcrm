gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: this.clientId });
  });