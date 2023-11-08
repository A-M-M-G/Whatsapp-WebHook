'use strict';

const express = require('express');
const bodyParser = require('body-parser');

// creates http server .
const app = express().use(bodyParser.json()); 
// const http = require('http');

// creates https server .
// const https = require('https');
// const fs = require('fs');
//const PORT =  8080;
//const  pkey = fs.readFileSync('./ssl/key.pem');
//const  pcert = fs.readFileSync('./ssl/cert.pem');
//const  options = {key: pkey, cert: pcert, passphrase: '123456789'};

var _messageText = new Array();
var _contacts = new Array();

var _status = new Array();
var _statusMessageId = new Array();
var _conversationId = new Array();

var _messageImage = new Array();
var _messageAudio = new Array();
var _messageDocument = new Array();
var _messageVideo = new Array();
var _messageVoice = new Array();


app.post('/', (req, res) => {
    
    // print request body . 
    // console.log(req.body); 
    console.log(JSON.stringify(req.body));

    // if  contact .
    if (req.body.contacts){
        if(req.body.contacts[0].wa_id) {
            console.log("Contact : " + req.body.contacts[0].wa_id);
            _contacts.push(req.body.contacts[0].wa_id);
            }
    }

    // if  msg .
    if(req.body.messages) {
        if(req.body.messages[0].text) {
        console.log("Text Msg. : " + req.body.messages[0].text.body);
         _messageText.push(req.body.messages[0].text.body);
        }
       
        if(req.body.messages[0].image) {
        console.log("Image ID : " + req.body.messages[0].image.id);
        _messageImage.push(req.body.messages[0].image.id);
        }
        
        if(req.body.messages[0].document) {
        console.log("Document ID : " + req.body.messages[0].document.id);
        _messageDocument.push(req.body.messages[0].document.id);
        }
        
        if(req.body.messages[0].audio) {
        console.log("Audio ID : " + req.body.messages[0].audio.id);
        _messageAudio.push(req.body.messages[0].audio.id);
        }

        if(req.body.messages[0].video) {
        console.log("Video ID : " + req.body.messages[0].video.id);
        _messageVideo.push(req.body.messages[0].video.id);
        }

        if(req.body.messages[0].voice) {
        console.log("Voice ID : " + req.body.messages[0].voice.id);
        _messageVoice.push(req.body.messages[0].voice.id);
        }
    }

    // if status .
    if(req.body.statuses) {
        console.log("Status : " + req.body.statuses[0].status);
        console.log("Status Message ID : " + req.body.statuses[0].id);
        console.log("Conversation ID : " + req.body.statuses[0].conversation.id);

        _status.push(req.body.statuses[0].status);
        _statusMessageId.push(req.body.statuses[0].id);
        _conversationId.push(req.body.statuses[0].conversation.id);
    }
    
    if(req.body.statuses && req.body.statuses[0].status == "read") {
        console.log("Status : " + req.body.statuses[0].status);
        _status.push(req.body.statuses[0].status);
    }
   
// return a text response .
// success msg .
    res.json({
        status: 'success',
    });
    
});

app.get('/', (req, res) => {
    
    // data .
    res.json({
        text_message: _messageText,
        contacts: _contacts,

        status: _status,
        statusMessageId: _statusMessageId,
        conversationId: _conversationId,

        image_id: _messageImage,
        document_id: _messageDocument,
        audio_id: _messageAudio,
        video_id: _messageVideo,
        voice_id: _messageVoice
    }); 
    
    _messageText = new Array();
    _contacts = new Array();

    _status = new Array();
    _statusMessageId = new Array();
    _conversationId = new Array();
    
    _messageImage = new Array();
    _messageDocument = new Array();
    _messageAudio = new Array();
    _messageVideo = new Array();
    _messageVoice = new Array();
    
});

// start server (listen on port 443 - SSL) .
// https.createServer(options, app).listen(PORT, () => console.log('The HTTPS server is up and running. [WhatsApp API] Webhook server is listening.'));
//console.log("The HTTPS server is up and running.");

app.listen(process.env.PORT || 5000, () => console.log('The HTTP server is up and running. [WhatsApp API] Webhook server is listening to ...'));